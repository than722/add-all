// components/ui/navbar/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // useState for navOpen is still fine
import Profile from '../Modals/profileview';
import SignInModal from '../../LoginComponents/signin';
// import { getRole, UserRole } from '../../roles/role'; // No longer needed here
import { useAuth } from '@/components/contexts/authContext'; // <--- Import useAuth

// Define a consistent type for navigation links
interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
  scrollId?: string;
  anchor?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role} = useAuth(); 

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // *** REMOVE THE OLD useEffect THAT READS LOCALSTORAGE ***
  // The role state is now managed by AuthProvider

  // You can keep this useEffect for logging if you want to see when role changes
  useEffect(() => {
    console.log('Navbar: Rendered with role:', role);
  }, [role]);


  // Navigation links config per role (no change here, it uses the 'role' state)
  const navLinks: Record<string, NavLink[]> = {
    superadmin: [
      { label: 'Home', href: '/' },
      { label: 'Instructors', href: '#instructors', anchor: true },
      { label: 'Students', href: '#students', anchor: true },
      { label: 'Programs', href: '#programs', anchor: true },
      { label: 'Administrators', href: '#administrators', anchor: true },
    ],
    admin: [
      { label: 'Home', href: '/' },
      { label: 'Programs List', onClick: () => router.push('/admin/programlist') },
      { label: 'Instructors', onClick: () => router.push('/admin/instructorlist') },
      { label: 'Students', onClick: () => router.push('/admin/studentlist') },
    ],
    instructor: [
      { label: 'Home', href: '/' },
      { label: 'Assigned Programs', onClick: () => router.push('/instructor/assignedprograms') },
    ],
    student: [
      { label: 'Home', href: '/' },
      { label: 'All Programs', onClick: () => router.push('/student/allprograms') },
      { label: 'My Programs', onClick: () => router.push('/student/myprograms') },
    ],
    guest: [
      { label: 'Home', href: '/' },
      { label: 'Vision', scrollId: 'vision-section' },
      { label: 'About Us', scrollId: 'aboutus-section' },
    ],
    default: [ // This 'default' case will primarily be hit if role is null initially
      { label: 'Home', href: '/' },
      { label: 'Vision', scrollId: 'vision-section' },
      { label: 'About Us', scrollId: 'aboutus-section' },
    ],
  };

  // Profile modal config per role (isAdmin separated)
  const profileConfig: Record<string, { profile: { name: string; email: string; img: string; bio: string; type?: 'student' | 'instructor' }, isAdmin: boolean }> = {
    superadmin: { profile: { name: 'Super Admin', email: 'superadmin@example.com', img: '/profileicon.png', bio: 'Super Administrator' }, isAdmin: true },
    admin: { profile: { name: 'Admin', email: 'admin@example.com', img: '/profileicon.png', bio: 'Admin at ADD-ALL' }, isAdmin: true },
    instructor: { profile: { name: 'Mrs. Dela Cruz', email: 'instructor@example.com', img: '/profileicon.png', bio: 'Instructor at ADD-ALL', type: 'instructor' }, isAdmin: false },
    student: { profile: { name: 'Juan Dela Cruz', email: 'student@example.com', img: '/profileicon.png', bio: 'Student at ADD-ALL', type: 'student' }, isAdmin: false },
  };

  // Handle scroll for default navbar
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setNavOpen(false);
    }
  };

  // Render navigation links (no change here)
  const renderLinks = (isMobile = false) => {
    const links =
      role === 'superadmin' ? navLinks.superadmin :
      role === 'admin' ? navLinks.admin :
      role === 'instructor' ? navLinks.instructor :
      role === 'student' ? navLinks.student :
      role === 'guest' ? navLinks.guest :
      navLinks.default;
    return links.map((link, i) => {
      if (link.href && !link.anchor && !link.scrollId && !link.onClick) {
        return <Link key={i} href={link.href} className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2" onClick={isMobile ? () => setNavOpen(false) : undefined}>{link.label}</Link>;
      }
      if (link.anchor && link.href) {
        return <a key={i} href={link.href} className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2" onClick={isMobile ? () => setNavOpen(false) : undefined}>{link.label}</a>;
      }
      if (link.scrollId) {
        return <button key={i} type="button" className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 bg-transparent border-none cursor-pointer text-left" onClick={() => handleScroll(link.scrollId!)}>{link.label}</button>;
      }
      if (link.onClick) {
        return <button key={i} className="text-white font-extrabold hover:text-[#FFC72C] text-base py-1 px-2 text-left" onClick={() => { if (isMobile) setNavOpen(false); link.onClick && link.onClick(); }}>{link.label}</button>;
      }
      return null;
    });
  };

  // Desktop breakpoint: md for default, sm for others
  const isDefault = !role; // This will now typically only be true on initial mount before AuthProvider sets the role
  const desktopClass = isDefault ? 'md:flex hidden' : 'sm:flex hidden';
  const mobileClass = isDefault ? 'md:hidden flex' : 'sm:hidden flex';

  return (
    <>
      <nav className="relative w-full shadow-md" style={{ backgroundColor: '#08228d' }}>
        {/* Desktop Layout */}
        <div className={`${desktopClass} items-center justify-between w-full px-6 py-4 relative`}>
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
            {renderLinks(false)}
          </div>
          {/* Right: Profile or Sign In */}
          <div className="flex items-center ml-auto">
            {role && role !== 'guest' ? (
              <>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
                  aria-label="Open profile modal"
                >
                  <Image src="/profileicon.png" alt="Profile" width={40} height={40} className="object-cover" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300 text-base"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        {/* Mobile Layout */}
        <div className={`${mobileClass} flex-col w-full px-3 py-3`}>
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
            {role && role !== 'guest' ? (
              <>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="ml-2 w-9 h-9 rounded-full overflow-hidden border-2 border-white"
                  aria-label="Open profile modal"
                >
                  <Image src="/profileicon.png" alt="Profile" width={36} height={36} className="object-cover" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="ml-2 bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300 text-sm"
              >
                Sign In
              </button>
            )}
          </div>
          {/* Mobile Nav Links Dropdown */}
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