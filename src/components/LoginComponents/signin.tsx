// components/LoginComponents/signin.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getRole, UserRole } from '@/data/roles/role';
import { useAuth } from '@/components/contexts/authContext'; // <--- Import useAuth

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { setAuthRole } = useAuth(); // <--- Get setAuthRole from context

  if (!isOpen) return null;

  const handleSignIn = (roleNumber: number) => {
    const role: UserRole = getRole(roleNumber);

    setAuthRole(role); // <--- Update the global state (which also updates localStorage)

    onClose(); // Close the modal

    // Redirect based on the assigned role
    if (role === 'student') {
      router.push('/student/allprograms'); // Redirect to the student programs page
    } else if (role === 'teacher') {
      router.push('/teacher');
    } else if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'superadmin') {
      router.push('/superadmin');
    }
    // If a 'guest' signs in and stays on the same page, the Navbar will update instantly
    // because 'setAuthRole' triggered a state change in the AuthProvider.
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#08228d] text-center">Sign In As</h3>
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            className="bg-[#92D0D3] text-white px-4 py-2 rounded hover:bg-[#6bb7bb] transition font-semibold text-sm sm:text-base"
            onClick={() => handleSignIn(1)} // Student role
          >
            Student
          </button>
          <button
            className="bg-[#08228d] text-white px-4 py-2 rounded hover:bg-[#001f40] transition font-semibold text-sm sm:text-base"
            onClick={() => handleSignIn(2)} // Teacher role
          >
            Teacher
          </button>
          <button
            className="bg-[#FFC72C] text-[#08228d] px-4 py-2 rounded hover:bg-yellow-400 transition font-semibold text-sm sm:text-base"
            onClick={() => handleSignIn(3)} // Admin role
          >
            Admin
          </button>
          <button
            className="bg-[#1E3A5F] text-white px-4 py-2 rounded hover:bg-[#16325c] transition font-semibold text-sm sm:text-base"
            onClick={() => handleSignIn(4)} // SuperAdmin role
          >
            SuperAdmin
          </button>
        </div>
        <button
          className="mt-4 sm:mt-6 text-[#08228d] font-bold w-full text-sm sm:text-base"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignInModal;