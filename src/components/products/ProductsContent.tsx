"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
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
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/src/lib/dataProducts";
import { AddProductModal } from "./AddProductModal";
import { NewProduct, Product } from "@/src/lib/definitions";
import { formatToUSD } from "@/src/lib/utils";
import { toast } from "@/src/hooks/use-toast";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productData = await getProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to fetch products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddOrUpdateProduct = async (product: NewProduct | Product) => {
    try {
      if ("id" in product) {
        // Update existing product
        await updateProduct(product);
        setProducts(products.map((p) => (p.id === product.id ? product : p)));
        toast({
          title: "Success",
          description: "Product updated successfully.",
        });
      } else {
        // Add new product
        const addedProduct = await addProduct(product);
        setProducts([...products, addedProduct]);
        toast({
          title: "Success",
          description: "Product added successfully.",
        });
      }
      setIsModalOpen(false);
      setProductToEdit(null);
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast({
        title: "Error",
        description: "Failed to add/update product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

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
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
            onClick={() => {
              setProductToEdit(null);
              setIsModalOpen(true);
            }}
          >
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
                    <TableHead className="w-[20%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.title}
                        </TableCell>
                        <TableCell>
                          {product.comision === "porcentaje" ? (
                            <div>{product.monto}%</div>
                          ) : (
                            <div>{formatToUSD(product.monto)} USD</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
                <BarChart data={products}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="monto" fill="#8884d8" />
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

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        onAddProduct={handleAddOrUpdateProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
}
