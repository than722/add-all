import Link from 'next/link';
import Image from 'next/image';
import Profile from '../profileview';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavbarTeacher() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="relative w-full shadow-md" style={{ backgroundColor: '#002B5C' }}>
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between w-full px-6 py-4 relative">
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
            <button onClick={() => router.push('/teacherview')} className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2">My Programs</button>
          </div>
          {/* Right: Profile Icon */}
          <div className="flex items-center ml-auto">
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
              aria-label="Open profile modal"
            >
              <Image src="/profileicon.png" alt="Profile" width={40} height={40} className="object-cover" />
            </button>
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="flex sm:hidden flex-col w-full px-3 py-3">
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
              onClick={() => setShowProfileModal(true)}
              className="ml-2 w-9 h-9 rounded-full overflow-hidden border-2 border-white"
              aria-label="Open profile modal"
            >
              <Image src="/profileicon.png" alt="Profile" width={36} height={36} className="object-cover" />
            </button>
          </div>
          {/* Mobile Nav Links Dropdown */}
          {navOpen && (
            <div className="flex flex-col w-full mt-2 gap-2 bg-[#002B5C] rounded shadow-md z-20">
              <Link href="/" className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2" onClick={() => setNavOpen(false)}>Home</Link>
              <button onClick={() => { setNavOpen(false); router.push('/teacherview'); }} className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 text-left">My Programs</button>
            </div>
          )}
        </div>
      </nav>
      {showProfileModal && (
        <Profile
          onClose={() => setShowProfileModal(false)}
          profile={{
            name: 'Teacher',
            email: 'teacher@example.com',
            img: '/profileicon.png',
            bio: 'Instructor at ADD-ALL',
            type: 'instructor',
          }}
          isAdmin={false}
        />
      )}
    </>
  );
}