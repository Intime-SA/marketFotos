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
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <Navbar onMenuClick={() => console.log("Menu clicked")} />
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-[350px] shadow-md">
          <CardHeader className="bg-green-500 text-white">
            <CardTitle className="text-xl font-semibold">
              Purchase Confirmed
            </CardTitle>
            <CardDescription className="text-green-100">
              Your surf photo is ready!
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">
              Payment ID: {payment.id_payment}
            </p>
            <p className="text-sm text-gray-600">
              Number Order: {payment.numberOrder}
            </p>
            <p className="text-sm text-gray-600">
              Total: {payment.total.toFixed(2)}
            </p>
            <p className="mt-4 text-sm font-medium text-green-600">
              Redirecting in {timeLeft} seconds...
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push("/dashboard/transactions")}
              className="w-full bg-green-500 text-white hover:bg-green-600"
            >
              View My Purchases
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
