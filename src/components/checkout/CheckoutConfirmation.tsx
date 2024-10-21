"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Navbar from "../navbar/navbar";
import { PaymentCheckout } from "@/src/domain/entitys/definitions";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"], // Configura los pesos que necesites
});

export default function CheckoutConfirmation({
  payment,
}: {
  payment: PaymentCheckout;
}) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          router.push("/dashboard/transactions");
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fondo con GIF */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gowave-e46ce.appspot.com/o/oceanAnimation.gif?alt=media&token=2e9903e1-9d66-4363-bf9b-51372c877bd3")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Navbar onMenuClick={() => console.log("Menu clicked")} />
      <div className="flex-grow flex items-center justify-center z-10">
        <Card className="w-[350px] shadow-md border-none">
          <CardHeader className="bg-green-500 text-white">
            <CardTitle className="text-4xl font-harmoni">
              Purchase Confirmed
            </CardTitle>
            <CardDescription
              className={`text-x1 text-green-100 ${inter.className}`}
            >
              Your surf photo is ready!
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 space-y-2">
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Payment ID: {payment.id_payment}
            </p>
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Number Order: {payment.numberOrder}
            </p>
            <p className={`text-sm text-gray-600 ${inter.className}`}>
              Total: {payment.total.toFixed(2)}
            </p>
            <p
              className={`mt-4 text-sm font-medium text-green-600 ${inter.className}`}
            >
              Redirecting in {timeLeft} seconds...
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push("/dashboard/transactions")}
              className={`w-full bg-green-500 text-white hover:bg-green-600 ${inter.className}`}
            >
              View My Purchases
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
