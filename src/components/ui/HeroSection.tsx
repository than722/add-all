'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  isRegisterOpen: boolean;
  setIsRegisterOpen: (open: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isRegisterOpen, setIsRegisterOpen }) => {
  const scrollToPrograms = useCallback(() => {
    const element = document.getElementById('programs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return (
    <section className="relative min-h-screen flex items-center text-white px-8 sm:px-16 py-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('/landingpagebg.png')] bg-cover bg-center z-0"
        style={{
          filter: isRegisterOpen ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      />
      <div
        className="absolute inset-0 bg-black/50 z-10"
        style={{ display: isRegisterOpen ? 'none' : 'block' }}
      />

      {/* Content */}
      <div
        className="relative z-20 flex flex-col lg:flex-row justify-between items-start w-full max-w-7xl mx-auto gap-10"
        style={{
          filter: isRegisterOpen ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      >
        {/* Left Text Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light italic text-gray-200 drop-shadow">
              Upskill.
            </h1>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent drop-shadow-md"
              style={{ WebkitTextStroke: '1px #ccc' }}
            >
              RESKILL.
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-200 drop-shadow">
              CROSSKILL.
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed drop-shadow-sm max-w-xl">
            Lifelong learning institutes empower adults to gain skills for personal growth,
            professional development, active citizenship, and better employability—making them vital,
            ever-expanding educational spaces. Aligned with these principles, the
            <strong className="text-[#FFC72C]"> Ateneo de Davao Academy of Lifelong Learning (ADD-ALL)</strong> offers open courses for
            learners aged 25 and above. These programs provide opportunities to explore new skills,
            interests, and experiences beyond traditional higher education or full-time work.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-6 py-3 bg-[#FFC72C] text-[#002B5C] font-bold rounded-full shadow hover:bg-yellow-400 transition duration-300"
            >
              Enroll now!
            </button>
            <button
              onClick={scrollToPrograms}
              className="px-6 py-3 bg-white/80 text-[#002B5C] font-semibold rounded-full border border-[#002B5C] hover:bg-white transition duration-300 backdrop-blur"
            >
              Explore Programs
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 grid grid-rows-3 gap-4">
          <img
            src="/add-all image 1.jpg"
            alt="ADD-ALL 1"
            className="rounded-xl shadow-lg w-full h-60 object-cover"
          />
          <img
            src="/add-all image 2.jpg"
            alt="ADD-ALL 2"
            className="rounded-xl shadow-lg w-full h-60 object-cover"
          />
          <img
            src="/add-all image 3.jpg"
            alt="ADD-ALL 3"
            className="rounded-xl shadow-lg w-full h-60 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
