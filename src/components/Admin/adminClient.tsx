'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Profile from '@/components/ui/Modals/ProfileModals/profileview';
import PendingApplicationModal from '@/components/ui/Modals/AdminModals/pendingModal'; // Ensure this is the correct modal for pending applications
import ArchiveModal from '@/components/ui/Modals/AdminModals/archiveModal'; // Import ArchiveModal
import StatusModal from '@/components/ui/Modals/AdminModals/statusModal'; // Import StatusModal

import {
  instructors as initialInstructors,
  instructorStatus as initialInstructorStatus,
  dummyPendingApps,
  PendingApplication,
  students as initialStudents, // Import initial students data
  dummyDetails, // Import dummyDetails for program initialization
} from '@/data/data';
import { programsList as rawProgramsList } from '@/data/programsData';
import type { Program, Instructor, Student } from '@/data/data'; // Import Student and Program types

// Import sub-components for other sections
import InstructorsSection from './instructorlistPage/InstructorsSection';
import StudentsSection from './studentlistPage/StudentSection'; // Assuming path to AdminSections/StudentsSection or components/Admin/StudentSection
import ProgramsGrid from './ProgramsGrid'; // Assuming ProgramsGrid is in SuperAdmin folder

// Define a consolidated StudentRecord type for passing to StudentsSection
interface StudentRecord {
  name: string;
  email: string;
  img: string;
  bio: string;
  contact: string;
  status: 'registered' | 'pending' | 'enrolled';
  program?: string;
  receiptUrl?: string;
  paymentType?: string;
}

// Define the type for the status modal data, as it's passed between components
interface StatusModalData {
  isOpen: boolean;
  instructorName: string;
  instructorEmail: string;
  statusToSet: 'active' | 'inactive';
}

interface AdminClientProps {
  initialTab: string;
}

