// components/ui/ProgramSimpleView.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { programsList } from '@/data/programsData';
import { dummyDetails } from '@/data/data';

const ProgramSimpleView: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedProgram = searchParams?.get('program');

  const programData = programsList.find((p) => p.program === selectedProgram);

  if (!programData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Program not found. Please go back and select a program.
      </div>
    );
  }

  return (
    <div className="p-8 bg-white max-w-4xl mx-auto mt-10 rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
      {/* Text Info */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-[#002B5C]">{programData.program}</h1>
        <p className="text-gray-700">{dummyDetails.description}</p>

        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Time & Sessions:</strong> {dummyDetails.timeAndSessions}</p>
          <p><strong>Date:</strong> {dummyDetails.date}</p>
          <p><strong>Instructor:</strong> {dummyDetails.instructor}</p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-64 h-48 md:h-64 relative">
        <Image
          src="/thumbnail.png" // Replace with actual thumbnails if available
          alt="Program Thumbnail"
          fill
          className="object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default ProgramSimpleView;
