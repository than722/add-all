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
        <div className="min-h-screen px-6 py-12 bg-gray-100">
          <h1 className="text-3xl font-bold text-center text-[#08228d] mb-6">
            Programs Offered
          </h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search programs..." />
          </div>

          {/* Program List by Category */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map(({ category, programs }, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-semibold text-[#08228d] mb-4">{category}</h2>
                <ul className="space-y-2">
                  {programs.map((program, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-lg text-[#08228d] cursor-pointer hover:underline"
                      onClick={() => openModal(program, category)}
                    >
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No programs found matching your search.</p>
          )}
        </div>
      )}
    />
  );
}
