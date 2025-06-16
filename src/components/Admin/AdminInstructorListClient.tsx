'use client'; 

import React, { useState } from 'react';
import InstructorsSection from './InstructorsSection';
import Profile from '@/components/ui/Modals/profileview';
import { instructors as initialInstructors, Instructor } from '@/data/data';
import { instructorStatus as initialInstructorStatus } from '@/data/data';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
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

  // ✅ FIX: Include null in archivePrompt type
  const [archivePrompt, setArchivePrompt] = useState<{
    open: boolean;
    type: 'program' | 'instructor' | 'student';
    name: string;
  } | null>(null);

  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);

  const handleChangeInstructorStatus = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setInstructorStatus(prevStatus => ({
      ...prevStatus,
      [instructorEmail]: statusToSet,
    }));
    console.log(`Status of ${instructorName} (${instructorEmail}) changed to ${statusToSet}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <InstructorsSection
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
          isAdmin={true}
          instructorStatus={instructorStatus}
          onStatusChange={handleChangeInstructorStatus}
        />
      )}
    </div>
  );
}
