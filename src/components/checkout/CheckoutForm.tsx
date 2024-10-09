// components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { PaymentCheckout } from "@/src/lib/definitions";
import { createPayment } from "@/src/app/actions/actions";

interface CheckoutFormProps {
  id_comprador: string;
  id_fotografo: string;
  total: number;
  id_payment: string;
  status: string;
  numberOrder: string;
}

export default function CheckoutForm({
  id_comprador,
  id_fotografo,
  total,
  id_payment,
  status,
  numberOrder,
}: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedPayment, setConfirmedPayment] =
    useState<PaymentCheckout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await createPayment(
        id_comprador,
        id_fotografo,
        total,
        id_payment,
        status,
        numberOrder
      );
      if (result.success && result.payment) {
        setConfirmedPayment(result.payment);
      } else {
        setError(result.error || "An unknown error occurred");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmedPayment) {
    return <CheckoutConfirmation payment={confirmedPayment} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Confirmar Pago</h1>
        <p className="mb-2">Número de Orden: {numberOrder}</p>
        <p className="mb-2">ID de Pago: {id_payment}</p>
        <p className="mb-2">Estado: {status}</p>
        <p className="mb-4">Total a pagar: ${total.toFixed(2)}</p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Procesando..." : "Confirmar Pago"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
