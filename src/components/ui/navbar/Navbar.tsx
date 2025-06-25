'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from '../Modals/ProfileModals/profileview';
import SignInModal from '../Modals/signin';
import { useAuth } from '@/components/contexts/authContext';

interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
  scrollId?: string;
  anchor?: boolean;
}

export default function Navbar() {
  const router = useRouter();
  const { role } = useAuth();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    console.log('Navbar: Rendered with role:', role);
  }, [role]);

  const handleScrollNavigation = (targetId: string) => {
    router.push(`/?scrollTo=${targetId}`);
    setNavOpen(false);
  };

  const navLinks: Record<string, NavLink[]> = {
    superadmin: [
      { label: 'Home', href: '/' },
      { label: 'Instructors', href: '/superadmin/instructorlist', anchor: true },
      { label: 'Students', href: '/superadmin/studentlist', anchor: true },
      { label: 'Programs', href: '/superadmin/programlist', anchor: true },
      { label: 'Administrators', onClick: () => router.push('/superadmin/adminlist') },
      { label: 'General Forum', href: '/generalforum' },
    ],
    admin: [
      { label: 'Home', href: '/' },
      { label: 'Programs List', onClick: () => router.push('/admin/programlist') },
      { label: 'Instructors', onClick: () => router.push('/admin/instructorlist') },
      { label: 'Students', onClick: () => router.push('/admin/studentlist') },
      { label: 'General Forum', href: '/generalforum' },
    ],
    instructor: [
      { label: 'Home', href: '/' },
      { label: 'Assigned Programs', onClick: () => router.push('/instructor/assignedprograms') },
      { label: 'General Forum', href: '/generalforum' },
    ],
    student: [
      { label: 'Home', href: '/' },
      { label: 'All Programs', onClick: () => router.push('/student/allprograms') },
      { label: 'My Programs', onClick: () => router.push('/student/myprograms') },
      { label: 'General Forum', href: '/generalforum' },
    ],
    guest: [
      { label: 'Home', href: '/' },
      { label: 'Vision', href: '/vision' },
      { label: 'About Us', href: '/aboutus' },
      { label: 'General Forum', href: '/generalforum' },
    ],
    default: [
      { label: 'Home', href: '/' },
      { label: 'Vision', href: '/vision' },
      { label: 'About Us', href: '/aboutus' },
      { label: 'General Forum', href: '/generalforum' },
    ],
  };

  const profileConfig: Record<string, { profile: { name: string; email: string; img: string; bio: string; type?: 'student' | 'instructor' }, isAdmin: boolean }> = {
    superadmin: { profile: { name: 'Super Admin', email: 'superadmin@example.com', img: '/profileicon.png', bio: 'Super Administrator' }, isAdmin: true },
    admin: { profile: { name: 'Admin', email: 'admin@example.com', img: '/profileicon.png', bio: 'Admin at ADD-ALL' }, isAdmin: true },
    instructor: { profile: { name: 'Mrs. Dela Cruz', email: 'instructor@example.com', img: '/profileicon.png', bio: 'Instructor at ADD-ALL', type: 'instructor' }, isAdmin: false },
    student: { profile: { name: 'Juan Dela Cruz', email: 'student@example.com', img: '/profileicon.png', bio: 'Student at ADD-ALL', type: 'student' }, isAdmin: false },
  };

  const renderLinks = (isMobile = false) => {
    const links =
      role === 'superadmin' ? navLinks.superadmin :
      role === 'admin' ? navLinks.admin :
      role === 'instructor' ? navLinks.instructor :
      role === 'student' ? navLinks.student :
      role === 'guest' ? navLinks.guest :
      navLinks.default;

    return links.map((link, i) => {
      if (link.href && !link.onClick) {
        return (
          <Link
            key={i}
            href={link.href}
            className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 cursor-pointer"
            onClick={isMobile ? () => setNavOpen(false) : undefined}
          >
            {link.label}
          </Link>
        );
      }
      if (link.onClick) {
        return (
          <button
            key={i}
            onClick={() => {
              link.onClick && link.onClick();
              if (isMobile) setNavOpen(false);
            }}
            className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 cursor-pointer bg-transparent border-none text-left"
          >
            {link.label}
          </button>
        );
      }
      return null;
    });
  };

  const isDefault = !role;
  const desktopClass = isDefault ? 'md:flex hidden' : 'sm:flex hidden';
  const mobileClass = isDefault ? 'md:hidden flex' : 'sm:hidden flex';

  return (
    <>
      <nav className="relative w-full shadow-md" style={{ backgroundColor: '#08228d' }}>
        {/* Desktop Navbar */}
        <div className={`${desktopClass} items-center justify-between w-full px-6 py-4 relative`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image src="/addu logo.png" alt="ADDU Logo" width={56} height={56} className="object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image src="/add-all logo bg.png" alt="ADD-ALL Logo" width={56} height={56} className="object-cover" />
              </div>
            </div>
            <div className="leading-snug">
              <h1 className="text-white font-extrabold tracking-wide text-lg">Ateneo de Davao</h1>
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">Academy of Lifelong Learning</h2>
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10">
            {renderLinks(false)}
          </div>

          <div className="flex items-center ml-auto">
            {role && role !== 'guest' ? (
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
              >
                <Image src="/profileicon.png" alt="Profile" width={40} height={40} className="object-cover" />
              </button>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition text-base cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In with Google</span>
                <Image src="/google-logo.png" alt="Google" width={40} height={40} className="inline-block" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className={`${mobileClass} flex-col w-full px-3 py-3`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image src="/addu logo.png" alt="ADDU Logo" width={56} height={56} className="object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image src="/add-all logo bg.png" alt="ADD-ALL Logo" width={56} height={56} className="object-cover" />
              </div>
            </div>
            <div className="leading-snug ml-3">
              <h1 className="text-white font-extrabold tracking-wide text-sm">Ateneo de Davao</h1>
              <h2 className="text-white font-bold text-xs uppercase tracking-widest">Academy of Lifelong Learning</h2>
            </div>
            <button
              onClick={() => setNavOpen((v) => !v)}
              className="ml-auto p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {role && role !== 'guest' ? (
              <button
                onClick={() => setShowProfileModal(true)}
                className="ml-2 w-9 h-9 rounded-full overflow-hidden border-2 border-white cursor-pointer"
              >
                <Image src="/profileicon.png" alt="Profile" width={36} height={36} className="object-cover" />
              </button>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="ml-1 px-3 py-1 text-xs sm:ml-2 sm:px-4 sm:py-2 sm:text-sm bg-[#FFC72C] text-[#08228d] rounded-full font-bold hover:bg-yellow-400 transition duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>Sign In</span>
                <Image src="/google-logo.png" alt="Google" width={16} height={16} className="inline-block" />
              </button>
            )}
          </div>

          {navOpen && (
            <div className="flex flex-col w-full mt-2 gap-2 bg-[#08228d] rounded shadow-md z-20">
              {renderLinks(true)}
            </div>
          )}
        </div>
      </nav>

      {role && role !== 'guest' && showProfileModal && (
        <Profile
          onClose={() => setShowProfileModal(false)}
          profile={profileConfig[role]?.profile || { name: '', email: '', img: '', bio: '' }}
          isAdmin={profileConfig[role]?.isAdmin || false}
        />
      )}

      {(!role || role === 'guest') && (
        <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
      )}
    </>
  );
}
