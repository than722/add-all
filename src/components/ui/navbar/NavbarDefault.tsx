'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SignInModal from '../../LoginComponents/signin';

export default function NavbarDefault() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setNavOpen(false);
    }
  };

  return (
    <>
      <nav className="relative w-full shadow-md" style={{ backgroundColor: '#08228d' }}>
        {/* Desktop Layout (>= 900px) */}
        <div className="hidden md:flex items-center justify-between w-full px-6 py-4 relative">
          {/* Left: Logo and School Name */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <Image src="/add-all logo bg.png" alt="Logo" width={48} height={48} className="object-cover" />
            </div>
            <div className="leading-snug">
              <h1 className="text-white font-extrabold tracking-wide text-lg">Ateneo de Davao</h1>
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">Academy of Lifelong Learning</h2>
            </div>
          </div>
          {/* Center: Navigation Links (absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10">
            <Link href="/" className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2">Home</Link>
            <button
              type="button"
              className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 bg-transparent border-none cursor-pointer"
              onClick={() => handleScroll('vision-section')}
            >
              Vision
            </button>
            <button
              type="button"
              className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 bg-transparent border-none cursor-pointer"
              onClick={() => handleScroll('aboutus-section')}
            >
              About Us
            </button>
          </div>
          {/* Right: Sign In Button */}
          <div className="flex items-center ml-auto">
            <button
              onClick={() => setShowSignInModal(true)}
              className="bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300 text-base"
            >
              Sign In
            </button>
          </div>
        </div>
        {/* Tablet & Mobile Layout (< 900px) */}
        <div className="flex md:hidden flex-col w-full px-3 py-3">
          <div className="flex items-center w-full z-10">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <Image src="/add-all logo bg.png" alt="Logo" width={48} height={48} className="object-cover" />
            </div>
            <div className="leading-snug ml-3">
              <h1 className="text-white font-extrabold tracking-wide text-sm">Ateneo de Davao</h1>
              <h2 className="text-white font-bold text-xs uppercase tracking-widest">Academy of Lifelong Learning</h2>
            </div>
            <button
              className="ml-auto p-2 focus:outline-none"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <button
              onClick={() => setShowSignInModal(true)}
              className="ml-2 bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300 text-sm"
            >
              Sign In
            </button>
          </div>
          {/* Mobile/Tablet Nav Links Dropdown */}
          {navOpen && (
            <div className="flex flex-col w-full mt-2 gap-2 bg-[#08228d] rounded shadow-md z-20">
              <Link href="/" className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2" onClick={() => setNavOpen(false)}>Home</Link>
              <button
                type="button"
                className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 text-left bg-transparent border-none cursor-pointer"
                onClick={() => handleScroll('vision-section')}
              >
                Vision
              </button>
              <button
                type="button"
                className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 text-left bg-transparent border-none cursor-pointer"
                onClick={() => handleScroll('aboutus-section')}
              >
                About Us
              </button>
            </div>
          )}
        </div>
      </nav>
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </>
  );
}