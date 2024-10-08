// components/TransactionReportCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface TransactionReportCardsProps {
  last24Hours: number;
  last30Days: number;
  last365Days: number;
}

export function TransactionReportCards({
  last24Hours,
  last30Days,
  last365Days,
}: TransactionReportCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last 24 Hours</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${last24Hours.toFixed(2)} USD
          </div>
          <p className="text-xs text-muted-foreground">Payments received</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${last30Days.toFixed(2)} USD</div>
          <p className="text-xs text-muted-foreground">Payments received</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last 365 Days</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${last365Days.toFixed(2)} USD
          </div>
          <p className="text-xs text-muted-foreground">Payments received</p>
        </CardContent>
      </Card>
    </div>
  );
}
