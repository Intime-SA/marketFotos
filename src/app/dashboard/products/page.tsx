import { Suspense } from "react";
import { ProductsContent } from "@/src/components/products/ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
