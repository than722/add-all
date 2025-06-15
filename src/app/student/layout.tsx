import React from 'react';

export default function StudentLayout({
  children, // 'children' will be the content of the nested page (e.g., allprograms/page.tsx or myprograms/page.tsx)
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <div className="px-4 sm:px-6 py-6 sm:py-10 max-w-7xl mx-auto">
        {/* The content of the specific student page will be rendered here */}
        {children}
      </div>
    </div>
  );
}
