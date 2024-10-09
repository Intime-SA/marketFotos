import { Suspense } from "react";
import { DashboardContent } from "@/src/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
