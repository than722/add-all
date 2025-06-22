'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import type { PendingApplication, StudentRecord } from '@/data/data';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import CardStudentList from '@/components/ui/CardList/CardStudentList'; // ✅ Modular component

interface ArchivePrompt {
  open: boolean;
  type: 'instructor' | 'student' | 'program';
  name: string;
}

interface StudentsSectionSuperAdminProps {
  allStudentRecords: StudentRecord[];
  onViewProfile: (student: StudentRecord) => void;
  onViewPending: (application: PendingApplication) => void;
  pendingApps: PendingApplication[];
  setPendingApps: Dispatch<SetStateAction<PendingApplication[]>>;
  setProfileModal: Dispatch<SetStateAction<{
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
    contact?: string;
  } | null>>;
  archivedStudents: string[];
  setArchivePrompt: Dispatch<SetStateAction<ArchivePrompt | null>>;
}

export default function StudentsSectionSuperAdmin({
  allStudentRecords,
  onViewProfile,
  onViewPending,
  setProfileModal,
  archivedStudents,
  setArchivePrompt,
}: StudentsSectionSuperAdminProps) {
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
          onViewPending={onViewPending}
          setProfileModal={setProfileModal}
          setArchivePrompt={setArchivePrompt}
        />
      </ul>
    </div>
  );
}
