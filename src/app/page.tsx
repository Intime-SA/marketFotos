"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import AdminLoginForm from "@/src/components/login/AdminLoginForm";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-8 ${montserrat.className}`}
    >
      <main className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h1 className="text-7xl font-harmoni text-blue-600 dark:text-blue-400 mb-4">
            GOwave
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Admin Login
          </p>
        </div>

        <AdminLoginForm />
      </main>

      <footer className="mt-16 text-center text-gray-400 dark:text-gray-600">
        <p>&copy; 2024 GOwave. All rights reserved.</p>
      </footer>
    </div>
  );
}
