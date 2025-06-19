'use client';

import React, { useState, useEffect } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import { useRouter } from 'next/navigation';
import '../../../styles/CourseOutlineStyle.css'; // Import the shared CSS

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

interface SuperAdminCourseOutlineViewClientProps {
  programName: string;
}

export default function SuperAdminCourseOutlineViewClient({ programName }: SuperAdminCourseOutlineViewClientProps) {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  const [courseOutline] = useState(initialCourseOutline);

  useEffect(() => {
    if (initialCourseOutline.length > 0) {
      setExpandedModule(initialCourseOutline[0].id);
      setSelectedModule(initialCourseOutline[0].id);
    }
  }, []);

  const filteredModules = courseOutline.filter((mod) =>
    mod.title.toLowerCase().includes(search.toLowerCase()) ||
    mod.subsections.some((sub) => sub.title.toLowerCase().includes(search.toLowerCase()))
  );

  const selected = courseOutline.find((mod) => mod.id === selectedModule);
  const selectedSub = selectedSubsection && courseOutline
    .find((mod) => mod.id === selectedSubsection.modId)?.subsections.find((sub) => sub.id === selectedSubsection.subId);

  return (
    <div className="course-outline-container"> {/* Apply base container style */}
      {/* Sidebar */}
      <aside className="course-outline-sidebar"> {/* Apply sidebar style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-3">
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => router.push('/superadmin/programlist')}
            aria-label="Back to Programs List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Programs List
          </button>
          <h2 className="sm:ml-4 text-xl lg:text-2xl font-extrabold text-blue-800 break-words">
            {decodeURIComponent(programName)}
          </h2>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search modules or subsections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 placeholder-gray-500 text-gray-900 text-base"
            aria-label="Search course modules"
          />
        </div>

        <ul className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
          {filteredModules.length === 0 && (
            <li className="text-gray-500 italic text-sm text-center py-4">No modules found matching your search.</li>
          )}
          {filteredModules.map((mod) => (
            <li key={mod.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
              <button
                className={`module-item-button ${selectedModule === mod.id ? 'selected' : ''}`} // Apply custom class
                onClick={() => {
                  setExpandedModule(expandedModule === mod.id ? null : mod.id);
                  setSelectedModule(mod.id);
                  setSelectedSubsection(null);
                }}
                aria-expanded={expandedModule === mod.id}
                aria-controls={`module-subsections-${mod.id}`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-base lg:text-lg">{mod.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 font-semibold">{moduleProgress[mod.id] || 0}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${moduleProgress[mod.id] || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
              {expandedModule === mod.id && (
                <ul id={`module-subsections-${mod.id}`} className="mt-2 ml-4 border-l-2 border-blue-200 space-y-1 animate-fadeIn">
                  {mod.subsections.map((sub) => (
                    <li key={sub.id} className="relative">
                      <button
                        className={`subsection-item-button ${selectedSubsection?.modId === mod.id && selectedSubsection?.subId === sub.id ? 'selected' : ''}`} // Apply custom class
                        onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}
                        aria-current={selectedSubsection?.modId === mod.id && selectedSubsection?.subId === sub.id ? 'page' : undefined}
                      >
                        <ProgressCircle percent={subsectionProgress[sub.id] || 0} />
                        <div className="ml-3 flex-1 flex items-center justify-between">
                          <span className="text-sm">{sub.title}</span>
                          <span className="text-xs text-gray-500">{subsectionProgress[sub.id] || 0}%</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="course-outline-main-content"> {/* Apply main content style */}
        {selectedSub ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl w-full animate-fadeInUp">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-4 border-b pb-3 border-gray-200">
              {selectedSub.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">{selectedSub.content}</p>
            <button
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-200 cursor-pointer"
              onClick={() => setSelectedSubsection(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to module overview
            </button>
          </div>
        ) : selected ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl w-full animate-fadeInUp">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-4 border-b pb-3 border-gray-200">
              {selected.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">{selected.content}</p>
            <h4 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">Module Subsections</h4>
            {selected.subsections.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base sm:text-lg">
                {selected.subsections.map((sub) => (
                  <li key={sub.id} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{sub.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No subsections available for this module.</p>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-20 text-lg sm:text-xl p-6 rounded-lg bg-white shadow-md">
            <p className="mb-2">👋 Welcome!</p>
            <p>Select a module from the left to view its content and subsections.</p>
          </div>
        )}
      </main>
    </div>
  );
}