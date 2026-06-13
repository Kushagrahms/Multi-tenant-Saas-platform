import { Request, Response} from 'express';
import * as dashboardService from './dashboard.service';

export const getStats = async (req:Request, res:Response)=>{
    try{
    const tenantId = (req as any).user.tenantId;
    const stats  = await dashboardService.getDashboardStats(tenantId);

    res.json(stats);
}catch(error){
    return res.status(500).json({error:"Failed to fetch dashboard stats",});
  }
};
