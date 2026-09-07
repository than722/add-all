'use client';

import React, { useState } from 'react';
import InstructorsSection from './InstructorsSection';
import Profile from '@/components/ui/Modals/ProfileModals/profileview';
import ArchiveModal from '@/components/ui/Modals/AdminModals/archiveModal';
import { instructors as initialInstructors, Instructor } from '@/data/data';

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

export default function AdminInstructorListClient() {
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(initialInstructors);
  const [instructorStatus, setInstructorStatus] = useState<InstructorStatus>({});
  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);

  const [profileModal, setProfileModal] = useState<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
    contact?: string;
  }>(null);

  const [archivePrompt, setArchivePrompt] = useState<ArchivePrompt | null>(null);

  const [, setStatusModal] = useState<StatusModalData | null>(null);

  const handleChangeInstructorStatus = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setStatusModal(null);
    setInstructorStatus(prevStatus => ({
      ...prevStatus,
      [instructorEmail]: statusToSet,
    }));
    console.log(`Status of ${instructorName} (${instructorEmail}) changed to ${statusToSet}`);
  };

  const handleArchiveInstructor = (instructorName: string) => {
    setArchivedInstructors(prev => [...prev, instructorName]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <InstructorsSection
        instructorsList={instructorsList}
        setInstructorsList={setInstructorsList}
        setProfileModal={setProfileModal}
        instructorStatus={instructorStatus}
        archivedInstructors={archivedInstructors}
        setInstructorStatus={setInstructorStatus}
        setArchivePrompt={setArchivePrompt}
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

      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type={archivePrompt.type}
          name={archivePrompt.name}
          onConfirm={() => {
            if (archivePrompt.type === 'instructor') {
              handleArchiveInstructor(archivePrompt.name);
            }
            setArchivePrompt(null);
          }}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
}
