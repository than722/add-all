'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditProfileModal from './editprofileModal';

interface ProfileProps {
  onClose: () => void;
  profile: { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' };
  isAdmin?: boolean;
  instructorStatus?: { [email: string]: 'active' | 'inactive' };
  onStatusChange?: (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => void;
  hideLogout?: boolean;
}

export default function Profile({ onClose, profile, isAdmin, instructorStatus, onStatusChange, hideLogout }: ProfileProps) {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileState, setProfileState] = useState({
    name: profile.name,
    contactNo: '', // You may want to add contactNo to the profile prop or fetch it from somewhere
  });

  // Dummy notifications
  const notifications = [
    { id: 1, message: 'Your enrollment for Floristry has been approved.' },
    { id: 2, message: 'New program: Acrylic Painting is now available!' },
    { id: 3, message: 'Your payment receipt was received.' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-lg md:max-w-2xl flex flex-col md:flex-row gap-4 sm:gap-6 relative">
        {/* Close button always top right */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
          onClick={onClose}
          aria-label="Close profile modal"
        >
          ✕
        </button>
        {/* Profile Info */}
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#002B5C]">User Profile</h2>
          </div>
          <div className="text-center mb-3 sm:mb-4">
            <Image
              src={profile.img}
              alt={profile.name}
              width={80}
              height={80}
              className="mx-auto rounded-full mb-2"
            />
            <p className="font-semibold text-[#002B5C] text-base sm:text-lg">{profileState.name}</p>
            <p className="text-xs sm:text-sm text-gray-500">{profile.email}</p>
            {profileState.contactNo && (
              <p className="text-xs sm:text-sm text-gray-500">{profileState.contactNo}</p>
            )}
          </div>
          <div className="space-y-2">
            {/* Admin controls for instructor status */}
            {isAdmin && profile.type === 'instructor' && instructorStatus && onStatusChange && (
              <div className="flex gap-2 mb-2">
                <button
                  className={`flex-1 py-2 rounded text-xs sm:text-base ${instructorStatus[profile.email] === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-[#002B5C]'} font-semibold`}
                  onClick={() => onStatusChange(profile.name, profile.email, 'active')}
                  disabled={instructorStatus[profile.email] === 'active'}
                >
                  Active
                </button>
                <button
                  className={`flex-1 py-2 rounded text-xs sm:text-base ${instructorStatus[profile.email] === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-[#002B5C]'} font-semibold`}
                  onClick={() => onStatusChange(profile.name, profile.email, 'inactive')}
                  disabled={instructorStatus[profile.email] === 'inactive'}
                >
                  Inactive
                </button>
              </div>
            )}
            <button className="w-full bg-[#002B5C] text-white py-2 rounded hover:bg-[#1a3d7c] transition text-xs sm:text-base" onClick={() => setShowEditModal(true)}>
              Edit Profile
            </button>
            {!hideLogout && (
              <button
                className="w-full bg-gray-200 text-[#002B5C] py-2 rounded hover:bg-gray-300 transition text-xs sm:text-base"
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
            )}
          </div>
        </div>
        {/* Notifications Panel */}
        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l md:pl-6 mt-4 md:mt-0 relative pt-4 md:pt-0">
          <h3 className="text-sm sm:text-md font-bold text-[#002B5C] mb-2 sm:mb-3">Notifications</h3>
          <ul className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-64 overflow-y-auto pr-1 sm:pr-2">
            {notifications.length === 0 ? (
              <li className="text-gray-400 text-xs sm:text-sm">No notifications.</li>
            ) : (
              notifications.map((notif) => (
                <li key={notif.id} className="bg-[#f1f5f9] rounded px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 shadow-sm">
                  {notif.message}
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={{ name: profileState.name, contactNo: profileState.contactNo }}
          onSave={(updated) => setProfileState(updated)}
        />
      </div>
    </div>
  );
}
