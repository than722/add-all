import React from 'react';

interface AddContentBlockProps {
  addingContentType: 'none' | 'text' | 'video';
  newTextContent: string;
  setNewTextContent: (s: string) => void;
  newVideoUrl: string;
  setNewVideoUrl: (s: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AddContentBlock: React.FC<AddContentBlockProps> = ({ addingContentType, newTextContent, setNewTextContent, newVideoUrl, setNewVideoUrl, onSave, onCancel }) => {
  if (addingContentType === 'none') return null;
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-4">
      {addingContentType === 'text' && (
        <textarea
          className="w-full mb-4 px-2 py-1 border rounded text-gray-900 text-xs sm:text-base"
          placeholder="Enter your text content here..."
          value={newTextContent}
          onChange={e => setNewTextContent(e.target.value)}
        />
      )}
      {addingContentType === 'video' && (
        <input
          type="url"
          placeholder="Paste Video Link (YouTube/Vimeo)"
          value={newVideoUrl}
          onChange={e => setNewVideoUrl(e.target.value)}
          className="block w-full border rounded px-2 py-1 text-xs sm:text-sm mb-2"
        />
      )}
      <div className="flex gap-2">
        <button className="bg-[#08228d] text-white px-2 py-1 rounded text-xs sm:text-base" onClick={onSave}>
          Save {addingContentType === 'text' ? 'Text' : 'Video'} Block
        </button>
        <button className="bg-gray-300 text-[#08228d] px-2 py-1 rounded text-xs sm:text-base" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddContentBlock;
