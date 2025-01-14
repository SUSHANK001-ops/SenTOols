"use client"
import Image from "next/image";
import { Github, QrCode, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-purple-50 min-h-[82vh]">
      <section className="min-h-[600px] p-4 md:p-8 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold animate-pulse">
                  Multiple Features
                </span>
                <span className="text-purple-600">✨</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ultimate Link Management Platform
              </h1>
              
              <div className="flex flex-col gap-4">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Transform your digital presence with our all-in-one solution:
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600">Powerful URL Shortener</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600">Instant QR Code Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <span className="text-gray-600">More Features Coming Soon</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start mt-4">
                <Link href="/shorten">
                  <button className="inline-flex items-center justify-center min-w-[180px] group relative bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-full animate-pulse"></div>
                    <LinkIcon className="w-5 h-5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700" />
                    <span className="ml-2 group-hover:translate-x-2 transition-all duration-500">Shorten URL</span>
                  </button>
                </Link>
                <Link href="/Qrgenerator">
                  <button className="inline-flex items-center justify-center min-w-[180px] group relative bg-white text-purple-600 font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-105 border-2 border-purple-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-50 transition-all duration-500 rounded-full animate-pulse"></div>
                    <QrCode className="w-5 h-5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700" />
                    <span className="ml-2 group-hover:translate-x-2 transition-all duration-500">Generate QR</span>
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl transform rotate-6 scale-105 opacity-30 blur-xl"></div>
                <Image
                  alt="vector"
                  src="/vector.jpg"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl w-full h-auto hover:shadow-3xl transition-all duration-700 hover:scale-105 relative z-10"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg transform rotate-6 z-20">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg transform -rotate-6 z-20">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}