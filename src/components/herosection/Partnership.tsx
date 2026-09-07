import Image from 'next/image';
import { partnershipData } from '@/data/PartnershipData';

export default function Partnership() {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-[#08228d] mb-8">Our Partners in Learning</h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {partnershipData.map((partner, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative w-full h-48 bg-white flex items-center justify-center">
              <Image
                src={partner.image}
                alt={partner.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-[#08228d] mb-2">{partner.title}</h3>
              <p className="text-gray-700 text-sm flex-1">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
