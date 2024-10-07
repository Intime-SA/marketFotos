"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const userdata = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "Photographer",
    joinDate: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    type: "User",
    joinDate: "2023-10-02",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    type: "Photographer",
    joinDate: "2023-10-03",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    type: "User",
    joinDate: "2023-10-04",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    type: "User",
    joinDate: "2023-10-05",
  },
  {
    id: 6,
    name: "Eva White",
    email: "eva@example.com",
    type: "Photographer",
    joinDate: "2023-10-06",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    type: "User",
    joinDate: "2023-10-07",
  },
  {
    id: 8,
    name: "Grace Lee",
    email: "grace@example.com",
    type: "User",
    joinDate: "2023-10-08",
  },
  {
    id: 9,
    name: "Henry Wilson",
    email: "henry@example.com",
    type: "Photographer",
    joinDate: "2023-10-09",
  },
  {
    id: 10,
    name: "Ivy Taylor",
    email: "ivy@example.com",
    type: "User",
    joinDate: "2023-10-10",
  },
];

const userTypeData = [
  { name: "Photographers", value: 1500 },
  { name: "Regular Users", value: 7700 },
];

const userGrowthData = [
  { month: "Jan", photographers: 100, users: 500 },
  { month: "Feb", photographers: 150, users: 700 },
  { month: "Mar", photographers: 200, users: 900 },
  { month: "Apr", photographers: 250, users: 1100 },
  { month: "May", photographers: 300, users: 1300 },
  { month: "Jun", photographers: 350, users: 1500 },
  { month: "Jul", photographers: 400, users: 1700 },
  { month: "Aug", photographers: 450, users: 1900 },
  { month: "Sep", photographers: 500, users: 2100 },
];

const COLORS = ["#0088FE", "#00C49F"];

export default function SuperAdminUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;

  const filteredUsers = userdata.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-8 bg-white border-gray-200 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Avatar className="hidden sm:inline-flex">
            <AvatarImage src="/avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Table */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Join Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.joinDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <span className="text-sm">Page {currentPage}</span>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastUser >= filteredUsers.length}
                size="sm"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="photographers" fill="#8884d8" />
                  <Bar dataKey="users" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
