'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link'; 
import { programsList } from '@/data/programsData';
import Navbar from '@/components/ui/Navbar';

const StudentView: React.FC = () => {
  const searchParams = useSearchParams();
  const activeTab = (searchParams?.get('tab') as 'all' | 'mine') || 'all';

  // Simulate accepted/enrolled program for student
  const myPrograms = [
    {
      program: 'Floristry',
      category: 'ARTS AND DESIGN',
      enrolled: true, // Simulate that the student is enrolled
    },
    {
      program: 'Investment Analysis',
      category: 'Business and Finance',
      enrolled: false,
    },
  ];

  const filteredPrograms =
    activeTab === 'all'
      ? programsList
      : myPrograms.filter((p) => p.enrolled);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold text-[#002B5C] mb-6 text-center">
          {activeTab === 'all' ? 'All Programs' : 'My Programs'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPrograms.map(({ program, category }, idx) => (
            <Link
              href={
                myPrograms.find((p) => p.program === program && p.enrolled)
                  ? `/courseoutline?program=${encodeURIComponent(program)}`
                  : `/programview?program=${encodeURIComponent(program)}`
              }
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition block"
            >
              <div className="w-full h-32 bg-gray-300 rounded-md mb-3 flex items-center justify-center text-gray-600">
                Thumbnail
              </div>
              <h3 className="text-lg font-semibold text-[#002B5C]">{program}</h3>
              <p className="text-sm text-gray-500 italic">{category}</p>
              {myPrograms.find((p) => p.program === program && p.enrolled) && (
                <span className="inline-block mt-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">Enrolled</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
