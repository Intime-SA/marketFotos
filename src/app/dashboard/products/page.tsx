import { Suspense } from "react";
import { ProductsContent } from "@/components/dashboard/ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
