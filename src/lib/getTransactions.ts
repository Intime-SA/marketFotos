// lib/getTransactions.ts
import { Transaction } from "@/components/transactions/transactionList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const pagos = await prisma.pago.findMany({
      orderBy: {
        fecha_pago: "desc",
      },
      select: {
        id: true,
        id_fotografo: true,
        id_comprador: true,
        monto: true,
        fecha_pago: true,
        estado: true,
        ubicacion_usuario: true,
      },
    });

    const transactions: Transaction[] = await Promise.all(
      pagos.map(async (pago) => {
        const fotografo = await prisma.usuario.findUnique({
          where: { id: pago.id_fotografo },
          select: { nombre: true },
        });

        const comprador = pago.id_comprador
          ? await prisma.usuario.findUnique({
              where: { id: pago.id_comprador },
              select: { nombre: true },
            })
          : null;

        // Verifica que ubicacion_usuario sea un número
        const ubicacion = pago.ubicacion_usuario
          ? await prisma.ubicacion.findUnique({
              where: { id: Number(pago.ubicacion_usuario) }, // Asegúrate de convertir a number
              select: { nombre: true },
            })
          : null;

        return {
          id: pago.id,
          id_fotografo: pago.id_fotografo,
          fotografo: fotografo?.nombre || "N/A",
          id_comprador: pago.id_comprador || null, // Esto puede seguir siendo null
          comprador: comprador?.nombre || "N/A",
          monto: pago.monto.toNumber(),
          fecha: pago.fecha_pago,
          estado: pago.estado,
          ubicacion_usuario:
            pago.ubicacion_usuario?.toString() || "Desconocido", // Esto es opcional
          ubicacion: ubicacion?.nombre || null, // Esto puede seguir siendo null
        };
      })
    );

    console.log(transactions);
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
