# Render Deployment Guide: Corporate Consulting Platform

This comprehensive guide outlines how to deploy the **Corporate Consulting Platform** (FastAPI Backend + React/Vite Frontend + MongoDB Atlas) to **Render.com**, with a specific focus on handling **persistent file uploads (testimonial videos and case study PDFs)**.

---

## 1. System Architecture on Render

```
                                      ┌─────────────────────────────────────┐
                                      │       Render Static Site            │
                                      │  (corporate-consulting-frontend)    │
                                      │  - React 19 + Vite 6 + Framer Motion│
                                      │  - Global CDN, SSL, SPA Rewrites    │
                                      └──────────────────┬──────────────────┘
                                                         │ HTTPS API Calls
                                                         ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────────┐
│       MongoDB Atlas M0          │   │        Render Web Service           │
│   (Managed Cloud Database)      │◄──┤   (corporate-consulting-backend)    │
│   - Appointments & Content Data │   │   - FastAPI + Python 3.11+          │
└─────────────────────────────────┘   │   - Healthcheck: /healthz           │
                                      └──────────────────┬──────────────────┘
                                                         │ Mount /var/data
                                                         ▼
                                      ┌─────────────────────────────────────┐
                                      │       Render Persistent Disk        │
                                      │   (uploads-data: 10GB - 50GB SSD)   │
                                      │   - /var/data/uploads/videos/       │
                                      │   - /var/data/uploads/pdfs/         │
                                      └─────────────────────────────────────┘
```

---

## 2. Managing File Uploads on Render

### The Ephemeral Storage Challenge
By default, Docker containers on Render are **ephemeral**. When a Web Service is redeployed or restarted, any files saved in standard container directories (e.g. `backend/uploads/`) are destroyed.

