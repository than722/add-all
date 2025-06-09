import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import SuperAdminClient from '@/components/superadminClient/superadminClient';

export default function SuperAdminClientPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <SuperAdminClient />
    </div>
  );
}
