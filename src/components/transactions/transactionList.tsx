"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "../ui/badge";

// components/transactions/transactionList.ts
export interface Transaction {
  id: number;
  id_fotografo: number;
  fotografo: string;
  id_comprador: number | null;
  comprador: string;
  monto: number;
  fecha: Date;
  estado: string;
  ubicacion_usuario: string;
  ubicacion: string;
  // Permitir que sea nulo
}

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const getBadgeClassName = (estado: string): string => {
    switch (estado) {
      case "Pagado":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "Pendiente":
        return "bg-yellow-500 hover:bg-yellow-600 text-black"; // Clase para estado "Pendiente"
      case "Fallido":
        return "bg-red-500 hover:bg-red-600 text-white"; // Clase para estado "Cancelado"
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white"; // Clase por defecto para otros estados
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>ID Fotógrafo</TableHead>
            <TableHead>ID Comprador</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Ubicación Usuario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>
                <div>
                  <Link
                    style={{ color: "blue", display: "flex" }}
                    href={`http://localhost:3000/users/${transaction.id_fotografo}`}
                  >
                    {transaction.fotografo}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <Link
                    style={{ color: "blue", display: "flex" }}
                    href={`http://localhost:3000/users/${transaction.id_comprador}`}
                  >
                    {transaction.comprador ?? "N/A"}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </TableCell>
              <TableCell>${transaction.monto.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(transaction.fecha).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <TableCell>
                  <Badge className={getBadgeClassName(transaction.estado)}>
                    {transaction.estado}
                  </Badge>
                </TableCell>
              </TableCell>

              <TableCell>{transaction.ubicacion ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
