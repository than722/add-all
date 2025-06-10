import React from 'react';

interface ContentBlock {
  id: number;
  type: 'text' | 'video';
  value: string;
  isEditing?: boolean;
}

interface ContentBlockEditorProps {
  block: ContentBlock;
  editingBlockId: number | null;
  editingBlockValue: string;
  onChange: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ContentBlockEditor: React.FC<ContentBlockEditorProps> = ({ block, editingBlockId, editingBlockValue, onChange, onSave, onCancel }) => {
  if (editingBlockId !== block.id) return null;
  if (block.type === 'text') {
    return (
      <>
        <textarea
          className="w-full mb-4 px-2 py-1 border rounded text-gray-900 text-xs sm:text-base"
          value={editingBlockValue}
          onChange={e => onChange(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base" onClick={onSave}>Save</button>
          <button className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base" onClick={onCancel}>Cancel</button>
        </div>
      </>
    );
  }
  if (block.type === 'video') {
    return (
      <>
        <input
          type="url"
          placeholder="Paste Video Link (YouTube/Vimeo)"
          value={editingBlockValue}
          onChange={e => onChange(e.target.value)}
          className="block w-full border rounded px-2 py-1 text-xs sm:text-sm mb-2"
        />
        <div className="flex gap-2">
          <button className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base" onClick={onSave}>Save</button>
          <button className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base" onClick={onCancel}>Cancel</button>
        </div>
      </>
    );
  }
  return null;
};

export default ContentBlockEditor;
