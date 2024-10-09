"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaymentCheckout } from "@/src/lib/definitions";
import Navbar from "../navbar/navbar";

export default function CheckoutConfirmation({
  payment,
}: {
  payment: PaymentCheckout;
}) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/transactions");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-blue-200">
      {/* Agregar el Navbar aquí */}
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto mt-10 text-center">
          <h1 className="text-3xl font-bold font-sans mb-4">¡Pago Confirmado!</h1>
          <p className="mb-2 font-sans">Número de Orden: {payment.numberOrder}</p>
          <p className="mb-2 font-sans">ID de Pago: {payment.id_payment}</p>
          <p className="mb-2 font-sans">Total: ${payment.total.toFixed(2)}</p>
          <p className="mb-4 font-sans">Estado: {payment.status}</p>
          <p className="text-sm text-gray-600">
            Serás redirigido a la página de transacciones en 5 segundos...
          </p>
        </div>
      </div>
    </div>
  );
}
