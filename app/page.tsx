import AboutSection from "@/src/components/AboutUs";
import AccounTixHero from "@/src/components/HeroSection";
import HowItWorksSection from "@/src/components/HowWorks";
import ServicesSection from "@/src/components/OurServices";
import TeamSection from "@/src/components/Team";
import TestimentionalSection from "@/src/components/Testimentional";
import WhyChooseSection from "@/src/components/WhyChoose";


export default function Home() {
  return (<>
  <AccounTixHero/>
  <TeamSection/>
   <ServicesSection/>
   <WhyChooseSection/>
   <HowItWorksSection/>
   <AboutSection/>
   <TestimentionalSection/>
   </>
  );
}
