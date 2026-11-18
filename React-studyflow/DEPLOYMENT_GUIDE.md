# StudyFlow - Deployment Guide (Option A: Netlify + Render + Neon)

**Architecture:**
- **Frontend** → Netlify (React static site, free forever)
- **Backend** → Render Web Service (Django + Gunicorn, free tier)
- **Database** → Neon (PostgreSQL, free forever)

---

## 📁 Files Created/Updated

| File | Purpose |
|------|---------|
| `backend/Dockerfile` | Multi-stage Docker build for Render |
| `backend/docker-entrypoint.sh` | Runs migrations, collects static, starts Gunicorn |
| `backend/render.yaml` | Render Blueprint: defines backend service + env vars |
| `backend/.dockerignore` | Excludes dev files from Docker context |
| `backend/config/settings/production.py` | Render/Neon optimized settings |
| `backend/requirements.txt` | Added `gunicorn`, `whitenoise`, `dj-database-url` |
| `backend/config/urls.py` | Added `/api/health/` for Render health checks |
| `frontend/netlify.toml` | Netlify config: build, SPA redirects, security headers |
| `frontend/public/_redirects` | SPA fallback (`/* → /index.html`) |
| `DEPLOYMENT_GUIDE.md` | This guide |

---

## 🚀 Step-by-Step Deployment

