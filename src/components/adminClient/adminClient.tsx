'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@/components/ui/Modals/profileview';
import StatusModal from '@/components/ui/Modals/statusModal';

import {
  instructors as initialInstructors,
  instructorStatus as initialInstructorStatus,
  dummyPendingApps,
  PendingApplication,
} from '@/data/data';
import { programsList as rawProgramsList } from '@/data/programsData';
import type { Program, Instructor } from '@/data/data';

// --- Normalize initial data for adminPrograms and instructorsList ---
const normalizedProgramsList: Program[] = rawProgramsList.map((p) => ({
  program: p.program,
  category: p.category,
  instructor: '',
  date: '',
  time: '',
  sessions: '',
  description: '',
  thumbnail: '',
}));

const normalizedInstructorsList: Instructor[] = initialInstructors.map((i) => ({
  name: i.name,
  email: i.email,
  contact: '',
  img: i.img,
  bio: i.bio ?? '', // Ensure bio is always a string
}));

// Import the new sub-components
import ProgramsSection from './programSection';
import InstructorsSection from './instructorSection';
import StudentsSection from './studentSection';

interface AdminClientProps {
  initialTab: string;
}

export default function AdminClient({ initialTab }: AdminClientProps) {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || initialTab || 'programs';

  // Global states that might be shared or need to be managed higher up
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  const [statusModal, setStatusModal] = useState<{ isOpen: boolean; instructorName: string; instructorEmail: string; statusToSet: 'active' | 'inactive' } | null>(null);

  // States for programs, instructors, and pending applications (moved here for central management if needed across sections, or can be moved into respective sections if truly isolated)
  const [adminPrograms, setAdminPrograms] = useState<Program[]>(normalizedProgramsList);
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(normalizedInstructorsList);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>(dummyPendingApps);
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-4 py-6 sm:py-10 w-full max-w-auto">
        {tab === 'programs' && (
          <ProgramsSection
            adminPrograms={adminPrograms}
            setAdminPrograms={setAdminPrograms}
            archivedPrograms={archivedPrograms}
            setArchivedPrograms={setArchivedPrograms}
            instructors={instructorsList}
            onViewCourseOutline={(program) => {
              // Navigate to courseoutline page for this program
              window.location.href = `/courseoutline?program=${encodeURIComponent(program.program)}`;
            }}
            onEditCourseOutline={(program) => {
              // Navigate to editcourseoutline page for this program
              window.location.href = `/editcourseoutline?program=${encodeURIComponent(program.program)}`;
            }}
          />
        )}

        {tab === 'instructors' && (
          <InstructorsSection
            instructorsList={instructorsList}
            setInstructorsList={setInstructorsList}
            setProfileModal={setProfileModal}
            instructorStatus={instructorStatus}
            setStatusModal={setStatusModal}
          />
        )}

        {tab === 'students' && (
          <StudentsSection
            pendingApps={pendingApps}
            setPendingApps={setPendingApps}
            setProfileModal={setProfileModal}
          />
        )}
      </div>

      {/* Profile Modal */}
      {profileModal && (
        <Profile
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true}
          instructorStatus={instructorStatus}
          onStatusChange={(instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => setStatusModal({ isOpen: true, instructorName, instructorEmail, statusToSet })}
          hideLogout={true}
          hideNotifications={true}
        />
      )}
      <StatusModal
        isOpen={!!statusModal?.isOpen}
        instructorName={statusModal?.instructorName || ''}
        statusToSet={statusModal?.statusToSet || 'active'}
        onConfirm={() => {
          if (statusModal) {
            setInstructorStatus((prev) => ({ ...prev, [statusModal.instructorEmail]: statusModal.statusToSet }));
            setStatusModal(null);
          }
        }}
        onCancel={() => setStatusModal(null)}
      />
    </div>
  );
}