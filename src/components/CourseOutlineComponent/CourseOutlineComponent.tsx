'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import ProgressCircle from '@/components/editcourseoutlineComponents/ProgressCircle';
import CourseEvaluation from '@/components/CourseOutlineComponent/CourseEvaluation';
import '@/styles/CourseOutlineStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faComments } from '@fortawesome/free-solid-svg-icons';

interface CourseOutlineProps {
  programName: string;
  backRoute: string;
  backLabel: string;
  welcomeMessage: string;
  forumRoute: string;
  readOnly?: boolean;
}

export default function CourseOutline({
  programName,
  backRoute,
  backLabel,
  welcomeMessage,
  forumRoute,
}: CourseOutlineProps) {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<number | null>(initialCourseOutline[0]?.id || null);
  const [selectedModule, setSelectedModule] = useState<number | null>(initialCourseOutline[0]?.id || null);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  const [courseOutline] = useState(initialCourseOutline);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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
    <div className="course-outline-container">
      {/* Sidebar */}
      <aside className="course-outline-sidebar">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-3">
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(backRoute)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 cursor-pointer"
              aria-label="Back"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              {backLabel}
            </button>

            <button
              onClick={() => router.push(forumRoute)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105 cursor-pointer"
              aria-label="Forum"
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Forum
            </button>
          </div>

          <h2 className="sm:ml-4 text-xl lg:text-2xl font-extrabold text-blue-800 break-words">
            {decodeURIComponent(programName)}
          </h2>
        </div>

        <input
          type="text"
          placeholder="Search modules or subsections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col space-y-3 overflow-y-auto custom-scrollbar pr-2">
          <ul className="space-y-3">
            {filteredModules.length === 0 && (
              <li className="text-gray-500 italic text-sm text-center py-4">No modules found matching your search.</li>
            )}
            {filteredModules.map((mod) => (
              <li key={mod.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                <button
                  className={`module-item-button ${selectedModule === mod.id ? 'selected' : ''}`}
                  onClick={() => {
                    setExpandedModule(expandedModule === mod.id ? null : mod.id);
                    setSelectedModule(mod.id);
                    setSelectedSubsection(null);
                  }}
                >
                  <div className="flex flex-col w-full space-y-1">
                    <span className="text-base lg:text-lg break-words whitespace-normal">{mod.title}</span>
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
                      <li key={sub.id}>
                        <button
                          className={`subsection-item-button ${selectedSubsection?.modId === mod.id && selectedSubsection?.subId === sub.id ? 'selected' : ''}`}
                          onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}
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

          {/* Feedback Button - Placed Immediately After Module List */}
          <div className="pt-4">
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md font-medium text-sm shadow-md hover:bg-indigo-700 transition"
            >
              Give Course & Instructor Feedback
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="course-outline-main-content">
        {showFeedbackForm ? (
          <CourseEvaluation
            onClose={() => setShowFeedbackForm(false)}
            onSubmit={(feedback) => {
              console.log('Feedback saved:', feedback);
              setFeedbackSubmitted(true);
            }}
          />
        ) : selectedSub ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl w-full animate-fadeInUp">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-4 border-b pb-3 border-gray-200">
              {selectedSub.title}
            </h3>
            <p className="text-gray-700 mb-6 text-base sm:text-lg">{selectedSub.content}</p>
            <button
              onClick={() => setSelectedSubsection(null)}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
              Back to module overview
            </button>
          </div>
        ) : selected ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl w-full animate-fadeInUp">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-4 border-b pb-3 border-gray-200">{selected.title}</h3>
            <p className="text-gray-700 mb-6 text-base sm:text-lg">{selected.content}</p>
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
            <p>{welcomeMessage}</p>
          </div>
        )}

        {feedbackSubmitted && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
            ✅ Feedback submitted successfully!
          </div>
        )}
      </main>
    </div>
  );
}
