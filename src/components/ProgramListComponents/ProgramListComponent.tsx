'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddProgramModal from '@/components/ui/Modals/AdminModals/addprogramModal';
import ArchiveModal from '@/components/ui/Modals/AdminModals/archiveModal';
import { instructors, Program } from '@/data/data';
import { dummyDetails } from '@/data/data';

interface ProgramListComponentProps {
  role: 'admin' | 'superadmin';
  allPrograms: Program[];
  pageTitle: string;
}

const ProgramListComponent: React.FC<ProgramListComponentProps> = ({ role, allPrograms, pageTitle }) => {
  const router = useRouter();

  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [programs, setPrograms] = useState<Program[]>(allPrograms);
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [archivePrompt, setArchivePrompt] = useState<{ open: boolean; program: string } | null>(null);

  const [newProgram, setNewProgram] = useState<Program>({
    program: '',
    category: '',
    instructor: '',
    date: '',
    time: '',
    sessions: '',
    description: '',
    thumbnail: '',
  });

  const filteredPrograms = programs
    .filter((p) => !archivedPrograms.includes(p.program))
    .filter((p) => p.program.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddProgram = () => {
    if (!newProgram.program || !newProgram.category || !newProgram.instructor) {
      console.error('Required fields missing.');
      return;
    }
    setPrograms((prev) => [...prev, newProgram]);
    setShowAddProgramModal(false);
    setNewProgram({
      program: '',
      category: '',
      instructor: '',
      date: '',
      time: '',
      sessions: '',
      description: '',
      thumbnail: '',
    });
  };

  const handleArchiveProgram = (program: string) => {
    setArchivedPrograms((prev) => [...prev, program]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#08228d]">{pageTitle}</h2>
          <button
            className="bg-[#08228d] text-white px-3 py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto cursor-pointer"
            onClick={() => setShowAddProgramModal(true)}
          >
            + Add Program
          </button>
        </div>

        <div className="mb-6 relative w-full sm:w-96 max-w-lg">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((p, idx) => (
              <div
                key={idx}
                onClick={() => router.push(`/${role}/programlist/${encodeURIComponent(p.program)}`)}
                className="cursor-pointer bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition flex flex-col"
              >
                <div className="h-32 sm:h-40 bg-gray-300 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src={p.thumbnail || '/add-all logo bg.png'}
                    alt="Thumbnail"
                    width={320}
                    height={160}
                    className="object-cover w-50 h-50"
                    unoptimized={p.thumbnail?.startsWith('http')}
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#08228d]">{p.program}</h3>
                <p className="text-sm text-gray-500 italic">{p.category}</p>
                <p className="text-sm text-gray-700 my-2">{p.description || dummyDetails.description}</p>
                <div className="text-xs text-gray-600 mt-auto">
                  <div><strong>Time & Sessions:</strong> {p.time} | {p.sessions} Sessions</div>
                  <div><strong>Date:</strong> {p.date}</div>
                  <div><strong>Instructor:</strong> {p.instructor}</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setArchivePrompt({ open: true, program: p.program });
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded text-xs hover:bg-red-700 font-semibold cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 p-8">No programs found.</div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProgramModal
        isOpen={showAddProgramModal}
        newProgram={newProgram}
        instructors={instructors}
        onChange={(field, value) => setNewProgram((prev) => ({ ...prev, [field]: value }))}
        onThumbnailChange={(url) => setNewProgram((prev) => ({ ...prev, thumbnail: url }))}
        onClose={() => setShowAddProgramModal(false)}
        onAdd={handleAddProgram}
        canAdd={!!newProgram.program && !!newProgram.category && !!newProgram.instructor}
      />
      {archivePrompt && (
        <ArchiveModal
          isOpen={archivePrompt.open}
          type="program"
          name={archivePrompt.program}
          onConfirm={() => handleArchiveProgram(archivePrompt.program)}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
};

export default ProgramListComponent;
