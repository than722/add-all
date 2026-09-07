'use client';

import React from 'react';
import StudentListSection from '@/components/StudentListSection/StudentListSection';
import type { PendingApplication, StudentRecord } from '@/data/data';

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface ProfileModalData {
  name: string;
  email: string;
  img: string;
  bio: string;
  contact?: string;
  type?: 'instructor' | 'student';
}

interface StudentsSectionSuperAdminProps {
  allStudentRecords: StudentRecord[];
  onViewProfile: (student: StudentRecord) => void;
  onViewPending: (application: PendingApplication) => void;
  pendingApps: PendingApplication[];
  setPendingApps: React.Dispatch<React.SetStateAction<PendingApplication[]>>;
  setProfileModal: React.Dispatch<React.SetStateAction<ProfileModalData | null>>;
  archivedStudents: string[];
  setArchivePrompt: React.Dispatch<React.SetStateAction<ArchivePrompt | null>>;
}

export default function StudentsSectionSuperAdmin(props: StudentsSectionSuperAdminProps) {
  return (
    <StudentListSection
      {...props}
    />
  );
}
