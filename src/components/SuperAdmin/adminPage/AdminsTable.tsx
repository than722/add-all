// AdminSections/AdminsTable.tsx
import React from "react";

// User interface as provided by you
interface User {
  name: string;
  email: string;
  contact?: string;
  position?: string;
  isAdmin?: boolean; // Added for clarity as it's used in logic
}

interface AdminsTableProps {
  uniqueUsers: User[]; // List of all users (potential admins)
  adminList: User[]; // List of users currently marked as admin
  handleAdminToggle: (email: string, name: string, isAdmin: boolean) => void;
}

export default function AdminsTable({ uniqueUsers, adminList, handleAdminToggle }: AdminsTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-[#08228d] mb-4">Manage Admin Roles</h3>
      {/* Responsive Table/List */}
      <div className="block sm:hidden">
        <ul className="divide-y divide-gray-200">
          {uniqueUsers.length === 0 && <li className="text-gray-500 italic text-center py-4">No users found.</li>}
          {uniqueUsers.map((user: User) => {
            const isAdmin = adminList.some((a: User) => a.email === user.email && a.isAdmin);
            return (
              <li key={user.email} className="py-4 flex flex-col gap-2">
                <div>
                  <span className="font-semibold text-[#08228d]">{user.name || "[Employee's name]"}</span>
                  <span className="block text-gray-500 text-xs">{user.email || "[email]"}</span>
                </div>
                <div className="flex flex-col gap-1 text-xs text-gray-700">
                  <span><span className="font-semibold">Contact:</span> {user.contact || "N/A"}</span>
                  <span><span className="font-semibold">Position:</span> {user.position || "Employee"}</span>
                  <span><span className="font-semibold">Role:</span> {isAdmin ? "Admin" : "User"}</span>
                </div>
                <button
                  className={`mt-2 px-3 py-2 rounded-full font-semibold transition-all text-white text-xs ${
                    isAdmin ? "bg-red-500 hover:bg-red-600" : "bg-[#3bb3ce] hover:bg-[#2a9db5]"
                  }`}
                  onClick={() => handleAdminToggle(user.email, user.name, isAdmin)}
                >
                  {isAdmin ? "Remove admin role" : "Add as an admin"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2 sm:border-spacing-y-4 text-xs sm:text-base">
          <thead>
            <tr className="text-[#08228d] font-bold text-base sm:text-lg">
              <th className="text-black py-2 sm:py-3">Employee</th>
              <th className="text-black">Email</th>
              <th className="text-black">Contact Info</th>
              <th className="text-black">Position</th>
              <th className="text-black">Roles</th>
              <th></th> 
            </tr>
          </thead>
          <tbody>
            {uniqueUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-gray-500 italic text-center py-4">No users found.</td>
              </tr>
            )}
            {uniqueUsers.map((user: User) => {
              const isAdmin = adminList.some((a: User) => a.email === user.email && a.isAdmin);
              return (
                <tr key={user.email} className="border-b-2 border-gray-300 last:border-b-0">
                  <td className="py-2 sm:py-3 text-black">{user.name || "[Employee's name]"}</td>
                  <td className="text-black">{user.email || "[email]"}</td>
                  <td className="text-black">{user.contact || "N/A"}</td>
                  <td className="text-black">{user.position || 'Employee'}</td>
                  <td className="text-black">{isAdmin ? "Admin" : "User"}</td>
                  <td>
                    <button
                      className={`px-3 sm:px-5 py-2 rounded-full font-semibold transition-all text-white text-xs sm:text-base ${
                        isAdmin ? "bg-red-500 hover:bg-red-600" : "bg-[#3bb3ce] hover:bg-[#2a9db5]"
                      }`}
                      onClick={() => handleAdminToggle(user.email, user.name, isAdmin)}
                    >
                      {isAdmin ? "Remove admin role" : "Add as an admin"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
