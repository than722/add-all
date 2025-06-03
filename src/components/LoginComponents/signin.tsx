'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getRole } from '@/components/roles/role';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignIn = (roleNumber: number) => {
    const role = getRole(roleNumber);
    if (role && typeof window !== 'undefined') {
      localStorage.setItem('role', role);
    }
    onClose();
    if (role === 'student') {
      router.push('/studentview?tab=all');
    } else if (role === 'teacher') {
      router.push('/teacherview');
    } else if (role === 'admin') {
      router.push('/admin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-xl z-10">
        <h3 className="text-xl font-bold mb-6 text-[#002B5C] text-center">Sign In As</h3>
        <div className="flex flex-col gap-4">
          <button
            className="bg-[#92D0D3] text-white px-4 py-2 rounded hover:bg-[#6bb7bb] transition font-semibold"
            onClick={() => handleSignIn(1)}
          >
            Student
          </button>
          <button
            className="bg-[#002B5C] text-white px-4 py-2 rounded hover:bg-[#001f40] transition font-semibold"
            onClick={() => handleSignIn(2)}
          >
            Teacher
          </button>
          <button
            className="bg-[#FFC72C] text-[#002B5C] px-4 py-2 rounded hover:bg-yellow-400 transition font-semibold"
            onClick={() => handleSignIn(3)}
          >
            Admin
          </button>
          <button
            className="bg-[#1E3A5F] text-white px-4 py-2 rounded hover:bg-[#16325c] transition font-semibold"
            onClick={() => {
              onClose();
              router.push('/superadmin');
            }}
          >
            SuperAdmin
          </button>
        </div>
        <button
          className="mt-6 text-[#002B5C] font-bold w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