### Prerequisites
- ✅ GitHub repo with code pushed
- ✅ Netlify account
- ✅ Render account
- ✅ Neon account (create at [neon.tech](https://neon.tech))

---

### 1. Create Neon Database (Do This First)

1. Go to **[neon.tech](https://neon.tech)** → Sign up (GitHub)
2. **Create Project** → Name: `studyflow` → Region: closest to you
3. Wait for project creation (~30 sec)
4. **Copy connection string** from "Connection Details" modal:
   ```
   postgresql://username:password@ep-xxx-region.aws.neon.tech/neondb?sslmode=require
   ```
5. **Save this** — you'll need it for Render

> **Neon Free Tier:** 3 GB storage, 100 hrs compute/month, auto-suspend after 5 min idle

---

### 2. Deploy Backend to Render

#### Option A: Blueprint (Recommended)
1. Go to **[dashboard.render.com](https://dashboard.render.com)**
2. **New** → **Blueprint** → **"Build from GitHub"**
3. Connect your GitHub account → Select repo
4. Render detects `backend/render.yaml` → **Apply**
5. Name: `studyflow-backend` → **Create Blueprint Instance**

#### Option B: Manual Service
1. **New** → **Web Service** → Connect GitHub repo
2. **Root Directory**: `React-studyflow/backend` *(the repo stores the project under this subfolder)*
3. **Runtime**: `Docker`
4. **Plan**: `Free`
5. **Health Check Path**: `/api/health/`

---

### 3. Configure Backend Environment Variables

In Render Dashboard → `studyflow-backend` → **Environment**:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | *Paste Neon connection string* | **Required** |
| `DJANGO_SECRET_KEY` | *Auto-generated* | Render generates if blank |
| `DEBUG` | `false` | |
| `ALLOWED_HOSTS` | `.onrender.com,your-custom-domain.com` | |
| `CORS_ALLOWED_ORIGINS` | `https://your-site.netlify.app` | **Update after Netlify deploy** |
| `CSRF_TRUSTED_ORIGINS` | `https://your-site.netlify.app,https://studyflow-backend.onrender.com` | |
| `NVIDIA_API_KEY` | *Your NVIDIA key* | **Required for AI chat** |
| `NVIDIA_BASE_URL` | `https://integrate.api.nvidia.com/v1` | |
| `NVIDIA_MODEL_NAME` | `google/gemma-4-31b-it` | |
| `CREATE_SUPERUSER` | `true` | First deploy only |
| `SUPERUSER_USERNAME` | `admin` | Optional |
| `SUPERUSER_EMAIL` | `admin@yourdomain.com` | Optional |

**Click "Save Changes" → "Deploy Latest Commit"**

---

### 4. Verify Backend Deployment

Wait for deploy to complete (2-5 min first time), then test:

- **Health check**: `https://studyflow-backend.onrender.com/api/health/`
  ```json
  {"status": "ok", "database": "healthy", "service": "studyflow-backend"}
  ```
- **API root**: `https://studyflow-backend.onrender.com/api/`
- **Admin**: `https://studyflow-backend.onrender.com/admin/` (if superuser created)

---

### 5. Deploy Frontend to Netlify

1. Go to **[app.netlify.com](https://app.netlify.com)**
2. **"Add new site"** → **"Import an existing project"**
3. Connect GitHub → Select repo
4. **Configure build:**
   - **Base directory**: `React-studyflow/frontend` *(repo stores project under this subfolder)*
   - **Build command**: `npm ci && npm run build`
   - **Publish directory**: `dist` *(relative to base directory)*
5. **Deploy site**

---

### 6. Configure Frontend Environment Variables

In Netlify Dashboard → Site → **Site settings** → **Environment variables**:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://studyflow-backend.onrender.com/api` |

**Trigger new deploy** (Deploys → Trigger deploy → Clear cache and deploy)

---

### 7. Update Backend CORS with Actual Netlify URL

1. Netlify gives you a URL like: `https://random-name.netlify.app`
2. **Rename it** in Netlify: Site settings → Change site name → `studyflow-frontend`
3. Now your frontend is: `https://studyflow-frontend.netlify.app`
4. **Update Render backend env vars:**
   - `CORS_ALLOWED_ORIGINS` = `https://studyflow-frontend.netlify.app`
   - `CSRF_TRUSTED_ORIGINS` = `https://studyflow-frontend.netlify.app,https://studyflow-backend.onrender.com`
5. **Re-deploy backend** (Render → Manual Deploy → Deploy latest commit)

---

### 8. Custom Domains (Optional)

#### Netlify (Frontend)
1. Netlify → Domain settings → Add custom domain
2. Configure DNS (Netlify nameservers or CNAME)

#### Render (Backend)
1. Render → studyflow-backend → Settings → Custom Domains
2. Add `api.yourdomain.com`
3. Update `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS` in Render env vars

---

## 💰 Cost Breakdown (All Free Tiers)

| Service | Free Tier Limits | Upgrade Cost |
|---------|------------------|--------------|
| **Netlify** | Unlimited sites, 100 GB bandwidth, 300 build mins | $19/mo Pro |
| **Render Web Service** | 512 MB RAM, shared CPU, spins down after 15 min idle | $7/mo Starter |
| **Neon PostgreSQL** | 3 GB storage, 100 hrs compute/mo, auto-suspend | $19/mo Scale |
| **Total** | **$0/month** | ~$45/mo for production |

---

## 🐛 Troubleshooting

### Backend: "Database connection failed"
- Verify `DATABASE_URL` in Render env vars matches Neon exactly
- Check Neon project is not suspended (Neon dashboard → "Resume")
- Ensure `sslmode=require` in connection string

### Backend: "ALLOWED_HOSTS" error
- Add `.onrender.com` to `ALLOWED_HOSTS` in Render env vars
- Include custom domain if using one

### Frontend: "CORS error" / "Network error"
- Verify `CORS_ALLOWED_ORIGINS` in Render includes exact Netlify URL (with `https://`)
- Check `VITE_API_URL` in Netlify env vars points to backend `/api`

### Frontend: 404 on refresh / direct URL access
- Ensure `netlify.toml` has `[[redirects]]` with `/* → /index.html 200`
- Or `public/_redirects` exists with `/* /index.html 200`

### Backend: Static files 404 (admin CSS missing)
- Run in Render shell: `python manage.py collectstatic --noinput`
- Verify `whitenoise.middleware.WhiteNoiseMiddleware` in MIDDLEWARE

### Backend: Migrations not applied
- Render shell: `python manage.py migrate`
- Or check `docker-entrypoint.sh` runs migrations on start

### Neon: "Connection terminated" / timeout
- Neon auto-suspends after 5 min idle → first request wakes it (~2-3 sec)
- Consider upgrading Neon or using Render PostgreSQL (90 days free) for no cold starts

---

## 🔧 Useful Commands

### Render CLI (Optional)
```bash
# Install
npm install -g @render/cli

# Login
render login

# View logs
render logs studyflow-backend

# Run management commands
render exec studyflow-backend python manage.py createsuperuser
render exec studyflow-backend python manage.py shell
```

### Neon CLI (Optional)
```bash
# Install
npm install -g @neondatabase/cli

# Login
neon auth

# Branch management (preview deployments)
neon branches create --project-id <id> --name preview-branch
```

---

## 📝 Next Steps After Deploy

1. **Test full flow**: Register → Login → Browse courses → Chat with AI
2. **Add monitoring**: Sentry (errors), Render Metrics (performance)
3. **Set up backups**: Neon has point-in-time recovery on paid plans
4. **Configure email**: Add SendGrid/Mailgun credentials for password reset
5. **Add Redis caching**: Render Redis addon or Upstash (free tier) for rate limiting

---

## 🆘 Support Links

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Neon Docs**: https://neon.tech/docs
- **Django Deployment Checklist**: https://docs.djangoproject.com/en/stable/howto/deployment/checklist/

---

## ✅ Quick Verification Checklist

- [ ] Neon project created, connection string saved
- [ ] Backend deployed on Render, health check returns `{"status": "ok"}`
- [ ] Frontend deployed on Netlify, loads without console errors
- [ ] `VITE_API_URL` set in Netlify env vars
- [ ] `CORS_ALLOWED_ORIGINS` in Render matches Netlify URL exactly
- [ ] User registration/login works
- [ ] AI chat responds (NVIDIA_API_KEY valid)
- [ ] Static files load (admin panel styled)
- [ ] Custom domains configured (optional)