'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Profile from './profileview';
import SignInModal from '@/components/LoginComponents/signin';

interface NavbarProps {
  admin?: boolean;
}

export default function Navbar({ admin }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isStudentView = pathname?.startsWith('/studentview');
  const isTeacherView = pathname?.startsWith('/teacherview') || pathname?.startsWith('/programview') || pathname?.startsWith('/studentList') || pathname?.startsWith('/editcourseoutline');
  const isAdminView = pathname?.startsWith('/admin') || admin;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const isSuperAdminView = pathname === '/superadmin' || role === 'superadmin';

  if (isSuperAdminView) {
    return (
      <>
        <nav className="relative flex items-center justify-between px-10 py-4 shadow-md" style={{ backgroundColor: '#002B5C' }}>
          {/* Left: Logo and Text */}
          <div className="flex items-center gap-6 z-10 min-w-max">
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
          {/* Center: Navigation Links */}
          <div className="flex-1 flex justify-center items-center gap-10 text-white font-extrabold text-base">
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
              <Image
                src="/profileicon.png"
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </button>
          </div>
        </nav>
        {/* Profile Modal for SuperAdmin */}
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
          {isAdminView ? (
            <>
              <button
                onClick={() => router.push('/admin?tab=programs')}
                className="text-white font-extrabold hover:text-[#FFC72C]"
              >
                Programs List
              </button>
              <button
                onClick={() => router.push('/admin?tab=instructors')}
                className="text-white font-extrabold hover:text-[#FFC72C]"
              >
                Instructors
              </button>
              <button
                onClick={() => router.push('/admin?tab=students')}
                className="text-white font-extrabold hover:text-[#FFC72C]"
              >
                Students
              </button>
            </>
          ) : isStudentView ? (
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
          ) : isTeacherView ? (
            <button
              onClick={() => router.push('/teacherview')}
              className="text-white font-extrabold hover:text-[#FFC72C]"
            >
              My Programs
            </button>
          ) : null}
        </>
        {/* Right: Sign In or Profile */}
        <div className="z-10 flex items-center space-x-4">
          {((isStudentView && role === 'student') || (isTeacherView && role === 'teacher') || (isAdminView && role === 'admin')) ? (
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
          ) : (
            !isStudentView && !isTeacherView && !isAdminView && (
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-[#FFC72C] text-[#002B5C] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300"
              >
                Sign In
              </button>
            )
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <Profile
          onClose={() => setShowProfileModal(false)}
          profile={{
            name: 'Juan Dela Cruz',
            email: 'student@example.com',
            img: '/profileicon.png',
            bio: 'Student at ADD-ALL',
            type: role === 'teacher' ? 'instructor' : 'student',
          }}
          isAdmin={isAdminView}
        />
      )}
      {/* Sign In Modal */}
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </>
  );
}
