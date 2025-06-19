// app/components/SuperAdmin/SuperAdminClient.tsx

'use client';

import React from "react";
import { useRouter, usePathname } from 'next/navigation';

import AdminRoleConfirmModal from '@/components/ui/Modals/AdminModals/AdminRoleConfrimModal';
import AddAdminModal from '@/components/ui/Modals/AdminModals/AddAdminModal';
import AdminsTable from './adminPage/AdminsTable';
import { useAdminManagement } from '@/app/hooks/useAdminManagement';

export default function SuperAdminClient() {
  const router = useRouter();
  const pathname = usePathname();

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
      <div className="px-3 sm:px-6 py-6 sm:py-10">
        <div className="bg-white rounded-2xl shadow p-3 sm:p-6 overflow-x-auto">
          <AdminsTable
            uniqueUsers={uniqueUsers}
            adminList={adminList}
            handleAdminToggle={handleAdminToggle}
            onAddClick={() => setShowAddAdminModal(true)}
          />
          <AddAdminModal
            isOpen={showAddAdminModal}
            onClose={() => setShowAddAdminModal(false)}
            onAdd={handleAddEmployee}
          />
        </div>

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
