'use client';

import React from 'react';
import Image from 'next/image';
import { programsList } from '@/data/programsData'; // ✅ Adjust this import path if needed

interface ProgramDetailsBaseProps {
  programName: string;
}

const ProgramDetailsBase: React.FC<ProgramDetailsBaseProps> = ({ programName }) => {
  const decodedProgramName = decodeURIComponent(programName);
  const programData = programsList.find((p) => p.program === decodedProgramName);

  if (!programData) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Program not found.
      </div>
    );
  }

  const {
    program,
    category,
    instructor,
    date,
    time,
    sessions,
    description,
    curriculum,
    thumbnail,
  } = programData;

  return (
    <>
      {/* Program Card */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-lg mt-4 sm:mt-6">
        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
          {/* Left Details */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#08228d]">{program}</h1>
            <p className="text-gray-600 mt-2 mb-4 italic text-sm sm:text-base">{category}</p>

            <p className="mb-4 text-sm sm:text-base">
              <span className="font-semibold text-black">Description:</span>{' '}
              <span className="text-black">{description}</span>
            </p>

            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">Time:</span>{' '}
              <span className="text-black">{time}</span>
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">No. of Sessions:</span>{' '}
              <span className="text-black">{sessions}</span>
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">Date:</span>{' '}
              <span className="text-black">{date}</span>
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">Instructor:</span>{' '}
              <span className="text-black">{instructor}</span>
            </p>
          </div>

          {/* Right Thumbnail */}
          <div className="w-full md:w-48 h-40 md:h-48 bg-gray-300 rounded-md flex items-center justify-center text-gray-500 mt-4 md:mt-0 overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={`${program} Thumbnail`}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
        </div>
      </div>

      {/* About This Program Section */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 mt-4 sm:mt-6 rounded-xl shadow">
        <h2 className="text-lg sm:text-xl font-bold text-[#08228d] mb-3 sm:mb-4">About This Program</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          {description}
        </p>
      </div>

      {/* Program Curriculum Section */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 mt-4 sm:mt-6 rounded-xl shadow">
        <h2 className="text-lg sm:text-xl font-bold text-[#08228d] mb-3 sm:mb-4">Program Curriculum</h2>
        {curriculum ? (
          <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">
            {curriculum}
          </p>
        ) : (
          <p className="text-gray-500 text-sm italic">No curriculum provided.</p>
        )}
      </div>
    </>
  );
};

export default ProgramDetailsBase;
