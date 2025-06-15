"use client";

import React, { useState } from "react";
import Image from "next/image";
import { instructors, students, admins } from "@/data/data";
import { programsList } from '@/data/programsData';
import { dummyDetails, instructorStatus as initialInstructorStatus } from '@/data/data';
import Profile from '@/components/ui/Modals/profileview';
import AdminModal from '@/components/ui/Modals/adminModal';
import AddInstructorModal from '@/components/ui/Modals/addinstructorModal';
import AddAdminModal from '@/components/ui/Modals/addAdminModal';
import AddProgramModal from '@/components/ui/Modals/addprogramModal';
import ArchiveModal from '@/components/ui/Modals/archiveModal';
import StatusModal from '@/components/ui/Modals/statusModal';
import AdminsTable from './AdminsTable';
import InstructorsList from './InstructorsList';
import StudentsList from './StudentsList';
import ProgramsGrid from './ProgramsGrid';

export default function SuperAdminClient() {
  const [adminList, setAdminList] = useState(admins);
  const [modal, setModal] = useState<{ email: string; name: string; isAdmin: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<'administrators' | 'instructors' | 'students' | 'programs'>('administrators');
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', contact: '', img: '' });

  // For navbar tab switching
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['administrators','instructors','students','programs'].includes(hash)) {
        setActiveTab(hash as any);
      }
    }
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['administrators','instructors','students','programs'].includes(hash)) {
        setActiveTab(hash as any);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Combine all users for admin assignment (exclude students from admin table)
  const allUsers = [
    ...instructors.map((i) => ({ ...i, contact: '[contact]', position: 'Employee', isAdmin: false })),
    ...adminList, // adminList now contains the correct position from AddAdminModal
  ];
  // Unique by email
  const uniqueUsers = Array.from(new Map(allUsers.map((u) => [u.email, u])).values());

  const handleAdminToggle = (email: string, name: string, isAdmin: boolean) => {
    setModal({ email, name, isAdmin });
  };

  const confirmAdminToggle = () => {
    if (!modal) return;
    setAdminList((prev) => {
      const exists = prev.find((a) => a.email === modal.email);
      if (exists) {
        return prev.map((a) =>
          a.email === modal.email ? { ...a, isAdmin: !a.isAdmin } : a
        );
      } else {
        const user = uniqueUsers.find((u) => u.email === modal.email);
        if (user) {
          return [...prev, { ...user, isAdmin: true }];
        }
      }
      return prev;
    });
    setModal(null);
  };

  // Add admin handler
  const handleAddAdmin = (admin: { name: string; email: string; contact: string; img: string; position: string }) => {
    setAdminList((prev) => [
      ...prev,
      { ...admin, isAdmin: false }, // New employees are NOT admins by default
    ]);
    setShowAddAdminModal(false);
    setNewAdmin({ name: '', email: '', contact: '', img: '' });
  };

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
    thumbnail: '',
  });
  const [adminPrograms, setAdminPrograms] = useState(programsList);

  // Add instructor modal state
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [instructorsList, setInstructorsList] = useState(instructors);

  // Archive state for instructors, programs, and students
  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);
  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<{ open: boolean; type: 'program' | 'instructor' | 'student'; name: string } | null>(null);

  // Status modal state for instructor status change
  const [statusModal, setStatusModal] = useState<{ isOpen: boolean; instructorName: string; instructorEmail: string; statusToSet: 'active' | 'inactive' } | null>(null);

  // Normalize adminPrograms to always have all fields
  const normalizedAdminPrograms = adminPrograms.map((p) => ({
    program: p.program,
    category: p.category,
    instructor: 'instructor' in p && typeof (p as any).instructor === 'string' ? (p as any).instructor : '',
    date: 'date' in p && typeof (p as any).date === 'string' ? (p as any).date : '',
    time: 'time' in p && typeof (p as any).time === 'string' ? (p as any).time : '',
    sessions: 'sessions' in p && typeof (p as any).sessions === 'string' ? (p as any).sessions : '',
    description: 'description' in p && typeof (p as any).description === 'string' ? (p as any).description : '',
    thumbnail: 'thumbnail' in p && typeof (p as any).thumbnail === 'string' ? (p as any).thumbnail : '',
  }));

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

  // Archive handlers
  const handleArchiveProgram = (program: string) => {
    setArchivedPrograms((prev) => [...prev, program]);
    setArchivePrompt(null);
  };
  const handleArchiveInstructor = (instructor: string) => {
    setArchivedInstructors((prev) => [...prev, instructor]);
    setArchivePrompt(null);
  };
  const handleArchiveStudent = (student: string) => {
    setArchivedStudents((prev) => [...prev, student]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-6 py-6 sm:py-10 max-w-full sm:max-w-6xl mx-auto">
        {/* Tab Content */}
        {activeTab === 'administrators' && (
          <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Administrators</h2>
              <button
                className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddAdminModal(true)}
              >
                + Add Employee
              </button>
            </div>
            <AdminsTable uniqueUsers={uniqueUsers} adminList={adminList} handleAdminToggle={handleAdminToggle} />
            <AddAdminModal
              isOpen={showAddAdminModal}
              onClose={() => setShowAddAdminModal(false)}
              onAdd={handleAddAdmin}
            />
          </div>
        )}
        {activeTab === 'instructors' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#08228d]">Instructors</h2>
              <button
                className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddInstructorModal(true)}
              >
                + Add Instructor
              </button>
            </div>
            <InstructorsList instructorsList={instructorsList} archivedInstructors={archivedInstructors} setProfileModal={setProfileModal} setArchivePrompt={setArchivePrompt} instructorStatus={instructorStatus} />
            <AddInstructorModal
              isOpen={showAddInstructorModal}
              onClose={() => setShowAddInstructorModal(false)}
              onAdd={handleAddInstructor}
            />
            {/* Archive Instructor Modal */}
            {archivePrompt && archivePrompt.type === 'instructor' && (
              <ArchiveModal
                isOpen={!!archivePrompt.open}
                type="instructor"
                name={archivePrompt.name}
                onConfirm={() => handleArchiveInstructor(archivePrompt.name)}
                onCancel={() => setArchivePrompt(null)}
              />
            )}
          </div>
        )}
        {activeTab === 'students' && (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#08228d]">Students</h2>
            <StudentsList students={students} archivedStudents={archivedStudents} setProfileModal={setProfileModal} setArchivePrompt={setArchivePrompt} />
            {/* Archive Student Modal */}
            {archivePrompt && archivePrompt.type === 'student' && (
              <ArchiveModal
                isOpen={!!archivePrompt.open}
                type="student"
                name={archivePrompt.name}
                onConfirm={() => handleArchiveStudent(archivePrompt.name)}
                onCancel={() => setArchivePrompt(null)}
              />
            )}
          </div>
        )}
        {activeTab === 'programs' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Programs List</h2>
              <button
                className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddProgramModal(true)}
              >
                + Add Program
              </button>
            </div>
            <ProgramsGrid normalizedAdminPrograms={normalizedAdminPrograms} archivedPrograms={archivedPrograms} setArchivePrompt={setArchivePrompt} dummyDetails={dummyDetails} />
            <AddProgramModal
              isOpen={showAddProgramModal}
              newProgram={newProgram}
              instructors={instructorsList}
              onChange={(field, value) => setNewProgram(prev => ({ ...prev, [field]: value }))}
              onThumbnailChange={url => setNewProgram(prev => ({ ...prev, thumbnail: url }))}
              onClose={() => setShowAddProgramModal(false)}
              onAdd={handleAddProgram}
              canAdd={!!newProgram.program && !!newProgram.category && !!newProgram.instructor}
            />
            {/* Archive Program Modal */}
            {archivePrompt && archivePrompt.type === 'program' && (
              <ArchiveModal
                isOpen={!!archivePrompt.open}
                type="program"
                name={archivePrompt.name}
                onConfirm={() => handleArchiveProgram(archivePrompt.name)}
                onCancel={() => setArchivePrompt(null)}
              />
            )}
          </div>
        )}
        {/* Confirmation Modal */}
        <AdminModal
          isOpen={!!modal}
          isAdmin={modal?.isAdmin ?? false}
          name={modal?.name ?? ''}
          onConfirm={confirmAdminToggle}
          onCancel={() => setModal(null)}
        />
        {/* Profile Modal */}
        {profileModal && (
          <Profile
            onClose={() => setProfileModal(null)}
            profile={profileModal}
            isAdmin={true}
            instructorStatus={instructorStatus}
            onStatusChange={(instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => setStatusModal({ isOpen: true, instructorName, instructorEmail, statusToSet })}
            hideLogout={profileModal.type === 'student' || profileModal.type === 'instructor'}
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
    </div>
  );
}
