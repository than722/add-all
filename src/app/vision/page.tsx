import NavbarDefault from '@/components/ui/navbar/NavbarDefault';
import Image from 'next/image';

export default function VisionPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background image and overlay, matching HeroSection */}
      <div className="absolute inset-0 bg-[url('/landingpagebg.png')] bg-cover bg-center z-0" />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 min-h-screen">
        <NavbarDefault />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 pt-16 pb-8">
          {/* Increased overall max-width and adjusted gap */}
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16">
            {/* Vision text on the left - adjusted flex grow */}
            <div className="flex-1 md:grow-[3] flex flex-col justify-center md:items-start items-center text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8 flex items-center md:justify-start justify-center w-full [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">
                <span className="border-b-[5px] border-yellow-400 pb-2">VISION</span>
              </h1>
              {/* Widened the yellow text box's max-width */}
              <div className="relative bg-yellow-50 border border-yellow-300 rounded-lg shadow-xl p-10 sm:p-12 mb-8 w-full max-w-xl md:ml-0 ml-auto mr-auto">
                <p className="text-slate-800 text-xl sm:text-2xl leading-relaxed font-medium">
                  ADD-ALL envisions itself to be the premier academy of adult learning in Mindanao, expanding adult learners’ knowledge, skills, and attitudes and developing their professional competence required in different fields of work.
                </p>
              </div>
            </div>
            {/* Image on the right - adjusted flex grow */}
            <div className="flex-1 md:grow-[2] flex items-center justify-center">
              <Image
                src="/add-all vision image.jpg" // Ensure this path is correct
                alt="ADD-ALL Vision"
                width={850}
                height={550}
                className="rounded-xl shadow-2xl object-cover w-full max-w-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}