import AboutSection from "@/src/components/AboutUs";
import TaxManHero from "@/src/components/HeroSection";
import HowItWorksSection from "@/src/components/HowWorks";
import ServicesSection from "@/src/components/OurServices";
import TestimentionalSection from "@/src/components/Testimentional";
import WhyChooseSection from "@/src/components/WhyChoose";


export default function Home() {
  return (<>
  <TaxManHero/>
   <ServicesSection/>
   <WhyChooseSection/>
   <HowItWorksSection/>
   <AboutSection/>
   <TestimentionalSection/>
   </>
  );
}
