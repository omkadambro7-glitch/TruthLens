from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class FeedbackIn(BaseModel):
    job_id: str
    is_helpful: bool
    feedback_category: Optional[str] = None
    comments: Optional[str] = None

class FeedbackOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    job_id: str
    is_helpful: bool
    feedback_category: Optional[str]
    comments: Optional[str]
    created_at: datetime
