"use client"
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6  bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 bg-gradient-to-b from-white to-purple-50" >
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>Created by</span>
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sushank
            </span>
            <span>with</span>
            <div className="inline-flex items-center gap-1">
              <Heart className="w-5 h-5 text-red-500 animate-pulse fill-red-500" />
              <span className="sr-only">love</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} All rights reserved by Sushank Lamichhane
          </div>
        </div>
      </div>
    </footer>
  );
}