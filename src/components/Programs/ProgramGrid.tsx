'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import ProgramCard from '@/components/ui/CardList/CardList';

interface Program {
  program: string;
  category: string;
}

interface ProgramGridProps {
  programs: Program[];
  basePath: string;
  emptyMessage: string;
  showEnrolledPill?: boolean;
  useQueryParamForLink?: boolean;
}

const ProgramGrid: React.FC<ProgramGridProps> = ({
  programs,
  basePath,
  emptyMessage,
  showEnrolledPill = false,
  useQueryParamForLink = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = programs.filter((p) =>
    p.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar
        placeholder="Search programs..."
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map(({ program, category }, idx) => {
            const href = useQueryParamForLink
              ? `${basePath}${encodeURIComponent(program)}`
              : `${basePath}/${encodeURIComponent(program)}`;

            return (
              <ProgramCard
                key={idx}
                program={program}
                category={category}
                href={href}
                showEnrolledPill={showEnrolledPill}
              />
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
