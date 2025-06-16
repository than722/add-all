'use client';

import React, { useState, useMemo } from 'react';
import AdminsTable from './AdminsTable';
import AdminRoleConfirmModal from '@/components/ui/Modals/AdminRoleConfrimModal';
import AddAdminModal from '@/components/ui/Modals/AddAdminModal';

import { admins, instructors } from '@/data/data'; // Removed students

interface User {
  name: string;
  email: string;
  contact: string;
  position: string;
  isAdmin: boolean;
  img?: string;
}

export default function AdminListClient() {
  const initialUniqueUsers: User[] = useMemo(() => {
    const uniqueUsersMap = new Map<string, User>();

    // Add initial admins
    admins.forEach(admin => {
      uniqueUsersMap.set(admin.email, {
        name: admin.name,
        email: admin.email,
        contact: admin.contact || 'N/A',
        position: admin.position || 'Admin',
        isAdmin: admin.isAdmin || false,
        img: '/profileicon.png'
      });
    });

    // Add initial instructors
    instructors.forEach(inst => {
      if (!uniqueUsersMap.has(inst.email)) {
        uniqueUsersMap.set(inst.email, {
          name: inst.name,
          email: inst.email,
          contact: inst.contact || 'N/A',
          position: 'Instructor',
          isAdmin: false,
          img: inst.img || '/profileicon.png'
        });
      } else {
        const existingUser = uniqueUsersMap.get(inst.email)!;
        uniqueUsersMap.set(inst.email, {
          ...existingUser,
          contact: inst.contact || existingUser.contact,
          position: existingUser.position === 'Employee' || existingUser.position === 'Admin' ? existingUser.position : 'Instructor',
          img: inst.img || existingUser.img || '/profileicon.png',
          isAdmin: existingUser.isAdmin || false,
        });
      }
    });

    return Array.from(uniqueUsersMap.values());
  }, []);

  const [uniqueUsers, setUniqueUsers] = useState<User[]>(initialUniqueUsers);
  const [adminList, setAdminList] = useState<User[]>(
    initialUniqueUsers.filter(user => user.isAdmin)
  );

  const [adminRoleModalData, setAdminRoleModalData] = useState<{
    email: string;
    name: string;
    isAdmin: boolean;
  } | null>(null);

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const handleAdminToggle = (email: string, name: string, isAdmin: boolean) => {
    setAdminRoleModalData({ email, name, isAdmin });
  };

  const confirmAdminToggle = () => {
    if (!adminRoleModalData) return;

    setAdminList(prev =>
      adminRoleModalData.isAdmin
        ? prev.filter(a => a.email !== adminRoleModalData.email)
        : [...prev, { ...uniqueUsers.find(u => u.email === adminRoleModalData.email)!, isAdmin: true }]
    );

    setUniqueUsers(prev =>
      prev.map(user =>
        user.email === adminRoleModalData.email
          ? { ...user, isAdmin: !adminRoleModalData.isAdmin }
          : user
      )
    );

    setAdminRoleModalData(null);
  };

  const handleAddEmployee = (employee: {
    name: string;
    email: string;
    contact: string;
    img: string;
    position: string;
  }) => {
    const exists = uniqueUsers.some(u => u.email === employee.email);
    if (exists) {
      alert('An employee with this email already exists.');
      return;
    }

    if (employee.position === 'Student') {
      alert('Cannot add a student as an employee.');
      return;
    }

    const newUser: User = {
      name: employee.name,
      email: employee.email,
      contact: employee.contact,
      position: employee.position,
      isAdmin: false,
      img: employee.img || '/profileicon.png',
    };

    setUniqueUsers(prev => [...prev, newUser]);
    setShowAddAdminModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 sm:px-6 py-6 sm:py-10 max-w-full sm:max-w-6xl mx-auto">
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
          <AdminsTable
            uniqueUsers={uniqueUsers}
            adminList={adminList}
            handleAdminToggle={handleAdminToggle}
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
