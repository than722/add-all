import React from "react";
import Image from "next/image";

interface Student {
  name: string;
  email: string;
  img: string;
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface StudentsListProps {
  students: any[];
  archivedStudents: any[];
  setProfileModal: (modal: any) => void;
  setArchivePrompt: (prompt: ArchivePrompt) => void;
}

export default function StudentsList({ students, archivedStudents, setProfileModal, setArchivePrompt }: StudentsListProps) {
  return (
    <ul className="space-y-2 sm:space-y-3">
      {students.filter((stud: Student) => !archivedStudents.includes(stud.name)).map((stud: Student, idx: number) => (
        <li
          key={idx}
          className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setProfileModal({ ...stud, type: 'student' })}
          aria-label={`View profile of ${stud.name}`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
            <Image
              src={stud.img}
              alt={stud.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-[#08228d] text-sm sm:text-base">{stud.name}</span>
            <span className="block text-gray-500 text-xs sm:text-sm">{stud.email}</span>
          </div>
          <button
            className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700"
            onClick={e => {
              e.stopPropagation();
              setArchivePrompt({ open: true, type: 'student', name: stud.name });
            }}
          >
            Archive
          </button>
        </li>
      ))}
    </ul>
  );
}
