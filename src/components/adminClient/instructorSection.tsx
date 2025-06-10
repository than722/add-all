// AdminSections/InstructorsSection.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import AddInstructorModal from '@/components/ui/Modals/addinstructorModal';
import type { Instructor } from '@/data/data';

interface InstructorStatus {
  [email: string]: 'active' | 'inactive';
}

interface InstructorsSectionProps {
  instructorsList: Instructor[];
  setInstructorsList: React.Dispatch<React.SetStateAction<Instructor[]>>;
  setProfileModal: React.Dispatch<React.SetStateAction<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>>;
  instructorStatus: InstructorStatus;
  setStatusModal: React.Dispatch<React.SetStateAction<{ isOpen: boolean; instructorName: string; instructorEmail: string; statusToSet: 'active' | 'inactive' } | null>>;
}

export default function InstructorsSection({
  instructorsList,
  setInstructorsList,
  setProfileModal,
  instructorStatus,
  setStatusModal,
}: InstructorsSectionProps) {
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);

  const handleAddInstructor = (instructor: { name: string; email: string; contact: string; img: string }) => {
    setInstructorsList((prev) => [
      ...prev,
      { ...instructor, bio: 'New instructor.' },
    ]);
    setShowAddInstructorModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#08228d]">Instructors</h2>
        <button
          className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
          onClick={() => setShowAddInstructorModal(true)}
        >
          + Add Instructor
        </button>
      </div>
      <ul className="space-y-2 sm:space-y-3">
        {instructorsList.map((inst, idx) => (
          <li
            key={idx}
            className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setProfileModal({ ...inst, type: 'instructor' })}
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
            <div className="flex-1">
              <span className="font-semibold text-[#08228d] text-sm sm:text-base">{inst.name}</span>
              <span className="block text-gray-500 text-xs sm:text-sm">{inst.email}</span>
            </div>
            <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${instructorStatus[inst.email] === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{instructorStatus[inst.email]}</span>
          </li>
        ))}
      </ul>
      <AddInstructorModal
        isOpen={showAddInstructorModal}
        onClose={() => setShowAddInstructorModal(false)}
        onAdd={handleAddInstructor}
      />
    </div>
  );
}