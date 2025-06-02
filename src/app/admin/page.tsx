'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { programsList } from '@/data/programsData';
import Image from 'next/image';
import { instructors, students, dummyDetails } from '@/data/data';

export default function AdminPage() {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || 'programs';

  // Modal state for profile viewing
  const [profileModal, setProfileModal] = useState<null | { name: string; email: string; img: string; bio: string }>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar admin />

      <div className="px-6 py-10 max-w-5xl mx-auto">
        {tab === 'programs' && (
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

        {tab === 'instructors' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002B5C]">Instructors</h2>
            <ul className="space-y-3">
              {instructors.map((inst, idx) => (
                <li
                  key={idx}
                  className="bg-white rounded shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setProfileModal(inst)}
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
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'students' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002B5C]">Students</h2>
            <ul className="space-y-3">
              {students.map((stud, idx) => (
                <li
                  key={idx}
                  className="bg-white rounded shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setProfileModal(stud)}
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
      </div>

      {/* Profile Modal */}
      {profileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setProfileModal(null)}
              aria-label="Close profile modal"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <Image
                src={profileModal?.img}
                alt={profileModal?.name}
                width={80}
                height={80}
                className="rounded-full mb-3"
              />
              <h3 className="text-lg font-bold text-[#002B5C] mb-1">{profileModal?.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{profileModal?.email}</p>
              <p className="text-gray-700 text-center">{profileModal?.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
