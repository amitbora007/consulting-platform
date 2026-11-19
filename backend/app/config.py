import os
import shutil
import mimetypes
from pathlib import Path
from dotenv import load_dotenv

# Base backend directory
ROOT_DIR = Path(__file__).resolve().parent.parent

# Load environment configuration (.env)
load_dotenv(ROOT_DIR / ".env")

# Initialize MIME types for video files
mimetypes.init()
mimetypes.add_type("video/quicktime", ".mov")
mimetypes.add_type("video/mp4", ".mp4")
mimetypes.add_type("video/x-msvideo", ".avi")

# Upload directories: supports persistent volume mount via UPLOAD_DIR env var
UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR", ROOT_DIR / "uploads"))
VIDEO_DIR = UPLOAD_DIR / "videos"
PDF_DIR = UPLOAD_DIR / "pdfs"

for directory in [VIDEO_DIR, PDF_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Auto-seed bundled media into persistent volume if newly mounted
bundled_uploads = ROOT_DIR / "uploads"
if UPLOAD_DIR.resolve() != bundled_uploads.resolve() and bundled_uploads.exists():
    for sub in ["videos", "pdfs"]:
        src_sub = bundled_uploads / sub
        dest_sub = UPLOAD_DIR / sub
        if src_sub.exists():
            for item in src_sub.glob("*"):
                if item.is_file() and item.name != ".gitkeep":
                    target = dest_sub / item.name
                    if not target.exists():
                        try:
                            shutil.copy2(item, target)
                        except Exception:
                            pass

# Database Settings
RAW_MONGO_URL = os.environ.get("MONGO_URL", "").strip()
MONGO_URL = RAW_MONGO_URL if RAW_MONGO_URL else "mongodb://localhost:27017"
DB_NAME = os.environ.get("DB_NAME", "").strip() or "consulting_db"

# CORS Settings
cors_origins_env = os.environ.get("CORS_ORIGINS", "*").strip()
if cors_origins_env == "*" or not cors_origins_env:
    CORS_ORIGINS = ["*"]
else:
    CORS_ORIGINS = [o.strip() for o in cors_origins_env.split(",") if o.strip()]
CORS_ALLOW_ORIGIN_REGEX = r"^https?://.*$"