### The Solution: Render Persistent Disk
The backend in [`backend/server.py`](file:///home/amit.bora/Downloads/ai/corporate-consulting-platform/backend/server.py) has been upgraded with:
1. **Dynamic `UPLOAD_DIR` Environment Variable**:
   ```python
   UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR", ROOT_DIR / "uploads"))
   VIDEO_DIR = UPLOAD_DIR / "videos"
   PDF_DIR = UPLOAD_DIR / "pdfs"
   ```
   When deploying on Render, you attach a persistent SSD disk (e.g., at `/var/data`) and configure `UPLOAD_DIR=/var/data/uploads`. All uploaded videos and PDFs are stored directly on the persistent disk, surviving all redeploys, reboots, and code updates.
2. **Memory-Safe Chunked Streaming**:
   Upload handlers for both videos and PDFs stream incoming binary data in 1MB chunks instead of loading entire multi-megabyte files into RAM. This eliminates memory exhaustion (OOM crashes) on 512MB RAM instances.
3. **Automatic Seed Migration**:
   If an empty disk is attached on first boot, the backend automatically copies bundled sample files into the persistent disk.

> [!IMPORTANT]
> **Free Tier vs Paid Tier Consideration**:
> - **With Persistent Disk ($7/mo Starter + $0.25/GB disk)**: 100% persistent local SSD storage. Uploaded files never disappear.
> - **Free Tier ($0/mo)**: Render's Free tier does not support persistent disks. Files will save to the container during normal operation, but will reset when the free container spins down after 15 minutes of inactivity. For zero-cost long-term production storage, you can either upgrade to a Starter service with Disk, or connect AWS S3 / Cloudflare R2 / Cloudinary.

---

## 3. Deployment Method 1: 1-Click Blueprint (`render.yaml`) [Recommended]

The repository includes a ready-to-use [`render.yaml`](file:///home/amit.bora/Downloads/ai/corporate-consulting-platform/render.yaml) blueprint specification that automatically provisions both the Backend Web Service (with persistent disk) and the Frontend Static Site.

### Steps:
1. **Push your code to GitHub or GitLab**.
2. Log in to [dashboard.render.com](https://dashboard.render.com/).
3. In the top navigation bar, click **New +** and select **Blueprint**.
4. Connect your Git repository.
5. Render will automatically detect [`render.yaml`](file:///home/amit.bora/Downloads/ai/corporate-consulting-platform/render.yaml).
6. Fill in the required secret environment variable:
   - `MONGO_URL`: Your MongoDB Atlas connection string (see Section 5 below).
7. Click **Apply**.
8. Render will provision:
   - `corporate-consulting-backend` (with 10GB persistent disk mounted at `/var/data`)
   - `corporate-consulting-frontend` (with automatic SPA rewrite rules and backend URL linked)

---

## 4. Deployment Method 2: Manual Setup via Render Dashboard

If you prefer to configure services manually:

### Step 4.1: Deploy Backend Web Service
1. In Render Dashboard, click **New +** -> **Web Service**.
2. Connect your Git repository.
3. Configure the service settings:
   - **Name**: `corporate-consulting-backend`
   - **Region**: Choose closest to your users (e.g., `Oregon (US West)` or `Frankfurt (EU)`)
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Starter` ($7/mo, required for disk) or `Free`
   - **Health Check Path**: `/healthz`
4. **Attach Persistent Disk** (Disks tab):
   - Click **Add Disk**.
   - **Name**: `uploads-data`
   - **Mount Path**: `/var/data`
   - **Size**: `10 GB` (or desired size)
5. **Environment Variables** (Environment tab):
   | Variable | Value | Description |
   |---|---|---|
   | `PYTHON_VERSION` | `3.11.9` | Stable Python runtime |
   | `MONGO_URL` | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority` | MongoDB Atlas URI |
   | `DB_NAME` | `consulting_db` | MongoDB Database Name |
   | `CORS_ORIGINS` | `*` (or your frontend URL) | Permitted origins |
   | `UPLOAD_DIR` | `/var/data/uploads` | Path to persistent disk storage |
6. Click **Create Web Service** and wait for deployment. Note the backend URL (e.g., `https://corporate-consulting-backend.onrender.com`).

---

### Step 4.2: Deploy Frontend Static Site
1. In Render Dashboard, click **New +** -> **Static Site**.
2. Connect the same Git repository.
3. Configure the site settings:
   - **Name**: `corporate-consulting-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   | Variable | Value | Description |
   |---|---|---|
   | `NODE_VERSION` | `20.18.0` | Node runtime |
   | `REACT_APP_BACKEND_URL` | `https://corporate-consulting-backend.onrender.com` | Your live backend URL |
5. **SPA Routing Rewrite Rule** (Redirects/Rewrites tab):
   - Render needs to route client-side URLs (like `/admin`) to `index.html`.
   - Click **Add Rule**:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## 5. Setting Up Free MongoDB Atlas

Since Render does not offer managed MongoDB, use MongoDB Atlas (which includes a permanent free tier):

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and register or sign in.
2. Click **Create Deployment** and select the **M0 Free Sandbox** cluster.
3. **Database Access**:
   - Create a database user (e.g., `admin_consulting`) with password.
   - Note the username and password.
4. **Network Access**:
   - Click **Network Access** -> **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) since Render uses dynamic egress IPs.
5. **Connection String**:
   - Go to **Database** -> Click **Connect** on your cluster.
   - Choose **Drivers** -> Python -> copy the connection string.
   - Format: `mongodb+srv://admin_consulting:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your user password.
   - Paste this as the `MONGO_URL` variable in Render.

---

## 6. Post-Deployment Verification Checklist

Once deployed, verify platform functionality end-to-end:

- [ ] **Backend Health Check**:
  Visit `https://<backend-url>/healthz`. You should see `{"status":"healthy","service":"corporate-consulting-platform-backend"}`.
- [ ] **Frontend Loading**:
  Visit `https://<frontend-url>/`. Confirm the 3D Constellation canvas, Hero typography, and Floating Navigation Dock render smoothly.
- [ ] **Navigation Dock Contrast**:
  Check that the active pill is vibrant gold and the text is bold and high-contrast on both desktop and mobile.
- [ ] **Appointment Booking**:
  Click "Book Consultation", select a date/time, submit an intake form, and verify confirmation.
- [ ] **Admin Command Center (`/admin`)**:
  - Verify live counters reflect existing records immediately.
  - Upload a new testimonial video. Verify the video player plays the file from `/api/videos/...`.
  - Upload a new case study PDF. Verify clicking "Download Dossier" streams the PDF from `/api/pdfs/...`.
  - Delete a test entry and verify the metric counters decrement immediately.
- [ ] **Persistence Test**:
  In Render Dashboard, restart the Backend Web Service (`Manual Deploy` -> `Clear build cache & deploy` or `Restart service`). Reload `/admin` and confirm uploaded videos and PDFs are still intact!
