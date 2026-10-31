"""Import StudyFlow content from the legacy JavaScript data files.

Usage:
    python manage.py import_content
    python manage.py import_content --flush
"""

import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from courses.models import Course, Discipline, GlossaryTerm, Topic


BASE_DIR = Path(__file__).resolve().parents[3]
CONTENT_DIR = BASE_DIR / "_content"

DISCIPLINE_META = {
    "Computer Science": {"icon": "cpu", "color": "#3b82f6", "order": 1},
    "Mathematics": {"icon": "calculator", "color": "#f59e0b", "order": 2},
    "Entrepreneurship": {"icon": "briefcase", "color": "#10b981", "order": 3},
    "Practicum": {"icon": "graduation-cap", "color": "#ec4899", "order": 4},
    "Physics": {"icon": "atom", "color": "#8b5cf6", "order": 5},
    "Chemistry": {"icon": "flask-conical", "color": "#14b8a6", "order": 6},
}

COURSE_META = {
    "COS201": {"discipline": "Computer Science", "level": "200L", "semester": "2nd Semester", "credits": 3},
    "CSC203": {"discipline": "Computer Science", "level": "200L", "semester": "2nd Semester", "credits": 3},
    "CSC215": {"discipline": "Computer Science", "level": "200L", "semester": "2nd Semester", "credits": 3},
    "MTH201": {"discipline": "Mathematics", "level": "200L", "semester": "2nd Semester", "credits": 3},
    "ENT211": {"discipline": "Entrepreneurship", "level": "200L", "semester": "2nd Semester", "credits": 2},
    "CSC299": {"discipline": "Practicum", "level": "200L", "semester": "2nd Semester", "credits": 6},
}


def read_json(name):
    path = CONTENT_DIR / name
    if not path.exists():
        raise FileNotFoundError(
            f"Missing {path}. Run: node _extract_content.mjs"
        )
    return json.loads(path.read_text(encoding="utf-8"))


def reading_minutes(notes):
    words = len((notes or "").split())
    return max(3, round(words / 180))


class Command(BaseCommand):
    help = "Import courses, topics, and glossary terms from the legacy StudyFlow JSON."

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing courses, topics, and glossary terms before importing.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        courses = read_json("courses.json")
        glossary = read_json("glossary.json")

        if options["flush"]:
            GlossaryTerm.objects.all().delete()
            Topic.objects.all().delete()
            Course.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing content."))

        disciplines = {}
        for name, meta in DISCIPLINE_META.items():
            discipline, _ = Discipline.objects.update_or_create(
                name=name,
                defaults={
                    "slug": slugify(name),
                    "icon": meta["icon"],
                    "color": meta["color"],
                    "order": meta["order"],
                    "is_active": True,
                },
            )
            disciplines[name] = discipline

        course_count = 0
        topic_count = 0
        for order, course_data in enumerate(courses, start=1):
            code = course_data["id"]
            meta = COURSE_META.get(code, {})
            discipline = disciplines.get(meta.get("discipline"))
            course, _ = Course.objects.update_or_create(
                code=code,
                defaults={
                    "title": course_data.get("title", code),
                    "description": course_data.get("description", ""),
                    "discipline": discipline,
                    "level": meta.get("level", "200L"),
                    "semester": meta.get("semester", "2nd Semester"),
                    "credits": meta.get("credits", 3),
                    "order": order,
                    "is_active": True,
                },
            )
            course_count += 1

            for topic_order, topic_data in enumerate(course_data.get("topics", []), start=1):
                notes = topic_data.get("notes", "") or ""
                Topic.objects.update_or_create(
                    course=course,
                    topic_id=topic_data["id"],
                    defaults={
                        "title": topic_data.get("title", "Untitled topic"),
                        "notes": notes,
                        "learning_guide": topic_data.get("learningGuide") or {},
                        "order": topic_order,
                        "estimated_read_time": reading_minutes(notes),
                        "is_active": True,
                    },
                )
                topic_count += 1

        term_count = 0
        created_terms = {}
        for term_data in glossary:
            discipline = disciplines.get(term_data.get("discipline"))
            slug = slugify(term_data.get("id") or term_data["term"])
            term, _ = GlossaryTerm.objects.update_or_create(
                discipline=discipline,
                slug=slug,
                defaults={
                    "term": term_data["term"],
                    "short_definition": term_data.get("shortDefinition", ""),
                    "full_definition": term_data.get("fullDefinition", ""),
                    "formal_definition": term_data.get("formalDefinition", ""),
                    "category": term_data.get("category", ""),
                    "worked_examples": term_data.get("examples", []),
                    "difficulty": "intermediate",
                    "is_featured": False,
                },
            )
            term_count += 1
            created_terms.setdefault(term_data["id"], []).append(term)

        # Resolve related terms after all terms exist.
        unresolved = set()
        for term_data in glossary:
            term = created_terms[term_data["id"]][0]
            related = []
            for related_id in term_data.get("relatedTerms", []):
                candidates = created_terms.get(related_id, [])
                if not candidates:
                    unresolved.add(related_id)
                    continue
                same_discipline = [t for t in candidates if t.discipline_id == term.discipline_id]
                related.append((same_discipline or candidates)[0])
            term.related_terms.set(related)

        if unresolved:
            self.stdout.write(
                self.style.WARNING(f"Unresolved related term ids: {', '.join(sorted(unresolved))}")
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Imported {course_count} courses, {topic_count} topics, "
                f"{term_count} glossary terms, {len(disciplines)} disciplines."
            )
        )
