// app/components/Admin/AdminInstructorListClient.tsx
// This client component manages the state and logic for the Admin Instructor List page.
// It fetches initial data, handles modal states, and renders the InstructorsSection.

'use client'; // This is a client component.

import React, { useState } from 'react';
import InstructorsSection from './InstructorsSection'; // Import the section component
import Profile from '@/components/ui/Modals/profileview'; // Assume Profile modal exists
// StatusModal is no longer directly used or imported here
import { instructors as initialInstructors, Instructor } from '@/data/data'; // Import initial instructors data
import { instructorStatus as initialInstructorStatus } from '@/data/data'; // Import initial instructor status

// Define InstructorStatus type
interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

export default function AdminInstructorListClient() {
  // Initialize instructors list from data.ts
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(initialInstructors);

  // Initialize instructor status from data.ts
  const [instructorStatus, setInstructorStatus] = useState<InstructorStatus>(initialInstructorStatus);

  // State for opening the profile modal - MODIFIED 'contact' to be required matching Instructor
  const [profileModal, setProfileModal] = useState<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
    contact?: string; // Changed to required as per Instructor interface
  }>(null);

  // Function to handle changing an instructor's status when triggered from Profile modal
  // This function is now passed down to Profile from AdminClient.tsx,
  // so it's not managed here anymore.
  const handleChangeInstructorStatus = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setInstructorStatus(prevStatus => ({
      ...prevStatus,
      [instructorEmail]: statusToSet,
    }));
    console.log(`Status of ${instructorName} (${instructorEmail}) changed to ${statusToSet}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* Render the InstructorsSection, passing all necessary props */}
      <InstructorsSection
        instructorsList={instructorsList}
        setInstructorsList={setInstructorsList}
        setProfileModal={setProfileModal} // Pass the setter for the profile modal
        instructorStatus={instructorStatus}
        // Removed setStatusModal prop as it's no longer needed for direct StatusModal pop-up
      />

      {/* Render Profile Modal conditionally */}
      {profileModal && (
        <Profile
          isOpen={!!profileModal}
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true} // Admin can view instructor profiles
          instructorStatus={instructorStatus} // Pass the instructor status map
          onStatusChange={handleChangeInstructorStatus} // Pass the status change handler
        />
      )}
    </div>
  );
}
