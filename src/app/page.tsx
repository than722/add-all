'use client';

import React, { useState } from 'react';
import Navbar from '../components/ui/navbar/Navbar';
import HeroSection from '../components/ui/HeroSection';
import RegisterModal from '../components/LoginComponents/registration';
import ProgramsPage from '../components/ui/programs/programs';
export default function Page() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <HeroSection
        isRegisterOpen={isRegisterOpen}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      <div className="px-2 sm:px-0">
        <ProgramsPage />
      </div>
    </main>
  );
}
