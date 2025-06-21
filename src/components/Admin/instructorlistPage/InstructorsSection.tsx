'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import AddInstructorModal from '@/components/ui/Modals/AdminModals/addinstructorModal';
import type { Instructor } from '@/data/data';
import SearchBar from '@/components/ui/SearchBar/SearchBar';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

interface StatusModalData {
  isOpen: boolean;
  instructorName: string;
  instructorEmail: string;
  statusToSet: 'active' | 'inactive';
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface InstructorsSectionProps {
  instructorsList: Instructor[];
  setInstructorsList: React.Dispatch<React.SetStateAction<Instructor[]>>;
  setProfileModal: React.Dispatch<React.SetStateAction<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    contact?: string;
    type?: 'instructor' | 'student';
  }>>;
  instructorStatus: InstructorStatus;
  setInstructorStatus: Dispatch<SetStateAction<InstructorStatus>>; // ✅ added
  archivedInstructors: string[];
  setArchivePrompt: Dispatch<SetStateAction<ArchivePrompt | null>>;
  setStatusModal: Dispatch<SetStateAction<StatusModalData | null>>;
}

export default function InstructorsSection({
  instructorsList,
  setInstructorsList,
  setProfileModal,
  instructorStatus,
  setInstructorStatus, // ✅ added
  archivedInstructors,
  setArchivePrompt,
}: InstructorsSectionProps) {
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Ensure all instructors have a default 'active' status
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

    // ✅ Set new instructor's status to 'active'
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
        {filteredInstructors.length === 0 && (
          <li className="text-gray-500 italic text-sm p-4">No instructors found.</li>
        )}
        {filteredInstructors.map((inst, idx) => (
          <li
            key={idx}
            className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-gray-100 transition"
          >
            <div
              className="flex items-center flex-grow cursor-pointer"
              onClick={() =>
                setProfileModal({
                  ...inst,
                  bio: inst.bio || 'No bio provided.',
                  type: 'instructor',
                })
              }
              aria-label={`View profile of ${inst.name}`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
                <Image
                  src={inst.img && inst.img.trim() !== '' ? inst.img : '/profileicon.png'}
                  alt={inst.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 ml-3">
                <span className="font-semibold text-[#08228d] text-sm sm:text-base block">{inst.name}</span>
                <span className="block text-gray-500 text-xs sm:text-sm">{inst.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${
                  instructorStatus[inst.email] === 'active'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                } transition`}
              >
                {instructorStatus[inst.email]}
              </span>
              <button
                className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setArchivePrompt({ open: true, type: 'instructor', name: inst.name });
                }}
              >
                Archive
              </button>
            </div>
          </li>
        ))}
      </ul>

      <AddInstructorModal
        isOpen={showAddInstructorModal}
        onClose={() => setShowAddInstructorModal(false)}
        onAdd={handleAddInstructor}
      />
    </div>
  );
}
