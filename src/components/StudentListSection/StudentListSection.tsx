'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import CardStudentList from '@/components/ui/CardList/CardStudentList';
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

interface StudentListSectionProps {
  allStudentRecords: StudentRecord[];
  onViewProfile?: (student: StudentRecord) => void;
  onViewPending: (application: PendingApplication) => void;
  pendingApps: PendingApplication[];
  setPendingApps: Dispatch<SetStateAction<PendingApplication[]>>;
  setProfileModal: Dispatch<SetStateAction<ProfileModalData | null>>;
  archivedStudents: string[];
  setArchivePrompt: Dispatch<SetStateAction<ArchivePrompt | null>>;
  variant?: 'default' | 'registeredOnly';
  onAllowPayment?: (studentEmail: string, studentName: string) => void;
}

export default function StudentListSection({
  allStudentRecords,
  onViewProfile,
  onViewPending,
  pendingApps,
  setPendingApps,
  setProfileModal,
  archivedStudents,
  setArchivePrompt,
  variant = 'default',
  onAllowPayment,
}: StudentListSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudentRecords = allStudentRecords
    .filter((record) => !archivedStudents.includes(record.name))
    .filter((record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.program && record.program.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#08228d]">Students</h2>

      <SearchBar
        placeholder="Search students..."
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <ul className="space-y-2 sm:space-y-3">
        <CardStudentList
          students={filteredStudentRecords}
          onViewProfile={onViewProfile}
          onViewPending={onViewPending}
          setProfileModal={setProfileModal}
          setArchivePrompt={setArchivePrompt}
          variant={variant}
          onAllowPayment={onAllowPayment}
        />
      </ul>
    </div>
  );
}
