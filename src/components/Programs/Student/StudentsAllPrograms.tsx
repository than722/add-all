// components/AllPrograms.tsx
'use client';

import React from 'react';
import { programsList } from '@/data/programsData';
import ProgramGrid from '@/components/Programs/ProgramGrid'; // Adjust path as needed

const AllPrograms: React.FC = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-[#08228d] mb-6 text-left">All Programs</h2>
        <ProgramGrid
          programs={programsList}
          basePath="/student/allprograms/"
          emptyMessage="No programs found matching your search."
          showEnrolledPill={false}
          useQueryParamForLink={true}
        />
      </div>
  );
};

export default AllPrograms;