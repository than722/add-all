'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Instructor } from '@/data/data';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import CardInstructorList from '@/components/ui/CardList/CardInstructorList'; // ✅ Import the card list

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface SuperAdminInstructorsSectionProps {
  instructorsList: Instructor[];
  setProfileModal: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    img: string;
    bio: string;
    contact?: string;
    type?: 'instructor' | 'student';
  } | null>>;
  instructorStatus: InstructorStatus;
  setInstructorStatus: React.Dispatch<React.SetStateAction<InstructorStatus>>;
  archivedInstructors: string[];
  setArchivePrompt: React.Dispatch<React.SetStateAction<ArchivePrompt | null>>;
}

export default function SuperAdminInstructorsSection({
  instructorsList,
  setProfileModal,
  instructorStatus,
  setInstructorStatus,
  archivedInstructors,
  setArchivePrompt,
}: SuperAdminInstructorsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize instructor status if missing
  useEffect(() => {
    instructorsList.forEach((inst) => {
      if (!instructorStatus[inst.email]) {
        setInstructorStatus((prev) => ({
          ...prev,
          [inst.email]: 'active',
        }));
      }
    });
  }, [instructorsList, instructorStatus, setInstructorStatus]);

  const filteredInstructors = instructorsList
    .filter((inst) => !archivedInstructors.includes(inst.name))
    .filter((inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#08228d]">Instructors</h2>
      </div>

      <SearchBar
        placeholder="Search instructors..."
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <ul className="space-y-2 sm:space-y-3">
        <CardInstructorList
          instructors={filteredInstructors}
          instructorStatus={instructorStatus}
          setProfileModal={setProfileModal}
          setArchivePrompt={setArchivePrompt}
        />
      </ul>
    </div>
  );
}
