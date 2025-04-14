from fastapi import APIRouter
from controller.data_controller import router as data_router
# from controller.ai_controller import router as ai_router

router = APIRouter()

base_urls = "/api"

router.include_router(data_router, prefix=base_urls)
# router.include_router(ai_router, prefix=base_urls)
