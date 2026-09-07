// components/ui/CardListAdmin.tsx

'use client';

import React from 'react';
import Image from 'next/image';

interface ProgramCardAdminProps {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
  onArchive: () => void;
  dummyDetails: {
    description: string;
    timeAndSessions: string;
    date: string;
    instructor: string;
  };
  role: 'admin' | 'superadmin';
}

const ProgramCardAdmin: React.FC<ProgramCardAdminProps> = ({
  program,
  category,
  instructor,
  date,
  time,
  sessions,
  description,
  thumbnail,
  onArchive,
  dummyDetails,
  role,
}) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col h-full min-h-[340px] sm:min-h-[420px] w-full">
      <div className="w-full h-32 sm:h-40 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 overflow-hidden">
        {thumbnail?.trim() ? (
          <Image
            src={thumbnail}
            alt="Program Thumbnail"
            width={320}
            height={160}
            className="object-cover rounded-md w-full h-full"
            unoptimized={thumbnail.startsWith('http')}
          />
        ) : (
          <Image
            src="/add-all logo bg.png"
            alt="Program Thumbnail"
            width={320}
            height={160}
            className="object-cover rounded-md w-full h-full"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-[#08228d] mb-1">{program}</h3>
        <p className="text-xs sm:text-sm text-gray-500 italic mb-2">{category}</p>
        <p className="text-gray-700 mb-2 sm:mb-3 flex-1 text-xs sm:text-base">
          {description || dummyDetails.description}
        </p>

        <div className="text-xs text-gray-600 mt-auto mb-1 sm:mb-2">
          <div><strong>Time & Sessions:</strong> {time || dummyDetails.timeAndSessions} {sessions ? `| ${sessions} Sessions` : ''}</div>
          <div><strong>Date:</strong> {date || dummyDetails.date}</div>
          <div><strong>Instructor:</strong> {instructor || dummyDetails.instructor}</div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition font-semibold text-xs sm:text-base"
            onClick={() => window.location.href = `/courseoutline?program=${encodeURIComponent(program)}&role=${role}`}
          >
            View Course Outline
          </button>
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-800 transition font-semibold text-xs sm:text-base"
            onClick={() => window.location.href = `/editcourseoutline?program=${encodeURIComponent(program)}&role=${role}`}
          >
            Edit Course Outline
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition font-semibold text-xs sm:text-base"
            onClick={onArchive}
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCardAdmin;
