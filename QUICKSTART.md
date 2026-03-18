# Quick Start Guide

## 1. Extract Files
```bash
unzip corporate-consulting-platform.zip
cd corporate-consulting-platform
```

## 2. Install MongoDB

### Mac
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Ubuntu/Debian
```bash
sudo apt install mongodb
sudo systemctl start mongod
```

### Windows
Download from: https://www.mongodb.com/try/download/community

## 3. Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (if not exists)
echo "MONGO_URL=mongodb://localhost:27017" > .env
echo "DB_NAME=consulting_db" >> .env
echo "CORS_ORIGINS=http://localhost:3000" >> .env

# Create upload directories
mkdir -p uploads/videos uploads/pdfs

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

## 4. Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
yarn install
# OR
npm install

# Create .env file (if not exists)
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env
echo "WDS_SOCKET_PORT=3000" >> .env

# Start frontend
yarn start
# OR
npm start
```

## 5. Access Application

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs

## Test the Application

1. **Book an Appointment**
   - Go to home page
   - Click "Book Consultation"
   - Select date and time
   - Fill form and submit

2. **Upload Content (Admin)**
   - Go to http://localhost:3000/admin
   - Navigate to Videos/Cases/Articles tabs
   - Upload and manage content

3. **View Content (Public)**
   - Return to home page
   - Scroll through sections
   - Click on testimonials to watch videos
   - Download case studies

## Common Issues

### Backend won't start
- Check MongoDB is running: `mongosh` or `mongo`
- Port 8001 in use: `lsof -ti:8001 | xargs kill -9`

### Frontend won't start
- Delete node_modules: `rm -rf node_modules && yarn install`
- Port 3000 in use: Kill the process or change port

### Database errors
- Verify MongoDB connection: `mongosh`
- Check MONGO_URL in backend/.env

## Project Features

✅ Appointment booking with calendar
✅ Video testimonials upload & playback
✅ PDF case studies with download
✅ Dynamic blog articles system
✅ Full admin CRUD operations
✅ Mobile responsive design
✅ Executive luxury dark theme

## Tech Stack
- React + Tailwind CSS
- FastAPI + MongoDB
- Shadcn/UI Components

## Need Help?
Check the full README.md for detailed documentation.
