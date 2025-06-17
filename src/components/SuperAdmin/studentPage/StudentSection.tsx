'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import type { PendingApplication, StudentRecord } from '@/data/data'; // Import types

interface ArchivePrompt {
  open: boolean;
  type: 'instructor' | 'student' | 'program';
  name: string;
}

// Define props for the Super Admin's Students Section
interface StudentsSectionSuperAdminProps {
  allStudentRecords: StudentRecord[]; // Consolidated list of all student records
  onViewProfile: (student: StudentRecord) => void; // Callback to open Profile modal
  onViewPending: (application: PendingApplication) => void; // Callback to open PendingModal for a specific application

  // Props for state management from the parent (AdminStudentListClient)
  pendingApps: PendingApplication[]; // List of pending applications
  setPendingApps: Dispatch<SetStateAction<PendingApplication[]>>; // Setter for pending applications
  setProfileModal: Dispatch<SetStateAction<{ name: string; email: string; img: string; bio: string; type?: "instructor" | "student" | undefined; contact?: string; } | null>>;

  archivedStudents: string[]; // List of archived student names/emails
  setArchivePrompt: Dispatch<SetStateAction<ArchivePrompt | null>>;
}

export default function StudentsSectionSuperAdmin({
  allStudentRecords,
  onViewProfile,
  onViewPending,
  archivedStudents,
  setArchivePrompt,
  // pendingApps, // Not directly used for filtering here, but managed by parent
  // setPendingApps, // Not directly used for filtering here, but managed by parent
  // setProfileModal, // Passed to onViewProfile directly
}: StudentsSectionSuperAdminProps) {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter student records based on searchQuery and archived status
  const filteredStudentRecords = allStudentRecords
    .filter((record) =>
      // Exclude archived students if archivedStudents prop is provided
      !archivedStudents.includes(record.name) // Assuming archived by name, adjust if by email
    )
    .filter((record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.program && record.program.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#08228d]">Students</h2>

      {/* Search Bar with Icon */}
      <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg">
        <input
          type="text"
          placeholder="Search students..."
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
        {filteredStudentRecords.length === 0 ? (
          <li className="text-gray-500 italic text-sm p-4">No students found.</li>
        ) : (
          filteredStudentRecords.map((record, idx) => (
            <li
              key={record.email + (record.program || '')} // Unique key based on email and program if applicable
              className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-gray-100 transition"
            >
              <div
                className="flex items-center flex-grow cursor-pointer"
                onClick={() => onViewProfile(record)} // Call handler to view profile
                aria-label={`View profile of ${record.name}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
                  <Image
                    src={record.img && record.img.trim() !== '' ? record.img : '/profileicon.png'}
                    alt={record.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 ml-3">
                  <span className="font-semibold text-[#08228d] text-sm sm:text-base block">{record.name}</span>
                  <span className="block text-gray-500 text-xs sm:text-sm">{record.email}</span>
                  {record.program && <span className="block text-gray-500 text-xs sm:text-sm italic">({record.program})</span>}
                </div>
              </div>
              {/* Status display and action button */}
              <div className="flex items-center gap-2">
                {record.status === 'pending' && record.receiptUrl && record.program ? (
                  <button
                    className="ml-auto bg-yellow-400 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-500"
                    onClick={e => {
                      e.stopPropagation();
                      onViewPending({
                        name: record.name,
                        email: record.email,
                        receiptUrl: record.receiptUrl,
                        paymentType: record.paymentType || 'N/A',
                        status: 'pending',
                        program: record.program,
                      } as PendingApplication);
                    }}
                  >
                    Pending Application
                  </button>
                ) : record.status === 'enrolled' ? (
                  <span className="ml-auto bg-green-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold">Enrolled</span>
                ) : (
                  <span className="ml-auto bg-gray-400 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold">Registered</span>
                )}
                {/* Archive Button for Students */}
                <button
                  className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700"
                  onClick={e => {
                    e.stopPropagation(); // Prevent parent li's click
                    setArchivePrompt({ open: true, type: 'student', name: record.name }); // Use setArchivePrompt from props
                  }}
                >
                  Archive
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      {/* Modals are handled in the parent component (AdminStudentListClient) */}
    </div>
  );
}
