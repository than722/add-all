'use client';

import { useSearchParams } from 'next/navigation';
import { programsList } from '@/data/programsData';
import Navbar from '@/components/ui/Navbar';
import React from 'react';

const ProgramView = () => {
  const searchParams = useSearchParams();
  const programName = searchParams?.get('program');

  const programData = programsList.find((p) => p.program === programName);

  if (!programData) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Program not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#002B5C]">{programData.program}</h1>
            <p className="text-gray-600 mt-2 mb-4 italic">{programData.category}</p>

            <p className="mb-4">
              <span className="font-semibold">Description:</span>{' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p className="mb-2">
              <span className="font-semibold">Time:</span> 9:00 AM – 12:00 PM
            </p>
            <p className="mb-2">
              <span className="font-semibold">No. of Sessions:</span> 6
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span> June 15, 2025
            </p>
            <p className="mb-2">
              <span className="font-semibold">Instructor:</span> John Doe
            </p>
          </div>

          {/* Right Thumbnail */}
          <div className="w-full md:w-48 h-48 bg-gray-300 rounded-md flex items-center justify-center text-gray-500">
            Thumbnail
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramView;
