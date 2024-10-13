"use client";

import React, { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex h-screen bg-gray-100 ${montserrat.className}`}>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mayoristakaurymdp.appspot.com/o/generar%20imagen%20con%20efecto%20animado%20para%20utilizar%20en%20un%20logo%20de%20aplicacion%20de%20fotos%20de%20surfing.png?alt=media&token=eaa74f90-8ad1-4712-934c-8a8484907e8a"
              alt="GOwave Logo"
              className="w-12 h-12"
            />
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start mb-2 ${
                  pathname === item.href ? "bg-purple-100 text-purple-600" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          <div className="mt-auto">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white shadow-md">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mayoristakaurymdp.appspot.com/o/generar%20imagen%20con%20efecto%20animado%20para%20utilizar%20en%20un%20logo%20de%20aplicacion%20de%20fotos%20de%20surfing.png?alt=media&token=eaa74f90-8ad1-4712-934c-8a8484907e8a"
                  alt="GOwave Logo"
                  className="w-12 h-12 mb-4"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
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
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Button variant="ghost" className="w-full justify-start mb-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start mb-2">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    className="lg:hidden -ml-2 mr-2 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" />
                  </button>
                  <h1 className="text-3xl font-semibold font-harmoni text-gray-900 mt-2">
                    GoWave
                  </h1>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <div className="w-full hidden lg:block">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                  Console
                </Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white mr-4">
                  Console
                </Button>
                <Button variant="ghost" className="relative mr-4">
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
          </div>
        </header>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-0 sm:px-6 md:px-8 max-w-full mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
