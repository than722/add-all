// components/ui/CardList.tsx

import React from 'react';
import Link from 'next/link';

interface ProgramCardProps {
  program: string;
  category: string;
  href: string;
  showEnrolledPill?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  category,
  href,
  showEnrolledPill = false,
}) => {
  return (
    <Link
      href={href}
      className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col"
    >
      <div className="w-full h-24 sm:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3 flex items-center justify-center text-gray-600 text-xs sm:text-base flex-shrink-0">
        Thumbnail
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#08228d]">{program}</h3>
      <p className="text-xs sm:text-sm text-gray-500 italic mb-2 flex-grow">{category}</p>
      {showEnrolledPill && (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start mt-auto">
          Enrolled
        </div>
      )}
    </Link>
  );
};

export default ProgramCard;
