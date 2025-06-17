// app/components/Admin/AdminCourseOutlineViewClient.tsx
// This component displays the interactive course outline for a specific program,
// tailored for the Admin view.

'use client'; // This component uses hooks like useState, useEffect, useRouter.

import React, { useState, useEffect } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// ProgressCircle component (remains the same)
function ProgressCircle({ percent }: { percent: number }) {
  const radius = 12;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg className="w-6 h-6" height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#3b82f6"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset,
          transition: 'stroke-dashoffset 0.5s ease',
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}

interface AdminCourseOutlineViewClientProps {
  programName: string; // Program name passed as a prop from the server page
}

export default function AdminCourseOutlineViewClient({ programName }: AdminCourseOutlineViewClientProps) {
  const router = useRouter(); // Initialize useRouter for navigation
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  // Assuming initialCourseOutline is global for now, but could be fetched per program
  const [courseOutline] = useState(initialCourseOutline);

  // Removed role state as it's not directly used for UI within this component.
  // The Admin context implies the current user is an admin.

  useEffect(() => {
    // Optionally set initial selected module/subsection based on URL or saved state
    // if needed for a deeper link.
  }, []); // Empty dependency array, runs once on mount

  const filteredModules = courseOutline.filter((mod) =>
    mod.title.toLowerCase().includes(search.toLowerCase()) ||
    mod.subsections.some((sub) => sub.title.toLowerCase().includes(search.toLowerCase()))
  );

  const selected = courseOutline.find((mod) => mod.id === selectedModule);
  const selectedSub = selectedSubsection && courseOutline
    .find((mod) => mod.id === selectedSubsection.modId)?.subsections.find((sub) => sub.id === selectedSubsection.subId);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 bg-white shadow-lg p-4 sm:p-6 sticky top-0 overflow-y-auto max-h-[60vh] md:max-h-screen z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 gap-2">
            {/* Back button logic updated to go back to the admin program list */}
            <button
              className="px-3 py-1 bg-blue-700 text-white rounded-full font-semibold text-xs sm:text-sm shadow hover:bg-blue-800 transition"
              onClick={() => router.push('/admin/programlist')} // Go back to Admin Programs List
            >
              ← Back to Programs List
            </button>
            <h2 className="sm:ml-4 text-lg sm:text-xl font-bold text-blue-700">Course Outline: {decodeURIComponent(programName)}</h2>
          </div>
          <input
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition placeholder-gray-900 text-gray-900 text-sm sm:text-base"
          />
          <ul className="space-y-2 sm:space-y-3">
            {filteredModules.length === 0 && (
              <li className="text-gray-400 italic text-xs sm:text-sm">No modules found.</li>
            )}
            {filteredModules.map((mod) => (
              <li key={mod.id} className="mb-1 sm:mb-2">
                <button
                  className={`w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 py-2 rounded-lg transition ${
                    selectedModule === mod.id
                      ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner'
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => {
                    setExpandedModule(expandedModule === mod.id ? null : mod.id);
                    setSelectedModule(mod.id);
                    setSelectedSubsection(null);
                  }}
                >
                  <span className="text-sm sm:text-base">{mod.title}</span>
                  <div className="w-full sm:w-24 mt-2 sm:mt-0">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${moduleProgress[mod.id] || 0}%`, transition: 'width 0.3s' }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{moduleProgress[mod.id] || 0}%</div>
                  </div>
                </button>
                {expandedModule === mod.id && (
                  <ul className="mt-1 sm:mt-2 ml-2 sm:ml-4 space-y-1 sm:space-y-2">
                    {mod.subsections.map((sub) => (
                      <li key={sub.id} className="cursor-pointer" onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}>
                        <div className={`flex items-center p-2 rounded-lg transition hover:bg-gray-100 ${selectedSubsection?.modId === mod.id && selectedSubsection?.subId === sub.id ? 'bg-blue-50' : ''}`}>
                          <ProgressCircle percent={subsectionProgress[sub.id] || 0} />
                          <div className="ml-2 sm:ml-3 flex-1 flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-base text-gray-900">{sub.title}</span>
                            <span className="text-xs text-gray-400">{subsectionProgress[sub.id] || 0}%</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-screen bg-gray-50">
          {selectedSub ? (
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">{selectedSub.title}</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">{selectedSub.content}</p>
              <button
                className="text-blue-500 underline text-xs sm:text-sm"
                onClick={() => setSelectedSubsection(null)}
              >
                ← Back to module
              </button>
            </div>
          ) : selected ? (
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">{selected.title}</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">{selected.content}</p>
              <h4 className="text-base sm:text-lg font-semibold text-blue-700 mb-2">Subsections</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                {selected.subsections.map((sub) => (
                  <li key={sub.id}>{sub.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-10 sm:mt-20 text-sm sm:text-base">Select a module to view its content.</div>
          )}
        </main>
      </div>
    </>
  );
}
