// lib/getTransactionReports.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TransactionReport {
  last24Hours: number;
  last30Days: number;
  last365Days: number;
}

export async function getTransactionReports(): Promise<TransactionReport> {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  try {
    const [last24Hours, last30Days, last365Days] = await Promise.all([
      prisma.pago.aggregate({
        _sum: {
          monto: true,
        },
        where: {
          fecha_pago: {
            gte: yesterday,
          },
        },
      }),
      prisma.pago.aggregate({
        _sum: {
          monto: true,
        },
        where: {
          fecha_pago: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      prisma.pago.aggregate({
        _sum: {
          monto: true,
        },
        where: {
          fecha_pago: {
            gte: yearAgo,
          },
        },
      }),
    ]);

    return {
      last24Hours: last24Hours._sum.monto?.toNumber() || 0,
      last30Days: last30Days._sum.monto?.toNumber() || 0,
      last365Days: last365Days._sum.monto?.toNumber() || 0,
    };
  } catch (error) {
    console.error("Error fetching transaction reports:", error);
    return {
      last24Hours: 0,
      last30Days: 0,
      last365Days: 0,
    };
  } finally {
    await prisma.$disconnect();
  }
}
