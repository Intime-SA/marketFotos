"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import AdminLoginForm from "@/src/components/login/AdminLoginForm";


const montserrat = Montserrat({ subsets: ["latin"] });

<<<<<<< HEAD
=======

interface FeatureCardProps {
  icon: ReactElement;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-left">
      <div className="flex items-center mb-2">
        {React.cloneElement(icon, {
          className: "w-6 h-6 mr-2 text-gray-800 dark:text-gray-200",
        })}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

>>>>>>> 21a6db885ccee0201fdca1a42f3bd4a851860fb5
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
