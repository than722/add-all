'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import { programsList } from '@/data/programsData';
import Image from 'next/image';
import { instructors, students, dummyDetails, instructorStatus as initialInstructorStatus } from '@/data/data';
import PendingModal from '@/components/ui/pendingModal';
import StatusModal from '@/components/ui/statusModal';
import Profile from '@/components/ui/profileview';
import AddProgramModal from '@/components/ui/addprogramModal';
import AddInstructorModal from '@/components/ui/addinstructorModal';
import ArchiveModal from '@/components/ui/archiveModal';

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
  program: string;
}

const dummyPendingApps: PendingApplication[] = [
  {
    name: 'Alice Johnson',
    email: 'alice@email.com',
    receiptUrl: '/add-all image 1.jpg',
    paymentType: 'cash',
    status: 'pending',
    program: 'Floristry',
  },
  {
    name: 'Bob Smith',
    email: 'bob@email.com',
    receiptUrl: '/add-all image 2.jpg',
    paymentType: 'online',
    status: 'pending',
    program: 'Investment Analysis',
  },
];

export default function AdminPage() {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || 'programs';

  // Modal state for profile viewing
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>(null);
  const [pendingModal, setPendingModal] = useState<PendingApplication | null>(null);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>(dummyPendingApps);
  const [viewedReceipt, setViewedReceipt] = useState<string | null>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  const [statusModal, setStatusModal] = useState<{ isOpen: boolean; instructorName: string; instructorEmail: string; statusToSet: 'active' | 'inactive' } | null>(null);

  // Add program modal state
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [newProgram, setNewProgram] = useState({
    program: '',
    category: '',
    instructor: '',
    date: '',
    time: '',
    sessions: '',
    description: '',
    thumbnail: '', // Add thumbnail field
  });
  const [adminPrograms, setAdminPrograms] = useState(programsList);

  // Add instructor modal state
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [instructorsList, setInstructorsList] = useState(instructors);

  // Archive state
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<{ open: boolean; program: string } | null>(null);

  // Fix: Normalize adminPrograms to always have all fields (for both default and added programs)
  const normalizedAdminPrograms = adminPrograms.map((p) => ({
    program: p.program,
    category: p.category,
    instructor: 'instructor' in p ? p.instructor : '',
    date: 'date' in p ? p.date : '',
    time: 'time' in p ? p.time : '',
    sessions: 'sessions' in p ? p.sessions : '',
    description: 'description' in p ? p.description : '',
    thumbnail: 'thumbnail' in p ? p.thumbnail : '',
  }));

  // Confirm enrollment (admin)
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

  // Add program handler
  const handleAddProgram = () => {
    setAdminPrograms((prev) => [
      ...prev,
      {
        program: newProgram.program,
        category: newProgram.category,
        instructor: newProgram.instructor,
        date: newProgram.date,
        time: newProgram.time,
        sessions: newProgram.sessions,
        description: newProgram.description,
        thumbnail: newProgram.thumbnail,
      },
    ]);
    setShowAddProgramModal(false);
    setNewProgram({ program: '', category: '', instructor: '', date: '', time: '', sessions: '', description: '', thumbnail: '' });
  };

  // Add instructor handler
  const handleAddInstructor = (instructor: { name: string; email: string; contact: string; img: string }) => {
    setInstructorsList((prev) => [
      ...prev,
      { ...instructor, bio: 'New instructor.' },
    ]);
    setShowAddInstructorModal(false);
  };

  // Archive program handler
  const handleArchiveProgram = (program: string) => {
    setArchivedPrograms((prev) => [...prev, program]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar admin />
      <div className="px-2 sm:px-4 py-6 sm:py-10 w-full max-w-auto">
        {tab === 'programs' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#002B5C]">Programs List</h2>
              <button
                className="bg-[#002B5C] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddProgramModal(true)}
              >
                + Add Program
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 min-w-[320px]">
                {normalizedAdminPrograms.filter(p => !archivedPrograms.includes(p.program)).map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col h-full min-h-[340px] sm:min-h-[420px] w-full"
                    style={{ minWidth: 0 }}
                  >
                    <div className="w-full h-32 sm:h-40 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 overflow-hidden">
                      {p.thumbnail && typeof p.thumbnail === 'string' ? (
                        <img
                          src={p.thumbnail}
                          alt="Program Thumbnail"
                          className="object-cover rounded-md w-full h-full"
                        />
                      ) : (
                        <Image
                          src="/thumbnail.png"
                          alt="Program Thumbnail"
                          width={320}
                          height={160}
                          className="object-cover rounded-md w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg font-semibold text-[#002B5C] mb-1">{p.program}</h3>
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
                          onClick={() => setArchivePrompt({ open: true, program: p.program })}
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Add Program Modal */}
            <AddProgramModal
              isOpen={showAddProgramModal}
              newProgram={newProgram}
              instructors={instructors}
              onChange={(field, value) => setNewProgram(prev => ({ ...prev, [field]: value }))}
              onThumbnailChange={url => setNewProgram(prev => ({ ...prev, thumbnail: url }))}
              onClose={() => setShowAddProgramModal(false)}
              onAdd={handleAddProgram}
              canAdd={!!newProgram.program && !!newProgram.category && !!newProgram.instructor}
            />
            {/* Archive Prompt Modal */}
            {archivePrompt && (
              <ArchiveModal
                isOpen={!!archivePrompt.open}
                type="program"
                name={archivePrompt.program}
                onConfirm={() => handleArchiveProgram(archivePrompt.program)}
                onCancel={() => setArchivePrompt(null)}
              />
            )}
          </div>
        )}

        {tab === 'instructors' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#002B5C]">Instructors</h2>
              <button
                className="bg-[#002B5C] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#002B5C] flex-shrink-0">
                    <Image
                      src={inst.img}
                      alt={inst.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#002B5C] text-sm sm:text-base">{inst.name}</span>
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
        )}

        {tab === 'students' && (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#002B5C]">Students</h2>
            <ul className="space-y-2 sm:space-y-3">
              {students.map((stud, idx) => {
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#002B5C] flex-shrink-0">
                      <Image
                        src={stud.img}
                        alt={stud.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-[#002B5C] text-sm sm:text-base">{stud.name}</span>
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
        )}
      </div>

      {/* Profile Modal */}
      {profileModal && (
        <Profile
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true}
          instructorStatus={instructorStatus}
          onStatusChange={(instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => setStatusModal({ isOpen: true, instructorName, instructorEmail, statusToSet })}
          hideLogout={true}
          hideNotifications={true}
        />
      )}
      <StatusModal
        isOpen={!!statusModal?.isOpen}
        instructorName={statusModal?.instructorName || ''}
        statusToSet={statusModal?.statusToSet || 'active'}
        onConfirm={() => {
          if (statusModal) {
            setInstructorStatus((prev) => ({ ...prev, [statusModal.instructorEmail]: statusModal.statusToSet }));
            setStatusModal(null);
          }
        }}
        onCancel={() => setStatusModal(null)}
      />
    </div>
  );
}
