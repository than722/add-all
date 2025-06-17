// app/components/SuperAdmin/SuperAdminClient.tsx
// This is the main client component for the Super Admin Dashboard, acting as a controller
// managing navigation to various sections. The content for Instructors, Students, and Programs
// is now handled by separate dedicated pages.

'use client';

import React, { useState, useEffect } from "react";
// Removed unused Image import as there are no direct images managed here anymore
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname

// Modals related to Admin management (still relevant for this component)
import AdminRoleConfirmModal from '@/components/ui/Modals/AdminRoleConfrimModal';
import AddAdminModal from '@/components/ui/Modals/AddAdminModal';

// Admin-specific section component (still rendered directly here)
import AdminsTable from './adminPage/AdminsTable';

// Import the custom hook for admin management
import { useAdminManagement } from '@/app/hooks/useAdminManagement'; // Corrected path if necessary

export default function SuperAdminClient() {
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname(); // Initialize usePathname to check current route

  // Utilize the custom hook for admin management (these are for the Administrators tab)
  const {
    uniqueUsers,
    adminList,
    adminRoleModalData,
    setAdminRoleModalData,
    showAddAdminModal,
    setShowAddAdminModal,
    handleAdminToggle,
    confirmAdminToggle,
    handleAddEmployee,
  } = useAdminManagement();


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-6 py-6 sm:py-10 max-w-full sm:max-w-6xl mx-auto">
        {/* The Administrators Section is now always rendered */}
        <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#08228d]">Administrators</h2>
                <button
                    className="bg-[#08228d] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#1a3d7c] w-full sm:w-auto"
                    onClick={() => setShowAddAdminModal(true)}
                >
                    + Add Employee
                </button>
            </div>
            <AdminsTable uniqueUsers={uniqueUsers} adminList={adminList} handleAdminToggle={handleAdminToggle} />
            <AddAdminModal
                isOpen={showAddAdminModal}
                onClose={() => setShowAddAdminModal(false)}
                onAdd={handleAddEmployee}
            />
        </div>

        {/* Global Modals that remain here (if any, typically for cross-cutting concerns) */}
        {/* AdminRoleConfirmModal is still here as it's directly tied to AdminsTable logic */}
        <AdminRoleConfirmModal
          isOpen={!!adminRoleModalData}
          isAdmin={adminRoleModalData?.isAdmin ?? false}
          userName={adminRoleModalData?.name ?? ''}
          userEmail={adminRoleModalData?.email ?? ''}
          actionType={adminRoleModalData?.isAdmin ? 'remove' : 'add'}
          onConfirm={confirmAdminToggle}
          onClose={() => setAdminRoleModalData(null)}
        />
      </div>
    </div>
  );
}
