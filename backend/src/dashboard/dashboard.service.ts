import { prisma } from '../lib/prisma';

export const getDashboardStats = async (tenantId: string) =>{
    const totalCustomers = await prisma.customer.count({where:{tenantId}});
    const totalBookings = await prisma.booking.count({where:{tenantId}});
    const totalInvoices = await prisma.invoice.count({where:{tenantId}});

    return{
        totalCustomers, totalBookings,totalInvoices
   };
};
