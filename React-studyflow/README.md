# StudyFlow - Adaptive Learning Platform

A modern, AI-powered study platform built with **React + TypeScript** (frontend) and **Django + DRF** (backend) with **PostgreSQL** database.

## 🏗️ Architecture

```
React-studyflow/
├── backend/                 # Django REST API
│   ├── config/             # Django settings & config
│   ├── core/               # User authentication & profiles
│   ├── courses/            # Courses, topics, glossary
│   ├── chat/               # AI chat sessions & messages
│   ├── glossary/           # Glossary-specific endpoints
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   ├── lib/            # API client & utilities
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docker-compose.yml      # PostgreSQL + pgAdmin
└── init-db/                # Database initialization scripts
```

## ✨ Features

### 🎓 Learning Features
- **Course Management** - Structured courses with topics and learning guides
- **Topic Reading** - Rich markdown content with KaTeX math rendering
- **Global Glossary** - Searchable, categorized terms with formal definitions
- **Progress Tracking** - Per-topic completion, bookmarks, personal notes
- **AI Tutor Chat** - Scaffolded learning with NVIDIA API (Gemma/Llama)

### 🔐 Authentication
- JWT-based auth with access/refresh tokens
- User registration & login
- Profile management with preferences
- Protected routes

### 🎨 UI/UX
- Dark theme with brand colors (cyan/lime/blue)
- Responsive design (mobile-first)
- Tailwind CSS + custom design system
- Smooth animations & transitions
- Accessible (ARIA, focus management)

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 16+ (or Docker)

### 1. Start Database
```bash
docker-compose up -d postgres
# Optional: pgAdmin at http://localhost:5050
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your NVIDIA_API_KEY and database settings

# Run migrations
python manage.py migrate
python manage.py createsuperuser  # Optional admin user

# Start server
python manage.py runserver 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/token/           # Login (get JWT)
POST   /api/auth/token/refresh/   # Refresh access token
POST   /api/auth/token/verify/    # Verify token
POST   /api/users/register/       # Register new user
GET    /api/users/me/             # Current user profile
PATCH  /api/users/me/             # Update profile
POST   /api/users/change_password/
```

### Courses
```
GET    /api/courses/                    # List courses (with filters)
GET    /api/courses/{id}/               # Course detail with topics
GET    /api/courses/{id}/topics/        # Course topics
GET    /api/courses/topics/{id}/        # Topic detail
GET    /api/courses/progress/summary/   # User progress summary
POST   /api/courses/progress/{id}/bookmark/
POST   /api/courses/progress/{id}/complete/
```

### Glossary
```
GET    /api/glossary/               # List terms (search, filter)
GET    /api/glossary/{id}/          # Term detail
POST   /api/glossary/{id}/bookmark/
GET    /api/glossary/categories/
GET    /api/glossary/disciplines/
GET    /api/glossary/alphabet/
GET    /api/glossary/random/
```

### Chat
```
GET    /api/chat/sessions/              # List sessions
POST   /api/chat/sessions/              # Create session
GET    /api/chat/sessions/{id}/         # Session with messages
POST   /api/chat/sessions/{id}/messages/  # Send message
POST   /api/chat/sessions/{id}/export/    # Export (md/json/txt)
GET    /api/chat/sessions/stats/        # Chat statistics
```

## 🔧 Configuration

### Backend (.env)
```env
# Django
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
POSTGRES_DB=studyflow
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# NVIDIA API (Required for AI chat)
NVIDIA_API_KEY=your-nvidia-api-key
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL_NAME=google/gemma-4-31b-it
NVIDIA_MODEL_FALLBACKS=meta/llama-3.1-8b-instruct

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## 🧪 Development

### Backend Commands
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Shell with models
python manage.py shell_plus

# Check for issues
python manage.py check
```

### Frontend Commands
```bash
# Development server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Backend (Production)
```bash
# Install production dependencies
pip install gunicorn whitenoise

# Configure production settings
DJANGO_SETTINGS_MODULE=config.settings.production

# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Frontend (Production)
```bash
npm run build
# Deploy dist/ folder to your hosting (Vercel, Netlify, etc.)
```

### Docker (Optional)
```bash
# Build images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Run
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🗂️ Project Structure Details

### Backend Models
- **User** - Custom user with profile, preferences
- **Course** - Code, title, discipline, topics
- **Topic** - Notes, learning guide, progress tracking
- **GlossaryTerm** - Definitions, formal math, examples, relationships
- **ChatSession** - Course/topic context, messages
- **ChatMessage** - Role, content, attachments, AI metadata

### Frontend State
- **authStore** - User, tokens, auth actions (persisted)
- **React Query** - Server state caching & synchronization
- **Local state** - UI interactions (modals, forms, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use for learning or production!

## 🙏 Acknowledgments

- **NVIDIA API** for AI model access
- **Django REST Framework** for excellent API tooling
- **React + Vite** for fast development experience
- **Tailwind CSS** for utility-first styling
- **KaTeX** for beautiful math rendering