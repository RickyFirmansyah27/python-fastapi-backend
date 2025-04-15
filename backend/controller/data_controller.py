import logging
from fastapi import APIRouter, Request, Query
from typing import Optional, List
from service.sales_service import getSalesReps
from helper.baseResponse import BaseResponse

router = APIRouter()
# Configure logging
logger = logging.getLogger("response")


@router.get("/sales_reps", tags=["data"])
async def get_sales_reps(
    request: Request,
    name: Optional[str] = Query(None, description="Filter by sales rep name"),
    role: Optional[str] = Query(None, description="Filter by role"),
    region: Optional[str] = Query(None, description="Filter by region"),
    id: Optional[int] = Query(None, description="Filter by specific ID"),
    page: int = Query(1, description="Page number for pagination"),
    size: int = Query(5, description="Items per page"),
    sort_by: str = Query("id", description="Sort field (id, name, role, region)"),
    sort_order: str = Query("ASC", description="Sort order (ASC, DESC)")
):
    try:
        params = {
            "name": name,
            "role": role,
            "region": region,
            "page": page,
            "size": size,
            "sort_by": sort_by,
            "sort_order": sort_order
        }
        
        params = {k: v for k, v in params.items() if v is not None}
        if id is not None:
            params["id"] = id
            
        total_data, sales_reps = getSalesReps(params)
        
        response_data = {
            "totalData": total_data,
            "totalPage": (total_data + size - 1) // size,
            "currentPage": page,
            "pageSize": size,
            "data": sales_reps
        }
        
        logger.info(f'[DataController] - Fetched sales reps successfully. Count: {total_data}')
        return BaseResponse('success', 'Successfully fetched sales reps', response_data)
    except Exception as e:
        logger.error('[DataController] - Failed to fetch sales reps.', exc_info=True)
        return BaseResponse('error', 'Failed to fetch sales reps', str(e))

@router.get("/sales_reps/by-region/{region}", tags=["data"])
async def get_sales_reps_by_region(
    region: str,
    page: int = Query(1, description="Page number"),
    size: int = Query(5, description="Items per page")
):
    try:
        params = {
            "region": region,
            "page": page,
            "size": size
        }
        
        total_data, sales_reps = getSalesReps(params)
        
        response_data = {
            "totalData": total_data,
            "totalPage": (total_data + size - 1) // size,
            "currentPage": page,
            "pageSize": size,
            "data": sales_reps
        }
        
        logger.info(f'[DataController] - Fetched sales reps by region: {region}')
        return BaseResponse('success', f'Successfully fetched sales reps for region: {region}', response_data)
    except Exception as e:
        logger.error(f'[DataController] - Failed to fetch sales reps by region: {region}', exc_info=True)
        return BaseResponse('error', f'Failed to fetch sales reps for region: {region}', str(e))

@router.get("/sales_reps/by-role/{role}", tags=["data"])
async def get_sales_reps_by_role(
    role: str,
    page: int = Query(1, description="Page number"),
    size: int = Query(5, description="Items per page")
):
    try:
        params = {
            "role": role,
            "page": page,
            "size": size
        }
        
        total_data, sales_reps = getSalesReps(params)
        
        response_data = {
            "totalData": total_data,
            "totalPage": (total_data + size - 1) // size,
            "currentPage": page,
            "pageSize": size,
            "data": sales_reps
        }
        
        logger.info(f'[DataController] - Fetched sales reps by role: {role}')
        return BaseResponse('success', f'Successfully fetched sales reps with role: {role}', response_data)
    except Exception as e:
        logger.error(f'[DataController] - Failed to fetch sales reps by role: {role}', exc_info=True)
        return BaseResponse('error', f'Failed to fetch sales reps with role: {role}', str(e))

@router.get("/sales_reps/{id}", tags=["data"])
async def get_sales_rep_by_id(id: int):
    try:
        params = {"id": id}
        _,sales_reps = getSalesReps(params)
        
        if not sales_reps:
            return BaseResponse('error', f'Sales rep with ID {id} not found', None, 404)
            
        logger.info(f'[DataController] - Fetched sales rep by ID: {id}')
        return BaseResponse('success', f'Successfully fetched sales rep with ID: {id}', sales_reps[0])
    except Exception as e:
        logger.error(f'[DataController] - Failed to fetch sales rep by ID: {id}', exc_info=True)
        return BaseResponse('error', f'Failed to fetch sales rep with ID: {id}', str(e))
