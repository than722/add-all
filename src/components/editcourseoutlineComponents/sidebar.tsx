'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import ProgressCircle from './progressCircle';
import styles from '../../styles/EditCourseOutlineStyle.module.css';
// Removed modal imports as they are now handled by the parent component

interface ContentBlock {
  id: number;
  type: 'text' | 'video';
  value: string;
  isEditing?: boolean;
}

interface Subsection {
  id: number;
  title: string;
  contentBlocks: ContentBlock[];
}

interface Module {
  id: number;
  title: string;
  contentBlocks: ContentBlock[];
  subsections: Subsection[];
}

interface SidebarProps {
  search: string;
  setSearch: (s: string) => void;
  filteredModules: Module[];
  selectedModule: number;
  setSelectedModule: (id: number) => void;
  expandedModule: number | null;
  setExpandedModule: (id: number | null) => void;
  editingModuleId: number | null;
  startEditModule: (mod: Module) => void;
  saveEditModule: (id: number) => void;
  cancelEditModule: () => void;
  editModuleTitle: string;
  setEditModuleTitle: Dispatch<SetStateAction<string>>;
  moduleProgress: Record<number, number>;
  selectedSubsection: { modId: number; subId: number } | null;
  setSelectedSubsection: (sel: { modId: number; subId: number } | null) => void;
  editingSubId: number | null;
  startEditSub: (sub: Subsection) => void;
  saveEditSub: (modId: number, subId: number) => void;
  cancelEditSub: () => void;
  editSubTitle: string;
  setEditSubTitle: (s: string) => void;
  subsectionProgress: Record<number, number>;
  lockedModules: number[];
  toggleLockModule: (modId: number) => void;
  setCourseOutline: Dispatch<SetStateAction<Module[]>>;
  onBackClick: () => void;
  backButtonText: string;
  // New props for handling delete modals from parent
  handleDeleteModuleClick: (mod: Module) => void;
  handleDeleteSubsectionClick: (modId: number, sub: Subsection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  search,
  setSearch,
  filteredModules,
  selectedModule,
  setSelectedModule,
  expandedModule,
  setExpandedModule,
  editingModuleId,
  startEditModule,
  saveEditModule,
  cancelEditModule,
  editModuleTitle,
  setEditModuleTitle,
  moduleProgress,
  selectedSubsection,
  setSelectedSubsection,
  editingSubId,
  startEditSub,
  saveEditSub,
  cancelEditSub,
  editSubTitle,
  setEditSubTitle,
  subsectionProgress,
  lockedModules,
  toggleLockModule,
  setCourseOutline,
  onBackClick,
  backButtonText,
  // Destructure new props
  handleDeleteModuleClick,
  handleDeleteSubsectionClick,
}) => {
  /**
   * Handles adding a new module to the course outline.
   * Generates a new ID, creates a new module object, adds it to the outline,
   * sets it as selected and expanded, and starts editing its title.
   */
  const handleAddModule = () => {
    const newId = Date.now(); // Unique ID for the new module
    const newModule: Module = {
      id: newId,
      title: `New Module ${filteredModules.length + 1}`, // Default title
      contentBlocks: [{ id: Date.now() + 0.1, type: 'text', value: 'Content for new module.' }],
      subsections: [] // New modules start with no subsections
    };
    setCourseOutline(prev => [...prev, newModule]); // Add new module to the state
    setSelectedModule(newId); // Select the new module
    setExpandedModule(newId); // Expand the new module
    setEditModuleTitle(newModule.title); // Set the editing title to the new module's title
    startEditModule(newModule); // Start editing the new module
  };

  return (
    <aside className={`w-full md:w-1/3 bg-white shadow-lg p-4 sm:p-6 sticky top-0 overflow-y-auto max-h-[60vh] md:max-h-screen z-10 ${styles.sidebarEnterActive}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 gap-2">
        <button
          className={`px-3 py-1 bg-blue-700 text-white rounded-full font-semibold text-xs sm:text-sm shadow hover:bg-blue-800 ${styles.transitionAllEase} ${styles.btnHoverScale}`}
          onClick={onBackClick}
        >
          {backButtonText}
        </button>
        <h2 className="sm:ml-4 text-lg sm:text-xl font-bold text-blue-700">Course Outline</h2>
      </div>
      <input
        type="text"
        placeholder="Search modules..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${styles.transitionAllEase} placeholder-gray-900 text-gray-900 text-sm sm:text-base ${styles.inputFocusRing}`}
      />
      <div className="flex justify-start mb-4">
        <button
          className={`bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 ${styles.transitionAllEase} text-sm cursor-pointer ${styles.btnHoverShadow}`}
          onClick={handleAddModule}
        >
          + Add Module
        </button>
      </div>
      <ul className="space-y-2 sm:space-y-3">
        {filteredModules.length === 0 && (
          <li className={`text-gray-400 italic text-xs sm:text-sm ${styles.moduleItemEnterActive}`}>No modules found.</li>
        )}
        {filteredModules.map((mod) => (
          <li key={mod.id} className={`mb-1 sm:mb-2 ${styles.moduleItemEnterActive}`}>
            <div
              className={`w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 py-2 rounded-lg ${styles.transitionAllEase} ${
                selectedModule === mod.id ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner' : 'hover:bg-gray-100 text-gray-800'
              } cursor-pointer`}
              onClick={() => {
                setExpandedModule(expandedModule === mod.id ? null : mod.id);
                setSelectedModule(mod.id);
                setSelectedSubsection(null);
              }}
            >
              {editingModuleId === mod.id ? (
                <input
                  type="text"
                  value={editModuleTitle}
                  onChange={(e) => setEditModuleTitle(e.target.value)}
                  onBlur={() => saveEditModule(mod.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEditModule(mod.id);
                    if (e.key === 'Escape') cancelEditModule();
                  }}
                  className={`w-full bg-blue-50 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none ${styles.inputFocusRing}`}
                  autoFocus
                  onClick={e => e.stopPropagation()} // Prevent module click when editing
                />
              ) : (
                <span className="text-sm sm:text-base">{mod.title}</span>
              )}
              <div className="flex items-center gap-2">
                <div className="w-full sm:w-24 mt-2 sm:mt-0">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${moduleProgress[mod.id] || 0}%`, transition: 'width 0.3s' }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{moduleProgress[mod.id] || 0}%</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLockModule(mod.id); }}
                  className={`ml-2 p-1 rounded-full text-white flex items-center justify-center text-sm
                    ${lockedModules.includes(mod.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 hover:bg-gray-500'}
                    ${styles.transitionAllEase} w-6 h-6 sm:w-7 sm:h-7 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${lockedModules.includes(mod.id) ? 'focus:ring-red-500' : 'focus:ring-gray-400'}
                    cursor-pointer ${styles.btnHoverScale}
                  `}
                  title={lockedModules.includes(mod.id) ? 'Unlock Module' : 'Lock Module'}
                >
                  {lockedModules.includes(mod.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.093V3.75A1.75 1.75 0 009.25 2h-4.5A1.75 1.75 0 003 3.75V5.093m.5 8.157L6 14.5a1.75 1.75 0 003.5 0l2.5-1.25" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteModuleClick(mod); }} // Use the new click handler
                  className={`ml-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 ${styles.transitionAllEase} cursor-pointer ${styles.btnHoverScale}`}
                  title="Delete Module"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            {expandedModule === mod.id && (
              <>
                <ul className="mt-1 sm:mt-2 ml-2 sm:ml-4 space-y-1 sm:space-y-2">
                  {mod.subsections.map((sub) => (
                    <li key={sub.id} className={styles.subsectionItemEnterActive}>
                      <div className={`flex items-center p-2 rounded-lg ${styles.transitionAllEase} hover:bg-gray-100 ${selectedSubsection?.modId === mod.id && selectedSubsection?.subId === sub.id ? 'bg-blue-50' : ''}`}>
                        <ProgressCircle percent={subsectionProgress[sub.id] || 0} />
                        <div className="ml-2 sm:ml-3 flex-1 flex items-center justify-between">
                          {editingSubId === sub.id ? (
                            <input
                              type="text"
                              value={editSubTitle}
                              onChange={(e) => setEditSubTitle(e.target.value)}
                              onBlur={() => saveEditSub(mod.id, sub.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEditSub(mod.id, sub.id);
                                if (e.key === 'Escape') cancelEditSub();
                              }}
                              className={`w-full bg-blue-50 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none ${styles.inputFocusRing}`}
                              autoFocus
                            />
                          ) : (
                            <span className="font-bold text-xs sm:text-base text-gray-900 cursor-pointer" onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}>{sub.title}</span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{subsectionProgress[sub.id] || 0}%</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); startEditSub(sub); }}
                              className={`ml-1 p-1 rounded-full bg-blue-400 text-white hover:bg-blue-500 ${styles.transitionAllEase} cursor-pointer ${styles.btnHoverScale}`}
                              title="Edit Subsection"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteSubsectionClick(mod.id, sub); }} // Use the new click handler
                              className={`ml-1 p-1 rounded-full bg-red-400 text-white hover:bg-red-500 ${styles.transitionAllEase} cursor-pointer ${styles.btnHoverScale}`}
                              title="Delete Subsection"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 ml-8">
                  <button
                    onClick={() => {
                      const newSubId = Date.now() + Math.random();
                      const newSubsection: Subsection = {
                        id: newSubId,
                        title: `New Subsection ${mod.subsections.length + 1}`,
                        contentBlocks: [{ id: Date.now() + 0.2, type: 'text', value: 'Content for new subsection.' }]
                      };
                      setCourseOutline(prevOutline => prevOutline.map(m => {
                        if (m.id === mod.id) {
                          return {
                            ...m,
                            subsections: [...m.subsections, newSubsection]
                          };
                        }
                        return m;
                      }));
                    }}
                    className="bg-purple-600 text-white text-xs px-3 py-1 rounded hover:bg-purple-700 transition-all"
                  >
                    + Add Subsection
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
