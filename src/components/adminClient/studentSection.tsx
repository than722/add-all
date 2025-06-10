// AdminSections/StudentsSection.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import PendingModal from '@/components/ui/Modals/pendingModal';
import { students as initialStudents, PendingApplication } from '@/data/data';

interface Student {
  name: string;
  email: string;
  img: string;
  bio?: string;
}

interface StudentsSectionProps {
  pendingApps: PendingApplication[];
  setPendingApps: React.Dispatch<React.SetStateAction<PendingApplication[]>>;
  setProfileModal: React.Dispatch<React.SetStateAction<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>>;
}

export default function StudentsSection({
  pendingApps,
  setPendingApps,
  setProfileModal,
}: StudentsSectionProps) {
  const [pendingModal, setPendingModal] = useState<PendingApplication | null>(null);
  const [viewedReceipt, setViewedReceipt] = useState<string | null>(null);

  const handleConfirmEnrollment = (email: string) => {
    setPendingApps((prev) =>
      prev.map((app) =>
        app.email === email && app.status === 'pending'
          ? { ...app, status: 'enrolled' }
          : app
      )
    );
    setPendingModal(null);
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#08228d]">Students</h2>
      <ul className="space-y-2 sm:space-y-3">
        {initialStudents.map((stud, idx) => {
          const pendingApp = pendingApps.find(
            (app) => app.email === stud.email && app.status === 'pending'
          );
          const enrolledApp = pendingApps.find(
            (app) => app.email === stud.email && app.status === 'enrolled'
          );
          return (
            <li
              key={idx}
              className="bg-white rounded shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => setProfileModal({ ...stud, type: 'student' })}
              aria-label={`View profile of ${stud.name}`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#08228d] flex-shrink-0">
                <Image
                  src={stud.img && stud.img.trim() !== '' ? stud.img : '/profileicon.png'}
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
              {pendingApp && (
                <button
                  className="ml-auto bg-yellow-400 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-500"
                  onClick={e => {
                    e.stopPropagation();
                    setPendingModal(pendingApp);
                  }}
                >
                  Pending Application
                </button>
              )}
              {!pendingApp && enrolledApp && (
                <span className="ml-auto bg-green-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold">Enrolled</span>
              )}
            </li>
          );
        })}
      </ul>
      {/* Pending Application Modal */}
      <PendingModal
        pendingModal={pendingModal}
        viewedReceipt={viewedReceipt}
        onClose={() => setPendingModal(null)}
        onViewReceipt={setViewedReceipt}
        onCloseReceipt={() => setViewedReceipt(null)}
        onConfirm={handleConfirmEnrollment}
      />
    </div>
  );
}