from fastapi import APIRouter

from .general import router as general_router
from .describing import router as describing_router

api_router = APIRouter(prefix="/api")

api_router.include_router(general_router)
api_router.include_router(describing_router)