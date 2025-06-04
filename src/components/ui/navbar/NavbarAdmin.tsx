import Link from 'next/link';
import Image from 'next/image';
import Profile from '../profileview';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavbarAdmin() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="relative flex items-center justify-between px-10 py-5 shadow-md" style={{ backgroundColor: '#002B5C' }}>
        {/* Left: Logo and Text */}
        <div className="flex items-center space-x-8 z-10">
          <div className="w-14 h-14 overflow-hidden rounded-full">
            <Image src="/add-all logo bg.png" alt="Logo" width={56} height={56} className="object-cover" />
          </div>
          <div className="leading-snug">
            <h1 className="text-white font-extrabold tracking-wide text-lg sm:text-xl">Ateneo de Davao</h1>
            <h2 className="text-white font-bold text-sm sm:text-base uppercase tracking-widest">Academy of Lifelong Learning</h2>
          </div>
        </div>
        {/* Center: Navigation Links */}
        <div className="flex gap-30">
          <Link href="/" className="text-white font-extrabold hover:text-[#FFC72C]">Home</Link>
          <a href="#vision" className="text-white font-extrabold hover:text-[#FFC72C]">Vision</a>
          <a href="#about" className="text-white font-extrabold hover:text-[#FFC72C]">About Us</a>
          <button onClick={() => router.push('/admin?tab=programs')} className="text-white font-extrabold hover:text-[#FFC72C]">Programs List</button>
          <button onClick={() => router.push('/admin?tab=instructors')} className="text-white font-extrabold hover:text-[#FFC72C]">Instructors</button>
          <button onClick={() => router.push('/admin?tab=students')} className="text-white font-extrabold hover:text-[#FFC72C]">Students</button>
        </div>
        {/* Right: Profile Icon */}
        <div className="z-10 flex items-center space-x-6">
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
            name: 'Admin',
            email: 'admin@example.com',
            img: '/profileicon.png',
            bio: 'Admin at ADD-ALL',
            type: undefined,
          }}
          isAdmin={true}
        />
      )}
    </>
  );
}