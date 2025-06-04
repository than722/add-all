"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/navbar/Navbar";

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: "pending" | "enrolled";
}

const StudentListPage = () => {
  const searchParams = useSearchParams();
  const programName = searchParams?.get("program");
  const [students, setStudents] = useState<PendingApplication[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && programName) {
      const pending = localStorage.getItem(`pendingApps_${programName}`);
      if (pending) {
        const allApps: PendingApplication[] = JSON.parse(pending);
        setStudents(allApps.filter((app) => app.status === "enrolled"));
      }
    }
  }, [programName]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-8 mt-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-[#002B5C] mb-6 text-center">
          Enrolled Students{programName ? ` for ${programName}` : ""}
        </h2>
        {students.length === 0 ? (
          <div className="text-center text-gray-500 italic">No students enrolled yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.map((student, idx) => (
              <li key={idx} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-semibold text-[#002B5C]">{student.name}</span>
                  <span className="ml-2 text-gray-500 text-sm">{student.email}</span>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Enrolled</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentListPage;
