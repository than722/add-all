'use client';

import React from 'react';
import Image from 'next/image';
import type { Instructor } from '@/data/data';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface CardInstructorListProps {
  instructors: Instructor[];
  instructorStatus: InstructorStatus;
  setProfileModal: React.Dispatch<
    React.SetStateAction<null | {
      name: string;
      email: string;
      img: string;
      bio: string;
      contact?: string;
      type?: 'instructor' | 'student';
    }>
  >;
  setArchivePrompt: React.Dispatch<React.SetStateAction<ArchivePrompt | null>>;
}

export default function CardInstructorList({
  instructors,
  instructorStatus,
  setProfileModal,
  setArchivePrompt,
}: CardInstructorListProps) {
  if (instructors.length === 0) {
    return <li className="text-gray-500 italic text-sm p-4">No instructors found.</li>;
  }

  return (
    <>
      {instructors.map((inst, idx) => (
        <li
          key={idx}
          className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-gray-100 transition"
        >
          <div
            className="flex items-center flex-grow cursor-pointer"
            onClick={() =>
              setProfileModal({
                ...inst,
                bio: inst.bio || 'No bio provided.',
                type: 'instructor',
              })
            }
            aria-label={`View profile of ${inst.name}`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
              <Image
                src={inst.img && inst.img.trim() !== '' ? inst.img : '/profileicon.png'}
                alt={inst.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1 ml-3">
              <span className="font-semibold text-[#08228d] text-sm sm:text-base block">{inst.name}</span>
              <span className="block text-gray-500 text-xs sm:text-sm">{inst.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${
                instructorStatus[inst.email] === 'active'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-600'
              } transition`}
            >
              {instructorStatus[inst.email]}
            </span>
            <button
              className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setArchivePrompt({ open: true, type: 'instructor', name: inst.name });
              }}
            >
              Archive
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
