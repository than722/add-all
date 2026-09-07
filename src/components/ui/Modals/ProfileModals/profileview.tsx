'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditProfileModal from './editprofileModal';
import StatusModal from '../AdminModals/statusModal';
import { useAuth } from '@/components/contexts/authContext';
import { demoRemarksData, Remark } from '@/data/RemarksData';

interface ProfileProps {
  onClose: () => void;
  isOpen?: boolean;
  profile: { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' | 'admin' | 'superadmin'; contact?: string };
  isAdmin?: boolean; // Refers to the role of the *current logged-in user*
  instructorStatus?: { [email: string]: 'active' | 'inactive' };
  onStatusChange?: (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => void;
  hideLogout?: boolean;
  hideNotifications?: boolean;
}

export default function Profile({
  onClose,
  profile,
  isAdmin,
  instructorStatus,
  onStatusChange,
  hideLogout,
  hideNotifications,
}: ProfileProps) {
  const router = useRouter();
  const { setAuthRole } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileState, setProfileState] = useState({
    name: profile.name,
    contactNo: profile.contact || '',
  });

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusToConfirm, setStatusToConfirm] = useState<'active' | 'inactive' | null>(null);

  // State to manage active tab: 'notifications' or 'feedbacks'
  const [activeTab, setActiveTab] = useState<'notifications' | 'feedbacks'>('notifications');

  const notifications = [
    { id: 1, message: 'Your enrollment for Floristry has been approved.' },
    { id: 2, message: 'New program: Acrylic Painting is now available!' },
    { id: 3, message: 'Your payment receipt was received.' },
    { id: 4, message: 'Reminder: Complete your course assignments for Basic Photography.' },
    { id: 5, message: 'Your class for Digital Art has been cancelled due to instructor unavailability.' },
  ];

  // isAdminProfileView means the current logged-in user is an admin AND they are viewing an instructor or student profile.
  const isAdminProfileView = isAdmin && (profile.type === 'instructor' || profile.type === 'student');

  const handleLogout = () => {
    setAuthRole('guest'); // Assuming 'guest' is the role after logout
    onClose();
    router.push('/');
  };

  const currentInstructorStatus =
    profile.type === 'instructor' && instructorStatus ? instructorStatus[profile.email] : undefined;

  const handleStatusChangeClick = (status: 'active' | 'inactive') => {
    setStatusToConfirm(status);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (statusToConfirm && onStatusChange) {
      onStatusChange(profile.name, profile.email, statusToConfirm);
    }
    setIsStatusModalOpen(false);
    setStatusToConfirm(null);
  };

  const handleCancelStatusChange = () => {
    setIsStatusModalOpen(false);
    setStatusToConfirm(null);
  };

  // -------- Remarks / Conversation State --------
  const remarksForThisStudent: Remark[] = demoRemarksData[profile.email] || [];
  const [newReplies, setNewReplies] = useState<{ [remarkId: number]: string }>({});

  const handleReplyChange = (remarkId: number, text: string) => {
    setNewReplies((prev) => ({ ...prev, [remarkId]: text }));
  };

  const handleSendReply = (remarkId: number, sender: 'instructor' | 'student') => {
    const text = newReplies[remarkId]?.trim();
    if (text) {
      const remark = remarksForThisStudent.find((r) => r.id === remarkId);
      if (remark) {
        remark.conversation.push({ sender, message: text });
        setNewReplies((prev) => ({ ...prev, [remarkId]: '' }));
      }
    }
  };

