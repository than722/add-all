// app/components/courseoutlineComponents/sidebar.tsx
// This component displays the sidebar for the course outline,
// including modules, subsections, search, and editing controls.

'use client'; // This component uses useState, so it must be a client component.

import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import ProgressCircle from './progressCircle'; // Ensure this path is correct

// Update Sidebar types to match new Module/Subsection structure
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
}) => {
  // Handler for adding a new module
  const handleAddModule = () => {
      const newId = Date.now();
      const newModule: Module = {
          id: newId,
          title: `New Module ${filteredModules.length + 1}`,
          contentBlocks: [{ id: Date.now() + 0.1, type: 'text', value: 'Content for new module.' }],
          subsections: []
      };
      setCourseOutline(prev => [...prev, newModule]);
      setSelectedModule(newId);
      setExpandedModule(newId);
      setEditModuleTitle(newModule.title);
      startEditModule(newModule);
  };

  // Handler for adding a new subsection to the currently selected module
  const handleAddSubsection = () => {
      if (selectedModule === null) return;
      setCourseOutline(prevOutline => prevOutline.map(mod => {
          if (mod.id === selectedModule) {
              const newSubId = Date.now() + Math.random();
              const newSubsection: Subsection = {
                  id: newSubId,
                  title: `New Subsection ${mod.subsections.length + 1}`,
                  contentBlocks: [{ id: Date.now() + 0.2, type: 'text', value: 'Content for new subsection.' }]
              };
              return {
                  ...mod,
                  subsections: [...mod.subsections, newSubsection]
              };
          }
          return mod;
      }));
  };

  // Handler for deleting a module
  const handleDeleteModule = (modId: number) => {
      if (window.confirm('Are you sure you want to delete this module and all its subsections?')) {
          setCourseOutline(prev => {
              const updatedOutline = prev.filter(mod => mod.id !== modId);
              if (selectedModule === modId) {
                  setSelectedModule(updatedOutline.length > 0 ? updatedOutline[0].id : 0);
                  setSelectedSubsection(null);
              }
              setExpandedModule(null);
              return updatedOutline;
          });
      }
  };

  // Handler for deleting a subsection
  const handleDeleteSubsection = (modId: number, subId: number) => {
      if (window.confirm('Are you sure you want to delete this subsection?')) {
          setCourseOutline(prevOutline => prevOutline.map(mod => {
              if (mod.id === modId) {
                  return {
                      ...mod,
                      subsections: mod.subsections.filter(sub => sub.id !== subId)
                  };
              }
              return mod;
          }));
          if (selectedSubsection?.modId === modId && selectedSubsection?.subId === subId) {
              setSelectedSubsection(null);
          }
      }
  };

  return (
    <aside className="w-full md:w-1/3 bg-white shadow-lg p-4 sm:p-6 sticky top-0 overflow-y-auto max-h-[60vh] md:max-h-screen z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 gap-2">
        {/* Back button now uses props */}
        <button
          className="px-3 py-1 bg-blue-700 text-white rounded-full font-semibold text-xs sm:text-sm shadow hover:bg-blue-800 transition"
          onClick={onBackClick}
        >
          {backButtonText}
        </button>
        {/* The Course Outline title remains */}
        <h2 className="sm:ml-4 text-lg sm:text-xl font-bold text-blue-700">Course Outline</h2>
      </div>
      <input
        type="text"
        placeholder="Search modules..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition placeholder-gray-900 text-gray-900 text-sm sm:text-base"
      />
      <div className="flex justify-between mb-4">
        <button
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition text-sm"
            onClick={handleAddModule}
        >
            + Add Module
        </button>
        <button
            className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition text-sm"
            onClick={handleAddSubsection}
            disabled={selectedModule === null} // Disable if no module selected
        >
            + Add Subsection
        </button>
      </div>
      <ul className="space-y-2 sm:space-y-3">
        {filteredModules.length === 0 && (
          <li className="text-gray-400 italic text-xs sm:text-sm">No modules found.</li>
        )}
        {filteredModules.map((mod) => (
          <li key={mod.id} className="mb-1 sm:mb-2">
            {/* Changed from <button> to <div> to allow nested buttons */}
            <div
              className={`w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 py-2 rounded-lg transition ${
                selectedModule === mod.id
                  ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner'
                  : 'hover:bg-gray-100 text-gray-800'
              } cursor-pointer`} 
              onClick={() => { // Click handler for the whole div, to expand/select module
                setExpandedModule(expandedModule === mod.id ? null : mod.id);
                setSelectedModule(mod.id);
                setSelectedSubsection(null);
              }}
            >
              {/* Module Title or Input Field */}
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
                  className="w-full bg-blue-50 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none"
                  autoFocus
                  onClick={e => e.stopPropagation()} // Stop propagation to prevent module selection when editing input
                />
              ) : (
                // Changed from <span onClick> to just <span> as the parent div handles the click
                <span className="text-sm sm:text-base">{mod.title}</span>
              )}
              <div className="flex items-center gap-2">
                <div className="w-full sm:w-24 mt-2 sm:mt-0">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${moduleProgress[mod.id] || 0}%`, transition: 'width 0.3s' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{moduleProgress[mod.id] || 0}%</div>
                </div>
                {/* Lock/Unlock Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleLockModule(mod.id); }}
                    className={`ml-2 p-1 rounded-full text-white ${
                        lockedModules.includes(mod.id) ? 'bg-red-500' : 'bg-gray-400'
                    } hover:opacity-80 transition`}
                    title={lockedModules.includes(mod.id) ? 'Unlock Module' : 'Lock Module'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        {lockedModules.includes(mod.id) ? (
                            <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm-5.5 8.75a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75zM4 6a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 0h8v2H6V6z" clipRule="evenodd" />
                        ) : (
                            <path fillRule="evenodd" d="M8 2a5.5 5.5 0 00-5.5 5.5v2.75a.75.75 0 001.5 0V7.5a4 4 0 118 0v2.75a.75.75 0 001.5 0V7.5A5.5 5.5 0 008 2zM3 10a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 013 10z" clipRule="evenodd" />
                        )}
                    </svg>
                </button>
                {/* Delete Module Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteModule(mod.id); }}
                    className="ml-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                    title="Delete Module"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
              </div>
            </div> {/* End of the outer div for module item */}
            {expandedModule === mod.id && (
              <ul className="mt-1 sm:mt-2 ml-2 sm:ml-4 space-y-1 sm:space-y-2">
                {mod.subsections.map((sub) => (
                  <li key={sub.id}>
                    <div className={`flex items-center p-2 rounded-lg transition hover:bg-gray-100 ${selectedSubsection?.modId === mod.id && selectedSubsection?.subId === sub.id ? 'bg-blue-50' : ''}`}>
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
                                className="w-full bg-blue-50 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none"
                                autoFocus
                            />
                        ) : (
                            <span className="font-bold text-xs sm:text-base text-gray-900 cursor-pointer" onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}>{sub.title}</span>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{subsectionProgress[sub.id] || 0}%</span>
                            {/* Edit Subsection Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); startEditSub(sub); }}
                                className="ml-1 p-1 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition"
                                title="Edit Subsection"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
                                </svg>
                            </button>
                            {/* Delete Subsection Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteSubsection(mod.id, sub.id); }}
                                className="ml-1 p-1 rounded-full bg-red-400 text-white hover:bg-red-500 transition"
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
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
