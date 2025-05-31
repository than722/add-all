'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Profile from './profileview';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isStudentView = pathname?.startsWith('/studentview') ?? false;

  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <nav
        className="relative flex items-center justify-between px-6 py-4 shadow-md"
        style={{ backgroundColor: '#002B5C' }}
      >
        {/* Left: Logo and Text */}
        <div className="flex items-center space-x-4 z-10">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image
              src="/add-all logo bg.png"
              alt="Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="leading-snug">
            <h1 className="text-white font-extrabold tracking-wide text-base sm:text-lg">
              Ateneo de Davao
            </h1>
            <h2 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">
              Academy of Lifelong Learning
            </h2>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-x-8 z-0">
          {!isStudentView ? (
            <>
              <Link href="/" className="text-white font-extrabold hover:text-[#FFC72C]">
                Home
              </Link>
              <a href="#vision" className="text-white font-extrabold hover:text-[#FFC72C]">
                Vision
              </a>
              <a href="#about" className="text-white font-extrabold hover:text-[#FFC72C]">
                About Us
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/studentview?tab=all')}
                className="text-white font-extrabold hover:text-[#FFC72C]"
              >
                All Programs
              </button>
              <button
                onClick={() => router.push('/studentview?tab=mine')}
                className="text-white font-extrabold hover:text-[#FFC72C]"
              >
                My Programs
              </button>
            </>
          )}
        </div>

        {/* Right: Sign In or Profile */}
        <div className="z-10 flex items-center space-x-4">
          {!isStudentView ? (
            <button
              onClick={() => router.push('/studentview?tab=all')}
              className="bg-[#FFC72C] text-[#002B5C] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
              aria-label="Open profile modal"
            >
              <Image
                src="/profileicon.png"
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </button>
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && <Profile onClose={() => setShowProfileModal(false)} />}
    </>
  );
}
