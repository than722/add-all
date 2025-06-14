import React from 'react';
import ProgressCircle from './progressCircle';

interface Subsection {
  id: number;
  title: string;
  content?: string;
}

interface Module {
  id: number;
  title: string;
  content: string;
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
  setEditModuleTitle: (s: string) => void;
  editModuleContent: string;
  setEditModuleContent: (s: string) => void;
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
  editModuleContent,
  setEditModuleContent,
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
}) => {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 shadow-lg md:min-h-screen">
      <h2 className="text-xl font-bold text-[#002B5C] mb-4">Edit Course Outline</h2>
      <input
        type="text"
        placeholder="Search modules..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#92D0D3]"
      />
      <ul className="space-y-2">
        {filteredModules.length === 0 && (
          <li className="text-gray-400 italic">No modules found.</li>
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
              {editingModuleId === mod.id ? (
                <div className="mb-2">
                  <input
                    className="w-full mb-1 px-2 py-1 border rounded"
                    value={editModuleTitle}
                    onChange={e => setEditModuleTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full mb-1 px-2 py-1 border rounded"
                    value={editModuleContent}
                    onChange={e => setEditModuleContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-[#92D0D3] text-white px-2 py-1 rounded"
                      onClick={() => saveEditModule(mod.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-[#002B5C] px-2 py-1 rounded"
                      onClick={cancelEditModule}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className={`w-full text-left px-3 py-2 rounded font-semibold transition ${selectedModule === mod.id ? 'bg-[#92D0D3] text-white' : 'hover:bg-gray-100 text-[#002B5C]'}`}
                    onClick={() => {
                      setExpandedModule(expandedModule === mod.id ? null : mod.id);
                      setSelectedModule(mod.id);
                      setSelectedSubsection(null);
                    }}
                  >
                    {mod.title}
                  </button>
                  <button
                    className="text-xs text-[#002B5C] underline ml-2"
                    onClick={() => startEditModule(mod)}
                  >
                    Edit
                  </button>
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
                <ul className="ml-4 mt-1 space-y-1">
                  {mod.subsections.map((sub) => (
                    <li key={sub.id} className={`text-sm text-gray-700 flex items-center gap-2 ${selectedSubsection && selectedSubsection.modId === mod.id && selectedSubsection.subId === sub.id ? 'bg-[#e6f7f8] rounded' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedSubsection({ modId: mod.id, subId: sub.id })}
                    >
                      <ProgressCircle percent={subsectionProgress[sub.id] || 0} />
                      {editingSubId === sub.id ? (
                        <>
                          <input
                            className="px-1 py-0.5 border rounded text-sm"
                            value={editSubTitle}
                            onChange={e => setEditSubTitle(e.target.value)}
                          />
                          <button
                            className="text-xs text-[#92D0D3] underline"
                            onClick={() => saveEditSub(mod.id, sub.id)}
                          >
                            Save
                          </button>
                          <button
                            className="text-xs text-gray-400 underline"
                            onClick={cancelEditSub}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <span>• {sub.title}</span>
                          <button
                            className="text-xs text-[#002B5C] underline ml-1"
                            onClick={e => { e.stopPropagation(); startEditSub(sub); }}
                          >
                            Edit
                          </button>
                        </>
                      )}
                      <span className="text-xs text-gray-400 ml-1">{subsectionProgress[sub.id] || 0}%</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
