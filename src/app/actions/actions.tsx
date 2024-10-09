"use server";

import { getPayments } from "@/src/lib/dataTransactions";
import { Payment } from "@/src/lib/definitions";

export async function fetchTransactions(): Promise<{ payments: Payment[] }> {
  try {
    const payments = await getPayments();
    return { payments };
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments. Please try again.");
  }
}
