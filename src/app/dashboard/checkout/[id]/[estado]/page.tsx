// src/app/dashboard/checkout/[id]/[estado]/page.tsx
import { PrismaClient, EstadoPago } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface CheckoutPageProps {
  params: {
    id: string;
    estado: string;
  };
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { id, estado } = params;

  try {
    const payment = await prisma.pago.create({
      data: {
        fotografo: {
          connect: { id: 1 }, // Replace with actual photographer ID
        },
        comprador: {
          connect: { id: 2 },
        },
        monto: 10, // Replace with actual amount
        estado: "Pagado" as EstadoPago,
        ubicacion_usuario: "Unknown", // Replace with actual location if available
        id_pago: parseInt(id), // Assuming the checkout ID is the same as id_pago
      },
      include: {
        fotografo: true,
        comprador: true,
      },
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Detalle del Pago</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-2">
            <strong>ID del Pago:</strong> {payment.id_pago}
          </p>
          <p className="mb-2">
            <strong>Estado de Pago:</strong> {payment.estado}
          </p>
          <p className="mb-2">
            <strong>Monto:</strong> ${payment.monto.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Fotógrafo:</strong> {payment.fotografo.nombre}
          </p>
          <p className="mb-2">
            <strong>Comprador:</strong> {payment.comprador?.nombre || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Fecha de Pago:</strong>{" "}
            {payment.fecha_pago.toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Ubicación:</strong> {payment.ubicacion_usuario || "N/A"}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-500">
          Hubo un error al procesar el pago. Por favor, inténtelo de nuevo más
          tarde.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
};

export default CheckoutPage;
