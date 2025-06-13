import React, { useState } from 'react';
import ProgressCircle from './progressCircle';

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
  setCourseOutline: React.Dispatch<React.SetStateAction<Module[]>>;
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
}) => {
  // Local state for editing module title in the sidebar
  const [localEditModuleId, setLocalEditModuleId] = useState<number | null>(null);
  const [localEditModuleTitle, setLocalEditModuleTitle] = useState('');

  // Handler to save the edited module title from the sidebar
  const saveSidebarEditModule = (modId: number) => {
    setCourseOutline(prev => prev.map(mod =>
      mod.id === modId ? { ...mod, title: localEditModuleTitle } : mod
    ));
    setLocalEditModuleId(null);
  };

  // Handler to cancel editing in the sidebar
  const cancelSidebarEditModule = () => {
    setLocalEditModuleId(null);
  };

  // Detect user role for conditional rendering
  const [role, setRole] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  return (
    <div className="w-full md:w-1/3 bg-white p-2 sm:p-6 shadow-lg md:min-h-screen relative">
      {/* Back to Programs List for admin/teacher */}
      {role === 'admin' || role === 'teacher' || role === 'superadmin' ? (
        <button
          className="mb-3 sm:mb-4 px-3 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition text-sm sm:text-base w-60"
          onClick={() => {
            if (role === 'admin') {
              window.location.href = '/admin?tab=programs';
            } else if (role === 'teacher') {
              window.location.href = '/teacher/assignedprograms';
            } else if (role === 'superadmin') {
              window.location.href = '/superadmin?tab=programs';
            }
          }}
        >
          ← Back to Programs List
        </button>
      ) : null}
      {/* Mobile: sticky header for sidebar title and add button */}
      <div className="block md:hidden sticky top-0 z-20 bg-white pb-2">
        <h2 className="text-base font-bold text-[#08228d] mb-2">Edit Course Outline</h2>
        <button
          className="w-full mb-2 px-3 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition text-xs"
          onClick={() => {
            const newId = filteredModules.length > 0 ? Math.max(...filteredModules.map(m => m.id)) + 1 : 1;
            setCourseOutline((prev: Module[]) => [
              ...prev,
              { id: newId, title: '', contentBlocks: [], subsections: [] }
            ]);
            setSelectedModule(newId);
            setExpandedModule(newId);
            startEditModule({ id: newId, title: '', contentBlocks: [], subsections: [] });
          }}
        >
          + Add Module
        </button>
        <input
          type="text"
          placeholder="Search modules..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#92D0D3] placeholder-gray-900 text-gray-900 text-xs"
        />
      </div>
      {/* Desktop: normal header and add button */}
      <div className="hidden md:block">
        <h2 className="text-lg sm:text-xl font-bold text-[#08228d] mb-3 sm:mb-4">Edit Course Outline</h2>
        <button
          className="w-60 mb-3 sm:mb-4 px-3 sm:px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition text-sm sm:text-base"
          onClick={() => {
            const newId = filteredModules.length > 0 ? Math.max(...filteredModules.map(m => m.id)) + 1 : 1;
            setCourseOutline((prev: Module[]) => [
              ...prev,
              { id: newId, title: '', contentBlocks: [], subsections: [] }
            ]);
            setSelectedModule(newId);
            setExpandedModule(newId);
            startEditModule({ id: newId, title: '', contentBlocks: [], subsections: [] });
          }}
        >
          + Add Module
        </button>
        <input
          type="text"
          placeholder="Search modules..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-3 sm:mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#92D0D3] placeholder-gray-900 text-gray-900 text-sm sm:text-base"
        />
      </div>
      <ul className="space-y-2">
        {filteredModules.length === 0 && (
          <li className="text-gray-400 italic text-xs sm:text-base">No modules found.</li>
        )}
        {filteredModules.map((mod) => (
          <li key={mod.id} className="flex items-center gap-2">
            {/* Lock/Unlock button for teachers */}
            <button
              className={`text-lg mr-2 ${lockedModules.includes(mod.id) ? 'text-red-500' : 'text-green-500'}`}
              title={lockedModules.includes(mod.id) ? 'Unlock Module' : 'Lock Module'}
              onClick={() => toggleLockModule(mod.id)}
              aria-label={lockedModules.includes(mod.id) ? 'Unlock Module' : 'Lock Module'}
            >
              {lockedModules.includes(mod.id) ? (
                <span role="img" aria-label="locked">🔒</span>
              ) : (
                <span role="img" aria-label="unlocked">🔓</span>
              )}
            </button>
            <div className="flex-1">
              {localEditModuleId === mod.id ? (
                <div className="mb-2">
                  <input
                    className="w-full mb-1 px-2 py-1 border rounded text-xs sm:text-base"
                    value={localEditModuleTitle}
                    onChange={e => setLocalEditModuleTitle(e.target.value)}
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      className="bg-[#92D0D3] text-white px-2 py-1 rounded text-xs sm:text-base"
                      onClick={() => saveSidebarEditModule(mod.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base"
                      onClick={cancelSidebarEditModule}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <button
                      className={`w-full text-left px-3 py-2 rounded font-semibold transition text-xs sm:text-base ${selectedModule === mod.id ? 'bg-[#92D0D3] text-white' : 'hover:bg-gray-100 text-[#08228d]'}`}
                      onClick={() => {
                        setExpandedModule(expandedModule === mod.id ? null : mod.id);
                        setSelectedModule(mod.id);
                        setSelectedSubsection(null);
                      }}
                    >
                      {mod.title}
                    </button>
                    {/* Delete module button */}
                    <button
                      className="text-xs text-red-500 underline ml-2 hover:text-red-700"
                      title="Delete Module"
                      onClick={() => {
                        setCourseOutline(prev => prev.filter(m => m.id !== mod.id));
                        // If the deleted module was selected, clear selection
                        if (selectedModule === mod.id) {
                          setSelectedModule(filteredModules.length > 1 ? filteredModules.find(m => m.id !== mod.id)?.id || 0 : 0);
                          setSelectedSubsection(null);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              <div className="mt-1 mb-2">
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="bg-[#92D0D3] h-2 rounded"
                    style={{ width: `${moduleProgress[mod.id] || 0}%`, transition: 'width 0.3s' }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{moduleProgress[mod.id] || 0}% complete</div>
              </div>
              {expandedModule === mod.id && (
                <>
                  <ul className="ml-2 sm:ml-4 mt-1 space-y-1">
                    {mod.subsections.map((sub) => (
                      <li key={sub.id} className={`text-xs sm:text-sm flex items-center gap-2 ${selectedSubsection && selectedSubsection.modId === mod.id && selectedSubsection.subId === sub.id ? 'bg-[#e6f7f8] rounded' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}
                      >
                        <ProgressCircle percent={subsectionProgress[sub.id] || 0} />
                        <span className="font-bold text-gray-900">• {sub.title}</span>
                        {/* Delete subsection button */}
                        <button
                          className="ml-2 text-xs text-red-500 underline hover:text-red-700"
                          title="Delete Subsection"
                          onClick={e => {
                            e.stopPropagation();
                            setCourseOutline(prev => prev.map(m =>
                              m.id === mod.id
                                ? { ...m, subsections: m.subsections.filter(s => s.id !== sub.id) }
                                : m
                            ));
                            // If the deleted subsection was selected, clear selection
                            if (selectedSubsection && selectedSubsection.modId === mod.id && selectedSubsection.subId === sub.id) {
                              setSelectedSubsection(null);
                            }
                          }}
                        >
                          Delete
                        </button>
                        <span className="text-xs text-gray-400 ml-1">{subsectionProgress[sub.id] || 0}%</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="ml-2 sm:ml-4 mt-2 px-3 py-1 bg-[#92D0D3] text-white rounded text-xs font-semibold hover:bg-[#6bb7b9] transition"
                    onClick={() => {
                      // Add new subsection to this module
                      const newSubId = mod.subsections.length > 0 ? Math.max(...mod.subsections.map(s => s.id)) + 1 : mod.id * 10 + 1;
                      setCourseOutline(prev => prev.map(m =>
                        m.id === mod.id
                          ? { ...m, subsections: [...m.subsections, { id: newSubId, title: '', contentBlocks: [] }] }
                          : m
                      ));
                      setSelectedSubsection({ modId: mod.id, subId: newSubId });
                      startEditSub({ id: newSubId, title: '', contentBlocks: [] });
                    }}
                  >
                    + Add Subsection
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
