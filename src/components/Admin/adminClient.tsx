'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@/components/ui/Modals/ProfileModals/profileview';
import PendingApplicationModal from '@/components/ui/Modals/AdminModals/pendingModal';
import ArchiveModal from '@/components/ui/Modals/AdminModals/archiveModal';
import StatusModal from '@/components/ui/Modals/AdminModals/statusModal';

import {
  instructors as initialInstructors,
  instructorStatus as initialInstructorStatus,
  dummyPendingApps,
  PendingApplication,
  students as initialStudents,
} from '@/data/data';

import InstructorsSection from './instructorlistPage/InstructorsSection';
import StudentsSection from './studentlistPage/StudentSection';

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
  const tab = searchParams?.get('tab') || initialTab || 'programs';

  const [profileModal, setProfileModal] = useState<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
  }>(null);

  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  const [statusModal, setStatusModal] = useState<StatusModalData | null>(null);

  const [instructorsList, setInstructorsList] = useState(initialInstructors);
  const [pendingApps, setPendingApps] = useState(dummyPendingApps);

  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<{
    open: boolean;
    type: 'program' | 'instructor' | 'student';
    name: string;
  } | null>(null);

  const [pendingModalData, setPendingModalData] = useState<PendingApplication | null>(null);

  const allStudentRecords: StudentRecord[] = useMemo(() => {
    const recordsMap = new Map<string, StudentRecord>();

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
        recordsMap.set(app.email, {
          name: app.name,
          email: app.email,
          img: '/profileicon.png',
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
  }, [initialStudents, pendingApps]);

  const handleViewProfile = (student: StudentRecord) => {
    setProfileModal({ ...student, type: 'student' });
  };

  const handleViewPending = (application: PendingApplication) => {
    setPendingModalData(application);
  };

  const handleConfirmEnrollment = (email: string, program: string) => {
    setPendingApps(prev =>
      prev.map(app =>
        app.email === email && app.program === program
          ? { ...app, status: 'enrolled' }
          : app
      )
    );
    setPendingModalData(null);
  };
  
  const handleInstructorStatusChange = (
    instructorName: string,
    instructorEmail: string,
    statusToSet: 'active' | 'inactive'
  ) => {
    setInstructorStatus(prev => ({
      ...prev,
      [instructorEmail]: statusToSet,
    }));
    console.log(`Instructor ${instructorName}'s status set to ${statusToSet}`);
  };

  const handleArchiveInstructor = (instructor: string) => {
    setArchivedInstructors(prev => [...prev, instructor]);
    setArchivePrompt(null);
  };

  const handleArchiveStudent = (student: string) => {
    setArchivedStudents(prev => [...prev, student]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-4 py-6 sm:py-10 w-full max-w-auto">
        {tab === 'instructors' && (
          <InstructorsSection
            instructorsList={instructorsList}
            setInstructorsList={setInstructorsList}
            setProfileModal={setProfileModal}
            instructorStatus={instructorStatus}
            setInstructorStatus={setInstructorStatus} 
            setStatusModal={setStatusModal}
            archivedInstructors={archivedInstructors}
            setArchivePrompt={setArchivePrompt}
          />
        )}

        {tab === 'students' && (
          <StudentsSection
            allStudentRecords={allStudentRecords}
            onViewProfile={handleViewProfile}
            onViewPending={handleViewPending}
            pendingApps={pendingApps}
            setPendingApps={setPendingApps}
            setProfileModal={setProfileModal}
            archivedStudents={archivedStudents}
            setArchivePrompt={setArchivePrompt}
          />
        )}
      </div>

      {profileModal && (
        <Profile
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true}
          instructorStatus={instructorStatus}
          onStatusChange={handleInstructorStatusChange}
          hideLogout={profileModal.type === 'student' || profileModal.type === 'instructor'}
          hideNotifications={true}
        />
      )}

      {pendingModalData && (
        <PendingApplicationModal
          pendingModal={pendingModalData}
          onClose={() => setPendingModalData(null)}
          onConfirm={() =>
            handleConfirmEnrollment(pendingModalData.email, pendingModalData.program)
          }
        />
      )}

      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type={archivePrompt.type}
          name={archivePrompt.name}
          onConfirm={
            archivePrompt.type === 'instructor'
              ? () => handleArchiveInstructor(archivePrompt.name)
              : () => handleArchiveStudent(archivePrompt.name)
          }
          onCancel={() => setArchivePrompt(null)}
        />
      )}

      <StatusModal
        isOpen={!!statusModal?.isOpen}
        instructorName={statusModal?.instructorName || ''}
        instructorEmail={statusModal?.instructorEmail || ''}
        statusToSet={statusModal?.statusToSet || 'active'}
        onConfirm={() => {
          if (statusModal) {
            setInstructorStatus(prev => ({
              ...prev,
              [statusModal.instructorEmail]: statusModal.statusToSet,
            }));
            setStatusModal(null);
          }
        }}
        onCancel={() => setStatusModal(null)}
      />
    </div>
  );
}
