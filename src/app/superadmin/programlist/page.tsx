import SuperAdminProgramListClient from '@/components/SuperAdmin/programPage/SuperAdminProgramList'; // Import the new client component

// This page is a pure Server Component (no 'use client' at the top)
export default async function SuperAdminProgramListPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <SuperAdminProgramListClient />
    </div>
  );
}
