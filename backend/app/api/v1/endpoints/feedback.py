from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.db.session import get_db
from app.models.feedback import Feedback
from app.schemas.feedback import FeedbackIn, FeedbackOut

router = APIRouter()

@router.post("/", response_model=FeedbackOut)
async def submit_feedback(feedback_in: FeedbackIn, db: AsyncSession = Depends(get_db)):
    fb = Feedback(
        job_id=feedback_in.job_id,
        is_helpful=feedback_in.is_helpful,
        feedback_category=feedback_in.feedback_category,
        comments=feedback_in.comments
    )
    db.add(fb)
    await db.commit()
    await db.refresh(fb)
    return fb

@router.get("/", response_model=List[FeedbackOut])
async def list_feedback(db: AsyncSession = Depends(get_db)):
    stmt = select(Feedback).order_by(desc(Feedback.created_at)).limit(50)
    result = await db.execute(stmt)
    return result.scalars().all()
