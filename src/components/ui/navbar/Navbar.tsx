'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import NavbarSuperAdmin from './NavbarSuperAdmin';
import NavbarAdmin from './NavbarAdmin';
import NavbarStudent from './NavbarStudent';
import NavbarTeacher from './NavbarTeacher';
import NavbarDefault from './NavbarDefault';

interface NavbarProps {
  admin?: boolean;
}

export default function Navbar({ admin }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const isSuperAdminView = pathname === '/superadmin' || role === 'superadmin';
  const isStudentView = pathname?.startsWith('/studentview');
  const isTeacherView = pathname?.startsWith('/teacherview') || pathname?.startsWith('/programview') || pathname?.startsWith('/studentList') || pathname?.startsWith('/editcourseoutline');
  const isAdminView = pathname?.startsWith('/admin') || admin;

  if (isSuperAdminView) {
    return <NavbarSuperAdmin />;
  }
  if (isAdminView) {
    return <NavbarAdmin />;
  }
  if (isStudentView) {
    return <NavbarStudent />;
  }
  if (isTeacherView) {
    return <NavbarTeacher />;
  }
  return <NavbarDefault />;
}
