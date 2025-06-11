'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { programsList } from '@/data/programsData';
import Navbar from '@/components/ui/navbar/Navbar';

const StudentClient: React.FC = () => {
  const searchParams = useSearchParams();
  const activeTab = (searchParams?.get('tab') as 'all' | 'mine') || 'all';

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate accepted/enrolled program for student
  const myPrograms = [
    {
      program: 'Floristry',
      category: 'ARTS AND DESIGN',
      enrolled: true, // Simulate that the student is enrolled
    },
    {
      program: 'Investment Analysis',
      category: 'Business and Finance',
      enrolled: false,
    },
  ];

  // Filter programs based on activeTab and searchQuery
  const filteredPrograms = (activeTab === 'all' ? programsList : myPrograms.filter((p) => p.enrolled)).filter(
    (p) => p.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold text-[#08228d] mb-6 text-left">
          {activeTab === 'all' ? 'All Programs' : 'My Programs'}
        </h2>
        {/* Search Bar with Icon */}
        <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg"> {/* Added relative for icon positioning */}
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={handleSearchChange}
            // Adjusted padding-left (pl-10) to make space for the icon
            // Adjusted placeholder color to placeholder-gray-500 for better visibility
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
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredPrograms.map(({ program, category }, idx) => (
            <Link
              href={
                myPrograms.find((p) => p.program === program && p.enrolled)
                  ? `/courseoutline?program=${encodeURIComponent(program)}`
                  : `/programview?program=${encodeURIComponent(program)}`
              }
              key={idx}
              className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition block"
            >
              <div className="w-full h-24 sm:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 text-xs sm:text-base">
                Thumbnail
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#08228d]">{program}</h3>
              <p className="text-xs sm:text-sm text-gray-500 italic">{category}</p>
              {myPrograms.find((p) => p.program === program && p.enrolled) && (
                <span className="inline-block mt-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">Enrolled</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentClient;