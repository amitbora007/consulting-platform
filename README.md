# Corporate Consulting Platform

A professional full-stack consulting service platform with a premium dark visual style, built with React, FastAPI, and MongoDB.

## Features

### Public Experience
- Executive-style landing page with responsive layout
- Appointment booking flow with date and time slot selection
- Video testimonials with in-page player dialog
- Case studies with PDF download support
- Blog/article previews pulled from backend API

### Admin Dashboard
- Appointment list and management view
- Video testimonial upload, edit metadata, and delete
- Case study PDF upload, edit details, and delete
- Article create, edit, and delete
- Fully responsive admin UI at /admin

## Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Tailwind CSS 3
- Radix UI primitives + shadcn-style components
- Axios
- Sonner for toast notifications
- CRACO for build/start overrides

### Backend
- FastAPI
- Motor (MongoDB async driver)
- Pydantic v2
- python-multipart for uploads
- aiofiles for async file writes

### Database
- MongoDB

### Design System
- Playfair Display (headings)
- Manrope (body)
- JetBrains Mono (technical labels)
- Core palette: Deep Black (#050505), Platinum (#E2E2E2), Bronze (#C0A062)

## Prerequisites

- Node.js 18+ and npm or yarn
- Python 3.10+
- MongoDB 4.4+

## Project Structure

```text
corporate-consulting-platform/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── .gitignore
│   └── uploads/
│       ├── videos/
│       └── pdfs/
├── frontend/
│   ├── package.json
│   ├── craco.config.js
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   └── ui/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.css
│   └── .env
├── design_guidelines.json
├── QUICKSTART.md
└── README.md
```

## Setup

### 1. Enter Project

```bash
cd corporate-consulting-platform
```

### 2. Backend Setup

```bash
cd backend

python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env
# Update .env if needed

mkdir -p uploads/videos uploads/pdfs
```

Default backend environment values in .env.example:
- MONGO_URL=""
- DB_NAME="consulting_db"
- CORS_ORIGINS="http://localhost:3000"

### 3. MongoDB

Start MongoDB before running the backend.

Examples:

```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS (Homebrew)
brew services start mongodb-community
```

### 4. Frontend Setup

```bash
cd ../frontend

# Choose one package manager
npm install
# or
yarn install
```

Create frontend .env if it does not exist:

```bash
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
ENABLE_HEALTH_CHECK=false
EOF
```

## Run the App

### Terminal 1: Backend

```bash
cd backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Terminal 2: Frontend

```bash
cd frontend
npm start
# or
yarn start
```

## Local URLs

- Frontend: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin
- Backend API: http://localhost:8001/api
- FastAPI docs: http://localhost:8001/docs

## Available Frontend Scripts

From frontend:

```bash
npm start
npm run build
npm test
```

## API Endpoints

### Appointments
- POST /api/appointments
- GET /api/appointments

### Testimonials
- POST /api/testimonials/upload
- GET /api/testimonials
- PUT /api/testimonials/{testimonial_id}
- DELETE /api/testimonials/{testimonial_id}
- GET /api/videos/{filename}

### Case Studies
- POST /api/case-studies/upload
- GET /api/case-studies
- PUT /api/case-studies/{case_study_id}
- DELETE /api/case-studies/{case_study_id}
- GET /api/pdfs/{filename}

### Articles
- POST /api/articles
- GET /api/articles
- PUT /api/articles/{article_id}
- DELETE /api/articles/{article_id}

### Root Health Check
- GET /api/

## Troubleshooting

### Git accidentally staged venv files

If venv files are staged by mistake:

```bash
git rm -r --cached backend/venv
```

Ensure backend/.gitignore contains:

```text
venv
__pycache__/
```

### Backend not starting
- Confirm MongoDB is running
- Verify backend/.env values
- Check port 8001 availability

### Frontend not starting
- Remove and reinstall dependencies

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

- Confirm REACT_APP_BACKEND_URL in frontend/.env

## Production Notes

- Build frontend with npm run build in frontend.
- Run FastAPI with multiple workers, for example:

```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
```

- Set production-grade MONGO_URL, DB_NAME, and CORS_ORIGINS.
