import React from "react";
import Image from "next/image";
import PendingModal from '@/components/ui/Modals/pendingModal';
import { students as initialStudents } from '@/data/data';

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
  const [pendingModal, setPendingModal] = React.useState<any | null>(null);
  const [pendingApps, setPendingApps] = React.useState<any[]>(() =>
    (students && students.length > 0 ? students : initialStudents).map(stud => ({ email: stud.email, status: stud.status || 'none', ...stud }))
  );
  const [viewedReceipt, setViewedReceipt] = React.useState<string | null>(null);

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
    <>
      <ul className="space-y-2 sm:space-y-3">
        {(students && students.length > 0 ? students : initialStudents).filter((stud: Student) => !archivedStudents.includes(stud.name)).map((stud: any, idx: number) => {
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
          );
        })}
      </ul>
      <PendingModal
        pendingModal={pendingModal}
        viewedReceipt={viewedReceipt}
        onClose={() => setPendingModal(null)}
        onViewReceipt={setViewedReceipt}
        onCloseReceipt={() => setViewedReceipt(null)}
        onConfirm={handleConfirmEnrollment}
      />
    </>
  );
}
