"use client"
import React, { useState } from 'react';
import { Code, Rocket, Shield, Zap, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience instant link shortening , QR code generation and many more tools with our optimized infrastructure, ensuring your links are ready in milliseconds.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "IT is most secure and reliable platform. It is free and open-source platform. It is most secure and reliable platform.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Access our powerful API for seamless integration. Comprehensive documentation and SDKs available.",
      color: "from-blue-400 to-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative inline-block group">
            About SenTools
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            IT is a platform where you can shorten your links and generate QR codes and many more tools.
            It is a free and open-source platform.
            IT is most secure and reliable platform.
            soon coming more tools and features.

          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Rocket, label: "Links Created", value: "unknown" },
            { icon: Clock, label: "Uptime", value: "unknown" },
            { icon: Heart, label: "Happy Users", value: "unknown" }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="relative group bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col items-center">
                <stat.icon className="w-12 h-12 text-purple-500 mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>
                <div className="relative">
                  <feature.icon className={`w-12 h-12 mb-6 transform transition-all duration-500 
                    ${hoveredCard === index ? 'scale-110 rotate-12' : ''} text-purple-500`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <Link href="/shorten">
            <button className="relative px-8 py-4 bg-white text-purple-600 font-bold rounded-lg shadow-lg transform transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>
              <span className="relative flex items-center gap-2">
                Get Started <Rocket className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;