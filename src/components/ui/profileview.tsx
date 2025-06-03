'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileProps {
  onClose: () => void;
  profile: { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' };
  isAdmin?: boolean;
  instructorStatus?: { [email: string]: 'active' | 'inactive' };
  onStatusChange?: (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => void;
}

export default function Profile({ onClose, profile, isAdmin, instructorStatus, onStatusChange }: ProfileProps) {
  const router = useRouter();

  // Dummy notifications
  const notifications = [
    { id: 1, message: 'Your enrollment for Floristry has been approved.' },
    { id: 2, message: 'New program: Acrylic Painting is now available!' },
    { id: 3, message: 'Your payment receipt was received.' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl flex flex-col md:flex-row gap-6">
        {/* Profile Info */}
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#002B5C]">User Profile</h2>
          </div>
          <div className="text-center mb-4">
            <Image
              src={profile.img}
              alt={profile.name}
              width={80}
              height={80}
              className="mx-auto rounded-full mb-2"
            />
            <p className="font-semibold text-[#002B5C]">{profile.name}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
          <div className="space-y-2">
            {/* Admin controls for instructor status */}
            {isAdmin && profile.type === 'instructor' && instructorStatus && onStatusChange && (
              <div className="flex gap-2 mb-2">
                <button
                  className={`flex-1 py-2 rounded ${instructorStatus[profile.email] === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-[#002B5C]'} font-semibold`}
                  onClick={() => onStatusChange(profile.name, profile.email, 'active')}
                  disabled={instructorStatus[profile.email] === 'active'}
                >
                  Active
                </button>
                <button
                  className={`flex-1 py-2 rounded ${instructorStatus[profile.email] === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-[#002B5C]'} font-semibold`}
                  onClick={() => onStatusChange(profile.name, profile.email, 'inactive')}
                  disabled={instructorStatus[profile.email] === 'inactive'}
                >
                  Inactive
                </button>
              </div>
            )}
            <button className="w-full bg-[#002B5C] text-white py-2 rounded hover:bg-[#1a3d7c] transition">
              Edit Profile
            </button>
            <button
              className="w-full bg-gray-200 text-[#002B5C] py-2 rounded hover:bg-gray-300 transition"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.clear();
                  sessionStorage.clear();
                }
                onClose();
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Notifications Panel */}
        <div className="w-full md:w-1/2 border-l md:pl-6 mt-6 md:mt-0 relative">
          <button
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close profile modal"
          >
            ✕
          </button>
          <h3 className="text-md font-bold text-[#002B5C] mb-3">Notifications</h3>
          <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {notifications.length === 0 ? (
              <li className="text-gray-400 text-sm">No notifications.</li>
            ) : (
              notifications.map((notif) => (
                <li key={notif.id} className="bg-[#f1f5f9] rounded px-3 py-2 text-sm text-gray-700 shadow-sm">
                  {notif.message}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
