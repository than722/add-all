'use client';

import { useSearchParams } from 'next/navigation';
import { programsList } from '@/data/programsData';
import Navbar from '@/components/ui/Navbar';
import React, { useState, useEffect } from 'react';
import EnrollModal from '@/components/LoginComponents/enrollmentModal';
import { getRole, UserRole } from '@/components/roles/role';
import { dummyStudents, programPrices } from '@/data/data';
import Link from 'next/link';

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
}

const ProgramView = () => {
  const searchParams = useSearchParams();
  const programName = searchParams?.get('program');
  const programData = programsList.find((p) => p.program === programName);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollmentPending, setEnrollmentPending] = useState(false);
  const [role, setRole] = useState<UserRole | undefined>(undefined);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>([]);
  const price = programData ? programPrices[programData.program] || 0 : 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('role');
      if (storedRole) setRole(storedRole as UserRole);
      // Load pending applications from localStorage for demo
      const pending = localStorage.getItem(`pendingApps_${programName}`);
      if (pending) setPendingApps(JSON.parse(pending));
    }
  }, [programName]);

  // Save pending applications to localStorage for demo persistence
  useEffect(() => {
    if (typeof window !== 'undefined' && programName) {
      localStorage.setItem(`pendingApps_${programName}`, JSON.stringify(pendingApps));
    }
  }, [pendingApps, programName]);

  // Simulate current student info
  const currentStudent = { name: 'Juan Dela Cruz', email: 'student@example.com' };

  // Handle enrollment submission from modal
  const handleEnrollmentSubmitted = (receiptFile: File, paymentType: string) => {
    // For demo, create a URL for the uploaded file
    const receiptUrl = URL.createObjectURL(receiptFile);
    setPendingApps((prev) => [
      ...prev,
      {
        name: currentStudent.name,
        email: currentStudent.email,
        receiptUrl,
        paymentType,
        status: 'pending',
      },
    ]);
    setEnrollmentPending(true);
    setIsEnrollOpen(false);
  };

  if (!programData) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Program not found.
      </div>
    );
  }

  // For student: check if they have a pending application
  const studentPendingApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'pending'
  );
  const studentEnrolledApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'enrolled'
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Program Card */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#002B5C]">{programData.program}</h1>
            <p className="text-gray-600 mt-2 mb-4 italic">{programData.category}</p>

            <p className="mb-4">
              <span className="font-semibold">Description:</span>{' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p className="mb-2">
              <span className="font-semibold">Time:</span> 9:00 AM – 12:00 PM
            </p>
            <p className="mb-2">
              <span className="font-semibold">No. of Sessions:</span> 6
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span> June 15, 2025
            </p>
            <p className="mb-2">
              <span className="font-semibold">Instructor:</span> John Doe
            </p>
          </div>

          {/* Right Thumbnail */}
          <div className="w-full md:w-48 h-48 bg-gray-300 rounded-md flex items-center justify-center text-gray-500">
            Thumbnail
          </div>
        </div>
      </div>

      {/* About This Program Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 mt-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-[#002B5C] mb-4">About This Program</h2>
        <p className="text-gray-700">
          This program is designed to provide learners with essential skills and knowledge in
          their chosen area. You’ll engage in hands-on sessions, lectures, and group activities to
          maximize learning outcomes.
        </p>
      </div>

      {/* Program Curriculum Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 mt-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-[#002B5C] mb-4">Program Curriculum</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Session 1: Introduction to the Program</li>
          <li>Session 2: Core Concepts and Tools</li>
          <li>Session 3: Hands-on Application</li>
          <li>Session 4: Advanced Techniques</li>
          <li>Session 5: Group Work and Projects</li>
          <li>Session 6: Final Presentation and Feedback</li>
        </ul>
      </div>

      {/* Action Button */}
      <div className="max-w-4xl mx-auto p-8 mt-6 mb-12 text-center">
        {role === 'teacher' ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/studentList?program=${encodeURIComponent(programData.program)}`}
              className="inline-block bg-[#92D0D3] text-white font-bold py-3 px-6 rounded-full hover:bg-[#6bb7b9] transition"
            >
              List of Students
            </Link>
            <Link
              href="/editcourseoutline"
              className="inline-block bg-[#002B5C] text-white font-bold py-3 px-6 rounded-full hover:bg-[#001f40] transition"
            >
              Edit Course Outline
            </Link>
          </div>
        ) : role === 'student' ? (
          studentPendingApp ? (
            <span className="inline-block bg-yellow-400 text-white font-bold py-3 px-6 rounded-full cursor-not-allowed">
              Pending Application
            </span>
          ) : studentEnrolledApp ? (
            <span className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-full">
              Enrolled
            </span>
          ) : (
            <button
              className="bg-[#002B5C] text-white font-bold py-3 px-6 rounded-full hover:bg-[#001f40] transition duration-300"
              onClick={() => setIsEnrollOpen(true)}
            >
              Enroll Now
            </button>
          )
        ) : null}
      </div>
      {/* Enroll Modal for students */}
      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        program={programData.program}
        price={price}
        onEnrollmentSubmitted={(receiptFile: File, paymentType: string) =>
          handleEnrollmentSubmitted(receiptFile, paymentType)
        }
      />
      {/* No student list modal for teachers */}
    </div>
  );
};

export default ProgramView;
