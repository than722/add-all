'use client'; // This page needs to be a client component because SuperAdminInstructorListClient is.

import SuperAdminInstructorListClient from '@/components/SuperAdmin/instructorPage/SuperAdminInstructorList'; // Import the client component

export default function SuperAdminInstructorsPage() {
  return (
    <SuperAdminInstructorListClient />
  );
}