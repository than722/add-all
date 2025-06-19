// components/ProgramGrid.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Program {
  program: string;
  category: string;
  // Add any other properties your program objects have
}

interface ProgramGridProps {
  programs: Program[];
  basePath: string; // e.g., '/instructor/assignedprograms' or '/programview?program='
  emptyMessage: string;
  showEnrolledPill?: boolean;
  useQueryParamForLink?: boolean; // New prop to indicate query parameter usage
}

const ProgramGrid: React.FC<ProgramGridProps> = ({
  programs,
  basePath,
  emptyMessage,
  showEnrolledPill = false,
  useQueryParamForLink = false, // Default to false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = programs.filter((p) =>
    p.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search bar with icon */}
      <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg">
        <input
          type="text"
          placeholder="Search programs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
        />
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

      {/* Program cards grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map(({ program, category }, idx) => {
            // Determine the href based on useQueryParamForLink prop
            const href = useQueryParamForLink
              ? `${basePath}${encodeURIComponent(program)}`
              : `${basePath}/${encodeURIComponent(program)}`;

            return (
              <Link
                href={href}
                key={idx}
                className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col"
              >
                {/* Program Thumbnail */}
                <div className="w-full h-24 sm:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 text-xs sm:text-base flex-shrink-0">
                  Thumbnail
                </div>
                {/* Program Name */}
                <h3 className="text-base sm:text-lg font-semibold text-[#08228d]">{program}</h3>
                {/* Program Category */}
                <p className="text-xs sm:text-sm text-gray-500 italic mb-2 flex-grow">{category}</p>
                {/* 'Enrolled' Pill (optional) */}
                {showEnrolledPill && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start mt-auto">
                    Enrolled
                  </div>
                )}
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg p-8">
            {emptyMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ProgramGrid;