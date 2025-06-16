'use client';

import React, { useState } from "react";
import Image from "next/image";
import { instructors, students } from "@/data/data";
import { programsList } from '@/data/programsData';
import { dummyDetails, instructorStatus as initialInstructorStatus } from '@/data/data';

import Profile from '@/components/ui/Modals/profileview';
import AdminRoleConfirmModal from '@/components/ui/Modals/AdminRoleConfrimModal';
import AddInstructorModal from '@/components/ui/Modals/addinstructorModal';
import AddAdminModal from '@/components/ui/Modals/AddAdminModal';
import AddProgramModal from '@/components/ui/Modals/addprogramModal';
import ArchiveModal from '@/components/ui/Modals/archiveModal';
import StatusModal from '@/components/ui/Modals/statusModal';

import AdminsTable from './AdminsTable';
import InstructorsList from '@/components/SuperAdmin/InstructorsList';
import StudentsList from '@/components/SuperAdmin/StudentsList';
import ProgramsGrid from '@/components/SuperAdmin/ProgramsGrid';

import { useAdminManagement } from '@/app/hooks/useAdminManagement';

interface Program {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
}

export default function SuperAdminClient() {
  const {
    uniqueUsers,
    adminList,
    adminRoleModalData,
    setAdminRoleModalData,
    showAddAdminModal,
    setShowAddAdminModal,
    handleAdminToggle,
    confirmAdminToggle,
    handleAddEmployee,
  } = useAdminManagement();

  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; contact?: string; type?: 'instructor' | 'student' }>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);

  const [instructorsList, setInstructorsList] = useState(instructors);
  const [adminPrograms, setAdminPrograms] = useState<Program[]>(programsList as Program[]);
  const [newProgram, setNewProgram] = useState<Program>({
    program: '', category: '', instructor: '', date: '', time: '', sessions: '', description: '', thumbnail: '',
  });

  const [archivedPrograms, setArchivedPrograms] = useState<string[]>([]);
  const [archivedInstructors, setArchivedInstructors] = useState<string[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<{ open: boolean; type: 'program' | 'instructor' | 'student'; name: string } | null>(null);
  const [statusModal, setStatusModal] = useState<{ isOpen: boolean; instructorName: string; instructorEmail: string; statusToSet: 'active' | 'inactive' } | null>(null);

  const handleAddInstructor = (instructor: { name: string; email: string; contact: string; img: string }) => {
    setInstructorsList((prev) => [...prev, { ...instructor, bio: 'New instructor.', programs: [], rating: 0, students: [] }]);
    setShowAddInstructorModal(false);
  };

  const handleAddProgram = () => {
    if (!newProgram.program || !newProgram.category || !newProgram.instructor) {
      alert("Program name, category, and instructor are required.");
      return;
    }
    setAdminPrograms((prev) => [...prev, newProgram]);
    setShowAddProgramModal(false);
    setNewProgram({ program: '', category: '', instructor: '', date: '', time: '', sessions: '', description: '', thumbnail: '' });
  };

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
      <div className="px-2 sm:px-6 py-6 sm:py-10 max-w-full sm:max-w-6xl mx-auto space-y-10">
        {/* Administrators Section */}
        <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Administrators</h2>
            <button
              className="bg-[#08228d] text-white px-4 py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
              onClick={() => setShowAddAdminModal(true)}
            >
              + Add Employee
            </button>
          </div>
          <AdminsTable uniqueUsers={uniqueUsers} adminList={adminList} handleAdminToggle={handleAdminToggle} />
          <AddAdminModal
            isOpen={showAddAdminModal}
            onClose={() => setShowAddAdminModal(false)}
            onAdd={handleAddEmployee}
          />
        </div>

        {/* Instructors Section */}
        <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Instructors</h2>
            <button
              className="bg-[#08228d] text-white px-4 py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
              onClick={() => setShowAddInstructorModal(true)}
            >
              + Add Instructor
            </button>
          </div>
          <InstructorsList
            instructorsList={instructorsList}
            archivedInstructors={archivedInstructors}
            setProfileModal={setProfileModal}
            setArchivePrompt={setArchivePrompt}
            instructorStatus={instructorStatus}
            setStatusModal={setStatusModal}
          />
          <AddInstructorModal
            isOpen={showAddInstructorModal}
            onClose={() => setShowAddInstructorModal(false)}
            onAdd={handleAddInstructor}
          />
        </div>

        {/* Students Section */}
        <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#08228d]">Students</h2>
          <StudentsList
            students={students}
            archivedStudents={archivedStudents}
            setProfileModal={setProfileModal}
            setArchivePrompt={setArchivePrompt}
          />
        </div>

        {/* Programs Section */}
        <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Programs List</h2>
            <button
              className="bg-[#08228d] text-white px-4 py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
              onClick={() => setShowAddProgramModal(true)}
            >
              + Add Program
            </button>
          </div>
          <ProgramsGrid
            programs={adminPrograms}
            archivedPrograms={archivedPrograms}
            setArchivePrompt={setArchivePrompt}
            dummyDetails={dummyDetails}
          />
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
        </div>

        {/* Global Modals */}
        <AdminRoleConfirmModal
          isOpen={!!adminRoleModalData}
          isAdmin={adminRoleModalData?.isAdmin ?? false}
          userName={adminRoleModalData?.name ?? ''}
          userEmail={adminRoleModalData?.email ?? ''}
          actionType={adminRoleModalData?.isAdmin ? 'remove' : 'add'}
          onConfirm={confirmAdminToggle}
          onClose={() => setAdminRoleModalData(null)}
        />

        {archivePrompt && (
          <ArchiveModal
            isOpen={archivePrompt.open}
            type={archivePrompt.type}
            name={archivePrompt.name}
            onConfirm={() => {
              if (archivePrompt.type === 'program') handleArchiveProgram(archivePrompt.name);
              else if (archivePrompt.type === 'instructor') handleArchiveInstructor(archivePrompt.name);
              else if (archivePrompt.type === 'student') handleArchiveStudent(archivePrompt.name);
            }}
            onCancel={() => setArchivePrompt(null)}
          />
        )}

        {profileModal && (
          <Profile
            onClose={() => setProfileModal(null)}
            profile={profileModal}
            isAdmin={true}
            instructorStatus={instructorStatus}
            onStatusChange={(name, email, statusToSet) =>
              setStatusModal({ isOpen: true, instructorName: name, instructorEmail: email, statusToSet })
            }
            hideLogout={profileModal.type === 'student' || profileModal.type === 'instructor'}
          />
        )}

        <StatusModal
          isOpen={!!statusModal?.isOpen}
          instructorName={statusModal?.instructorName || ''}
          statusToSet={statusModal?.statusToSet || 'active'}
          onConfirm={() => {
            if (statusModal) {
              setInstructorStatus((prev) => ({
                ...prev,
                [statusModal.instructorEmail]: statusModal.statusToSet,
              }));
              setStatusModal(null);
            }
          }}
          onCancel={() => setStatusModal(null)}
        />
      </div>
    </div>
  );
}
