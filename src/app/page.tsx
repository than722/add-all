import HeroSection from '../components/herosection/HeroSection';
import Featured from '../components/herosection/Featured';
import Partnership from '../components/herosection/Partnership';

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <HeroSection />
      <div className="px-2 sm:px-0" id="featured">
        <Featured />
      </div>
      <div className="px-2 sm:px-0" id="partnership">
        <Partnership />
      </div>
    </main>
  );
}
