import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from courses.learning import validate_session_flow
from courses.models import Topic


CONTENT_PATH = Path(__file__).resolve().parents[3] / '_content' / 'mth201_learning_flows.json'


class Command(BaseCommand):
    help = 'Import authored MTH201 guided learning flows without reimporting other course notes.'

    @transaction.atomic
    def handle(self, *args, **options):
        if not CONTENT_PATH.exists():
            raise CommandError(f'Missing guided learning content: {CONTENT_PATH}')

        try:
            flows = json.loads(CONTENT_PATH.read_text(encoding='utf-8'))
        except json.JSONDecodeError as error:
            raise CommandError(f'Invalid guided learning JSON: {error}') from error

        for topic_id, flow in flows.items():
            try:
                validate_session_flow(flow)
                topic = Topic.objects.get(
                    course__code='MTH201',
                    topic_id=topic_id,
                    is_active=True,
                )
            except (ValueError, Topic.DoesNotExist) as error:
                raise CommandError(f'Cannot import {topic_id}: {error}') from error

            learning_guide = dict(topic.learning_guide or {})
            learning_guide['sessionFlow'] = flow
            topic.learning_guide = learning_guide
            topic.save(update_fields=['learning_guide', 'updated_at'])

        self.stdout.write(self.style.SUCCESS(f'Imported {len(flows)} MTH201 learning flows.'))
