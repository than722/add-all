import React from "react";
import Image from "next/image";

interface Instructor {
  name: string;
  email: string;
  img: string;
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface InstructorsListProps {
  instructorsList: Instructor[];
  archivedInstructors: string[];
  setProfileModal: (profile: any) => void;
  setArchivePrompt: (prompt: ArchivePrompt) => void;
  instructorStatus: { [email: string]: 'active' | 'inactive' };
}

export default function InstructorsList({ instructorsList, archivedInstructors, setProfileModal, setArchivePrompt, instructorStatus }: InstructorsListProps) {
  return (
    <ul className="space-y-2 sm:space-y-3">
      {instructorsList.filter((inst: Instructor) => !archivedInstructors.includes(inst.name)).map((inst: Instructor, idx: number) => (
        <li
          key={idx}
          className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setProfileModal({ ...inst, type: 'instructor' })}
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
          <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${instructorStatus[inst.email] === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{instructorStatus[inst.email]}</span>
          <button
            className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700"
            onClick={e => {
              e.stopPropagation();
              setArchivePrompt({ open: true, type: 'instructor', name: inst.name });
            }}
          >
            Archive
          </button>
        </li>
      ))}
    </ul>
  );
}
