'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Profile from '@/components/ui/Modals/profileview';
// Removed StatusModal import as it's no longer directly used here
// import StatusModal from '@/components/ui/Modals/statusModal'; // This was statusChangeModal in previous turns

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

// Import sub-components for other sections
import InstructorsSection from './InstructorsSection'; // Assuming path to AdminSections/InstructorsSection
import StudentsSection from './studentSection'; // Assuming path to AdminSections/StudentsSection

interface AdminClientProps {
  initialTab: string;
}

export default function AdminClient({ initialTab }: AdminClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams?.get('tab') || initialTab || 'programs';

  // Global states that might be shared or need to be managed higher up
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  // Removed statusModal state as it's no longer needed for a direct StatusModal pop-up
  // const [statusModal, setStatusModal] = useState<{ isOpen: boolean; instructorName: string; instructorEmail: string; statusToSet: 'active' | 'inactive' } | null>(null);

  // States for programs, instructors, and pending applications (moved here for central management if needed across sections, or can be moved into respective sections if truly isolated)
  const [adminPrograms, setAdminPrograms] = useState<Program[]>(normalizedProgramsList);
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(normalizedInstructorsList);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>(dummyPendingApps);
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);

  // Function to handle instructor status change, now directly updating state
  const handleInstructorStatusChange = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setInstructorStatus(prev => ({
      ...prev,
      [instructorEmail]: statusToSet
    }));
    // Close the profile modal after status change, or leave it open, depending on UX choice
    // setProfileModal(null); // Uncomment if you want to close profile after status change
    console.log(`Instructor ${instructorName}'s status set to ${statusToSet}`);
  };


  // Effect to handle redirection for the 'programs' tab
  useEffect(() => {
    if (tab === 'programs') {
      router.replace('/admin/programlist'); // Redirect to the dedicated program list page
    }
  }, [tab, router]);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-4 py-6 sm:py-10 w-full max-w-auto">
        {/*
          The 'programs' tab now redirects to /admin/programlist.
          Thus, we no longer render ProgramsSection directly here.
        */}
        {tab === 'instructors' && (
          <InstructorsSection
            instructorsList={instructorsList}
            setInstructorsList={setInstructorsList}
            setProfileModal={setProfileModal}
            instructorStatus={instructorStatus}
            // Removed setStatusModal prop from InstructorsSection
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
          onStatusChange={handleInstructorStatusChange} // Pass the direct handler
          hideLogout={true}
          hideNotifications={true}
        />
      )}
    </div>
  );
}
