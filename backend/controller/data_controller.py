import logging
from fastapi import APIRouter
from helper.baseResponse import BaseResponse
import json

router = APIRouter()

# Configure logging
logger = logging.getLogger("response")

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@router.get("/sales_reps", tags=["data"])
def get_users():
    try:
        logger.info(f'[UserController] - Fetched all user successfully. {DUMMY_DATA}')
        return BaseResponse('success', 'Successfully fetched sample users', DUMMY_DATA)
    except Exception as e:
        logger.error('[UserController] - Failed to fetch sample users.', exc_info=True)
        return BaseResponse('error', 'Failed to fetch sample users', str(e))
