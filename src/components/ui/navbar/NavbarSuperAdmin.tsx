import Link from 'next/link';
import Image from 'next/image';
import Profile from '../profileview';
import { useState } from 'react';

export default function NavbarSuperAdmin() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  return (
    <>
      <nav className="relative flex items-center justify-between px-10 py-4 shadow-md" style={{ backgroundColor: '#002B5C' }}>
        {/* Left: Logo and Text */}
        <div className="flex items-center gap-6 z-10 min-w-max">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image src="/add-all logo bg.png" alt="Logo" width={48} height={48} className="object-cover" />
          </div>
          <div className="leading-snug">
            <h1 className="text-white font-extrabold tracking-wide text-base sm:text-lg">Ateneo de Davao</h1>
            <h2 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">Academy of Lifelong Learning</h2>
          </div>
        </div>
        {/* Center: Navigation Links */}
        <div className="flex gap-30 text-white font-extrabold text-base">
          <Link href="/" className="hover:text-[#FFC72C]">Home</Link>
          <a href="#vision" className="hover:text-[#FFC72C]">Vision</a>
          <a href="#about" className="hover:text-[#FFC72C]">About Us</a>
          <a href="#instructors" className="hover:text-[#FFC72C]">Instructors</a>
          <a href="#students" className="hover:text-[#FFC72C]">Students</a>
          <a href="#programs" className="hover:text-[#FFC72C]">Programs</a>
          <a href="#administrators" className="hover:text-[#FFC72C]">Administrators</a>
        </div>
        {/* Right: Profile Icon */}
        <div className="z-10 flex items-center min-w-max">
          <button
            onClick={() => setShowProfileModal(true)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
            aria-label="Open profile modal"
          >
            <Image src="/profileicon.png" alt="Profile" width={40} height={40} className="object-cover" />
          </button>
        </div>
      </nav>
      {showProfileModal && (
        <Profile
          onClose={() => setShowProfileModal(false)}
          profile={{
            name: 'Super Admin',
            email: 'superadmin@example.com',
            img: '/profileicon.png',
            bio: 'Super Administrator',
            type: undefined,
          }}
          isAdmin={true}
        />
      )}
    </>
  );
}