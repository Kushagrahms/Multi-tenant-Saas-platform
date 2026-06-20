import { prisma } from '../lib/prisma';

const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
);
const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth()+1,
    0,23,59,59
);

export const getDashboardStats = async (tenantId: string) =>{
    const totalCustomers = await prisma.customer.count({where:{tenantId}});
    const totalBookings = await prisma.booking.count({
        where:{
            tenantId,
            status:{
                in:["pending","confirmed","in_progress"]
            }}});
    const latestCustomers = await prisma.customer.findMany({
        where:{tenantId},
        take:5,
        orderBy:{createdAt:"desc",},
    });
    const latestBookings = await prisma.booking.findMany({
        where:{tenantId},
        take:5,
        orderBy:{createdAt:"desc",},
        include:{customer:true,service:true,},
    });
    const revenueResult = await prisma.invoice.aggregate({
        where:{
            tenantId,
            createdAt:{
                gte:startOfMonth,
                lte:endOfMonth,
            },
        },
        _sum:{
            amount:true,
        },
    });
    const revenue = revenueResult._sum.amount || 0;
    const salaryResult = await prisma.user.aggregate({
        where:{
            tenantId,        
        },
        _sum:{
            salary:true,
        },
    });
    const salaryCost = salaryResult._sum.salary || 0;
    const expenses = await prisma.expense.findMany({
        where:{
            tenantId,
            createdAt:{
                gte:startOfMonth,
                lte:endOfMonth,
            },
        },
    });
    const expenseBreakDown = expenses.reduce(
        (acc:any, expense)=>{
            acc[expense.category]=(acc[expense.category] || 0) + expense.amount;
            return acc;
        },{}
    );

    const otherExpenses = expenses.reduce(
        (sum,expense)=>sum+expense.amount,0
    );
    const totalExpenses = salaryCost + otherExpenses;
    const netProfit = revenue-totalExpenses;

    return{
        totalCustomers, totalBookings, latestCustomers,latestBookings, revenue, salaryCost,expenseBreakDown, otherExpenses,totalExpenses,netProfit
   };
};
