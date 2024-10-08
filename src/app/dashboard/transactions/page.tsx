// app/transactions/page.tsx
import { getTransactions } from "@/lib/getTransactions";
import TransactionList from "@/components/transactions/transactionList";
import { TransactionReportCards } from "@/components/transactions/TransactionReportCards";
import { getTransactionReports } from "@/lib/getTransactionsReports";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  const transactionReports = await getTransactionReports();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Transacciones</h1>
      <TransactionReportCards {...transactionReports} />
      <TransactionList transactions={transactions} />
    </div>
  );
}
