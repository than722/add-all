import React from "react";
import Image from "next/image";

interface Program {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface ProgramsGridProps {
  normalizedAdminPrograms: Program[];
  archivedPrograms: string[];
  setArchivePrompt: (prompt: ArchivePrompt) => void;
  dummyDetails: any;
}

export default function ProgramsGrid({ normalizedAdminPrograms, archivedPrograms, setArchivePrompt, dummyDetails }: ProgramsGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 w-full">
        {normalizedAdminPrograms.filter((p: Program) => !archivedPrograms.includes(p.program)).map((p: Program, idx: number) => (
          <div
            key={idx}
            className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col h-full min-h-[320px] sm:min-h-[420px] w-full"
            style={{ minWidth: 0 }}
          >
            <div className="w-full h-32 sm:h-40 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 overflow-hidden">
              {p.thumbnail && typeof p.thumbnail === 'string' ? (
                <Image
                  src={p.thumbnail}
                  alt="Program Thumbnail"
                  width={320}
                  height={160}
                  className="object-cover rounded-md w-full h-full"
                  unoptimized={p.thumbnail.startsWith('http')}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 text-lg sm:text-2xl font-bold">
                  No Image
                </div>
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
                  onClick={() => setArchivePrompt({ open: true, type: 'program', name: p.program })}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
