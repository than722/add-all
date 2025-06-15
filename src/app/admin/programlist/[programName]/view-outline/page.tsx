import AdminCourseOutlineViewClient from '@/components/Admin/AdminCourseOutlineView'; // Import the new client component

interface AdminViewOutlinePageProps {
  params: {
    programName: string; // The dynamic segment from the URL
  };
}

// This page is a pure Server Component
export default async function AdminViewOutlinePage({ params }: AdminViewOutlinePageProps) {
  const { programName } = params;

  return (
    <div className="min-h-screen bg-gray-100"> {/* Consistent background */}
      <AdminCourseOutlineViewClient programName={programName} />
    </div>
  );
}
