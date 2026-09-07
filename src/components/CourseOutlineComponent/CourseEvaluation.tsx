'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { evaluationQuestions } from '@/data/CourseEvaluationData';

interface CourseEvaluationProps {
  onClose: () => void;
  onSubmit: (feedback: any) => void;
}

export default function CourseEvaluation({ onClose, onSubmit }: CourseEvaluationProps) {
  const [responses, setResponses] = useState<{ [key: number]: any }>({});

  const handleRatingChange = (questionId: number, rating: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: rating }));
  };

  const handleLikertChange = (questionId: number, option: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleTextChange = (questionId: number, text: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = () => {
    console.log('Feedback Submitted:', responses);
    onSubmit(responses);
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full animate-fadeInUp">
      <h3 className="text-2xl font-extrabold text-blue-800 mb-4">Course Evaluation & Feedback</h3>

      {evaluationQuestions.map((q) => (
        <div key={q.id} className="mb-6">
          <label className="font-semibold block mb-2">{q.question}</label>

          {q.type === 'rating' && (
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`cursor-pointer text-xl ${
                    responses[q.id] >= star ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleRatingChange(q.id, star)}
                />
              ))}
            </div>
          )}

          {q.type === 'likert' && (
            <div className="flex flex-wrap gap-2 mt-1">
              {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleLikertChange(q.id, option)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    responses[q.id] === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {q.type === 'text' && (
            <textarea
              value={responses[q.id] || ''}
              onChange={(e) => handleTextChange(q.id, e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="Your comments..."
            />
          )}
        </div>
      ))}

      <div className="flex items-center">
        <button
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-md hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          Submit Feedback
        </button>

        <button
          onClick={onClose}
          className="ml-4 text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
