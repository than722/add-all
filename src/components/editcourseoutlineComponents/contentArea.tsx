import React, { useState } from 'react';
import ContentBlockEditor from './contentblockEditor';
import ContentBlockDisplay from './contentblockDisplay';
import AddContentBlock from './AddContentBlock';

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

interface ContentAreaProps {
  selected: Module | null;
  selectedSub: Subsection | null;
  editingModuleId: number | null;
  editModuleTitle: string;
  setEditModuleTitle: (s: string) => void;
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
  startEditModule: (mod: Module) => void;
  setCourseOutline: React.Dispatch<React.SetStateAction<Module[]>>;
  setSelectedModule: (id: number) => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  selected,
  selectedSub,
  editingModuleId,
  editModuleTitle,
  setEditModuleTitle,
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
  startEditModule,
  setCourseOutline,
  setSelectedModule,
}) => {
  if (selected && lockedModules.includes(selected.id)) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow p-6 text-center text-red-500 font-bold">
          This module is locked and cannot be accessed.
        </div>
      </div>
    );
  }

  const [addingContentType, setAddingContentType] = useState<'none' | 'text' | 'video'>('none');
  const [newTextContent, setNewTextContent] = useState<string>('');
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');

  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
  const [editingBlockValue, setEditingBlockValue] = useState<string>('');

  const updateCourseOutlineWithNewBlock = (
    moduleId: number,
    subsectionId: number | null,
    newBlock: ContentBlock
  ) => {
    setCourseOutline(prevOutline =>
      prevOutline.map(module => {
        if (module.id === moduleId) {
          if (subsectionId === null) {
            return {
              ...module,
              contentBlocks: [...module.contentBlocks, newBlock],
            };
          } else {
            return {
              ...module,
              subsections: module.subsections.map(sub =>
                sub.id === subsectionId
                  ? { ...sub, contentBlocks: [...sub.contentBlocks, newBlock] }
                  : sub
              ),
            };
          }
        }
        return module;
      })
    );
  };

  const updateCourseOutlineBlock = (
    moduleId: number,
    subsectionId: number | null,
    blockId: number,
    newValue: string
  ) => {
    setCourseOutline(prevOutline =>
      prevOutline.map(module => {
        if (module.id === moduleId) {
          if (subsectionId === null) {
            return {
              ...module,
              contentBlocks: module.contentBlocks.map(block =>
                block.id === blockId ? { ...block, value: newValue } : block
              ),
            };
          } else {
            return {
              ...module,
              subsections: module.subsections.map(sub =>
                sub.id === subsectionId
                  ? {
                    ...sub,
                    contentBlocks: sub.contentBlocks.map(block =>
                      block.id === blockId ? { ...block, value: newValue } : block
                    ),
                  }
                  : sub
              ),
            };
          }
        }
        return module;
      })
    );
  };

  const handleSaveNewContent = () => {
    if (!selected) return;
    if (addingContentType === 'none') return;
    const newBlock: ContentBlock = {
      id: Date.now(),
      type: addingContentType as 'text' | 'video',
      value: addingContentType === 'text' ? newTextContent : newVideoUrl,
    };

    if (selectedSub) {
      updateCourseOutlineWithNewBlock(selected.id, selectedSub.id, newBlock);
    } else {
      updateCourseOutlineWithNewBlock(selected.id, null, newBlock);
    }

    setAddingContentType('none');
    setNewTextContent('');
    setNewVideoUrl('');
  };

  const handleCancelNewContent = () => {
    setAddingContentType('none');
    setNewTextContent('');
    setNewVideoUrl('');
  };

  const handleStartEditBlock = (block: ContentBlock) => {
    setEditingBlockId(block.id);
    setEditingBlockValue(block.value);
  };

  const handleSaveEditedBlock = () => {
    if (!selected || editingBlockId === null) return;

    if (selectedSub) {
      updateCourseOutlineBlock(selected.id, selectedSub.id, editingBlockId, editingBlockValue);
    } else {
      updateCourseOutlineBlock(selected.id, null, editingBlockId, editingBlockValue);
    }
    setEditingBlockId(null);
    setEditingBlockValue('');
  };

  const handleCancelEditBlock = () => {
    setEditingBlockId(null);
    setEditingBlockValue('');
  };

  const handleDeleteBlock = (blockId: number) => {
    if (!selected) return;

    setCourseOutline(prevOutline =>
      prevOutline.map(module => {
        if (module.id === selected.id) {
          if (selectedSub) {
            return {
              ...module,
              subsections: module.subsections.map(sub =>
                sub.id === selectedSub.id
                  ? { ...sub, contentBlocks: sub.contentBlocks.filter(b => b.id !== blockId) }
                  : sub
              ),
            };
          } else {
            return {
              ...module,
              contentBlocks: module.contentBlocks.filter(b => b.id !== blockId),
            };
          }
        }
        return module;
      })
    );
  };

  const currentContentBlocks = selectedSub ? selectedSub.contentBlocks : (selected ? selected.contentBlocks : []);

  return (
    <div className="flex-1 p-2 sm:p-3 md:p-8 relative">
      {selected && editingModuleId === selected.id}

      {selectedSub ? (
        <>
          <div className="bg-white rounded-xl shadow p-2 sm:p-6 mb-4">
            {editingSubId === selectedSub.id ? (
              <>
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2">
                  <input
                    className="w-full px-2 py-1 border rounded text-xs sm:text-base"
                    value={editSubTitle}
                    onChange={e => setEditSubTitle(e.target.value)}
                  />
                </h3>
                <div className="flex gap-2 mb-4 mt-2">
                  <button
                    className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base cursor-pointer"
                    onClick={() => selected && saveEditSub(selected.id, selectedSub.id)}
                  >
                    Save Subsection Title
                  </button>
                  <button
                    className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base cursor-pointer"
                    onClick={cancelEditSub}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2 flex items-center justify-between">
                  {selectedSub.title}
                  <button
                    className="ml-2 text-xs sm:text-sm text-[#08228d] underline hover:text-[#001f40] cursor-pointer"
                    onClick={() => startEditSub(selectedSub)}
                  >
                    Edit Title
                  </button>
                </h3>
              </>
            )}
          </div>

          {currentContentBlocks.map(block => (
            <div key={block.id} className="bg-white rounded-xl shadow p-2 sm:p-6 mb-4">
              <ContentBlockEditor
                block={block}
                editingBlockId={editingBlockId}
                editingBlockValue={editingBlockValue}
                onChange={setEditingBlockValue}
                onSave={handleSaveEditedBlock}
                onCancel={handleCancelEditBlock}
              />

              <ContentBlockDisplay
                block={block}
                onEdit={() => handleStartEditBlock(block)}
                onDelete={() => handleDeleteBlock(block.id)}
              />
            </div>
          ))}

          <AddContentBlock
            addingContentType={addingContentType}
            newTextContent={newTextContent}
            setNewTextContent={setNewTextContent}
            newVideoUrl={newVideoUrl}
            setNewVideoUrl={setNewVideoUrl}
            onSave={handleSaveNewContent}
            onCancel={handleCancelNewContent}
          />

          <div className="mt-6 flex justify-start gap-2">
            {addingContentType === 'none' && (
              <>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold cursor-pointer"
                  onClick={() => setAddingContentType('text')}
                >
                  + Add Text Block
                </button>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold cursor-pointer"
                  onClick={() => setAddingContentType('video')}
                >
                  + Add Video Block
                </button>
              </>
            )}
          </div>
        </>
      ) : selected ? (
        <>
          <div className="bg-white rounded-xl shadow p-2 sm:p-6 mb-4">
            {editingModuleId === selected.id ? (
              <>
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2">
                  <input
                    className="w-full px-2 py-1 border rounded text-xs sm:text-base"
                    value={editModuleTitle}
                    onChange={e => setEditModuleTitle(e.target.value)}
                  />
                </h3>
                <div className="flex gap-2 mb-4 mt-2">
                  <button
                    className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base cursor-pointer"
                    onClick={() => saveEditModule(selected.id)}
                  >
                    Save Module Info
                  </button>
                  <button
                    className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base cursor-pointer"
                    onClick={cancelEditModule}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2 flex items-center justify-between">
                  {selected.title}
                  <button
                    className="ml-2 text-xs sm:text-sm text-[#08228d] underline hover:text-[#001f40] cursor-pointer"
                    onClick={() => startEditModule(selected)}
                  >
                    Edit Module Info
                  </button>
                </h3>
              </>
            )}
          </div>

          {currentContentBlocks.map(block => (
            <div key={block.id} className="bg-white rounded-xl shadow p-2 sm:p-6 mb-4">
              <ContentBlockEditor
                block={block}
                editingBlockId={editingBlockId}
                editingBlockValue={editingBlockValue}
                onChange={setEditingBlockValue}
                onSave={handleSaveEditedBlock}
                onCancel={handleCancelEditBlock}
              />
              <ContentBlockDisplay
                block={block}
                onEdit={() => handleStartEditBlock(block)}
                onDelete={() => handleDeleteBlock(block.id)}
              />
            </div>
          ))}

          <AddContentBlock
            addingContentType={addingContentType}
            newTextContent={newTextContent}
            setNewTextContent={setNewTextContent}
            newVideoUrl={newVideoUrl}
            setNewVideoUrl={setNewVideoUrl}
            onSave={handleSaveNewContent}
            onCancel={handleCancelNewContent}
          />

          <div className="mt-6 flex justify-start gap-2">
            {addingContentType === 'none' && (
              <>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold cursor-pointer"
                  onClick={() => setAddingContentType('text')}
                >
                  + Add Text Block
                </button>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold cursor-pointer"
                  onClick={() => setAddingContentType('video')}
                >
                  + Add Video Block
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="text-gray-500 italic text-xs sm:text-base">Select a module to view its content.</div>
      )}
    </div>
  );
};

export default ContentArea;