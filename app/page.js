import React from 'react';
import Link from 'next/link';
import About from './components/About';
import Contact from './components/Contact';
import { KeyRound, QrCode, Sparkles, ArrowRight, Star, Users } from 'lucide-react';

const ToolCard = ({ icon: Icon, title, description, href, isComingSoon, usageCount, rating }) => {
  const CardContent = () => (
    <div className={`relative h-80 bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 
      hover:shadow-xl hover:-translate-y-2 overflow-hidden
      ${isComingSoon ? 'bg-white/50 border-2 border-dashed border-purple-200' : ''}
      group`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-200/10 to-blue-100/0 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700
        animate-gradient-shift pointer-events-none" />

      {/* Tag section */}
      <div className="absolute top-4 right-4 flex gap-2">
        {!isComingSoon && (
          <>
            <div className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              <Star className="w-3 h-3" />
              <span>{rating || ''}</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              <Users className="w-3 h-3" />
              <span>{usageCount || ''}</span>
            </div>
          </>
        )}
      </div>

      {/* Icon Container with animated background */}
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-purple-200 rounded-lg opacity-0 group-hover:opacity-20 
          transform group-hover:scale-150 transition-all duration-700" />
        <div className={`relative flex items-center justify-center w-16 h-16 
          ${isComingSoon ? 'bg-purple-50' : 'bg-purple-100'} rounded-lg
          transition-transform duration-500 group-hover:rotate-6`}>
          <Icon className={`w-8 h-8 ${isComingSoon ? 'text-purple-400' : 'text-purple-600'}
            transition-all duration-500 group-hover:scale-110`} />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col">
        <div className="inline-flex items-center gap-2 mb-3">
          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 
            group-hover:text-purple-600">{title}</h3>
          {isComingSoon && (
            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-sm rounded-full 
              whitespace-nowrap animate-pulse">
              Coming Soon
            </span>
          )}
        </div>
        <p className={`${isComingSoon ? 'text-gray-500' : 'text-gray-600'} line-clamp-3 mb-4`}>
          {description}
        </p>
        
        {/* Action section */}
        {!isComingSoon && (
          <div className="mt-auto flex items-center text-purple-600 font-medium">
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              Try it now
            </span>
            <ArrowRight className="w-4 h-4 ml-2 transform transition-all duration-300 
              group-hover:translate-x-2 group-hover:opacity-100 opacity-0" />
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-100/30 rounded-full 
        transform group-hover:scale-150 transition-transform duration-700 opacity-0 
        group-hover:opacity-100" />
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-100/30 rounded-full 
        transform group-hover:scale-150 transition-transform duration-700 opacity-0 
        group-hover:opacity-100" />
    </div>
  );

  if (isComingSoon) {
    return <CardContent />;
  }

  return (
    <Link href={href} className="group">
      <CardContent />
    </Link>
  );
};

const ToolsSection = () => {
  const tools = [
    {
      icon: KeyRound,
      title: "Password Generator",
      description: "Create strong, secure passwords instantly with our advanced password generator tool. Customize length and character types for maximum security.",
      href: "/Passwordgenerator",
      usageCount: "",
      rating: ""
    },
    {
      icon: QrCode,
      title: "QR Code Generator",
      description: "Convert any text or URL into a QR code instantly. Perfect for sharing information quickly and efficiently. Generate high-quality QR codes.",
      href: "/Qrgenerator",
      usageCount: "",
      rating: ""
    },
    {
      icon: Sparkles,
      title: "More Tools",
      description: "Stay tuned for more exciting tools and features. We're constantly working on new additions to make your experience even better.",
      isComingSoon: true
    }
  ];

  return (
    <>
    <div className="bg-gradient-to-b from-white to-purple-50 min-h-[82vh] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full 
            text-sm font-semibold mb-4 animate-pulse">
            Free Tools
          </span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
            bg-clip-text text-transparent mb-4">
            Every tool you need in one place
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential tools at your fingertips. All are 100% FREE and easy to use! Generate secure passwords,
            create QR codes, and more features coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              {...tool}
            />
          ))}
        </div>
      </div>
    </div>
    <About />
    <Contact />
    </>
  );
};

export default ToolsSection;