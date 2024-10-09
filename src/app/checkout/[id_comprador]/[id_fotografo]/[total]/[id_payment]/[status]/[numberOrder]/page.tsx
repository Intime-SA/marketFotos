// app/checkout/[id_comprador]/[id_fotografo]/[total]/[id_payment]/[status]/[numberOrder]/page.tsx
import { Suspense } from "react";
import CheckoutForm from "@/src/components/checkout/CheckoutForm";

export default function CheckoutPage({
  params,
}: {
  params: {
    id_comprador: string;
    id_fotografo: string;
    total: string;
    id_payment: string;
    status: string;
    numberOrder: string;
  };
}) {
  const { id_comprador, id_fotografo, total, id_payment, status, numberOrder } =
    params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutForm
        id_comprador={id_comprador}
        id_fotografo={id_fotografo}
        total={parseFloat(total)}
        id_payment={id_payment}
        status={status}
        numberOrder={numberOrder}
      />
    </Suspense>
  );
}
