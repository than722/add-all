"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import { instructors, students, admins } from "@/data/data";
import { programsList } from '@/data/programsData';
import { dummyDetails, instructorStatus as initialInstructorStatus } from '@/data/data';
import Profile from '@/components/ui/profileview';
import AdminModal from '@/components/ui/adminModal';

export default function SuperAdminPage() {
  const [adminList, setAdminList] = useState(admins);
  const [modal, setModal] = useState<{ email: string; name: string; isAdmin: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<'administrators' | 'instructors' | 'students' | 'programs'>('administrators');
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string; type?: 'instructor' | 'student' }>(null);
  const [instructorStatus, setInstructorStatus] = useState<{ [email: string]: 'active' | 'inactive' }>(initialInstructorStatus);

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

  // Combine all users for admin assignment
  const allUsers = [
    ...students.map((s) => ({ ...s, contact: '[contact]', position: 'Employee', isAdmin: false })),
    ...instructors.map((i) => ({ ...i, contact: '[contact]', position: 'Employee', isAdmin: false })),
    ...adminList,
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar admin />
      <div className="px-6 py-10 max-w-6xl mx-auto">
        {/* Tab Content */}
        {activeTab === 'administrators' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[#002B5C] font-bold text-lg">
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
                      <td className="py-3 text-black">{user.name || "[Employee's name]"}</td>
                      <td className="text-black">{user.email || "[email]"}</td>
                      <td className="text-black">{user.contact || "[contact]"}</td>
                      <td className="text-black">Employee</td>
                      <td className="text-black">{isAdmin ? "Admin" : ""}</td>
                      <td>
                        <button
                          className={`px-5 py-2 rounded-full font-semibold transition-all bg-[#3bb3ce] text-white`}
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
        )}
        {activeTab === 'instructors' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002B5C]">Instructors</h2>
            <ul className="space-y-3">
              {instructors.map((inst, idx) => (
                <li
                  key={idx}
                  className="bg-white rounded shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setProfileModal({ ...inst, type: 'instructor' })}
                  aria-label={`View profile of ${inst.name}`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#002B5C] flex-shrink-0">
                    <Image
                      src={inst.img}
                      alt={inst.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#002B5C]">{inst.name}</span>
                    <span className="block text-gray-500 text-sm">{inst.email}</span>
                  </div>
                  <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${instructorStatus[inst.email] === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{instructorStatus[inst.email]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'students' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002B5C]">Students</h2>
            <ul className="space-y-3">
              {students.map((stud, idx) => (
                <li
                  key={idx}
                  className="bg-white rounded shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setProfileModal({ ...stud, type: 'student' })}
                  aria-label={`View profile of ${stud.name}`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#002B5C] flex-shrink-0">
                    <Image
                      src={stud.img}
                      alt={stud.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#002B5C]">{stud.name}</span>
                    <span className="block text-gray-500 text-sm">{stud.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'programs' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002B5C]">Programs List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {programsList.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between"
                >
                  <div className="flex-1">
                    <div className="w-full h-32 bg-gray-300 rounded-md mb-3 flex items-center justify-center text-gray-600">
                      <Image
                        src="/thumbnail.png"
                        alt="Program Thumbnail"
                        width={120}
                        height={80}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[#002B5C]">{p.program}</h3>
                    <p className="text-sm text-gray-500 italic">{p.category}</p>
                    <p className="text-gray-700 mt-2">{dummyDetails.description}</p>
                    <div className="text-xs text-gray-600 mt-2">
                      <div><strong>Time & Sessions:</strong> {dummyDetails.timeAndSessions}</div>
                      <div><strong>Date:</strong> {dummyDetails.date}</div>
                      <div><strong>Instructor:</strong> {dummyDetails.instructor}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            onStatusChange={(instructorName: string, instructorEmail: string, statusToSet: 'active' | 'inactive') => setInstructorStatus((prev) => ({ ...prev, [instructorEmail]: statusToSet }))}
          />
        )}
      </div>
    </div>
  );
}
