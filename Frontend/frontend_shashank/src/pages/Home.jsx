import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TrustedBy from "../components/TrustedBy";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;
