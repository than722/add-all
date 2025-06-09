import Navbar from '../components/ui/navbar/Navbar';
import HeroSection from '../components/herosection/HeroSection';
import ProgramsPage from '../components/ui/programs/programs';
import Vision from '../components/herosection/vision';
import AboutUs from '../components/herosection/aboutUs';

export default function Page() {

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <HeroSection />
      <div className="px-2 sm:px-0">
        <ProgramsPage />
      </div>
      <div className="px-2 sm:px-0" id="vision-section">
        <Vision />
      </div>
      <div className="px-2 sm:px-0" id="aboutus-section">
        <AboutUs />
      </div>
    </main>
  );
}
