from typing import List
from fastapi import APIRouter
from app.models.article import Article, ArticleCreate
from app.controllers import article_controller

router = APIRouter(prefix="/articles", tags=["Articles"])

@router.post("", response_model=Article)
async def create_article(article: ArticleCreate):
    return await article_controller.create_article(article)

@router.get("", response_model=List[Article])
async def get_articles():
    return await article_controller.get_articles()

@router.delete("/{article_id}")
async def delete_article(article_id: str):
    return await article_controller.delete_article(article_id)

@router.put("/{article_id}", response_model=Article)
async def update_article(article_id: str, article: ArticleCreate):
    return await article_controller.update_article(article_id, article)
