// app/actions.ts
"use server";

import { createPayment as createPaymentInDB } from "@/src/data/dataTransactions";
import { PaymentCheckout } from "@/src/domain/entitys/definitions";
import { getPayments } from "@/src/data/dataTransactions";
import { Payment } from "@/src/data/dataTransactions";

export async function fetchTransactions(): Promise<{ payments: Payment[] }> {
  try {
    const payments = await getPayments();
    return { payments };
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments. Please try again.");
  }
}

export async function createPayment(
  id_comprador: string,
  id_fotografo: string,
  total: number,
  id_payment: string,
  status: string,
  numberOrder: string
): Promise<{ success: boolean; payment?: PaymentCheckout; error?: string }> {
  try {
    const newPayment = await createPaymentInDB({
      id_comprador,
      id_fotografo,
      total,
      id_payment,
      status,
      numberOrder,
    });
    return { success: true, payment: newPayment };
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, error: "Failed to process payment" };
  }
}
