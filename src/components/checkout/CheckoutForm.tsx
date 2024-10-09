// components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { PaymentCheckout } from "@/src/lib/definitions";
import { createPayment } from "@/src/app/actions/actions";
import Navbar from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-blue-200">
      {/* Aquí agregamos el Navbar */}
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        >
          <div className="mb-4 flex flex-col items-center">
      <FontAwesomeIcon 
        icon={faCheckCircle} 
        className="h-12 w-12 text-green-500" // Tamaño del ícono
      />
      <h1 className="text-3xl font-bold font-sans mt-2">Confirmar Pago</h1>
    </div>
          <p className="mb-2 font-sans">Número de Orden: {numberOrder}</p>
          <p className="mb-2 font-sans">ID de Pago: {id_payment}</p>
          <p className="mb-2 font-sans">Estado: {status}</p>
          <p className="mb-4 font-sans">Total a pagar: ${total.toFixed(2)}</p>
          <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring focus:ring-blue-300 flex justify-center items-center text-sm"
          disabled={isLoading}
          >
            {isLoading ? (
              <>
                {/* Spinner usando Tailwind */}
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  ></path>
                </svg>
                Procesando...
              </>
            ) : (
              "Confirmar Pago"
            )}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}
