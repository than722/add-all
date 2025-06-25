'use client';

import React from 'react';
import { ProgramCategory } from '@/data/programsData';

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedProgram: string;
  setSelectedProgram: (program: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  programsInSelectedCategory: string[];
  programCategories: ProgramCategory[];
  hideFilters?: boolean;  // NEW optional prop
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedProgram,
  setSelectedProgram,
  sortBy,
  setSortBy,
  programsInSelectedCategory,
  programCategories,
  hideFilters = false, // default false
}) => {
  return (
    <aside className="lg:w-1/4 p-6 bg-white rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-8 self-start">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters & Sorting</h2>

      {/* Show filters only if hideFilters is false */}
      {!hideFilters && (
        <>
          {/* Category Filter */}
          <div className="mb-5">
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by Category:
            </label>
            <div className="relative">
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8 cursor-pointer"
              >
                {programCategories.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Program Filter */}
          <div className="mb-5">
            <label
              htmlFor="program-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by Specific Program:
            </label>
            <div className="relative">
              <select
                id="program-select"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8 cursor-pointer"
                disabled={selectedCategory === 'All Categories'}
              >
                {programsInSelectedCategory.map((progName) => (
                  <option key={progName} value={progName}>
                    {progName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sort By */}
      <div className="mb-8">
        <label
          htmlFor="sort-by"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort By:
        </label>
        <div className="relative">
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8 cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="likes">Top Likes</option>
            <option value="comments">Most Comments</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
