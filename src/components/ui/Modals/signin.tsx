'use client';

import React from 'react';
import { useAuth } from '@/components/contexts/authContext';
import { getRole, UserRole } from '@/data/roles/role';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const { setAuthRole } = useAuth();

  if (!isOpen) return null;

  const handleSignIn = (roleNumber: number) => {
    const role: UserRole = getRole(roleNumber);
    setAuthRole(role);
    onClose(); // Close SignInModal -> Triggers opening of RegisterModal (controlled in Navbar)
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#08228d] text-center">Sign In As</h3>
        <div className="flex flex-col gap-3 sm:gap-4">
          <button onClick={() => handleSignIn(1)} className="bg-[#92D0D3] text-white px-4 py-2 rounded hover:bg-[#6bb7bb] font-semibold text-sm sm:text-base cursor-pointer">Student</button>
          <button onClick={() => handleSignIn(2)} className="bg-[#08228d] text-white px-4 py-2 rounded hover:bg-[#001f40] font-semibold text-sm sm:text-base cursor-pointer">Instructor</button>
          <button onClick={() => handleSignIn(3)} className="bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded hover:bg-yellow-400 font-semibold text-sm sm:text-base cursor-pointer">Admin</button>
          <button onClick={() => handleSignIn(4)} className="bg-[#1E3A5F] text-white px-4 py-2 rounded hover:bg-[#16325c] font-semibold text-sm sm:text-base cursor-pointer">SuperAdmin</button>
        </div>
        <button onClick={onClose} className="mt-4 sm:mt-6 text-[#08228d] font-bold w-full text-sm sm:text-base cursor-pointer">Cancel</button>
      </div>
    </div>
  );
};

export default SignInModal;
