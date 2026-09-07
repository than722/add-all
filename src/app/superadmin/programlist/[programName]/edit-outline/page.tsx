import SuperAdminEditCourseOutlineClient from '@/components/SuperAdmin/programPage/SuperAdminEditCourseOutline'; // Import the new client component

interface SuperAdminEditOutlinePageProps {
  params: {
    programName: string; // The dynamic segment from the URL
  };
}

// This page is a pure Server Component
export default async function SuperAdminEditOutlinePage({ params }: SuperAdminEditOutlinePageProps) {
   const programName = decodeURIComponent(params.programName);

  return (
    <div className="min-h-screen bg-gray-100"> {/* Consistent background */}
      <SuperAdminEditCourseOutlineClient programName={programName} />
    </div>
  );
}