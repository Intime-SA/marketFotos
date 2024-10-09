// components/CheckoutConfirmation.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaymentCheckout } from "@/src/lib/definitions";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">¡Pago Confirmado!</h1>
        <p className="mb-2">Número de Orden: {payment.numberOrder}</p>
        <p className="mb-2">ID de Pago: {payment.id_payment}</p>
        <p className="mb-2">Total: ${payment.total.toFixed(2)}</p>
        <p className="mb-4">Estado: {payment.status}</p>
        <p className="text-sm text-gray-600">
          Serás redirigido a la página de transacciones en 5 segundos...
        </p>
      </div>
    </div>
  );
}
