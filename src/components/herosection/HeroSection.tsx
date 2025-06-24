// HeroSection.tsx
'use client';

import React, { useState, useCallback } from 'react';
import RegisterModal from '../ui/Modals/HeroSectionModals/registration';
import InquireModal from '../ui/Modals/HeroSectionModals/InquireModal';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // New state for the Inquire Modal
  const [isInquireOpen, setIsInquireOpen] = useState(false);

  // Determine if any modal is open to apply blur effects
  const isAnyModalOpen = isRegisterOpen || isInquireOpen;

  const scrollToPrograms = useCallback(() => {
    const element = document.getElementById('programs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center text-white px-3 sm:px-8 md:px-16 py-8 sm:py-12">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 bg-[url('/landingpagebg.png')] bg-cover bg-center z-0"
          style={{
            filter: isAnyModalOpen ? 'blur(4px)' : 'none', // Apply blur if any modal is open
            transition: 'filter 0.3s ease',
          }}
        />
        {/* Dark overlay, hidden when a modal is open to allow modal overlay to show */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          style={{ display: isAnyModalOpen ? 'none' : 'block' }}
        />

        {/* Content Section */}
        <div
          className="relative z-20 flex flex-col lg:flex-row justify-between items-start w-full max-w-7xl mx-auto gap-6 sm:gap-10"
          style={{
            filter: isAnyModalOpen ? 'blur(4px)' : 'none', // Apply blur if any modal is open
            transition: 'filter 0.3s ease',
          }}
        >
          {/* Left Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-light italic text-gray-200 drop-shadow font-inter">
                Upskill.
              </h1>
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent drop-shadow-md font-inter"
                style={{ WebkitTextStroke: '1px #ccc' }}
              >
                RESKILL.
              </h1>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-200 drop-shadow font-inter">
                CROSSKILL.
              </h1>
            </div>
            <p className="text-xs sm:text-sm md:text-lg text-gray-100 leading-relaxed drop-shadow-sm max-w-xl font-inter">
              Lifelong learning institutes empower adults to gain skills for personal growth,
              professional development, active citizenship, and better employability—making them vital,
              ever-expanding educational spaces. Aligned with these principles, the
              <strong className="text-[#FFC72C]"> Ateneo de Davao Academy of Lifelong Learning (ADD-ALL)</strong> offers open courses for
              learners aged 25 and above...
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {/* Inquire now! button - now opens the Inquire Modal */}
              <button
                onClick={() => setIsInquireOpen(true)} // Set isInquireOpen to true
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FFC72C] text-[#08228d] font-bold rounded-full shadow hover:bg-yellow-400 transition duration-300 text-sm sm:text-base cursor-pointer font-inter"
              >
                Inquire now!
              </button>
              <button
                onClick={scrollToPrograms}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 text-[#08228d] font-semibold rounded-full border border-[#08228d] hover:bg-white transition duration-300 backdrop-blur text-sm sm:text-base cursor-pointer font-inter"
              >
                Explore Programs
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 grid grid-rows-3 gap-2 sm:gap-4 w-full max-w-md sm:max-w-none mt-6 lg:mt-0">
            <Image src="/add-all image 1.jpg" alt="ADD-ALL 1" width={600} height={240} className="rounded-xl shadow-lg w-full h-32 sm:h-44 md:h-60 object-cover" />
            <Image src="/add-all image 2.jpg" alt="ADD-ALL 2" width={600} height={240} className="rounded-xl shadow-lg w-full h-32 sm:h-44 md:h-60 object-cover" />
            <Image src="/add-all image 3.jpg" alt="ADD-ALL 3" width={600} height={240} className="rounded-xl shadow-lg w-full h-32 sm:h-44 md:h-60 object-cover" />
          </div>
        </div>
      </section>

      {/* Existing Register Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* New Inquire Modal */}
      <InquireModal
        isOpen={isInquireOpen} // Pass the state to the InquireModal
        onClose={() => setIsInquireOpen(false)} // Pass the setter to close the modal
      />
    </>
  );
};

export default HeroSection;
