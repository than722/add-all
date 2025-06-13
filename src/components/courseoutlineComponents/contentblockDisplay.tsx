import React from 'react';

interface ContentBlock {
  id: number;
  type: 'text' | 'video';
  value: string;
  isEditing?: boolean;
}

interface ContentBlockDisplayProps {
  block: ContentBlock;
  onEdit: () => void;
  onDelete: () => void;
}

const ContentBlockDisplay: React.FC<ContentBlockDisplayProps> = ({ block, onEdit, onDelete }) => (
  <>
    {block.type === 'text' && <p className="text-gray-700 mb-4 text-xs sm:text-base">{block.value}</p>}
    {block.type === 'video' && (
      <div className="w-full">
        <iframe
          src={block.value}
          title="Video"
          className="w-full h-32 sm:w-64 sm:h-36 rounded shadow"
          allowFullScreen
        />
      </div>
    )}
    <div className="flex gap-2 mt-2">
      <button className="text-[#08228d] underline text-xs sm:text-sm hover:text-[#001f40]" onClick={onEdit}>
        Edit {block.type === 'text' ? 'Text' : 'Video'}
      </button>
      <button className="text-red-500 underline text-xs sm:text-sm hover:text-red-700" onClick={onDelete}>
        Delete
      </button>
    </div>
  </>
);

export default ContentBlockDisplay;
