import { Suspense } from "react";
import { DashboardContent } from "@/src/components/dashboard/DashboardContent";
import ProtectedRoute from "@/src/components/ProtectedRoutes";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </ProtectedRoute>
  );
}
