// components/ui/Modals/EditEvaluationFeedbackModal.tsx
import React, { useState, useEffect } from 'react';

// Re-export this interface if it's used elsewhere, otherwise define it here.
export interface FeedbackQuestion {
  id: number;
  question: string;
  type: 'rating' | 'text' | 'likert';
}

interface EditEvaluationFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: FeedbackQuestion[];
  setQuestions: (questions: FeedbackQuestion[]) => void;
}

// Define the available question types for dropdowns
const defaultTypes = [
  { label: 'Rating (1-5 stars)', value: 'rating' },
  { label: 'Text (Open-ended comments)', value: 'text' },
  { label: 'Likert Scale (Strongly Disagree - Strongly Agree)', value: 'likert' },
];

export default function EditEvaluationFeedbackModal({ isOpen, onClose, questions, setQuestions }: EditEvaluationFeedbackModalProps) {
  // State for editing existing questions
  const [editId, setEditId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editType, setEditType] = useState<'rating' | 'text' | 'likert'>('rating');

  // State for adding new questions
  const [newQuestion, setNewQuestion] = useState('');
  const [newType, setNewType] = useState<'rating' | 'text' | 'likert'>('rating');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEditId(null);
      setEditQuestion('');
      setEditType('rating');
      setNewQuestion('');
      setNewType('rating');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handler to set state for editing a question
  const handleEdit = (q: FeedbackQuestion) => {
    setEditId(q.id);
    setEditQuestion(q.question);
    setEditType(q.type);
  };

  // Handler to save changes to an existing question
  const handleSaveEdit = () => {
    if (!editQuestion.trim()) return; // Prevent saving empty questions
    setQuestions(
      questions.map((q) =>
        q.id === editId ? { ...q, question: editQuestion.trim(), type: editType } : q
      )
    );
    setEditId(null);
    setEditQuestion('');
    // Optionally, flash a save message here
  };

  // Handler to delete a question
  const handleDelete = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Handler to add a new question
  const handleAdd = () => {
    if (!newQuestion.trim()) return; // Prevent adding empty questions
    setQuestions([
      ...questions,
      { id: Date.now(), question: newQuestion.trim(), type: newType },
    ]);
    setNewQuestion('');
    setNewType('rating'); // Reset type to default after adding
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative animate-fadeInUp p-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-light cursor-pointer z-10"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-xl font-extrabold text-[#08228d] mb-6 border-b pb-3">Edit Evaluation & Feedback Questions</h3>

        {/* List of Existing Questions */}
        <div className="max-h-80 overflow-y-auto pr-2 mb-6 custom-scrollbar">
          {questions.length === 0 ? (
            <p className="text-gray-500 italic text-sm text-center py-4">No evaluation questions added yet.</p>
          ) : (
            <ul className="space-y-4">
              {questions.map((q) => (
                <li key={q.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
                  {editId === q.id ? (
                    // Edit mode for a question
                    <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
                      <input
                        className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-[#08228d] text-sm text-gray-900"
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value)}
                        placeholder="Edit question..."
                      />
                      <select
                        className="border border-gray-300 p-2 rounded-md sm:w-auto bg-white focus:outline-none focus:ring-2 focus:ring-[#08228d] text-sm cursor-pointer text-gray-700"
                        value={editType}
                        onChange={(e) => setEditType(e.target.value as 'rating' | 'text' | 'likert')}
                      >
                        {defaultTypes.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium cursor-pointer shadow-sm"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-400 transition-colors duration-200 text-sm font-medium cursor-pointer shadow-sm"
                          onClick={() => setEditId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display mode for a question
                    <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-2 sm:gap-0">
                      <div className="flex flex-col sm:flex-row items-center flex-grow text-left sm:text-left">
                        <span className="font-semibold text-gray-800 mr-2 text-base">{q.question}</span>
                        <span className="text-sm text-gray-500 italic">({
                           defaultTypes.find(type => type.value === q.type)?.label || q.type
                        })</span>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium cursor-pointer"
                          onClick={() => handleEdit(q)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-medium cursor-pointer"
                          onClick={() => handleDelete(q.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add New Question Section */}
        <h4 className="text-lg font-bold text-[#08228d] mb-4 border-b pb-2">Add New Question</h4>
        {/* Adjusted to flex-col for stacking, and items-start for left alignment */}
        <div className="flex flex-col gap-3 items-start w-full">
          <input
            className="border border-gray-300 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#08228d] text-sm text-gray-900" /* w-full to make it take full width */
            placeholder="New question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-3 w-full items-center sm:items-end"> {/* Nested flex for dropdown and button */}
            <select
              className="border border-gray-300 p-2.5 rounded-md w-full sm:w-auto bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08228d] cursor-pointer text-sm" /* w-full for stacking, sm:w-auto for wider screens */
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'rating' | 'text' | 'likert')}
            >
              {defaultTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <button
              className="bg-[#08228d] text-white px-5 py-2.5 rounded-md hover:bg-[#1a3d7c] transition-colors duration-200 text-sm font-medium shadow-md w-full sm:w-auto cursor-pointer"
              onClick={handleAdd}
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-200 text-[#08228d] py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm font-medium shadow-sm cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
