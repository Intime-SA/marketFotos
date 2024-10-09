// src/components/transactions/TransactionList.tsx
"use client";

import React, { useState } from "react";
import { Camera, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Payment } from "@/src/lib/dataTransactions";
import { formatDate } from "@/src/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

interface TransactionListProps {
  initialPayments: Payment[];
}

export default function TransactionList({
  initialPayments,
}: TransactionListProps) {
  const [payments] = useState<Payment[]>(initialPayments);
  const [visiblePaymentIds, setVisiblePaymentIds] = useState<{
    [key: string]: boolean;
  }>({});

  const togglePaymentIdVisibility = (paymentId: string) => {
    setVisiblePaymentIds((prev) => ({
      ...prev,
      [paymentId]: !prev[paymentId],
    }));
  };

  return (
    <div className="w-full">
      <div
        className="sm:transform-none sm:w-full"
        style={{
          transform: "scale(0.9)",
          transformOrigin: "left top",
          width: "111.11%",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                Payment ID
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{formatDate(payment.date_pay)}</TableCell>
                  <TableCell>{payment.documents.length}</TableCell>
                  <TableCell>{payment.documents[0].ubicacion}</TableCell>
                  <TableCell>
                    ${payment.documents[0].unit_price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {payment.documents[0].comision === "porcentaje"
                      ? `${payment.documents[0].montoComision}%`
                      : `$${payment.documents[0].montoComision}`}
                  </TableCell>
                  <TableCell>${payment.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === "aprobado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePaymentIdVisibility(payment.id)}
                      className="p-1"
                    >
                      {visiblePaymentIds[payment.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    {visiblePaymentIds[payment.id] && (
                      <span className="ml-2">{payment.id_payment}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`user/${payment.id_comprador}`}>
                              <Button variant="ghost" size="sm" className="p-1">
                                <User className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver perfil del comprador</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`user/${payment.id_fotografo}`}>
                              <Button variant="ghost" size="sm" className="p-1">
                                <Camera className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver perfil del fotógrafo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
