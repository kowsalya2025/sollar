# Solaris Landing Page

A premium, modern, single‑page landing site for the fictional solar company **SOLARIS** built with **Django**, **Tailwind CSS**, **GSAP** (via custom JS) and **Lucide** icons.

## Project Structure
```
solar_landing/
├─ manage.py
├─ requirements.txt
├─ solaris_project/          # Django project
│   ├─ __init__.py
│   ├─ settings.py
│   ├─ urls.py
│   └─ wsgi.py
├─ website/                 # Django app (contains the landing page)
│   ├─ __init__.py
│   ├─ apps.py
│   ├─ views.py
│   ├─ urls.py
│   └─ templates/
│       └─ website/
│           └─ index.html
├─ static/
│   ├─ css/style.css
│   ├─ js/main.js
│   └─ images/ (hero, before/after, etc.)
└─ .gitignore
```

## Prerequisites
- **Python 3.11+**
- **Virtual‑env** (recommended)

## Setup
```bash
# 1. Open the project folder
cd "c:\Users\Selvaraj S\Downloads\sollar_landing"

# 2. Create and activate a virtual environment (if not already)
python -m venv .venv
.venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
```

> The `requirements.txt` contains:
```
Django>=6.1
```

## Database (SQLite – no models needed)
```bash
# Initialise the SQLite DB (creates db.sqlite3)
python manage.py migrate
```

## Run the Development Server
```bash
python manage.py runserver
```
Open a browser and navigate to **http://127.0.0.1:8000/** – you should see the full‑screen SOLARIS landing page with all animations, scroll‑reveal effects and the interactive calculator.

## Development Tips
- **Tailwind** is loaded via CDN in the template – you can customise the `tailwind.config` block inside `index.html` (lines 12‑53).
- **Static assets** live in `static/`. Django serves them automatically in development because `STATIC_URL = '/static/'` and `STATICFILES_DIRS` points to the folder.
- To add new pages, create a view in `website/views.py`, map a route in `website/urls.py` and reference the template under `templates/website/`.
- The JavaScript file `static/js/main.js` contains all interactive behaviours (navbar, before/after slider, calculator, carousel, scroll reveals, etc.). Edit it to tweak animations or add more GSAP effects.

## Deploying to Production (optional)
When you are ready to ship, you will need to:
1. Set `DEBUG = False` and configure `ALLOWED_HOSTS` in `settings.py`.
2. Collect static files:
   ```bash
   python manage.py collectstatic
   ```
3. Serve the app with a WSGI‑compatible server (Gunicorn, uWSGI, etc.) behind a web server (NGINX, Apache).

---
Enjoy building and customizing your premium solar landing page! 🎉
