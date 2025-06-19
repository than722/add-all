'use client'; 

import React, { useState } from 'react';
import InstructorsSection from './InstructorsSection';
import Profile from '@/components/ui/Modals/ProfileModals/profileview';
import ArchiveModal from '@/components/ui/Modals/AdminModals/archiveModal'; // Import ArchiveModal
import { instructors as initialInstructors, Instructor } from '@/data/data';
import { instructorStatus as initialInstructorStatus } from '@/data/data';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

// Ensure these interfaces are consistent with what your modals and sections expect
interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface StatusModalData {
  isOpen: boolean;
  instructorName: string;
  instructorEmail: string;
  statusToSet: 'active' | 'inactive';
}


export default function AdminInstructorListClient() {
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(initialInstructors);
  const [instructorStatus, setInstructorStatus] = useState<InstructorStatus>(initialInstructorStatus);

  const [profileModal, setProfileModal] = useState<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
    contact?: string;
  }>(null);

  const [statusModal, setStatusModal] = useState<null | {
    isOpen: boolean;
    instructorName: string;
    instructorEmail: string;
    statusToSet: 'active' | 'inactive';
  }>(null);

  const [archivePrompt, setArchivePrompt] = useState<ArchivePrompt | null>(null); // State for ArchiveModal

  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);

  const handleChangeInstructorStatus = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setStatusModal(null); // Close the status modal if it was open
    setInstructorStatus(prevStatus => ({
      ...prevStatus,
      [instructorEmail]: statusToSet,
    }));
    console.log(`Status of ${instructorName} (${instructorEmail}) changed to ${statusToSet}`);
  };

  // Handler for confirming instructor archive
  const handleArchiveInstructor = (instructorName: string) => {
    setArchivedInstructors((prev) => [...prev, instructorName]);
    setArchivePrompt(null); // Close the archive modal
    // Optional: Also remove from instructorsList if you want it completely gone from the active view
    // setInstructorsList(prev => prev.filter(inst => inst.name !== instructorName));
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <InstructorsSection
        instructorsList={instructorsList}
        setInstructorsList={setInstructorsList}
        setProfileModal={setProfileModal}
        instructorStatus={instructorStatus}
        archivedInstructors={archivedInstructors}
        setArchivePrompt={setArchivePrompt} // Pass the setter from THIS component
        setStatusModal={setStatusModal}
      />

      {profileModal && (
        <Profile
          isOpen={!!profileModal}
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true}
          instructorStatus={instructorStatus}
          onStatusChange={handleChangeInstructorStatus}
          hideLogout={profileModal.type === 'student' || profileModal.type === 'instructor'}
          hideNotifications={true}
        />
      )}

      {/* Render the ArchiveModal here */}
      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type={archivePrompt.type}
          name={archivePrompt.name}
          onConfirm={() => {
            if (archivePrompt.type === 'instructor') {
              handleArchiveInstructor(archivePrompt.name);
            }
            // Add other types if this modal is ever used for programs or students in this context
            setArchivePrompt(null); // Ensure modal closes
          }}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
}