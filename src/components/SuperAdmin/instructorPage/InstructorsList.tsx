import React, { useState, Dispatch, SetStateAction } from "react"; // Import Dispatch and SetStateAction for correct type
import Image from "next/image";

interface Instructor {
  name: string;
  email: string;
  img: string;
  // It's good practice to align this with the `Instructor` interface in data.ts
  // If `bio`, `contact`, `programs`, `rating`, `students` are part of the full Instructor object,
  // they should ideally be in this interface as well if they are used or intended to be passed down.
  // For now, I'll keep it simple as per your provided `Instructor` interface,
  // but if setProfileModal needs more, that interface also needs updating.
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

// Define the type for the status modal data
interface StatusModalData {
  isOpen: boolean;
  instructorName: string;
  instructorEmail: string;
  statusToSet: 'active' | 'inactive';
}

interface InstructorsListProps {
  instructorsList: Instructor[];
  archivedInstructors: string[];
  // setProfileModal expects a specific profile object. Ensure consistency.
  setProfileModal: Dispatch<SetStateAction<{ name: string; email: string; img: string; bio: string; contact?: string; type?: "instructor" | "student" | undefined; } | null>>;
  setArchivePrompt: (prompt: ArchivePrompt) => void;
  instructorStatus: { [email: string]: 'active' | 'inactive' };
  // Added setStatusModal to the props interface
  setStatusModal: Dispatch<SetStateAction<StatusModalData | null>>;
}

export default function InstructorsList({ instructorsList, archivedInstructors, setProfileModal, setArchivePrompt, instructorStatus, setStatusModal }: InstructorsListProps) {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter instructors based on searchQuery and archive status
  const filteredInstructors = instructorsList
    .filter((inst: Instructor) => !archivedInstructors.includes(inst.name))
    .filter((inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {/* Search Bar with Icon */}
      <div className="mb-6 relative w-full md:w-[calc(130*0.25rem)]"> {/* Added relative for icon positioning and width */}
        <input
          type="text"
          placeholder="Search instructors..."
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

      <ul className="space-y-2 sm:space-y-3">
        {filteredInstructors.length === 0 && (
          <li className="text-gray-500 italic text-center py-4">No instructors found.</li>
        )}
        {filteredInstructors.map((inst: Instructor, idx: number) => (
          <li
            key={idx}
            className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition"
            // The onClick to setProfileModal needs to pass the full instructor object that Profile expects
            onClick={() => setProfileModal({
                name: inst.name,
                email: inst.email,
                img: inst.img,
                bio: 'Instructor Bio Placeholder', // Add a placeholder bio or fetch actual
                type: 'instructor',
                // Assuming contact is needed by profile modal, but not in current `Instructor` interface.
                // It should be added to the `Instructor` interface above if it's consistently available.
                // contact: inst.contact || 'N/A'
            })}
            aria-label={`View profile of ${inst.name}`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
              <Image
                src={inst.img}
                alt={inst.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[#08228d] text-sm sm:text-base">{inst.name}</span>
              <span className="block text-gray-500 text-xs sm:text-sm">{inst.email}</span>
            </div>
            <button
              className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700"
              onClick={e => {
                e.stopPropagation(); // Prevent opening profile modal
                setArchivePrompt({ open: true, type: 'instructor', name: inst.name });
              }}
            >
              Archive
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
