import AdminStudentListClient from '@/components/Admin/studentlistPage/AdminStudentListClient'; // Import the new client component

// This page is a pure Server Component (no 'use client' at the top)
export default async function AdminStudentListPage() {
  return (
    <AdminStudentListClient />
  );
}
