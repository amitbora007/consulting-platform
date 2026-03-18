# Consulting Service Landing Page

A professional, full-stack consulting service platform with executive luxury design, built with React, FastAPI, and MongoDB.

## Features

### Public-Facing Features
- **Executive Luxury Landing Page** - Dark, sophisticated design with "The Midnight Executive" theme
- **Custom Appointment Booking** - Date picker with time slot selection
- **Video Testimonials** - Upload and display client testimonial videos
- **Case Studies** - Downloadable PDF case studies with industry categorization
- **Dynamic Blog/Articles** - Latest insights and perspectives section
- **Fully Responsive** - Optimized for mobile, tablet, and desktop

### Admin Dashboard
- **Appointment Management** - View all scheduled appointments
- **Video Testimonials Management** - Upload, edit, delete video testimonials
- **Case Studies Management** - Upload PDFs, edit details, delete studies
- **Articles Management** - Create, edit, delete blog articles
- **Responsive Admin Panel** - Fully functional on all device sizes

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Shadcn/UI Components
- Axios
- Sonner (Toast notifications)

### Backend
- FastAPI (Python)
- Motor (Async MongoDB driver)
- Pydantic (Data validation)
- Python Multipart (File uploads)
- Aiofiles (Async file operations)

### Database
- MongoDB

### Design
- Playfair Display (Headings)
- Manrope (Body text)
- JetBrains Mono (Technical text)
- Color Palette: Deep Black (#050505), Platinum (#E2E2E2), Bronze (#C0A062)

## Prerequisites

- Node.js 16+ and npm/yarn
- Python 3.8+
- MongoDB 4.4+

## Installation

### 1. Clone the Repository

```bash
# Extract the zip file
cd corporate-consulting-platform
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip3 install -r requirements.txt

# Create .env file
cat > .env << 'EOF'
MONGO_URL=mongodb://localhost:27017
DB_NAME=consulting_db
CORS_ORIGINS=http://localhost:3000
EOF

# Create upload directories
mkdir -p uploads/videos uploads/pdfs
```

### 3. MongoDB Setup

```bash
# Start MongoDB (if not running)
# On Mac with Homebrew:
brew services start mongodb-community

# On Ubuntu/Debian:
sudo systemctl start mongod

# On Windows:
# Start MongoDB service from Services or run mongod.exe
```

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
yarn install
# or
npm install

# Create .env file
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
ENABLE_HEALTH_CHECK=false
EOF
```

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate  # If using virtual environment

# Run with uvicorn
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend will be available at: http://localhost:8001

### Start Frontend (Terminal 2)

```bash
cd frontend

# Start development server
yarn start
# or
npm start
```

Frontend will be available at: http://localhost:3000

## Usage

### Public Site
- **Home Page**: http://localhost:3000
  - Browse services, testimonials, case studies, and articles
  - Book appointments via the calendar dialog
  - Download case studies
  - View video testimonials

### Admin Dashboard
- **Admin Panel**: http://localhost:3000/admin
  - **Appointments Tab**: View all scheduled appointments
  - **Videos Tab**: Upload and manage video testimonials
  - **Cases Tab**: Upload and manage case study PDFs
  - **Articles Tab**: Create and manage blog articles

## API Endpoints

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments

### Testimonials
- `POST /api/testimonials/upload` - Upload video testimonial
- `GET /api/testimonials` - Get all testimonials
- `PUT /api/testimonials/{id}` - Update testimonial details
- `DELETE /api/testimonials/{id}` - Delete testimonial
- `GET /api/videos/{filename}` - Serve video file

### Case Studies
- `POST /api/case-studies/upload` - Upload case study PDF
- `GET /api/case-studies` - Get all case studies
- `PUT /api/case-studies/{id}` - Update case study details
- `DELETE /api/case-studies/{id}` - Delete case study
- `GET /api/pdfs/{filename}` - Serve PDF file

### Articles
- `POST /api/articles` - Create new article
- `GET /api/articles` - Get all articles (sorted by newest)
- `PUT /api/articles/{id}` - Update article
- `DELETE /api/articles/{id}` - Delete article

## Project Structure

```
/app
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── uploads/               # File storage
│       ├── videos/            # Video testimonials
│       └── pdfs/              # Case study PDFs
│
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── admin/        # Admin panel components
│   │   │   ├── Hero.js
│   │   │   ├── Services.js
│   │   │   ├── Testimonials.js
│   │   │   ├── CaseStudies.js
│   │   │   ├── BlogPreviews.js
│   │   │   ├── AppointmentBooking.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── Admin.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── design_guidelines.json     # Design system specifications
└── README.md                  # This file
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find and kill process on port 8001
lsof -ti:8001 | xargs kill -9
```

**MongoDB connection error:**
```bash
# Check if MongoDB is running
mongosh

# Verify MONGO_URL in backend/.env
```

### Frontend Issues

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
yarn install
```

**CORS errors:**
- Verify REACT_APP_BACKEND_URL in frontend/.env
- Check CORS_ORIGINS in backend/.env

## Production Deployment

### Environment Variables

**Backend (.env):**
```
MONGO_URL=mongodb://production-mongo-url:27017
DB_NAME=consulting_prod
CORS_ORIGINS=https://yourdomain.com
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

### Build Frontend

```bash
cd frontend
yarn build
# Build files will be in /frontend/build
```

### Run Backend in Production

```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
```

---

**Built with ❤️ using React, FastAPI, and MongoDB**
