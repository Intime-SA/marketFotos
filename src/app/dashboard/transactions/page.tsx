"use client";

import React from "react";
import {
  DollarSign,
  Search,
  Eye,
  RefreshCcw,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const transactionData = [
  {
    id: "001",
    date: "2023-10-15",
    user: "John Doe",
    contentId: "IMG001",
    photographer: "Jane Smith",
    location: "Beach, CA",
    amount: 25.99,
    status: "Paid",
  },
  {
    id: "002",
    date: "2023-10-14",
    user: "Alice Johnson",
    contentId: "VID003",
    photographer: "Bob Williams",
    location: "Mountain, CO",
    amount: 39.99,
    status: "Paid",
  },
  {
    id: "003",
    date: "2023-10-13",
    user: "Emma Brown",
    contentId: "IMG007",
    photographer: "Charlie Davis",
    location: "City, NY",
    amount: 19.99,
    status: "Refunded",
  },
  {
    id: "004",
    date: "2023-10-12",
    user: "Michael Wilson",
    contentId: "IMG015",
    photographer: "Diana Evans",
    location: "Lake, MN",
    amount: 29.99,
    status: "Paid",
  },
  {
    id: "005",
    date: "2023-10-11",
    user: "Olivia Taylor",
    contentId: "VID009",
    photographer: "Frank Green",
    location: "Desert, AZ",
    amount: 49.99,
    status: "Paid",
  },
];

export default function SuperAdminTransactions() {
  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-8 bg-white border-gray-200 w-full"
            />
          </div>
          <Avatar className="hidden sm:inline-flex">
            <AvatarImage src="/avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 24 Hours</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500 USD</div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,000 USD</div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 365 Days</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$57,000 USD</div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Photo/Video ID
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Photographer
                </TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium hidden sm:table-cell">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Link
                      href={`/users/${transaction.user
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {transaction.user}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Link
                      href={`/content/${transaction.contentId}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {transaction.contentId}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Link
                      href={`/photographers/${transaction.photographer
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {transaction.photographer}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {transaction.location}
                  </TableCell>
                  <TableCell className="font-bold">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Paid"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        transaction.status === "Paid"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : ""
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0">
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 sm:hidden"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                    </div>
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
