"use client";

import React, { useEffect, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

interface NavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/gowave-e46ce.appspot.com/o/GoWaveLogo.png?alt=media&token=e7a32c10-d7fb-43ce-aed6-f2416760fccf";
    setLogoUrl(LOGO_URL);
  }, []);

  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible z-10">
      <div className="max-w-7xl mx-auto px-0">
        <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          {/* Logo and Menu */}
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <button
                className="lg:hidden -ml-2 mr-2 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={onMenuClick}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
              {/* Agregar logo*/} 
              {logoUrl && (
                <img src={logoUrl} alt="Logo" className="h-12 mr-4" />
              )}
              <h1 className="text-3xl font-semibold font-harmoni text-[#22344E] mt-2 ml-2">
                GoWave
              </h1>
            </div>
          </div>

          {/* Search Bar */}
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Console Button and Notifications */}
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <Button className="bg-[#22344E] hover:bg-[#4B6B8A] text-white mr-4">
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
  );
}
