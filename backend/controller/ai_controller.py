import logging
from fastapi import APIRouter, Request, Query
from typing import Optional
from config.ai_config import call_ai
from helper.baseResponse import BaseResponse

router = APIRouter()
logger = logging.getLogger("response")

@router.get("/ai", tags=["data"])
async def get_ai_conservation(
    request: Request,
    prompt: Optional[str] = Query(None, description="Prompt to generate ai content"),
):
    try:
       
        result = call_ai(prompt);

        logger.info(f'[AiController] - Successfully fetched ai content.')
        return BaseResponse('success', 'Successfully fetched ai content', result)

    except Exception as e:
        logger.error('[AiController] - Failed to fetched ai content.', exc_info=True)
        return BaseResponse('error', 'Failed to fetched ai content', str(e))

