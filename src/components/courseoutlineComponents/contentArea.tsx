import React, { useState } from 'react';

interface Subsection {
  id: number;
  title: string;
  content: string;
}

interface Module {
  id: number;
  title: string;
  content: string;
  subsections: Subsection[];
}

interface ContentAreaProps {
  selected: Module | null;
  selectedSub: Subsection | null;
  editingModuleId: number | null;
  editModuleTitle: string;
  setEditModuleTitle: (s: string) => void;
  editModuleContent: string;
  setEditModuleContent: (s: string) => void;
  saveEditModule: (id: number) => void;
  cancelEditModule: () => void;
  editingSubId: number | null;
  editSubTitle: string;
  setEditSubTitle: (s: string) => void;
  saveEditSub: (modId: number, subId: number) => void;
  cancelEditSub: () => void;
  startEditSub: (sub: Subsection) => void;
  setSelectedSubsection: (sel: { modId: number; subId: number } | null) => void;
  lockedModules: number[];
}

const ContentArea: React.FC<ContentAreaProps> = ({
  selected,
  selectedSub,
  editingModuleId,
  editModuleTitle,
  setEditModuleTitle,
  editModuleContent,
  setEditModuleContent,
  saveEditModule,
  cancelEditModule,
  editingSubId,
  editSubTitle,
  setEditSubTitle,
  saveEditSub,
  cancelEditSub,
  startEditSub,
  setSelectedSubsection,
  lockedModules,
}) => {
  // If the selected module is locked, show a message (for students)
  if (selected && lockedModules.includes(selected.id)) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow p-6 text-center text-red-500 font-bold">
          This module is locked and cannot be accessed.
        </div>
      </div>
    );
  }

  // Video link state (for demo, not per module/subsection)
  const [videoUrl, setVideoUrl] = useState<string>('');

  return (
    <div className="flex-1 p-2 sm:p-3 md:p-8 relative">
      {/* Save button at top right when editing a module */}
      {selected && editingModuleId === selected.id && (
        <button
          className="fixed top-16 right-2 sm:top-24 sm:right-16 bg-[#08228d] text-white font-bold py-2 px-4 sm:px-6 rounded-full hover:bg-[#001f40] transition z-50 text-xs sm:text-base"
          onClick={() => saveEditModule(selected.id)}
        >
          Save
        </button>
      )}
      {selectedSub ? (
        <div className="bg-white rounded-xl shadow p-2 sm:p-6 flex flex-col sm:flex-row gap-4">
          {/* Mobile: Subsection title and content stacked, video below; Desktop: side-by-side */}
          <div className="flex-1">
            <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2">{selectedSub.title}</h3>
            <p className="text-gray-700 mb-4 text-xs sm:text-base">{selectedSub.content}</p>
            <button
              className="text-[#92D0D3] underline text-xs sm:text-sm mb-2"
              onClick={() => setSelectedSubsection(null)}
            >
              ← Back to module
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0 w-full">
              {videoUrl ? (
                <div className="w-full">
                  <iframe
                    src={videoUrl}
                    title="Video"
                    className="w-full h-32 sm:w-64 sm:h-36 rounded shadow"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="w-full h-32 sm:w-64 sm:h-36 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  No video linked
                </div>
              )}
            </label>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0 w-full mt-2">
              <span className="inline-block mb-1">Paste Video Link (Subsection)</span>
              <input
                type="url"
                placeholder="https://youtube.com/embed/..."
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                className="block w-full border rounded px-2 py-1 text-xs sm:text-sm"
              />
            </label>
          </div>
        </div>
      ) : selected ? (
        <div className="bg-white rounded-xl shadow p-2 sm:p-6 flex flex-col sm:flex-row gap-4">
          {/* Mobile: Module info and video stacked; Desktop: side-by-side */}
          <div className="flex-1">
            {editingModuleId === selected.id ? (
              <>
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2">
                  <input
                    className="w-full px-2 py-1 border rounded text-xs sm:text-base"
                    value={editModuleTitle}
                    onChange={e => setEditModuleTitle(e.target.value)}
                  />
                </h3>
                <textarea
                  className="w-full mb-4 px-2 py-1 border rounded text-gray-900 text-xs sm:text-base"
                  value={editModuleContent}
                  onChange={e => setEditModuleContent(e.target.value)}
                />
                <div className="flex gap-2 mb-4 mt-2">
                  <button
                    className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base"
                    onClick={cancelEditModule}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2">{selected.title}</h3>
                <p className="text-gray-900 mb-4 text-xs sm:text-base">{selected.content}</p>
              </>
            )}
            <h4 className="text-xs sm:text-lg font-semibold text-[#08228d] mb-2">Subsections</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-base">
              {selected.subsections.map((sub) => (
                <li key={sub.id} className="flex items-center gap-2">
                  {sub.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0 w-full">
              {videoUrl ? (
                <div className="w-full">
                  <iframe
                    src={videoUrl}
                    title="Video"
                    className="w-full h-32 sm:w-64 sm:h-36 rounded shadow"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="w-full h-32 sm:w-64 sm:h-36 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  No video linked
                </div>
              )}
            </label>
            {editingModuleId === selected.id && (
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0 w-full mt-2">
                <span className="inline-block mb-1">Paste Video Link (Module)</span>
                <input
                  type="url"
                  placeholder="https://youtube.com/embed/..."
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  className="block w-full border rounded px-2 py-1 text-xs sm:text-sm"
                />
              </label>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 italic text-xs sm:text-base">Select a module to view its content.</div>
      )}
    </div>
  );
};

export default ContentArea;
