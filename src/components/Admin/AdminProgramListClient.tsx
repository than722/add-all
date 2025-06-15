'use client'; // This component uses useState, useEffect, and other client-side features.

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // For navigation to program details/edit pages
import AddProgramModal from '@/components/ui/Modals/addprogramModal'; // Ensure correct path
import ArchiveModal from '@/components/ui/Modals/archiveModal'; // Ensure correct path
import { programsList as allProgramsFromData } from '@/data/programsData'; // Import programsList from programsData.ts
import { dummyDetails, instructors, Program, Instructor } from '@/data/data'; // Import types and data, including dummyDetails

const AdminProgramListClient: React.FC = () => {
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  // Initialize programs directly from data on component mount
  // No localStorage for adminPrograms
  const [adminPrograms, setAdminPrograms] = useState<Program[]>(() => {
    // This initializer function runs only once on initial render
    console.log('AdminProgramListClient: Initializing adminPrograms from programsData.ts');
    const defaultPrograms: Program[] = allProgramsFromData.map(p => ({
      program: p.program,
      category: p.category,
      instructor: dummyDetails.instructor, // Assign dummy instructor
      date: dummyDetails.date,
      time: dummyDetails.timeAndSessions.split(' | ')[0], // Extract time part
      sessions: dummyDetails.timeAndSessions.split(' | ')[1].replace(' Sessions', ''), // Extract sessions part
      description: dummyDetails.description,
      thumbnail: '/add-all logo bg.png', // Default thumbnail
    }));
    return defaultPrograms;
  });

  // No localStorage for archivedPrograms
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);

  const [newProgram, setNewProgram] = useState({
    program: '',
    category: '',
    instructor: '',
    date: '',
    time: '',
    sessions: '',
    description: '',
    thumbnail: '',
  });
  const [archivePrompt, setArchivePrompt] = useState<{ open: boolean; program: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Removed the useEffect hooks that loaded and saved from localStorage.
  // Data will reset on component unmount/remount.

  // Filter programs based on searchQuery and archive status
  const filteredPrograms = adminPrograms
    .filter((p) => !archivedPrograms.includes(p.program))
    .filter((p) => p.program.toLowerCase().includes(searchQuery.toLowerCase()));

  console.log('AdminProgramListClient Rendered. Current adminPrograms state length:', adminPrograms.length);
  console.log('AdminProgramListClient Rendered. Current filteredPrograms length:', filteredPrograms.length);


  const handleAddProgram = () => {
    if (!newProgram.program || !newProgram.category || !newProgram.instructor) {
        console.error("Program name, category, and instructor are required.");
        return;
    }

    setAdminPrograms((prev) => [
      ...prev,
      {
        program: newProgram.program,
        category: newProgram.category,
        instructor: newProgram.instructor,
        date: newProgram.date,
        time: newProgram.time,
        sessions: newProgram.sessions,
        description: newProgram.description,
        thumbnail: newProgram.thumbnail,
      },
    ]);
    setShowAddProgramModal(false);
    setNewProgram({ program: '', category: '', instructor: '', date: '', time: '', sessions: '', description: '', thumbnail: '' });
  };

  const handleArchiveProgram = (program: string) => {
    setArchivedPrograms((prev) => [...prev, program]);
    setArchivePrompt(null); // Close the archive modal
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#08228d]">Programs List (Admin)</h2>
          <button
            className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
            onClick={() => setShowAddProgramModal(true)}
          >
            + Add Program
          </button>
        </div>

        {/* Search Bar with Icon */}
        <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
          />
          {/* Search Icon (SVG) */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 min-w-[320px]">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col h-full min-h-[340px] sm:min-h-[420px] w-full"
                  style={{ minWidth: 0 }}
                >
                  <div className="w-full h-32 sm:h-40 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 overflow-hidden">
                    {p.thumbnail && typeof p.thumbnail === 'string' && p.thumbnail.trim() !== '' ? (
                      <Image
                        src={p.thumbnail}
                        alt="Program Thumbnail"
                        width={320}
                        height={160}
                        className="object-cover rounded-md w-full h-full"
                        unoptimized={p.thumbnail.startsWith('http')}
                      />
                    ) : (
                      <Image
                        src="/add-all logo bg.png" // Fallback image
                        alt="Program Thumbnail"
                        width={320}
                        height={160}
                        className="object-cover rounded-md w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-[#08228d] mb-1">{p.program}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 italic mb-2">{p.category}</p>
                    <p className="text-gray-700 mb-2 sm:mb-3 flex-1 text-xs sm:text-base">{p.description || dummyDetails.description}</p>
                    <div className="text-xs text-gray-600 mt-auto mb-1 sm:mb-2">
                      <div><strong>Time & Sessions:</strong> {p.time} | {p.sessions} Sessions</div>
                      <div><strong>Date:</strong> {p.date}</div>
                      <div><strong>Instructor:</strong> {p.instructor}</div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Link
                        href={`/admin/programlist/${encodeURIComponent(p.program)}/view-outline`} // Link to admin-specific view outline
                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-xs sm:text-base text-center"
                      >
                        View Outline
                      </Link>
                      <Link
                        href={`/admin/programlist/${encodeURIComponent(p.program)}/edit-outline`} // Link to admin-specific edit outline
                        className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-700 transition font-semibold text-xs sm:text-base text-center"
                      >
                        Edit Outline
                      </Link>
                      <button
                        className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition font-semibold text-xs sm:text-base"
                        onClick={() => setArchivePrompt({ open: true, program: p.program })}
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg p-8">
                No programs found.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add Program Modal */}
      <AddProgramModal
        isOpen={showAddProgramModal}
        newProgram={newProgram}
        instructors={instructors} // Pass instructors from data.ts
        onChange={(field, value) => setNewProgram(prev => ({ ...prev, [field]: value }))}
        onThumbnailChange={url => setNewProgram(prev => ({ ...prev, thumbnail: url }))}
        onClose={() => setShowAddProgramModal(false)}
        onAdd={handleAddProgram}
        canAdd={!!newProgram.program && !!newProgram.category && !!newProgram.instructor}
      />
      {/* Archive Prompt Modal */}
      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type="program"
          name={archivePrompt.program}
          onConfirm={() => handleArchiveProgram(archivePrompt.program)}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
};

export default AdminProgramListClient;