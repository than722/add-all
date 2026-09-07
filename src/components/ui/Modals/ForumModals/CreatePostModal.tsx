'use client';

import React, { useState } from 'react';

interface CreatePostModalProps {
  onClose: () => void;
  onPostCreated: (title: string, subject: string, content: string) => void;
  programFilter?: string; // Optional for program-specific forums
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  onPostCreated,
  programFilter,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(programFilter || '');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Validation
    if (title.trim() === '') {
      setError('Post title is required.');
      return;
    }

    if (!programFilter && subject.trim() === '') {
      setError('Please specify a program or category.');
      return;
    }

    if (content.trim() === '') {
      setError('Post content is required.');
      return;
    }

    // If valid, create the post
    onPostCreated(title, subject, content);

    // Clear form fields
    setTitle('');
    setSubject(programFilter || '');
    setContent('');
    setError(null);

    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Post</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 p-2 rounded">
            {error}
          </div>
        )}

        {/* Title */}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Subject */}
        {!programFilter && (
          <input
            type="text"
            placeholder="Related Program / Category"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Content */}
        <textarea
          placeholder="Write your post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          rows={5}
        ></textarea>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
