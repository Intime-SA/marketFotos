// src/app/checkout/confirmation/[id_comprador]/[total]/[id_payment]/[status]/[numberOrder]/page.tsx
import { Suspense } from "react";
import CheckoutConfirmation from "@/src/components/checkout/CheckoutConfirmation";

export default function CheckoutConfirmationPage({
  params,
}: {
  params: {
    id_comprador: string;
    total: string;
    id_payment: string;
    status: string;
    numberOrder: string;
  };
}) {
  const { id_comprador, total, id_payment, status, numberOrder } = params;

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CheckoutConfirmation
        id_payment={id_payment}
        total={parseFloat(total)}
        id_photographer={id_comprador} // Asumiendo que id_comprador es equivalente a id_fotografo
        orderNumber={numberOrder}
         // Añadimos el status si es necesario en el componente
      />
    </Suspense>
  );
}