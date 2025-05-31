'use client';

import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/ui/HeroSection';
import RegisterModal from '../components/LoginComponents/registration';
import ProgramsPage from '../components/ui/programs/programs';
export default function Page() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <main>
      <Navbar />
      <HeroSection
        isRegisterOpen={isRegisterOpen}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      <ProgramsPage />
    </main>
  );
}
