'use client';

import React, { useState } from "react";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import ProgramCardAdmin from "@/components/ui/CardList/CardListAdmin";

interface Program {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface ProgramsGridProps {
  programs: Program[];
  archivedPrograms: string[];
  setArchivePrompt: (prompt: ArchivePrompt) => void;
  dummyDetails: {
    description: string;
    timeAndSessions: string;
    date: string;
    instructor: string;
  };
  role: 'admin' | 'superadmin';
}

export default function ProgramsGrid({
  programs,
  archivedPrograms,
  setArchivePrompt,
  dummyDetails,
  role,
}: ProgramsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = programs
    .filter((p) => !archivedPrograms.includes(p.program))
    .filter((p) => p.program.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <SearchBar
        placeholder="Search programs..."
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 min-w-[320px]">
          {filteredPrograms.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg p-8">
              No programs found.
            </div>
          ) : (
            filteredPrograms.map((p, idx) => (
              <ProgramCardAdmin
                key={idx}
                {...p}
                dummyDetails={dummyDetails}
                role={role}
                onArchive={() =>
                  setArchivePrompt({ open: true, type: 'program', name: p.program })
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
