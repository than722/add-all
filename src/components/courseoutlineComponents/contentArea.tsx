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

  // Video placeholder state (for demo, not per module/subsection)
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex-1 p-8 relative">
      {/* Save button at top right when editing a module */}
      {selected && editingModuleId === selected.id && (
        <button
          className="fixed top-24 right-16 bg-[#002B5C] text-white font-bold py-2 px-6 rounded-full hover:bg-[#001f40] transition z-50"
          onClick={() => saveEditModule(selected.id)}
        >
          Save
        </button>
      )}
      {selectedSub ? (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-2xl font-bold text-[#002B5C] mb-2">{selectedSub.title}</h3>
          <p className="text-gray-700 mb-4">{selectedSub.content}</p>
          {/* Video placeholder for subsection */}
          <div className="mb-4 flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700 mb-0">
              {videoUrl ? (
                <video src={videoUrl} controls className="w-64 h-36 rounded shadow" />
              ) : (
                <div className="w-64 h-36 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  No video uploaded
                </div>
              )}
            </label>
            <label className="block text-sm font-medium text-gray-700 mb-0">
              <span className="sr-only">Upload Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="block"
              />
              <span className="inline-block mt-2">Add Video (Subsection)</span>
            </label>
          </div>
          <button
            className="text-[#92D0D3] underline text-sm mb-2"
            onClick={() => setSelectedSubsection(null)}
          >
            ← Back to module
          </button>
        </div>
      ) : selected ? (
        <div className="bg-white rounded-xl shadow p-6">
          {editingModuleId === selected.id ? (
            <>
              <h3 className="text-2xl font-bold text-[#002B5C] mb-2">
                <input
                  className="w-full px-2 py-1 border rounded"
                  value={editModuleTitle}
                  onChange={e => setEditModuleTitle(e.target.value)}
                />
              </h3>
              <textarea
                className="w-full mb-4 px-2 py-1 border rounded text-gray-900"
                value={editModuleContent}
                onChange={e => setEditModuleContent(e.target.value)}
              />
              {/* Video placeholder for module */}
              <div className="mb-4 flex items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 mb-0">
                  {videoUrl ? (
                    <video src={videoUrl} controls className="w-64 h-36 rounded shadow" />
                  ) : (
                    <div className="w-64 h-36 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      No video uploaded
                    </div>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-0">
                  <span className="sr-only">Upload Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="block"
                  />
                  <span className="inline-block mt-2">Add Video (Module)</span>
                </label>
              </div>
              <div className="flex gap-2 mb-4 mt-2">
                <button
                  className="bg-gray-300 text-[#002B5C] px-2 py-1 rounded"
                  onClick={cancelEditModule}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-[#002B5C] mb-2">{selected.title}</h3>
              <p className="text-gray-900 mb-4">{selected.content}</p>
              {/* Video placeholder for module (view mode) */}
              <div className="mb-4 flex items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 mb-0">
                  {videoUrl ? (
                    <video src={videoUrl} controls className="w-64 h-36 rounded shadow" />
                  ) : (
                    <div className="w-64 h-36 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      No video uploaded
                    </div>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-0">
                  <span className="sr-only">Upload Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="block"
                  />
                  <span className="inline-block mt-2">Add Video (Module)</span>
                </label>
              </div>
            </>
          )}
          <h4 className="text-lg font-semibold text-[#002B5C] mb-2">Subsections</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {selected.subsections.map((sub) => (
              <li key={sub.id} className="flex items-center gap-2">
                {sub.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-gray-500 italic">Select a module to view its content.</div>
      )}
    </div>
  );
};

export default ContentArea;
