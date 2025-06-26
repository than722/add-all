'use client';

import React, { useState } from 'react';
import { programCategories } from '@/data/programsData';
import ProgramModalHandler from './ProgramModalHandler';
import SearchBar from '@/components/ui/SearchBar/SearchBar';

export default function ProgramsOfferedListPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredCategories = programCategories
    .map(({ category, programs }) => ({
      category,
      programs: programs.filter((program) =>
        program.toLowerCase().includes(searchQuery)
      ),
    }))
    .filter(({ programs }) => programs.length > 0);

  return (
    <ProgramModalHandler
      trigger={(openModal) => (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#08228d] text-center mb-10 sm:mb-12 leading-tight">
              Our Programs Offered
            </h1>

            {/* Search Bar */}
            <div className="flex justify-center mb-12">
              <SearchBar onSearch={handleSearch} placeholder="Search all programs..." />
            </div>

            {/* Program List by Category */}
            {filteredCategories.length > 0 ? (
              <div className="space-y-12">
                {filteredCategories.map(({ category, programs }, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-100 w-full"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#08228d] mb-6">
                      {category}
                    </h2>
                    {/* KEY CHANGE HERE: Added 'list-disc' and 'pl-6' for indentation */}
                    <ul className="space-y-3 list-disc pl-6">
                      {programs.map((program, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-lg text-gray-700 cursor-pointer hover:text-[#0a31b4] transition-colors duration-200"
                          onClick={() => openModal(program, category)}
                        >
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-xl py-10">No programs found matching your search. Please try a different keyword.</p>
            )}
          </div>
        </div>
      )}
    />
  );
}