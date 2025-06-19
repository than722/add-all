// components/MyPrograms.tsx
'use client';

import React from 'react';
import { programsList } from '@/data/programsData';
import ProgramGrid from '@/components//Programs/ProgramGrid'; // Adjust path as needed

const MyPrograms: React.FC = () => {
  // For demonstration, we'll filter from the general programsList.
  const enrolledProgramsDemo = programsList.filter((_, idx) => idx % 2 === 0); // Just a demo subset

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#08228d] mb-6 text-left rounded-md">My Programs</h2>

      <ProgramGrid
        programs={enrolledProgramsDemo}
        basePath="/student/myprograms/"
        emptyMessage="No enrolled programs found matching your search."
        showEnrolledPill={true} // Students' programs should show "Enrolled" pill
      />
    </div>
  );
};
export default MyPrograms;
