from fastapi import APIRouter

from .general import router as general_router
from .describing import router as describing_router
from .normalized import router as normalization_router
from .pearson import router as pearson_router
from .correlations import router as correlations_router
from .regression import router as regression_router
from .prediction import router as prediction_router

api_router = APIRouter(prefix="/api")

api_router.include_router(general_router)
api_router.include_router(describing_router)
api_router.include_router(normalization_router)
api_router.include_router(pearson_router)
api_router.include_router(correlations_router)
api_router.include_router(regression_router)
api_router.include_router(prediction_router)