export default function AdminClient({ initialTab }: AdminClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams?.get('tab') || initialTab || 'programs'; // Default to 'programs' if no tab in URL

  // Global states for modals
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  const [statusModal, setStatusModal] = useState<StatusModalData | null>(null); // State for the instructor status change modal


  // States for main data lists
  // Correctly initialize adminPrograms to match the full Program interface
  const [adminPrograms, setAdminPrograms] = useState<Program[]>(() => {
    return rawProgramsList.map(p => ({
      program: p.program,
      category: p.category,
      instructor: dummyDetails.instructor, // Assign dummy instructor
      date: dummyDetails.date,
      time: dummyDetails.timeAndSessions.split(' | ')[0], // Extract time
      sessions: dummyDetails.timeAndSessions.split(' | ')[1].replace(' Sessions', ''), // Extract sessions
      description: dummyDetails.description,
      thumbnail: '/add-all logo bg.png', // Default thumbnail or dummy
    }));
  });
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(initialInstructors); // Use initialInstructors directly
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>(dummyPendingApps);

  // States for archiving
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);
  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<{ open: boolean; type: 'program' | 'instructor' | 'student'; name: string } | null>(null);


  // State for pending application modal (for students section)
  const [pendingModalData, setPendingModalData] = useState<PendingApplication | null>(null);


  // --- Consolidated Student Records for StudentsSection ---
  const allStudentRecords: StudentRecord[] = useMemo(() => {
    const recordsMap = new Map<string, StudentRecord>();

    // Add students from `initialStudents` array (registered/enrolled)
    initialStudents.forEach(s => {
      recordsMap.set(s.email, {
        name: s.name,
        email: s.email,
        img: s.img || '/profileicon.png',
        bio: s.bio || '',
        contact: s.contact || 'N/A',
        status: s.status,
      });
    });

    // Merge with any explicit pending applications that might override status
    pendingApps.forEach(app => {
      const existing = recordsMap.get(app.email);
      if (existing) {
        recordsMap.set(app.email, {
          ...existing,
          status: app.status,
          program: app.program,
          receiptUrl: app.receiptUrl,
          paymentType: app.paymentType,
        });
      } else {
        // Add new student if they only exist as a pending application
        recordsMap.set(app.email, {
          name: app.name,
          email: app.email,
          img: '/profileicon.png', // Default image for new applicant
          bio: 'New applicant.',
          contact: 'N/A',
          status: app.status,
          program: app.program,
          receiptUrl: app.receiptUrl,
          paymentType: app.paymentType,
        });
      }
    });

    return Array.from(recordsMap.values());
  }, [initialStudents, pendingApps]); // Re-calculate if initialStudents or pendingApps change

  // --- Handlers for Student Section ---
  const handleViewProfile = (student: StudentRecord) => {
    setProfileModal({ ...student, type: 'student' });
  };

  const handleViewPending = (application: PendingApplication) => {
    setPendingModalData(application);
  };

  const handleConfirmEnrollment = (email: string, program: string) => {
    setPendingApps(prev => prev.map(app =>
      app.email === email && app.program === program
        ? { ...app, status: 'enrolled' }
        : app
    ));
    setPendingModalData(null); // Close the pending modal
  };

  const handleDeclineEnrollment = (email: string, program: string) => {
    setPendingApps(prev => prev.filter(app => !(app.email === email && app.program === program)));
    setPendingModalData(null); // Close the pending modal
  };
  // --- End Student Section Handlers ---


  // Function to handle instructor status change, now directly updating state
  const handleInstructorStatusChange = (instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => {
    setInstructorStatus(prev => ({
      ...prev,
      [instructorEmail]: statusToSet
    }));
    // Close the profile modal after status change, or leave it open, depending on UX choice
    // setProfileModal(null);
    console.log(`Instructor ${instructorName}'s status set to ${statusToSet}`);
  };

  // Archive handlers
  const handleArchiveProgram = (program: string) => { setArchivedPrograms((prev) => [...prev, program]); setArchivePrompt(null); };
  const handleArchiveInstructor = (instructor: string) => { setArchivedInstructors((prev) => [...prev, instructor]); setArchivePrompt(null); };
  const handleArchiveStudent = (student: string) => { setArchivedStudents((prev) => [...prev, student]); setArchivePrompt(null); };


  // Effect to handle redirection for the 'programs' tab
  useEffect(() => {
    if (tab === 'programs') {
      router.replace('/admin/programlist');
    }
  }, [tab, router]);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-4 py-6 sm:py-10 w-full max-w-auto">
        {/* Navigation for AdminClient (if you still have tabs, otherwise remove this structure) */}
        {tab === 'instructors' && (
          <InstructorsSection
            instructorsList={instructorsList}
            setInstructorsList={setInstructorsList} // Assuming InstructorsSection can modify its list
            setProfileModal={setProfileModal}
            instructorStatus={instructorStatus}
            setStatusModal={setStatusModal} // Pass setStatusModal
            archivedInstructors={archivedInstructors} // Pass archived instructors
            setArchivePrompt={setArchivePrompt} // Pass archive prompt setter
          />
        )}

        {tab === 'students' && (
          <StudentsSection
            allStudentRecords={allStudentRecords} // Passed all consolidated student records
            onViewProfile={handleViewProfile} // Handler for viewing profile
            onViewPending={handleViewPending} // Handler for pending applications
            pendingApps={pendingApps} // List of current pending apps
            setPendingApps={setPendingApps} // Setter for pending apps state
            setProfileModal={setProfileModal} // Setter for profile modal state
            archivedStudents={archivedStudents} // Pass archived students
            setArchivePrompt={setArchivePrompt} // Pass archive prompt setter
          />
        )}

        {/* Removed program conditional rendering here based on useEffect redirect */}
      </div>

      {/* Profile Modal */}
      {profileModal && (
        <Profile
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true}
          instructorStatus={instructorStatus}
          onStatusChange={handleInstructorStatusChange} // Pass the direct handler
          hideLogout={profileModal.type === 'student' || profileModal.type === 'instructor'}
          hideNotifications={true}
        />
      )}

      {/* Pending Application Modal (for students section) */}
      {pendingModalData && (
        <PendingApplicationModal
          pendingModal={pendingModalData} // Check prop name, your modal used `pendingModal`
          onClose={() => setPendingModalData(null)}
          onConfirm={() => handleConfirmEnrollment(pendingModalData.email, pendingModalData.program)} // Pass correct arguments
        />
      )}

      {/* Archive Modal */}
      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type={archivePrompt.type}
          name={archivePrompt.name}
          onConfirm={
            archivePrompt.type === 'program' ? () => handleArchiveProgram(archivePrompt.name) :
            archivePrompt.type === 'instructor' ? () => handleArchiveInstructor(archivePrompt.name) :
            () => handleArchiveStudent(archivePrompt.name)
          }
          onCancel={() => setArchivePrompt(null)}
        />
      )}

      {/* Instructor Status Change Confirmation Modal - Now rendered here in AdminClient */}
      <StatusModal
        isOpen={!!statusModal?.isOpen}
        instructorName={statusModal?.instructorName || ''}
        instructorEmail={statusModal?.instructorEmail || ''}
        statusToSet={statusModal?.statusToSet || 'active'}
        onConfirm={() => {
          if (statusModal) {
            setInstructorStatus((prev) => ({ ...prev, [statusModal.instructorEmail]: statusModal.statusToSet }));
            setStatusModal(null); // Close the status modal after confirmation
          }
        }}
        onCancel={() => setStatusModal(null)} // Close on cancel
      />
    </div>
  );
}
