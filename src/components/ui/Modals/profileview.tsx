'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditProfileModal from './editprofileModal'; // Ensure this path is correct
import StatusModal from './statusModal'; // Import the StatusModal
import { useAuth } from '@/components/contexts/authContext'; // Import the useAuth hook

interface ProfileProps {
  onClose: () => void;
  isOpen?: boolean;
  profile: { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student'; contact?: string; }; // Added contact to profile
  isAdmin?: boolean;
  instructorStatus?: { [email: string]: 'active' | 'inactive' }; // Passed from AdminInstructorListClient
  // onStatusChange now expects specific arguments (name, email, statusToSet)
  onStatusChange?: (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => void;
  hideLogout?: boolean;
  hideNotifications?: boolean;
}

export default function Profile({ onClose, profile, isAdmin, instructorStatus, onStatusChange, hideLogout, hideNotifications }: ProfileProps) {
  const router = useRouter();
  const { setAuthRole } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileState, setProfileState] = useState({
    name: profile.name,
    // Initialize contactNo from profile.contact or as an empty string
    contactNo: profile.contact || '', 
  });

  // State for the status confirmation modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusToConfirm, setStatusToConfirm] = useState<'active' | 'inactive' | null>(null);

  // Dummy notifications
  const notifications = [
    { id: 1, message: 'Your enrollment for Floristry has been approved.' },
    { id: 2, message: 'New program: Acrylic Painting is now available!' },
    { id: 3, message: 'Your payment receipt was received.' },
  ];

  // Detect if this is an admin view (for instructors or students)
  const isAdminProfileView = isAdmin && (profile.type === 'instructor' || profile.type === 'student');

  const handleLogout = () => {
    setAuthRole('guest'); // Update the global state
    onClose(); // Close the profile modal
    router.push('/'); // Redirect to the home page
  };

  // Determine current status for instructor in admin view
  const currentInstructorStatus = profile.type === 'instructor' && instructorStatus && instructorStatus[profile.email]
    ? instructorStatus[profile.email]
    : undefined;

  // Function to initiate status change (opens confirmation modal)
  const handleStatusChangeClick = (status: 'active' | 'inactive') => {
    setStatusToConfirm(status);
    setIsStatusModalOpen(true);
  };

  // Function to confirm status change (called from StatusModal)
  const handleConfirmStatusChange = () => {
    if (statusToConfirm && onStatusChange) { // Ensure onStatusChange is available
      onStatusChange(profile.name, profile.email, statusToConfirm);
    }
    setIsStatusModalOpen(false); // Close status confirmation modal
    setStatusToConfirm(null); // Reset status to confirm
  };

  // Function to cancel status change (called from StatusModal)
  const handleCancelStatusChange = () => {
    setIsStatusModalOpen(false); // Close status confirmation modal
    setStatusToConfirm(null); // Reset status to confirm
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
        <div className={
          isAdminProfileView
            ? "bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md min-w-[340px] flex flex-col items-center relative animate-fade-in"
            : "bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-lg md:max-w-2xl flex flex-col md:flex-row gap-4 sm:gap-6 relative"
        }>
          {/* Close button always top right */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
            onClick={onClose}
            aria-label="Close profile modal"
          >
            ✕
          </button>
          {/* Profile Info */}
          <div className={isAdminProfileView ? "w-full flex flex-col items-center" : "w-full md:w-1/2"}>
            <div className="flex justify-between items-center mb-3 sm:mb-4 w-full">
              <h2 className="text-base sm:text-lg font-bold text-[#08228d]">User Profile</h2>
            </div>
            <div className="text-center mb-3 sm:mb-4 w-full flex flex-col items-center">
              <Image
                src={profile.img}
                alt={profile.name}
                width={100}
                height={100}
                className="mx-auto rounded-full mb-2 w-24 h-24 object-cover"
              />
              <p className="font-semibold text-[#08228d] text-lg sm:text-xl break-words w-full">{profileState.name}</p>
              <p className="text-xs sm:text-sm text-gray-500 break-words w-full">{profile.email}</p>
              {profileState.contactNo && (
                <p className="text-xs sm:text-sm text-gray-500 break-words w-full">Contact: {profileState.contactNo}</p>
              )}
            </div>
            {/* Status Change Buttons (only for admin viewing instructor profile) */}
            {isAdminProfileView && profile.type === 'instructor' && instructorStatus && onStatusChange && (
              <div className="flex gap-2 mb-2 w-full">
                <button
                  className={`flex-1 py-2 rounded text-xs sm:text-base ${currentInstructorStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-[#08228d]'} font-semibold`}
                  onClick={() => handleStatusChangeClick('active')} // Changed to open confirmation modal
                  disabled={currentInstructorStatus === 'active'}
                >
                  Active
                </button>
                <button
                  className={`flex-1 py-2 rounded text-xs sm:text-base ${currentInstructorStatus === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-[#08228d]'} font-semibold`}
                  onClick={() => handleStatusChangeClick('inactive')} // Changed to open confirmation modal
                  disabled={currentInstructorStatus === 'inactive'}
                >
                  Inactive
                </button>
              </div>
            )}
            {/* Edit Profile Button (for admin viewing any profile type, or for user viewing their own profile) */}
            {isAdminProfileView || (!isAdmin && (profile.type === 'student' || profile.type === 'instructor')) ? (
              <button className="w-full bg-[#08228d] text-white py-2 rounded hover:bg-[#1a3d7c] transition text-xs sm:text-base mt-2" onClick={() => setShowEditModal(true)}>
                Edit Profile
              </button>
            ) : null}

            {/* Logout button (only for the currently logged-in user's own profile, not when admin views others) */}
            {!isAdminProfileView && !hideLogout && (
              <button
                className="w-full bg-gray-200 text-[#08228d] py-2 rounded hover:bg-gray-300 transition text-xs sm:text-base mt-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
          {/* Notifications Panel (only for the currently logged-in user's own profile, not when admin views others) */}
          {!hideNotifications && !isAdminProfileView && (
            <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l md:pl-6 mt-4 md:mt-0 relative pt-4 md:pt-0">
              <h3 className="text-sm sm:text-md font-bold text-[#08228d] mb-2 sm:mb-3">Notifications</h3>
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
          )}
          {/* Edit Profile Modal */}
          <EditProfileModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            profile={{ name: profileState.name, contactNo: profileState.contactNo }}
            onSave={(updated) => setProfileState(updated)}
          />
        </div>
      </div>

      {/* Status Confirmation Modal - Rendered outside the main modal content but within the same fragment */}
      {isStatusModalOpen && statusToConfirm && (
        <StatusModal
          isOpen={isStatusModalOpen}
          instructorName={profile.name}
          statusToSet={statusToConfirm}
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </>
  );
}