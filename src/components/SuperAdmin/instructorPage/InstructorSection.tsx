'use client';

import React, { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import AddInstructorModal from '@/components/ui/Modals/AdminModals/addinstructorModal';
import SearchBar from '@/components/ui/SearchBar/SearchBar'
import type { Instructor } from '@/data/data';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface StatusModalData {
  isOpen: boolean;
  instructorName: string;
  instructorEmail: string;
  statusToSet: 'active' | 'inactive';
}

interface InstructorsSectionSuperAdminProps {
  instructorsList: Instructor[];
  setInstructorsList: React.Dispatch<React.SetStateAction<Instructor[]>>;
  archivedInstructors: string[];
  setProfileModal: Dispatch<SetStateAction<{ name: string; email: string; img: string; bio: string; type?: "instructor" | "student"; contact?: string; } | null>>;
  setArchivePrompt: Dispatch<SetStateAction<ArchivePrompt | null>>;
  instructorStatus: InstructorStatus;
  setStatusModal: Dispatch<SetStateAction<StatusModalData | null>>;
}

export default function InstructorsSectionSuperAdmin({
  instructorsList,
  setInstructorsList,
  archivedInstructors,
  setProfileModal,
  setArchivePrompt,
  instructorStatus,
}: InstructorsSectionSuperAdminProps) {
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstructors = instructorsList
    .filter((inst: Instructor) => !archivedInstructors.includes(inst.name))
    .filter((inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddInstructor = (instructor: { name: string; email: string; contact: string; img: string }) => {
    setInstructorsList((prev) => [
      ...prev,
      { ...instructor, bio: 'New instructor.' },
    ]);
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
        {filteredInstructors.map((inst: Instructor, idx: number) => (
          <li
            key={idx}
            className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setProfileModal({
              name: inst.name,
              email: inst.email,
              img: inst.img,
              bio: inst.bio || 'Instructor Bio Placeholder',
              type: 'instructor',
              contact: inst.contact || 'N/A'
            })}
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
            <div className="flex-1">
              <span className="font-semibold text-[#08228d] text-sm sm:text-base">{inst.name}</span>
              <span className="block text-gray-500 text-xs sm:text-sm">{inst.email}</span>
            </div>
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
              onClick={e => {
                e.stopPropagation();
                setArchivePrompt({ open: true, type: 'instructor', name: inst.name });
              }}
            >
              Archive
            </button>
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
