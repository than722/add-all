'use client';

import React, { useState } from 'react';
import InstructorsSectionSuperAdmin from './InstructorSection'; // Import the new Super Admin specific Instructors Section
import Profile from '@/components/ui/Modals/profileview';
import StatusModal from '@/components/ui/Modals/statusModal'; // Import StatusModal
import ArchiveModal from '@/components/ui/Modals/archiveModal'; // Import ArchiveModal

import { instructors as initialInstructors, Instructor } from '@/data/data';
import { instructorStatus as initialInstructorStatus } from '@/data/data';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

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

export default function SuperAdminInstructorListClient() {
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(initialInstructors);
  const [instructorStatus, setInstructorStatus] = useState<InstructorStatus>(initialInstructorStatus);

  const [profileModal, setProfileModal] = useState<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
    contact?: string; // Ensure contact is included in this type
  }>(null);

  const [statusModal, setStatusModal] = useState<StatusModalData | null>(null);

  const [archivePrompt, setArchivePrompt] = useState<ArchivePrompt | null>(null);

  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);

  // Handler for changing instructor status
  const handleChangeInstructorStatus = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setInstructorStatus(prevStatus => ({
      ...prevStatus,
      [instructorEmail]: statusToSet,
    }));
    console.log(`Status of ${instructorName} (${instructorEmail}) changed to ${statusToSet}`);
  };

  // Handler for archiving an instructor
  const handleArchiveInstructor = (name: string) => {
    setArchivedInstructors((prev) => [...prev, name]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <InstructorsSectionSuperAdmin
        instructorsList={instructorsList}
        setInstructorsList={setInstructorsList}
        setProfileModal={setProfileModal}
        instructorStatus={instructorStatus}
        archivedInstructors={archivedInstructors}
        setArchivePrompt={setArchivePrompt}
        setStatusModal={setStatusModal}
      />

      {profileModal && (
        <Profile
          isOpen={!!profileModal}
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true} // Super Admin has admin privileges for viewing profiles
          instructorStatus={instructorStatus}
          onStatusChange={handleChangeInstructorStatus} // Pass the handler
        />
      )}

      {statusModal && (
        <StatusModal
          isOpen={!!statusModal.isOpen}
          instructorName={statusModal.instructorName}
          instructorEmail={statusModal.instructorEmail}
          statusToSet={statusModal.statusToSet}
          onConfirm={() => {
            // Confirm the status change in the main state
            handleChangeInstructorStatus(statusModal.instructorName, statusModal.instructorEmail, statusModal.statusToSet);
            setStatusModal(null); // Close the status modal
          }}
          onCancel={() => setStatusModal(null)} // Close on cancel
        />
      )}

      {archivePrompt && archivePrompt.type === 'instructor' && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type="instructor"
          name={archivePrompt.name}
          onConfirm={() => handleArchiveInstructor(archivePrompt.name)}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
}