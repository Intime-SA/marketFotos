"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  PieChart,
  Settings,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { montserrat } from "../fonts/fonts";

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  {
    icon: ShoppingCart,
    label: "Transactions",
    href: "/dashboard/transactions",
  },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: DollarSign, label: "Sales", href: "/dashboard/sales" },
  { icon: PieChart, label: "Statistics", href: "/dashboard/statistics" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={`flex h-screen bg-gray-100 ${montserrat.className}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mayoristakaurymdp.appspot.com/o/generar%20imagen%20con%20efecto%20animado%20para%20utilizar%20en%20un%20logo%20de%20aplicacion%20de%20fotos%20de%20surfing.png?alt=media&token=eaa74f90-8ad1-4712-934c-8a8484907e8a"
            alt="GOwave Logo"
            className="w-12 h-12 mb-4"
            style={{ width: "40%", height: "100%" }}
          />
          <nav>
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start mb-2 ${
                    pathname === item.href
                      ? "bg-purple-100 text-purple-600"
                      : ""
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              GOwave Admin
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 bg-white border-gray-200"
                />
              </div>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                Console
              </Button>
              <Button variant="ghost" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Admin"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
