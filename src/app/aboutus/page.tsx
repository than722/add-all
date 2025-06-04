import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Image src="/add-all logo bg.png" alt="Add-All Logo" width={120} height={120} className="mb-4" />
          <h1 className="text-3xl font-bold text-[#002B5C] mb-2">About Add-All</h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl">
            Add-All is a pioneering platform dedicated to providing accessible, high-quality, and affordable short-term courses for all. Our mission is to empower individuals by equipping them with practical skills and knowledge for personal and professional growth.
          </p>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#002B5C] mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To make learning accessible and inclusive for everyone by offering a wide range of short-term courses that are relevant, affordable, and designed to meet the needs of diverse learners.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#002B5C] mb-2">Our Vision</h2>
          <p className="text-gray-700">
            To be the leading provider of innovative and inclusive learning experiences, fostering lifelong learning and skills development for all.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#002B5C] mb-2">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Short-term, skills-based courses in various fields</li>
            <li>Flexible online and blended learning options</li>
            <li>Expert instructors and industry practitioners</li>
            <li>Accessible and affordable education for all backgrounds</li>
            <li>Supportive learning community</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#002B5C] mb-2">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Inclusivity and accessibility</li>
            <li>Quality and relevance</li>
            <li>Empowerment and growth</li>
            <li>Integrity and transparency</li>
            <li>Community and collaboration</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[#002B5C] mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-1">For inquiries, partnerships, or support, please contact us at:</p>
          <p className="text-gray-900 font-semibold">addall.info@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
