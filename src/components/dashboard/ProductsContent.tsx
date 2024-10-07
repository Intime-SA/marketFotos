"use client";

import React from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const productData = [
  {
    id: 1,
    name: "Total Access Subscription",
    price: "$19.99/month",
    sales: 170,
  },
  { id: 2, name: "Photos", price: "15%", sales: 3000 },
  { id: 3, name: "Videos", price: "20%", sales: 230 },
  { id: 4, name: "Album", price: "25%", sales: 30 },
];

const monthlyData = [
  { month: "Jan", photos: 500, videos: 150, albums: 20, subscriptions: 100 },
  { month: "Feb", photos: 700, videos: 180, albums: 25, subscriptions: 120 },
  { month: "Mar", photos: 900, videos: 200, albums: 30, subscriptions: 150 },
  { month: "Apr", photos: 100, videos: 220, albums: 28, subscriptions: 180 },
  { month: "May", photos: 300, videos: 240, albums: 35, subscriptions: 200 },
  { month: "Jun", photos: 500, videos: 260, albums: 40, subscriptions: 220 },
  { month: "Jul", photos: 700, videos: 280, albums: 45, subscriptions: 240 },
  { month: "Aug", photos: 900, videos: 300, albums: 50, subscriptions: 260 },
  { month: "Sep", photos: 1100, videos: 320, albums: 55, subscriptions: 280 },
  { month: "Oct", photos: 1300, videos: 340, albums: 60, subscriptions: 300 },
  { month: "Nov", photos: 1500, videos: 360, albums: 65, subscriptions: 320 },
  { month: "Dec", photos: 1700, videos: 380, albums: 70, subscriptions: 340 },
];

export function ProductsContent() {
  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-8 bg-white border-gray-200 w-full"
            />
          </div>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Avatar className="hidden sm:inline-flex">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Admin"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div
              className="sm:transform-none sm:w-full"
              style={{
                transform: "scale(0.9)",
                transformOrigin: "left top",
                width: "111.11%",
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%] sm:w-[30%]">Name</TableHead>
                    <TableHead className="w-[40%] sm:w-[25%]">
                      Price/Commission
                    </TableHead>
                    <TableHead className="hidden sm:table-cell sm:w-[25%]">
                      Last Month Sales
                    </TableHead>
                    <TableHead className="w-[20%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {product.sales}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="p-1">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Last Month Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12 Month Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="photos"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="videos" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="albums" stroke="#ffc658" />
                  <Line
                    type="monotone"
                    dataKey="subscriptions"
                    stroke="#ff7300"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
