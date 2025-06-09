'use client';

import React from 'react';
import Link from 'next/link';
import { programsList } from '@/data/programsData';

const teacherClient: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="px-3 sm:px-6 py-6 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#08228d] mb-4 sm:mb-6 text-left">
          My Programs
        </h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {programsList.map(({ program, category }, idx) => (
            <Link
              href={`/programview?program=${encodeURIComponent(program)}`}
              key={idx}
              className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition block"
            >
              <div className="w-full h-24 sm:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 text-xs sm:text-base">
                Thumbnail
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#08228d]">{program}</h3>
              <p className="text-xs sm:text-sm text-gray-500 italic">{category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default teacherClient;
