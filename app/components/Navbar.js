"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Home, Github, Lock, Clock, QrCode, Link as LinkIcon, Sparkles, FileText, File, ChevronDown, Settings } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPdfToolsOpen, setIsPdfToolsOpen] = useState(false);
  const [isAllToolsOpen, setIsAllToolsOpen] = useState(false);
  const toolsRef = useRef(null);
  const pdfToolsRef = useRef(null);

  const pdfTools = [
    { href: "./components/PdfConverter/DocsConverter", icon: File, label: "PDF TO Docs", description: "Convert PDF to Docs", disabled: true },
    { href: "./components/PdfConverter/PowerPointConverter", icon: FileText, label: "PDF to Powerpoint", description: "Convert PDF to Powerpoint", disabled: true },
    { href: "./components/PdfConverter/ExcelConverter", icon: File, label: "PDF to Excel", description: "Convert PDF to Excel", disabled: true },
    { href: "#", icon: FileText, label: "Compress PDF", description: "Reduce file size while optimizing quality", disabled: true }

  ];

  const allTools = [
    { href: "/Passwordgenerator", icon: Lock, label: "Password Generator", description: "Create secure passwords" },
    { href: "/Qrgenerator", icon: QrCode, label: "QR Generator", description: "Generate QR codes easily" },
    ...pdfTools,
    { href: "#", icon: Clock, label: "More Tools Coming Soon", description: "Stay tuned for new features", disabled: true }
  ];

  const navItems = [
    { 
      icon: FileText, 
      label: "PDF TOOLS",
      isDropdown: true,
      items: pdfTools,
      dropdownState: isPdfToolsOpen,
      setDropdownState: setIsPdfToolsOpen,
      ref: pdfToolsRef
    },
    { 
      icon: Settings, 
      label: "ALL TOOLS",
      isDropdown: true,
      items: allTools,
      dropdownState: isAllToolsOpen,
      setDropdownState: setIsAllToolsOpen,
      ref: toolsRef
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setIsAllToolsOpen(false);
      }
      if (pdfToolsRef.current && !pdfToolsRef.current.contains(event.target)) {
        setIsPdfToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAllToolsOpen(false);
      setIsPdfToolsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='sticky top-0 z-50'>
      {/* Enhanced gradient background with animation */}
      <div className='h-16 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-lg'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 hover:opacity-30 transition-all duration-700'></div>
        
        <div className='max-w-7xl mx-auto px-4 h-full'>
          <div className='flex items-center h-full gap-8'>
            {/* Logo */}
            <Link href="/">
              <div className='flex items-center gap-2 relative group'>
                <LinkIcon className='w-6 h-6 text-white transform transition-all duration-700 group-hover:rotate-12 group-hover:scale-110' />
                <Sparkles className='absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500' />
                <span className='text-white text-xl font-extrabold cursor-pointer transform transition-all duration-700 hover:scale-110 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-white to-blue-200'>
                  SenTools
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center gap-6'>
              {navItems.map(({ icon: Icon, label, isDropdown, items, dropdownState, setDropdownState, ref }) => (
                <div key={label} className='relative' ref={ref}>
                  <button
                    onClick={() => {
                      setDropdownState(!dropdownState);
                      if (label === "PDF TOOLS") {
                        setIsAllToolsOpen(false);
                      } else {
                        setIsPdfToolsOpen(false);
                      }
                    }}
                    className='flex items-center gap-2 text-white hover:text-blue-100 transition-all duration-300 group'
                  >
                    <Icon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                    <span className='font-medium'>{label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownState ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Enhanced Dropdown */}
                  <div className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl transform transition-all duration-300 origin-top ${
                    dropdownState ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                  }`}>
                    <div className='p-2'>
                      {items.map((item) => (
                        <Link 
                          key={item.label}
                          href={item.disabled ? "#" : item.href}
                          className={`flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group ${
                            item.disabled ? 'cursor-not-allowed' : 'hover:text-blue-600'
                          }`}
                          onClick={(e) => {
                            if (item.disabled) {
                              e.preventDefault();
                              alert('Coming Soon!');
                            }
                            setDropdownState(false);
                          }}
                        >
                          <item.icon className={`w-5 h-5 mt-1 transition-transform duration-300 group-hover:scale-110 ${
                            item.disabled ? 'text-gray-400' : 'text-blue-500'
                          }`} />
                          <div>
                            <div className={`font-medium ${item.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                              {item.label}
                            </div>
                            <div className={`text-sm ${item.disabled ? 'text-gray-300' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Github Button - Moved to right */}
            <div className='ml-auto hidden lg:block'>
              <Link href="https://github.com/SUSHANK001-ops">
                <button className='group relative bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-md hover:shadow-xl transition-all duration-500 flex items-center gap-2 hover:-translate-y-1'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-full'></div>
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-all duration-500" />
                  <span>Github</span>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-blue-600/95 z-40 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full transition-all duration-700 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className='w-full max-w-sm px-4'>
            {navItems.map(({ icon: Icon, label, items }) => (
              <div key={label} className="mb-8">
                <div className='text-white text-lg font-semibold mb-4 flex items-center gap-2'>
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </div>
                <div className='space-y-4'>
                  {items.map((item) => (
                    <Link 
                      key={item.label}
                      href={item.disabled ? "#" : item.href}
                      className={`flex items-start gap-3 text-white/90 hover:text-white transition-all duration-300 ${
                        item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={(e) => {
                        if (item.disabled) {
                          e.preventDefault();
                          alert('Coming Soon!');
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <item.icon className="w-5 h-5 mt-1" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-white/70">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile Github Button */}
            <Link href="https://github.com/SUSHANK001-ops">
              <button className='w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-md flex items-center justify-center gap-2 mt-8'>
                <Github className="w-5 h-5" />
                <span>Github</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;