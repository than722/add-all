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
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#08228d] mb-6">Manage Administrator Roles</h3>

      {/* Mobile / Stacked List View */}
      <div className="block sm:hidden">
        <ul className="divide-y divide-gray-200">
          {uniqueUsers.length === 0 ? (
            <li className="text-gray-500 italic text-center py-6 text-sm">No users found to manage.</li>
          ) : (
            uniqueUsers.map((user: User) => {
              const isAdmin = adminList.some((a: User) => a.email === user.email && a.isAdmin);
              return (
                <li key={user.email} className="py-4 last:pb-0">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800 text-base">{user.name || "N/A"}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          isAdmin
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {isAdmin ? "Admin" : "User"}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs italic">{user.email || "N/A"}</span>
                    <div className="grid grid-cols-2 gap-y-1 text-gray-700 mt-2">
                      <span><span className="font-medium">Contact:</span> {user.contact || "N/A"}</span>
                      <span><span className="font-medium">Position:</span> {user.position || "Employee"}</span>
                    </div>
                  </div>
                  <button
                    className={`mt-4 w-full py-2 rounded-lg font-bold text-white text-sm transition-all duration-200 ease-in-out
                      ${isAdmin ? "bg-red-500 hover:bg-red-600 active:bg-red-700" : "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"}
                      focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isAdmin ? "focus:ring-red-500" : "focus:ring-emerald-500"
                      }
                    `}
                    onClick={() => handleAdminToggle(user.email, user.name, isAdmin)}
                  >
                    {isAdmin ? "Remove Admin Role" : "Make Admin"}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {uniqueUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 italic">No users found to manage.</td>
              </tr>
            ) : (
              uniqueUsers.map((user: User, index) => {
                const isAdmin = adminList.some((a: User) => a.email === user.email && a.isAdmin);
                return (
                  <tr key={user.email} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.contact || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.position || 'Employee'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isAdmin
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className={`px-4 py-2 rounded-lg font-bold text-white text-sm transition-all duration-200 ease-in-out
                          ${isAdmin ? "bg-red-500 hover:bg-red-600 active:bg-red-700" : "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"}
                          focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isAdmin ? "focus:ring-red-500" : "focus:ring-emerald-500"
                          }
                        `}
                        onClick={() => handleAdminToggle(user.email, user.name, isAdmin)}
                      >
                        {isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}