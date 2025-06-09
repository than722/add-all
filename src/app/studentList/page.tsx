"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/navbar/Navbar";
import { demoStudentListData } from "@/data/data";
import Profile from "@/components/ui/profileview";

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: "pending" | "enrolled";
  contactNo?: string;
}

const StudentListPage = () => {
  const searchParams = useSearchParams();
  const programName = searchParams?.get("program");
  const [students, setStudents] = useState<PendingApplication[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<PendingApplication | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (programName && demoStudentListData[programName]) {
        // Always seed localStorage with demo data for development/testing
        localStorage.setItem(
          `pendingApps_${programName}`,
          JSON.stringify(demoStudentListData[programName])
        );
        setStudents(demoStudentListData[programName].filter((app) => app.status === "enrolled"));
      } else if (!programName) {
        // No program specified: show all enrolled students from all demo data
        const allEnrolled: PendingApplication[] = Object.values(demoStudentListData)
          .flat()
          .filter((app) => app.status === "enrolled");
        setStudents(allEnrolled);
      } else {
        setStudents([]);
      }
    }
  }, [programName]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-8 mt-4 sm:mt-8 rounded-xl shadow">
        <h2 className="text-xl sm:text-2xl font-bold text-[#08228d] mb-4 sm:mb-6 text-center">
          Enrolled Students{programName ? ` for ${programName}` : ""}
        </h2>
        {students.length === 0 ? (
          <div className="text-center text-gray-500 italic text-sm sm:text-base">No students enrolled yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.map((student, idx) => (
              <li
                key={idx}
                className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="font-semibold text-[#08228d] text-sm sm:text-base">{student.name}</span>
                  <span className="block sm:inline ml-0 sm:ml-2 text-gray-500 text-xs sm:text-sm">{student.email}</span>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2 items-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Enrolled</span>
                  <button
                    className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-200 transition"
                    onClick={() => setSelectedStudent(student)}
                    aria-label={`View profile of ${student.name}`}
                  >
                    <img src="/profileicon.png" alt="View Profile" className="w-8 h-8" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Simple Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-lg flex flex-col items-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              onClick={() => setSelectedStudent(null)}
              aria-label="Close profile modal"
            >
              ✕
            </button>
            <img
              src={"/profileicon.png"}
              alt={selectedStudent.name}
              width={120}
              height={120}
              className="mx-auto rounded-full mb-2 w-28 h-28 object-cover"
            />
            <p className="font-semibold text-[#08228d] text-lg sm:text-xl mb-1">{selectedStudent.name}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">{selectedStudent.email}</p>
            {selectedStudent.contactNo && (
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{selectedStudent.contactNo}</p>
            )}
            {/* Add more fields if available, e.g. bio */}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;
