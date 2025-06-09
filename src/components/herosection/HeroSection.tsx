'use client';

import React, { useState, useCallback } from 'react';
import RegisterModal from '../LoginComponents/registration';

const HeroSection: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const scrollToPrograms = useCallback(() => {
    const element = document.getElementById('programs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center text-white px-3 sm:px-8 md:px-16 py-8 sm:py-12">
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
          className="relative z-20 flex flex-col lg:flex-row justify-between items-start w-full max-w-7xl mx-auto gap-6 sm:gap-10"
          style={{
            filter: isRegisterOpen ? 'blur(4px)' : 'none',
            transition: 'filter 0.3s ease',
          }}
        >
          {/* Left Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-light italic text-gray-200 drop-shadow">
                Upskill.
              </h1>
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent drop-shadow-md"
                style={{ WebkitTextStroke: '1px #ccc' }}
              >
                RESKILL.
              </h1>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-200 drop-shadow">
                CROSSKILL.
              </h1>
            </div>
            <p className="text-xs sm:text-sm md:text-lg text-gray-100 leading-relaxed drop-shadow-sm max-w-xl">
              Lifelong learning institutes empower adults to gain skills for personal growth,
              professional development, active citizenship, and better employability—making them vital,
              ever-expanding educational spaces. Aligned with these principles, the
              <strong className="text-[#FFC72C]"> Ateneo de Davao Academy of Lifelong Learning (ADD-ALL)</strong> offers open courses for
              learners aged 25 and above...
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FFC72C] text-[#08228d] font-bold rounded-full shadow hover:bg-yellow-400 transition duration-300 text-sm sm:text-base"
              >
                Enroll now!
              </button>
              <button
                onClick={scrollToPrograms}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 text-[#08228d] font-semibold rounded-full border border-[#08228d] hover:bg-white transition duration-300 backdrop-blur text-sm sm:text-base"
              >
                Explore Programs
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 grid grid-rows-3 gap-2 sm:gap-4 w-full max-w-md sm:max-w-none mt-6 lg:mt-0">
            <img src="/add-all image 1.jpg" alt="ADD-ALL 1" className="rounded-xl shadow-lg w-full h-32 sm:h-44 md:h-60 object-cover" />
            <img src="/add-all image 2.jpg" alt="ADD-ALL 2" className="rounded-xl shadow-lg w-full h-32 sm:h-44 md:h-60 object-cover" />
            <img src="/add-all image 3.jpg" alt="ADD-ALL 3" className="rounded-xl shadow-lg w-full h-32 sm:h-44 md:h-60 object-cover" />
          </div>
        </div>
      </section>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
};

export default HeroSection;
