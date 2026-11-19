import mimetypes
from fastapi import HTTPException
from fastapi.responses import FileResponse
from app.config import VIDEO_DIR, PDF_DIR

async def serve_video(filename: str) -> FileResponse:
    file_path = VIDEO_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Video not found")

    mime_type, _ = mimetypes.guess_type(str(file_path))
    if not mime_type:
        mime_type = "video/mp4"

    return FileResponse(
        path=str(file_path),
        media_type=mime_type,
        headers={
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=3600"
        }
    )

async def serve_pdf(filename: str) -> FileResponse:
    file_path = PDF_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="PDF not found")

    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "Cache-Control": "public, max-age=3600"
        }
    )
