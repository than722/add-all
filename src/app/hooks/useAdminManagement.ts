import { useState, useMemo } from 'react';
import { admins, instructors, students } from '@/data/data'; // Import raw data

// Define the User interface, matching what AdminsTable and other components expect
interface User {
  name: string;
  email: string;
  contact: string;
  position: string;
  isAdmin: boolean;
  img?: string; // Optional image field
}

export const useAdminManagement = () => {
  // Unified list of all users/employees for admin assignment and general display
  const initialUniqueUsers: User[] = useMemo(() => {
    const uniqueUsersMap = new Map<string, User>();

    // Add initial admins from data.ts
    admins.forEach(admin => {
      uniqueUsersMap.set(admin.email, {
        name: admin.name, email: admin.email, contact: admin.contact || 'N/A',
        position: admin.position || 'Admin', isAdmin: admin.isAdmin || false, img: admin.img || '/profileicon.png'
      });
    });

    // Add initial instructors, merging if email already exists
    instructors.forEach(inst => {
      if (!uniqueUsersMap.has(inst.email)) {
        uniqueUsersMap.set(inst.email, {
          name: inst.name, email: inst.email, contact: inst.contact || 'N/A',
          position: 'Instructor', isAdmin: false, img: inst.img || '/profileicon.png'
        });
      } else {
        const existingUser = uniqueUsersMap.get(inst.email)!;
        uniqueUsersMap.set(inst.email, {
          ...existingUser, contact: inst.contact || existingUser.contact,
          position: existingUser.position === 'Employee' || existingUser.position === 'Admin' ? existingUser.position : 'Instructor',
          img: inst.img || existingUser.img || '/profileicon.png', isAdmin: existingUser.isAdmin || false,
        });
      }
    });

    // Add initial students, merging if email already exists
    students.forEach(stud => {
      if (!uniqueUsersMap.has(stud.email)) {
        uniqueUsersMap.set(stud.email, {
          name: stud.name, email: stud.email, contact: stud.contact || 'N/A',
          position: 'Student', isAdmin: false, img: stud.img || '/profileicon.png'
        });
      } else {
        const existingUser = uniqueUsersMap.get(stud.email)!;
        uniqueUsersMap.set(stud.email, {
          ...existingUser, contact: stud.contact || existingUser.contact,
          position: existingUser.position || 'Student', img: stud.img || existingUser.img || '/profileicon.png',
          isAdmin: existingUser.isAdmin || false,
        });
      }
    });

    return Array.from(uniqueUsersMap.values());
  }, []);

  const [uniqueUsers, setUniqueUsers] = useState<User[]>(initialUniqueUsers);

  // Separate list specifically for users with isAdmin: true
  const [adminList, setAdminList] = useState<User[]>(
    initialUniqueUsers.filter(user => user.isAdmin)
  );

  // State for the admin role confirmation modal
  const [adminRoleModalData, setAdminRoleModalData] = useState<{ email: string; name: string; isAdmin: boolean } | null>(null);

  // State for the Add Employee modal
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  // Handler for opening the admin role confirmation modal
  const handleAdminToggle = (email: string, name: string, isAdmin: boolean) => {
    setAdminRoleModalData({ email, name, isAdmin });
  };

  // Handler for confirming the admin role change
  const confirmAdminToggle = () => {
    if (!adminRoleModalData) return;
    setAdminList((prev) => {
      if (adminRoleModalData.isAdmin) { // Currently an admin, so removing role
        return prev.filter((a) => a.email !== adminRoleModalData.email);
      } else { // Not an admin, so adding role
        const user = uniqueUsers.find((u) => u.email === adminRoleModalData.email);
        return user ? [...prev, { ...user, isAdmin: true }] : prev;
      }
    });
    setUniqueUsers(prevUniqueUsers => prevUniqueUsers.map(user =>
      user.email === adminRoleModalData.email ? { ...user, isAdmin: !adminRoleModalData.isAdmin } : user
    ));
    setAdminRoleModalData(null);
  };

  // Handle adding a new employee (who can then be made an admin via toggle)
  const handleAddEmployee = (employee: { name: string; email: string; contact: string; img: string; position: string }) => {
    const exists = uniqueUsers.some(u => u.email === employee.email);
    if (exists) { alert('An employee with this email already exists.'); return; } // Consider custom modal/toast
    const newUser: User = { ...employee, isAdmin: false, img: employee.img || '/profileicon.png' };
    setUniqueUsers((prev) => [...prev, newUser]);
    setShowAddAdminModal(false);
  };

  return {
    uniqueUsers,
    adminList,
    adminRoleModalData,
    setAdminRoleModalData,
    showAddAdminModal,
    setShowAddAdminModal,
    handleAdminToggle,
    confirmAdminToggle,
    handleAddEmployee,
  };
};
