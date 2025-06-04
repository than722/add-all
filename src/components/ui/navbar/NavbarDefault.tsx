'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SignInModal from '../../LoginComponents/signin';

export default function NavbarDefault() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <>
      <nav className="relative flex items-center justify-between px-6 py-4 shadow-md" style={{ backgroundColor: '#002B5C' }}>
        {/* Left: Logo and Text */}
        <div className="flex items-center space-x-4 z-10">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image src="/add-all logo bg.png" alt="Logo" width={48} height={48} className="object-cover" />
          </div>
          <div className="leading-snug">
            <h1 className="text-white font-extrabold tracking-wide text-base sm:text-lg">Ateneo de Davao</h1>
            <h2 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">Academy of Lifelong Learning</h2>
          </div>
        </div>
        {/* Center: Navigation Links */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-30">
          <Link href="/" className="text-white font-extrabold hover:text-[#FFC72C]">Home</Link>
          <Link href="/vision" className="text-white font-extrabold hover:text-[#FFC72C]">Vision</Link>
          <Link href="/aboutus" className="text-white font-extrabold hover:text-[#FFC72C]">About Us</Link>
        </div>
        {/* Right: Sign In */}
        <div className="z-10 flex items-center space-x-4">
          <button
            onClick={() => setShowSignInModal(true)}
            className="bg-[#FFC72C] text-[#002B5C] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300"
          >
            Sign In 
          </button>
        </div>
      </nav>
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </>
  );
}