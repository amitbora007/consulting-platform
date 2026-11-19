import logging
from datetime import datetime
from typing import List
from fastapi import HTTPException
from app.database import get_db
from app.models.article import Article, ArticleCreate

logger = logging.getLogger(__name__)

async def create_article(article: ArticleCreate) -> Article:
    db = get_db()
    new_article = Article(**article.model_dump())
    doc = new_article.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    if db is not None:
        await db.articles.insert_one(doc)
    return new_article

async def get_articles() -> List[Article]:
    db = get_db()
    if db is None:
        return []
    try:
        articles = await db.articles.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        for article in articles:
            if isinstance(article.get("created_at"), str):
                article["created_at"] = datetime.fromisoformat(article["created_at"])
        return articles
    except Exception as e:
        logger.warning(f"Failed to fetch articles: {e}")
        return []

async def delete_article(article_id: str) -> dict:
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    result = await db.articles.delete_one({"id": article_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted successfully"}

async def update_article(article_id: str, article: ArticleCreate) -> Article:
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    existing = await db.articles.find_one({"id": article_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Article not found")

    update_data = article.model_dump()
    update_data["id"] = article_id
    update_data["created_at"] = existing["created_at"]

    await db.articles.replace_one({"id": article_id}, update_data)

    updated = Article(**update_data)
    if isinstance(updated.created_at, str):
        updated.created_at = datetime.fromisoformat(updated.created_at)
    return updated
