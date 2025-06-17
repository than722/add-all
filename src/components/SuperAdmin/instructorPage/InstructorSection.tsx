'use client';

import React, { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import AddInstructorModal from '@/components/ui/Modals/addinstructorModal'; // Assuming correct path
import type { Instructor } from '@/data/data'; // Import Instructor type

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
  setInstructorsList: React.Dispatch<React.SetStateAction<Instructor[]>>; // For adding new instructors
  archivedInstructors: string[];
  setProfileModal: Dispatch<SetStateAction<{ name: string; email: string; img: string; bio: string; type?: "instructor" | "student" | undefined; contact?: string; } | null>>;
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
  setStatusModal,
}: InstructorsSectionSuperAdminProps) {
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter instructors based on searchQuery and archived status
  const filteredInstructors = instructorsList
    .filter((inst: Instructor) => !archivedInstructors.includes(inst.name))
    .filter((inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddInstructor = (instructor: { name: string; email: string; contact: string; img: string }) => {
    setInstructorsList((prev) => [
      ...prev,
      { ...instructor, bio: 'New instructor.' }, // Default bio for new instructor
    ]);
    setShowAddInstructorModal(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#08228d]">Instructors</h2>
        <button
          className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
          onClick={() => setShowAddInstructorModal(true)}
        >
          + Add Instructor
        </button>
      </div>

      {/* Search Bar with Icon */}
      <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg">
        <input
          type="text"
          placeholder="Search instructors..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
        />
        {/* Search Icon (SVG) */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

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
                bio: inst.bio || 'Instructor Bio Placeholder', // Use actual bio if available, else placeholder
                type: 'instructor',
                contact: inst.contact || 'N/A' // Ensure contact is passed
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
            {/* Status pill with onClick to change status via setStatusModal */}
            <button
                className={`ml-auto px-2 py-1 rounded text-xs font-semibold
                    ${instructorStatus[inst.email] === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}
                    hover:opacity-80 transition`}
                onClick={e => {
                    e.stopPropagation(); // Prevent opening profile modal
                    setStatusModal({
                        isOpen: true,
                        instructorName: inst.name,
                        instructorEmail: inst.email,
                        statusToSet: instructorStatus[inst.email] === 'active' ? 'inactive' : 'active'
                    });
                }}
            >
                {instructorStatus[inst.email]}
            </button>
            <button
              className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700"
              onClick={e => {
                e.stopPropagation(); // Prevent opening profile modal
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
