

import HeroSection from '../components/landigPage/HeroSection';
import FeaturesSection from '../components/landigPage/FeaturesSection';
import HowItWorksSection from '../components/landigPage/HowItWorksSection ';
import PricingSection from '../components/landigPage/PricingSection ';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Header /> */}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;

