'use client';

import React from 'react';
import Image from 'next/image';
import type { PendingApplication } from '@/data/data';

interface StudentRecord {
  name: string;
  email: string;
  img: string;
  bio: string;
  contact: string;
  status: 'registered' | 'pending' | 'enrolled';
  program?: string;
  receiptUrl?: string;
  paymentType?: string;
}

interface ArchivePrompt {
  open: boolean;
  type: 'program' | 'instructor' | 'student';
  name: string;
}

interface CardStudentListProps {
  students: StudentRecord[];
  onViewPending: (application: PendingApplication) => void;
  setProfileModal: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    img: string;
    bio: string;
    contact?: string;
    type?: 'instructor' | 'student';
  } | null>>;
  setArchivePrompt: React.Dispatch<React.SetStateAction<ArchivePrompt | null>>;
}

export default function CardStudentList({
  students,
  onViewPending,
  setProfileModal,
  setArchivePrompt,
}: CardStudentListProps) {
  if (students.length === 0) {
    return <li className="text-gray-500 italic text-sm p-4">No students found.</li>;
  }

  return (
    <>
      {students.map((record) => (
        <li
          key={record.email + (record.program || '')}
          className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-gray-100 transition"
        >
          <div
            className="flex items-center flex-grow cursor-pointer"
            onClick={() => setProfileModal({ ...record, type: 'student' })}
            aria-label={`View profile of ${record.name}`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
              <Image
                src={record.img && record.img.trim() !== '' ? record.img : '/profileicon.png'}
                alt={record.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1 ml-3">
              <span className="font-semibold text-[#08228d] text-sm sm:text-base block">{record.name}</span>
              <span className="block text-gray-500 text-xs sm:text-sm">{record.email}</span>
              {record.program && (
                <span className="block text-gray-500 text-xs sm:text-sm italic">
                  ({record.program})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {record.status === 'pending' && record.receiptUrl && record.program ? (
              <button
                className="ml-auto bg-yellow-400 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPending({
                    name: record.name,
                    email: record.email,
                    receiptUrl: record.receiptUrl ?? '',
                    paymentType: record.paymentType || 'N/A',
                    status: 'pending',
                    program: record.program ?? '',
                  });
                }}
              >
                Pending Application
              </button>
            ) : record.status === 'enrolled' ? (
              <span className="ml-auto bg-green-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold">Enrolled</span>
            ) : (
              <span className="ml-auto bg-gray-400 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold">Registered</span>
            )}
            <button
              className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-red-700 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setArchivePrompt({ open: true, type: 'student', name: record.name });
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