  // Determine if the Feedbacks tab should be shown (only for student or instructor profiles)
  const showFeedbacksTab = profile.type === 'student' || profile.type === 'instructor';

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative animate-fade-in flex flex-col md:flex-row max-h-[90vh]">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-light cursor-pointer z-10"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Left Side: Profile Details and Actions */}
          <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
            <h2 className="text-xl font-extrabold text-[#08228d] mb-6 border-b pb-3">User Profile</h2>
            
            <div className="text-center mb-6 flex flex-col items-center">
              <Image 
                src={profile.img} 
                alt={profile.name} 
                width={120} 
                height={120} 
                className="rounded-full mb-4 border-4 border-[#08228d] object-cover" 
              />
              <p className="font-bold text-[#08228d] text-xl mb-1">{profileState.name}</p>
              <p className="text-sm text-gray-600">{profile.email}</p>
              {profileState.contactNo && <p className="text-sm text-gray-600 mt-1">Contact: {profileState.contactNo}</p>}
              {profile.type && <p className="text-xs text-gray-400 mt-1 capitalize">Role: {profile.type}</p>}
            </div>

            {/* Admin status buttons for instructors (only shown if current user is admin AND viewing an instructor profile) */}
            {isAdmin && profile.type === 'instructor' && instructorStatus && onStatusChange && (
              <div className="flex gap-3 mb-4">
                <button
                  className={`flex-1 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                    currentInstructorStatus === 'active' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'bg-gray-100 text-[#08228d] hover:bg-gray-200'
                  } font-semibold`}
                  onClick={() => handleStatusChangeClick('active')}
                  disabled={currentInstructorStatus === 'active'}
                >
                  Active
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                    currentInstructorStatus === 'inactive' 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-gray-100 text-[#08228d] hover:bg-gray-200'
                  } font-semibold`}
                  onClick={() => handleStatusChangeClick('inactive')}
                  disabled={currentInstructorStatus === 'inactive'}
                >
                  Inactive
                </button>
              </div>
            )}

            {/* Edit Profile button: Shown for admin viewing instructor/student, OR non-admin viewing their own student/instructor/admin/superadmin profile */}
            {(isAdminProfileView || (!isAdmin && ['student', 'instructor', 'admin', 'superadmin'].includes(profile.type || ''))) && (
              <button
                className="w-full bg-[#08228d] text-white py-2.5 rounded-lg hover:bg-[#1a3d7c] transition-colors duration-200 text-sm font-medium shadow-md mt-auto cursor-pointer"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
            )}

            {/* Logout button: Hidden if hideLogout is true or if the current user is an admin viewing another profile (in which case, admin is assumed to have their own logout elsewhere) */}
            {!isAdminProfileView && !hideLogout && (
              <button
                className="w-full bg-gray-200 text-[#08228d] py-2.5 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm font-medium mt-3 shadow-sm cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          {/* Right Side: Tabbed Content (Notifications & Feedbacks) */}
          <div className="w-full md:w-2/3 p-6 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-3 px-4 text-center text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'text-[#08228d] border-b-2 border-[#08228d]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              {showFeedbacksTab && ( // Conditionally render Feedbacks tab
                <button
                  className={`py-3 px-4 text-center text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    activeTab === 'feedbacks'
                      ? 'text-[#08228d] border-b-2 border-[#08228d]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('feedbacks')}
                >
                  Feedbacks
                </button>
              )}
            </div>

            {/* Tab Content */}
            {activeTab === 'notifications' && (
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-lg font-bold text-[#08228d] mb-3">Recent Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-gray-400 italic text-sm py-2">No new notifications.</p>
                ) : (
                  <ul className="space-y-3">
                    {notifications.map((notif) => (
                      <li key={notif.id} className="bg-[#f0f4f8] rounded-md px-3 py-2 text-gray-700 text-sm shadow-sm border border-gray-100">
                        {notif.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'feedbacks' && showFeedbacksTab && ( // Ensure feedback content only shows if tab is active and applicable
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-lg font-bold text-[#08228d] mb-3">Conversation Log</h3>
                {remarksForThisStudent.length === 0 ? (
                  <p className="text-gray-500 text-base italic py-4 text-center">No feedback from instructors yet.</p>
                ) : (
                  <ul className="space-y-6">
                    {remarksForThisStudent.map((remark) => (
                      <li key={remark.id} className="bg-[#f9fafb] border border-gray-200 rounded-lg p-4 shadow-md">
                        <p className="font-bold text-[#08228d] text-base mb-2">{remark.title}</p>
                        <ul className="space-y-2 mb-3 text-sm">
                          {remark.conversation.map((entry, idx) => (
                            <li key={idx} className={entry.sender === 'instructor' ? 'text-[#0c4a6e] font-medium' : 'text-gray-800'}>
                              <strong>{entry.sender === 'instructor' ? 'Instructor: ' : 'You: '}</strong>
                              {entry.message}
                            </li>
                          ))}
                        </ul>
                        <textarea
                          placeholder="Write your reply..."
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#08228d] focus:border-transparent mb-2 resize-y"
                          rows={3}
                          value={newReplies[remark.id] || ''}
                          onChange={(e) => handleReplyChange(remark.id, e.target.value)}
                        />
                        <div className="flex justify-end">
                          <button
                            className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm cursor-pointer"
                            onClick={() => handleSendReply(remark.id, 'student')}
                            disabled={!newReplies[remark.id]?.trim()}
                          >
                            Send Reply
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={{ name: profileState.name, contactNo: profileState.contactNo }}
        onSave={(updated) => setProfileState(updated)}
      />

      {isStatusModalOpen && statusToConfirm && (
        <StatusModal
          isOpen={isStatusModalOpen}
          instructorName={profile.name}
          instructorEmail={profile.email}
          statusToSet={statusToConfirm}
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </>
  );
}