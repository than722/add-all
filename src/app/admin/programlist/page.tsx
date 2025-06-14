import AdminProgramListClient from '@/components/Admin/AdminProgramListClient'; // Import the client component

// This page is a pure Server Component (no 'use client' at the top)
export default async function AdminProgramListPage() {
  return (
    <AdminProgramListClient />
  );
}
