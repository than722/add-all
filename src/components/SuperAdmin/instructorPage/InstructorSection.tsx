'use client';

import React, { useState, useEffect } from 'react';
import type { Instructor } from '@/data/data';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import CardInstructorList from '@/components/ui/CardList/CardInstructorList';
import AddInstructorModal from '@/components/ui/Modals/AdminModals/addinstructorModal';

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
  setInstructorsList: React.Dispatch<React.SetStateAction<Instructor[]>>;
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
  setInstructorsList,
  setProfileModal,
  instructorStatus,
  setInstructorStatus,
  archivedInstructors,
  setArchivePrompt,
}: SuperAdminInstructorsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);

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

  const handleAddInstructor = (instructor: { name: string; email: string; contact: string; img: string }) => {
    setInstructorsList((prev) => [
      ...prev,
      { ...instructor, bio: 'New instructor.' },
    ]);

    setInstructorStatus((prev) => ({
      ...prev,
      [instructor.email]: 'active',
    }));

    setShowAddInstructorModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#08228d]">Instructors</h2>
        <button
          className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto cursor-pointer"
          onClick={() => setShowAddInstructorModal(true)}
        >
          + Add Instructor
        </button>
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

      <AddInstructorModal
        isOpen={showAddInstructorModal}
        onClose={() => setShowAddInstructorModal(false)}
        onAdd={handleAddInstructor}
      />
    </div>
  );
}
