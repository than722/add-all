import React from 'react';

export default function StudentLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-3 sm:px-6 py-6 sm:py-10">
        {children}
      </div>
    </div>
  );
}
