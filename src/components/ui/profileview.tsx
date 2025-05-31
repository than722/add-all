'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileProps {
  onClose: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#002B5C]">User Profile</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close profile modal"
          >
            ✕
          </button>
        </div>
        <div className="text-center mb-4">
          <Image
            src="/profileicon.png"
            alt="User"
            width={80}
            height={80}
            className="mx-auto rounded-full mb-2"
          />
          <p className="font-semibold text-[#002B5C]">Juan Dela Cruz</p>
          <p className="text-sm text-gray-500">student@example.com</p>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-[#002B5C] text-white py-2 rounded hover:bg-[#1a3d7c] transition">
            Edit Profile
          </button>
          <button
            className="w-full bg-gray-200 text-[#002B5C] py-2 rounded hover:bg-gray-300 transition"
            onClick={() => {
              onClose();
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
