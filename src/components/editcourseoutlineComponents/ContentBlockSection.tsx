import React from 'react';
import ContentBlockEditor from './contentblockEditor';
import ContentBlockDisplay from './contentblockDisplay';
import AddContentBlock from './AddContentBlock';

interface ContentBlock {
  id: number;
  type: 'text' | 'video';
  value: string;
  isEditing?: boolean;
}

interface ContentBlockSectionProps {
  blocks: ContentBlock[];
  addingContentType: 'none' | 'text' | 'video';
  setAddingContentType: React.Dispatch<React.SetStateAction<'none' | 'text' | 'video'>>;
  newTextContent: string;
  setNewTextContent: React.Dispatch<React.SetStateAction<string>>;
  newVideoUrl: string;
  setNewVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  editingBlockId: number | null;
  editingBlockValue: string;
  setEditingBlockValue: React.Dispatch<React.SetStateAction<string>>;
  onSaveNew: () => void;
  onCancelNew: () => void;
  onEdit: (block: ContentBlock) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

const ContentBlockSection: React.FC<ContentBlockSectionProps> = ({
  blocks,
  addingContentType,
  setAddingContentType,
  newTextContent,
  setNewTextContent,
  newVideoUrl,
  setNewVideoUrl,
  editingBlockId,
  editingBlockValue,
  setEditingBlockValue,
  onSaveNew,
  onCancelNew,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => {
  return (
    <>
      {blocks.map(block => (
        <div key={block.id} className="bg-white rounded-xl shadow p-2 sm:p-6 mb-4">
          <ContentBlockEditor
            block={block}
            editingBlockId={editingBlockId}
            editingBlockValue={editingBlockValue}
            onChange={setEditingBlockValue}
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
          />
          <ContentBlockDisplay
            block={block}
            onEdit={() => onEdit(block)}
            onDelete={() => onDelete(block.id)}
          />
        </div>
      ))}

      <AddContentBlock
        addingContentType={addingContentType}
        newTextContent={newTextContent}
        setNewTextContent={setNewTextContent}
        newVideoUrl={newVideoUrl}
        setNewVideoUrl={setNewVideoUrl}
        onSave={onSaveNew}
        onCancel={onCancelNew}
      />

      <div className="mt-6 flex justify-start gap-2">
        {addingContentType === 'none' && (
          <>
            <button
              className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold cursor-pointer"
              onClick={() => setAddingContentType('text')}
            >
              + Add Text
            </button>
            <button
              className="bg-[#2d208a] text-white px-4 py-2 rounded font-semibold cursor-pointer"
              onClick={() => setAddingContentType('video')}
            >
              + Add Video
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ContentBlockSection;
