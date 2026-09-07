// components/InstructorAssignedPrograms.tsx
'use client';

import React from 'react';
import { programsList } from '@/data/programsData';
import ProgramGrid from '@/components/Programs/ProgramGrid'; // Adjust path as needed

interface InstructorAssignedProgramsProps {
  programName?: string;
}

const InstructorAssignedPrograms: React.FC<InstructorAssignedProgramsProps> = ({ programName }) => {
  const assignedProgramsDemo = programsList.filter(
    (p, idx) => idx % 3 === 0 || p.program === 'Floristry'
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-3 sm:px-6 py-6 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#08228d] mb-4 sm:mb-6 text-left">
          Assigned Programs {programName && `for ${programName}`}
        </h2>

        <ProgramGrid
          programs={assignedProgramsDemo}
          basePath="/instructor/assignedprograms"
          emptyMessage="No programs assigned to you found."
          showEnrolledPill={false} // Instructors don't need "Enrolled" pill
        />
      </div>
    </div>
  );
};

export default InstructorAssignedPrograms;