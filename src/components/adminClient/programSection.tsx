// AdminSections/ProgramsSection.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import AddProgramModal from '@/components/ui/Modals/addprogramModal';
import ArchiveModal from '@/components/ui/Modals/archiveModal';
import { dummyDetails } from '@/data/data'; // Assuming dummyDetails is common data
import type { Program, Instructor } from '@/data/data';

interface ProgramsSectionProps {
  adminPrograms: Program[];
  setAdminPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
  archivedPrograms: string[];
  setArchivedPrograms: React.Dispatch<React.SetStateAction<string[]>>;
  instructors: Instructor[];
}

export default function ProgramsSection({
  adminPrograms,
  setAdminPrograms,
  archivedPrograms,
  setArchivedPrograms,
  instructors,
}: ProgramsSectionProps) {
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
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

  // Normalize adminPrograms to always have all fields
  const normalizedAdminPrograms = adminPrograms.map((p) => ({
    program: p.program,
    category: p.category,
    instructor: 'instructor' in p ? p.instructor : '',
    date: 'date' in p ? p.date : '',
    time: 'time' in p ? p.time : '',
    sessions: 'sessions' in p ? p.sessions : '',
    description: 'description' in p ? p.description : '',
    thumbnail: 'thumbnail' in p ? p.thumbnail : '',
  }));

  const handleAddProgram = () => {
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
    setArchivePrompt(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Programs List</h2>
        <button
          className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
          onClick={() => setShowAddProgramModal(true)}
        >
          + Add Program
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 min-w-[320px]">
          {normalizedAdminPrograms.filter(p => !archivedPrograms.includes(p.program)).map((p, idx) => (
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
                    src="/add-all logo bg.png"
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
                <p className="text-gray-700 mb-2 sm:mb-3 flex-1 text-xs sm:text-base">{String(p.description) || dummyDetails.description}</p>
                <div className="text-xs text-gray-600 mt-auto mb-1 sm:mb-2">
                  <div><strong>Time & Sessions:</strong> {String(p.time) || dummyDetails.timeAndSessions} {p.sessions ? `| ${String(p.sessions)} Sessions` : ''}</div>
                  <div><strong>Date:</strong> {String(p.date) || dummyDetails.date}</div>
                  <div><strong>Instructor:</strong> {String(p.instructor) || dummyDetails.instructor}</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition font-semibold text-xs sm:text-base"
                    onClick={() => setArchivePrompt({ open: true, program: p.program })}
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Program Modal */}
      <AddProgramModal
        isOpen={showAddProgramModal}
        newProgram={newProgram}
        instructors={instructors}
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
}