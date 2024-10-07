import React, { ReactElement } from "react";
import { Camera, Users, DollarSign, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h1 className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            GOwave
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Connecting Surfers with Epic Moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <FeatureCard
            icon={<Camera className="w-8 h-8" />}
            title="Surf Photography"
            description="High-quality surf photos from global talents."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Community"
            description="Connect with surf enthusiasts and photographers."
          />
          <FeatureCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Fair Compensation"
            description="Support photographers through transparent pricing."
          />
          <FeatureCard
            icon={<Waves className="w-8 h-8" />}
            title="Discover Spots"
            description="Explore surf locations through local lenses."
          />
        </div>

        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300">
            Explore
          </Button>
        </Link>
      </main>

      <footer className="mt-16 text-center text-gray-400 dark:text-gray-600">
        <p>&copy; 2024 GOwave. All rights reserved.</p>
      </footer>
    </div>
  );
}
