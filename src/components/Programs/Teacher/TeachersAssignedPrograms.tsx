'use client'; // This component uses useState, so it must be a client component.

import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import { programsList } from '@/data/programsData';

const TeacherAssignedPrograms: React.FC = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // For demonstration, simulate assigned programs for a teacher.
  // In a real application, you would fetch the *actual* programs assigned to the current teacher from your backend.
  const assignedProgramsDemo = programsList.filter((p, idx) => idx % 3 === 0 || p.program === 'Floristry'); // A different demo subset for teachers

  // Filter programs based on searchQuery
  const filteredPrograms = assignedProgramsDemo.filter((p) =>
    p.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100"> {/* Added bg-gray-100 for consistent background */}
      <div className="px-3 sm:px-6 py-6 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#08228d] mb-4 sm:mb-6 text-left">
          Assigned Programs
        </h2>

        {/* Search Bar with Icon - Adopted from your provided TeacherClient design */}
        <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg ">
          <input
            type="text"
            placeholder="Search programs..."
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

        {/* Updated grid classes for 3 items in a row on larger screens */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map(({ program, category }, idx) => (
              <div // Use div as the wrapper since action is handled by buttons
                key={idx}
                className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col"
              >
                {/* Program Thumbnail (can still link to a teacher-specific program overview if desired) */}
                <Link
                  href={`/teacher/assignedprograms/${encodeURIComponent(program)}`} // Example: A teacher's view of the program details
                  className="w-full h-24 sm:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 text-xs sm:text-base flex-shrink-0"
                >
                  Thumbnail
                </Link>
                {/* Program Name */}
                <h3 className="text-base sm:text-lg font-semibold text-[#08228d]">{program}</h3>
                {/* Program Category */}
                <p className="text-xs sm:text-sm text-gray-500 italic mb-3 flex-grow">{category}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg p-8">
              No programs assigned to you found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignedPrograms;