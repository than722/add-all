import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Hero Section */}
        <div className="relative bg-[#08228d] text-white py-12 sm:py-16 px-6 sm:px-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
            <Image src="/add-all logo bg.png" alt="Add-All Logo" width={128} height={128} className="object-cover" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
            About <span className="text-[#FFC72C]">ADD-ALL</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-light max-w-3xl leading-relaxed opacity-90">
            Add-ALL is a pioneering platform dedicated to providing accessible, high-quality, and affordable short-term courses for all. Our mission is to empower individuals by equipping them with practical skills and knowledge for personal and professional growth.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 lg:p-12 space-y-10">
          {/* Mission */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-inner border-l-4 border-[#08228d]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08228d] mb-3 flex items-center">
              <svg className="w-8 h-8 mr-3 text-[#FFC72C]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Our Mission
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              To make learning **accessible** and **inclusive** for everyone by offering a wide range of short-term courses that are relevant, affordable, and designed to meet the needs of diverse learners. We believe in breaking down barriers to education, enabling individuals to unlock their full potential and thrive in an ever-evolving world.
            </p>
          </section>

          {/* Vision */}
          <section className="bg-purple-50 p-6 rounded-xl shadow-inner border-l-4 border-[#FFC72C]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08228d] mb-3 flex items-center">
              <svg className="w-8 h-8 mr-3 text-[#08228d]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Our Vision
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              To be the leading provider of innovative and inclusive learning experiences in Davao, fostering **lifelong learning** and **skills development** for all. We envision a community where continuous growth is not just a goal but a lived reality for every individual.
            </p>
          </section>

          {/* What We Offer */}
          <section className="bg-green-50 p-6 rounded-xl shadow-inner border-l-4 border-blue-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08228d] mb-3 flex items-center">
              <svg className="w-8 h-8 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.147-1.146A2 2 0 009.172 3H7.828a2 2 0 00-1.414.586L5.293 4.707A1 1 0 014.586 5H4zm3 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
              </svg>
              What We Offer
            </h2>
            <ul className="list-none space-y-3 text-gray-700 text-base sm:text-lg pl-0">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>**Short-term, skills-based courses** in various fields, designed to be impactful and immediately applicable.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>**Flexible online and blended learning options** to fit your schedule and learning preferences.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Access to **expert instructors** and industry practitioners who bring real-world experience to the classroom.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>**Accessible and affordable education** for all backgrounds, removing financial and logistical barriers.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>A **supportive and vibrant learning community** where you can connect, collaborate, and grow.</span>
              </li>
            </ul>
          </section>

          {/* Our Values */}
          <section className="bg-yellow-50 p-6 rounded-xl shadow-inner border-l-4 border-teal-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08228d] mb-3 flex items-center">
              <svg className="w-8 h-8 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base sm:text-lg">
              <div className="flex items-center">
                <span className="text-[#FFC72C] text-2xl mr-2 font-bold">•</span> Inclusivity & Accessibility
              </div>
              <div className="flex items-center">
                <span className="text-[#FFC72C] text-2xl mr-2 font-bold">•</span> Quality & Relevance
              </div>
              <div className="flex items-center">
                <span className="text-[#FFC72C] text-2xl mr-2 font-bold">•</span> Empowerment & Growth
              </div>
              <div className="flex items-center">
                <span className="text-[#FFC72C] text-2xl mr-2 font-bold">•</span> Integrity & Transparency
              </div>
              <div className="flex items-center">
                <span className="text-[#FFC72C] text-2xl mr-2 font-bold">•</span> Community & Collaboration
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className="bg-gray-100 p-6 rounded-xl shadow-inner border-l-4 border-gray-400">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#08228d] mb-3 flex items-center">
              <svg className="w-8 h-8 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.233-1.141l-4.04 1.135a1 1 0 01-1.282-1.282l1.135-4.04A8.841 8.841 0 013 10c0-4.418 3.582-8 8-8s8 3.582 8 8zM10 11a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
              </svg>
              Contact Us
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-2">
              For inquiries, partnerships, or support, feel free to reach out to our dedicated team:
            </p>
            <a href="mailto:addall.info@gmail.com" className="text-[#08228d] hover:text-[#FFC72C] font-semibold text-lg sm:text-xl flex items-center transition-colors duration-200">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              addall.info@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}