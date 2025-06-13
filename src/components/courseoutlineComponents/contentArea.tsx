import React, { useState } from 'react';
import ContentBlockEditor from './contentblockEditor';
import ContentBlockDisplay from './contentblockDisplay';
import AddContentBlock from './AddContentBlock';

// 1. Define ContentBlock interface
interface ContentBlock {
  id: number;
  type: 'text' | 'video'; // Or 'image', 'quiz', etc.
  value: string; // The actual content (e.g., text, video URL)
  isEditing?: boolean; // To manage editing state of individual content blocks
}

interface Subsection {
  id: number;   
  title: string;
  // Change content to contentBlocks
  contentBlocks: ContentBlock[];
}

interface Module {
  id: number;
  title: string;
  // Change content to contentBlocks
  contentBlocks: ContentBlock[];
  subsections: Subsection[];
}

interface ContentAreaProps {
  selected: Module | null;
  selectedSub: Subsection | null;
  editingModuleId: number | null;
  editModuleTitle: string;
  setEditModuleTitle: (s: string) => void;
  // Module content now handles contentBlocks
  // editModuleContent: string; // This prop will be removed or repurposed
  // setEditModuleContent: (s: string) => void; // This prop will be removed or repurposed
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
  // editModuleContent, // No longer directly used as a single string
  // setEditModuleContent, // No longer directly used as a single string
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

  // State to control what type of content is being added
  const [addingContentType, setAddingContentType] = useState<'none' | 'text' | 'video'>('none');
  const [newTextContent, setNewTextContent] = useState<string>('');
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');

  // States for editing existing content blocks
  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
  const [editingBlockValue, setEditingBlockValue] = useState<string>('');


  // Helper function to update the course outline with new content blocks
  const updateCourseOutlineWithNewBlock = (
    moduleId: number,
    subsectionId: number | null,
    newBlock: ContentBlock
  ) => {
    setCourseOutline(prevOutline =>
      prevOutline.map(module => {
        if (module.id === moduleId) {
          if (subsectionId === null) {
            // Update module's content blocks
            return {
              ...module,
              contentBlocks: [...module.contentBlocks, newBlock],
            };
          } else {
            // Update subsection's content blocks
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

  // Helper function to update an existing content block
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
            // Update module's content blocks
            return {
              ...module,
              contentBlocks: module.contentBlocks.map(block =>
                block.id === blockId ? { ...block, value: newValue } : block
              ),
            };
          } else {
            // Update subsection's content blocks
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
    if (addingContentType === 'none') return; // Prevent 'none' as a type
    const newBlock: ContentBlock = {
      id: Date.now(),
      type: addingContentType as 'text' | 'video',
      value: addingContentType === 'text' ? newTextContent : newVideoUrl,
    };

    if (selectedSub) {
      // Adding content to a subsection
      updateCourseOutlineWithNewBlock(selected.id, selectedSub.id, newBlock);
    } else {
      // Adding content to a module
      updateCourseOutlineWithNewBlock(selected.id, null, newBlock);
    }

    // Reset states
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
            // Delete block from subsection
            return {
              ...module,
              subsections: module.subsections.map(sub =>
                sub.id === selectedSub.id
                  ? { ...sub, contentBlocks: sub.contentBlocks.filter(b => b.id !== blockId) }
                  : sub
              ),
            };
          } else {
            // Delete block from module
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

  // Determine which content blocks to display and edit
  const currentContentBlocks = selectedSub ? selectedSub.contentBlocks : (selected ? selected.contentBlocks : []);


  return (
    <div className="flex-1 p-2 sm:p-3 md:p-8 relative">
      {/* Save button at top right when editing a module (for module title/description) */}
      {selected && editingModuleId === selected.id}

      {selectedSub ? (
        // Display for a selected subsection
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
                    className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base"
                    onClick={() => selected && saveEditSub(selected.id, selectedSub.id)}
                  >
                    Save Subsection Title
                  </button>
                  <button
                    className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base"
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
                    className="ml-2 text-xs sm:text-sm text-[#08228d] underline hover:text-[#001f40]"
                    onClick={() => startEditSub(selectedSub)}
                  >
                    Edit Title
                  </button>
                </h3>
              </>
            )}
          </div>

          {/* Render existing content blocks for the selected subsection */}
          {currentContentBlocks.map(block => (
            <div key={block.id} className="bg-white rounded-xl shadow p-2 sm:p-6 mb-4">
              {/* --- ContentBlockEditor: Handles editing a single content block --- */}
              <ContentBlockEditor
                block={block}
                editingBlockId={editingBlockId}
                editingBlockValue={editingBlockValue}
                onChange={setEditingBlockValue}
                onSave={handleSaveEditedBlock}
                onCancel={handleCancelEditBlock}
              />
              
              {/* --- ContentBlockDisplay: Handles displaying a single content block --- */}
              <ContentBlockDisplay
                block={block}
                onEdit={() => handleStartEditBlock(block)}
                onDelete={() => handleDeleteBlock(block.id)}
              />
            </div>
          ))}

          {/* Add New Content Block Area for Subsection */}
          <AddContentBlock
            addingContentType={addingContentType}
            newTextContent={newTextContent}
            setNewTextContent={setNewTextContent}
            newVideoUrl={newVideoUrl}
            setNewVideoUrl={setNewVideoUrl}
            onSave={handleSaveNewContent}
            onCancel={handleCancelNewContent}
          />

          {/* Add Content button for subsection */}
          <div className="mt-6 flex justify-start gap-2">
            {addingContentType === 'none' && (
              <>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold"
                  onClick={() => setAddingContentType('text')}
                >
                  + Add Text Block
                </button>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold"
                  onClick={() => setAddingContentType('video')}
                >
                  + Add Video Block
                </button>
              </>
            )}
          </div>
        </>
      ) : selected ? (
        // Display for a selected module
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
                    className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base"
                    onClick={() => saveEditModule(selected.id)}
                  >
                    Save Module Info
                  </button>
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
                <h3 className="text-base sm:text-2xl font-bold text-[#08228d] mb-2 flex items-center justify-between">
                  {selected.title}
                  <button
                    className="ml-2 text-xs sm:text-sm text-[#08228d] underline hover:text-[#001f40]"
                    onClick={() => startEditModule(selected)}
                  >
                    Edit Module Info
                  </button>
                </h3>
              </>
            )}
          </div>

          {/* Render existing content blocks for the selected module */}
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

          {/* Add New Content Block Area for Module */}
          <AddContentBlock
            addingContentType={addingContentType}
            newTextContent={newTextContent}
            setNewTextContent={setNewTextContent}
            newVideoUrl={newVideoUrl}
            setNewVideoUrl={setNewVideoUrl}
            onSave={handleSaveNewContent}
            onCancel={handleCancelNewContent}
          />

          {/* Add Content button for module */}
          <div className="mt-6 flex justify-start gap-2">
            {addingContentType === 'none' && (
              <>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold"
                  onClick={() => setAddingContentType('text')}
                >
                  + Add Text Block
                </button>
                <button
                  className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold"
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