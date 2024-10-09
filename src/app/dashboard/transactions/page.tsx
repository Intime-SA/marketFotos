import { CalendarIcon, DollarSignIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: 1,
    date: "2024-03-15",
    buyer: "John Doe",
    photo: "Sunset at Bondi Beach",
    amount: 25.99,
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-03-14",
    buyer: "Jane Smith",
    photo: "Big Wave at Pipeline",
    amount: 34.99,
    status: "Pending",
  },
  {
    id: 3,
    date: "2024-03-13",
    buyer: "Mike Johnson",
    photo: "Aerial View of Gold Coast",
    amount: 19.99,
    status: "Completed",
  },
  {
    id: 4,
    date: "2024-03-12",
    buyer: "Sarah Williams",
    photo: "Surfer at Sunset",
    amount: 29.99,
    status: "Completed",
  },
  {
    id: 5,
    date: "2024-03-11",
    buyer: "Tom Brown",
    photo: "Morning Surf Session",
    amount: 22.99,
    status: "Pending",
  },
];

export default function TransactionsPage() {
  const totalEarnings = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const completedTransactions = transactions.filter(
    (t) => t.status === "Completed"
  ).length;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalEarnings.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Transactions
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A list of your recent photo sales</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.buyer}</TableCell>
                  <TableCell>{transaction.photo}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
