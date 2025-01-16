"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Home, Info, Wrench, Mail, Github, Lock, Clock, QrCode, Link as LinkIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  const toolItems = [
    { href: "/Passwordgenerator", icon: Lock, label: "Password Generator" },
    { href: "/Qrgenerator", icon: QrCode, label: "QR Generator" },
    { href: "#", icon: Clock, label: "More Coming Soon", disabled: true }
  ];

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: Info, label: "About" },
    { 
      icon: Wrench, 
      label: "Tools",
      isDropdown: true,
      items: toolItems
    },
    { href: "/contact", icon: Mail, label: "Contact Us" }
  ];

  // Close tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close tools dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsToolsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className='sticky top-0 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-xl flex items-center px-3 md:px-6  overflow-visible z-50'>
        {/* Animated Background */}
        <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 hover:opacity-30 transition-opacity duration-700'></div>
        
        {/* Enhanced Logo */}
        <Link href="/">
          <div className='flex items-center gap-2 relative group'>
            <LinkIcon className='w-6 h-6 text-white transform transition-all duration-700 group-hover:rotate-12 group-hover:scale-110' />
            <Sparkles className='absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500' />
            <span className='text-white text-xl md:text-2xl font-extrabold cursor-pointer transform transition-all duration-700 hover:scale-110 hover:-rotate-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-white to-purple-200 animate-pulse hover:animate-none'>
              SenTools
            </span>
          </div>
        </Link>

        {/* Hamburger Menu */}
        <button 
          className='lg:hidden ml-auto relative z-50 text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}></span>
            <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex justify-center items-center gap-8 text-white text-lg ml-auto'>
          {navItems.map(({ href, icon: Icon, label, isDropdown, items }, index) => (
            <li 
              key={label}
              className='relative'
              ref={isDropdown ? toolsRef : null}
            >
              {isDropdown ? (
                <div className='relative'>
                  <button
                    onClick={() => setIsToolsOpen(!isToolsOpen)}
                    className='flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-500'
                  >
                    <div className='relative'>
                      <Icon className={`w-5 h-5 transition-all duration-700 ${
                        isToolsOpen ? 'rotate-180 scale-125' : ''
                      }`} />
                    </div>
                    <span>{label}</span>
                  </button>
                  
                  {/* Tools Dropdown - Positioned Absolute */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl transform transition-all duration-300 origin-top ${
                    isToolsOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                  }`}>
                    <div className='p-2'>
                      {items.map((item) => (
                        <Link 
                          key={item.label}
                          href={item.disabled ? "#" : item.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 transition-all duration-300 ${
                            item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-600'
                          }`}
                          onClick={(e) => {
                            if (item.disabled) {
                              e.preventDefault();
                            } else {
                              setIsToolsOpen(false);
                            }
                          }}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href={href}
                  className='flex items-center gap-2 hover:text-gray-200 transition-colors duration-500'
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className='relative'>
                    <Icon className={`w-5 h-5 transition-all duration-700 
                      ${hoveredItem === index ? 'animate-bounce scale-125' : 'transform-none'}`}
                    />
                    <div className={`absolute -inset-1 bg-white/20 rounded-full transition-all duration-500
                      ${hoveredItem === index ? 'scale-100 animate-ping' : 'scale-0'}`} />
                  </div>
                  <span>{label}</span>
                </Link>
              )}
            </li>
          ))}

          {/* Github Button */}
          <li className='ml-4'>
            <Link href="https://github.com/SUSHANK001-ops">
              <button className='group relative bg-white text-purple-500 font-bold py-2 px-4 rounded-full shadow-md hover:shadow-xl transition-all duration-700 flex items-center gap-2 hover:-translate-y-1'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-300 opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-full animate-pulse'></div>
                <Github className="w-5 h-5 group-hover:rotate-12 transition-all duration-700" />
                <span>Github</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-purple-500/95 z-40 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full transition-all duration-700 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <ul className='flex flex-col items-center gap-8'>
            {navItems.map(({ href, icon: Icon, label, isDropdown, items }) => (
              <li key={label} className="w-64">
                {isDropdown ? (
                  <div>
                    <button 
                      onClick={() => setIsToolsOpen(!isToolsOpen)}
                      className='w-full flex items-center justify-center gap-3 text-white text-xl font-semibold'
                    >
                      <Icon className="w-6 h-6" />
                      <span>{label}</span>
                    </button>
                    
                    {/* Mobile Tools Dropdown */}
                    <div className={`mt-4 space-y-2 transition-all duration-500 ${
                      isToolsOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {items.map((item) => (
                        <Link 
                          key={item.label}
                          href={item.disabled ? "#" : item.href}
                          className={`flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white transition-colors duration-300 ${
                            item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={(e) => {
                            if (item.disabled) {
                              e.preventDefault();
                            } else {
                              setIsMenuOpen(false);
                              setIsToolsOpen(false);
                            }
                          }}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={href}
                    className='flex items-center justify-center gap-3 text-white text-xl font-semibold'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Github Button */}
          <div className='mt-12'>
            <Link href="https://github.com/SUSHANK001-ops">
              <button 
                className='bg-white text-purple-500 font-bold py-2 px-6 rounded-full shadow-md flex items-center gap-2'
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="w-5 h-5" />
                <span>Github</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;