import React, { useState, useEffect } from "react"; // Import useState and useEffect
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
  const [role, setRole] = useState<string | null>(null); // Use useState directly
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  // Filter programs based on searchQuery and archive status
  const filteredPrograms = normalizedAdminPrograms
    .filter((p: Program) => !archivedPrograms.includes(p.program))
    .filter((p) => p.program.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {/* Search Bar with Icon */}
      <div className="mb-6 relative w-full sm:w-96 md:w-1/2 lg:w-1/3 max-w-lg"> {/* Added relative for icon positioning and width */}
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
          {filteredPrograms.map((p: Program, idx: number) => (
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
                    className="flex-1 bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition font-semibold text-xs sm:text-base"
                    onClick={() => window.location.href = `/courseoutline?program=${encodeURIComponent(p.program)}&role=superadmin`}
                  >
                    View Course Outline
                  </button>
                  <button
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-800 transition font-semibold text-xs sm:text-base"
                    onClick={() => window.location.href = `/editcourseoutline?program=${encodeURIComponent(p.program)}&role=superadmin`}
                  >
                    Edit Course Outline
                  </button>
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
    </>
  );
}