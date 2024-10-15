"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import Navbar from "../navbar/navbar";
import { PaymentCheckout } from "@/src/lib/definitions";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { createPayment } from "@/src/app/actions/actions";
import { Inter } from "next/font/google";

interface CheckoutFormProps {
  id_comprador: string;
  id_fotografo: string;
  total: number;
  id_payment: string;
  status: string;
  numberOrder: string;
}
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // Configura los pesos que necesites
});

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
    <div className="min-h-screen flex flex-col relative">
      {/* Fondo con GIF */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gowave-e46ce.appspot.com/o/oceanAnimation.gif?alt=media&token=2e9903e1-9d66-4363-bf9b-51372c877bd3")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Navbar onMenuClick={() => console.log("Menu clicked")} />
      <div className="flex-grow flex items-center justify-center z-10">
        <Card className="w-[350px] shadow-md border-none">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="text-4xl font-harmoni">
              Surf Photo Checkout
            </CardTitle>
            <CardDescription className={`text-x1 text-blue-100 ${inter.className}`}>
              Complete your purchase
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 space-y-3">
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Order Number: {numberOrder}
            </p>
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Photographer ID: {id_fotografo}
            </p>
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Payment ID: {id_payment}
            </p>
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Status: {status}
            </p>
            <p className={`text-2x1 text-gray-8 mt-200 ${inter.className}`}>
              Total: ${total.toFixed(2)}
            </p>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className={`w-1/2 mr-2 ${inter.className} `}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-1/2 bg-blue-500 text-white hover:bg-blue-600 ${inter.className}`}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
