'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FeaturedProgramViewModal from '../featuredprogramviewModal';

const programCategories = [
  {
    category: 'ARTS AND DESIGN',
    programs: [
      'Floristry',
      'Basic Soap Making',
      'Mindanao Arts and Culture',
      'Polymer Clay',
      'Pencil Portraiture',
      'Basic Oil Painting',
      'Hair and Make-up',
      'Acrylic Painting',
      'Figure Painting',
      'Urban Gardening',
      'Aromatherapy',
      'Sewing for Home',    
    ],
  },
  {
    category: 'Business and Finance',
    programs: [
      'Financial Statements: Preparation, Presentation and Analysis',
      'Fundamentals of Governance, Business Ethics, Risk Management, and Internal Control',
      'Research in Finance',
      'Investment Analysis',
      'Capital Markets',
      'Customer Grouping',
    ],
  },
];

const programsList = programCategories.flatMap(({ category, programs }) =>
  programs.map((program) => ({
    program,
    category,
  }))
);

const photosAndReviews = [
  {
    title: 'Great Experience',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula.',
  },
  {
    title: 'Amazing Learning',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula.',
  },
  {
    title: 'Highly Recommended',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula.',
  },
  {
    title: 'Loved the Courses',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula.',
  },
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [modalProgram, setModalProgram] = React.useState<{ program: string; category: string } | null>(null);
  const categories = programCategories.map((cat) => cat.category);
  const filteredPrograms = selectedCategory
    ? programsList.filter((p) => p.category === selectedCategory)
    : programsList;
  const router = useRouter();

  return (
    <div 
        id="programs"
        className="min-h-screen px-6 py-12 bg-gray-100"
        >
      {/* Featured Programs */}
      <h1 className="text-3xl font-bold text-center text-[#002B5C] mb-6">
        Featured Programs
      </h1>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-full border font-semibold transition text-sm ${selectedCategory === null ? 'bg-[#002B5C] text-white border-[#002B5C]' : 'bg-white text-[#002B5C] border-[#002B5C] hover:bg-[#002B5C] hover:text-white'}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-semibold transition text-sm ${selectedCategory === cat ? 'bg-[#002B5C] text-white border-[#002B5C]' : 'bg-white text-[#002B5C] border-[#002B5C] hover:bg-[#002B5C] hover:text-white'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex space-x-6 overflow-x-auto px-2 py-4 scrollbar-thin scrollbar-thumb-[#002B5C]/70 scrollbar-track-gray-200 mb-16">
        {filteredPrograms.map(({ program, category }, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col items-center p-6 cursor-pointer"
            onClick={() => setModalProgram({ program, category })}
            title={`View details for ${program}`}
          >
            {/* Placeholder Thumbnail */}
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-lg select-none">
              Thumbnail
            </div>

            {/* Program Name */}
            <h3 className="text-lg font-semibold text-[#002B5C] text-center mb-2">
              {program}
            </h3>

            {/* Category */}
            <p className="text-sm text-gray-600 text-center italic">{category}</p>

            <button
              className="mt-4 bg-[#002B5C] text-white px-4 py-2 rounded-full font-semibold text-xs hover:bg-[#001f40] transition"
              onClick={e => {
                e.stopPropagation();
                setModalProgram({ program, category });
              }}
            >
              View Program
            </button>
          </div>
        ))}
      </div>

      {/* Photos and Reviews */}
      <h1 className="text-3xl font-bold text-center text-[#002B5C] mb-6">
        Featured Photos
      </h1>

      <div className="flex space-x-6 overflow-x-auto px-2 py-4 scrollbar-thin scrollbar-thumb-[#002B5C]/70 scrollbar-track-gray-200">
        {photosAndReviews.map(({ title, text }, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col p-6"
          >
            {/* Placeholder Thumbnail */}
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-lg select-none">
              Photo
            </div>

            {/* Review Title */}
            <h3 className="text-lg font-semibold text-[#002B5C] mb-2">{title}</h3>

            {/* Review Text */}
            <p className="text-gray-600 text-sm">{text}</p>
          </div>
        ))}
      </div>

      {modalProgram && (
        <FeaturedProgramViewModal
          program={modalProgram.program}
          category={modalProgram.category}
          onClose={() => setModalProgram(null)}
        />
      )}
    </div>
  );
}
