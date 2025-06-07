"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import Image from "next/image";
import { instructors, students, admins } from "@/data/data";
import { programsList } from '@/data/programsData';
import { dummyDetails, instructorStatus as initialInstructorStatus } from '@/data/data';
import Profile from '@/components/ui/profileview';
import AdminModal from '@/components/ui/adminModal';
import AddInstructorModal from '@/components/ui/addinstructorModal';
import AddAdminModal from '@/components/ui/addAdminModal';
import AddProgramModal from '@/components/ui/addprogramModal';
import ArchiveModal from '@/components/ui/archiveModal';
import StatusModal from '@/components/ui/statusModal';

export default function SuperAdminPage() {
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
    instructor: 'instructor' in p ? p.instructor : '',
    date: 'date' in p ? p.date : '',
    time: 'time' in p ? p.time : '',
    sessions: 'sessions' in p ? p.sessions : '',
    description: 'description' in p ? p.description : '',
    thumbnail: 'thumbnail' in p ? p.thumbnail : '',
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
      <Navbar admin />
      <div className="px-2 sm:px-6 py-6 sm:py-10 max-w-full sm:max-w-6xl mx-auto">
        {/* Tab Content */}
        {activeTab === 'administrators' && (
          <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#002B5C]">Administrators</h2>
              <button
                className="bg-[#002B5C] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddAdminModal(true)}
              >
                + Add Employee
              </button>
            </div>
            {/* Responsive Table/List */}
            <div className="block sm:hidden">
              <ul className="divide-y divide-gray-200">
                {uniqueUsers.map((user) => {
                  const isAdmin = adminList.some((a) => a.email === user.email && a.isAdmin);
                  return (
                    <li key={user.email} className="py-4 flex flex-col gap-2">
                      <div>
                        <span className="font-semibold text-[#002B5C]">{user.name || "[Employee's name]"}</span>
                        <span className="block text-gray-500 text-xs">{user.email || "[email]"}</span>
                      </div>
                      <div className="flex flex-col gap-1 text-xs text-gray-700">
                        <span><span className="font-semibold">Contact:</span> {user.contact || "[contact]"}</span>
                        <span><span className="font-semibold">Position:</span> {user.position || "Employee"}</span>
                        <span><span className="font-semibold">Role:</span> {isAdmin ? "Admin" : ""}</span>
                      </div>
                      <button
                        className={`mt-2 px-3 py-2 rounded-full font-semibold transition-all bg-[#3bb3ce] text-white text-xs`}
                        onClick={() => handleAdminToggle(user.email, user.name, isAdmin)}
                      >
                        {isAdmin ? "Remove admin role" : "Add as an admin"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 sm:border-spacing-y-4 text-xs sm:text-base">
                <thead>
                  <tr className="text-[#002B5C] font-bold text-base sm:text-lg">
                    <th className="text-black">Employee</th>
                    <th className="text-black">Email</th>
                    <th className="text-black">Contact Info</th>
                    <th className="text-black">Position</th>
                    <th className="text-black">Roles</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueUsers.map((user) => {
                    const isAdmin = adminList.some((a) => a.email === user.email && a.isAdmin);
                    return (
                      <tr key={user.email} className="border-b-2 border-gray-300 last:border-b-0">
                        <td className="py-2 sm:py-3 text-black">{user.name || "[Employee's name]"}</td>
                        <td className="text-black">{user.email || "[email]"}</td>
                        <td className="text-black">{user.contact || "[contact]"}</td>
                        <td className="text-black">{user.position || 'Employee'}</td>
                        <td className="text-black">{isAdmin ? "Admin" : ""}</td>
                        <td>
                          <button
                            className={`px-3 sm:px-5 py-2 rounded-full font-semibold transition-all bg-[#3bb3ce] text-white text-xs sm:text-base`}
                            onClick={() => handleAdminToggle(user.email, user.name, isAdmin)}
                          >
                            {isAdmin ? "Remove admin role" : "Add as an admin"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
              <h2 className="text-lg sm:text-xl font-bold mb-0 text-[#002B5C]">Instructors</h2>
              <button
                className="bg-[#002B5C] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddInstructorModal(true)}
              >
                + Add Instructor
              </button>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {instructorsList.filter(inst => !archivedInstructors.includes(inst.name)).map((inst, idx) => (
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
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#002B5C]">Students</h2>
            <ul className="space-y-2 sm:space-y-3">
              {students.filter(stud => !archivedStudents.includes(stud.name)).map((stud, idx) => (
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
              <h2 className="text-lg sm:text-xl font-bold text-[#002B5C]">Programs List</h2>
              <button
                className="bg-[#002B5C] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                onClick={() => setShowAddProgramModal(true)}
              >
                + Add Program
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 w-full">
                {normalizedAdminPrograms.filter(p => !archivedPrograms.includes(p.program)).map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col h-full min-h-[320px] sm:min-h-[420px] w-full"
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
                        <div className="flex items-center justify-center w-full h-full text-gray-400 text-lg sm:text-2xl font-bold">
                          No Image
                        </div>
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
                          onClick={() => setArchivePrompt({ open: true, type: 'program', name: p.program })}
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
