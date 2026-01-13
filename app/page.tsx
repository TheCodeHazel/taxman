import TaxManHero from "@/src/components/HeroSection";
import ServicesSection from "@/src/components/OurServices";
import WhyChooseSection from "@/src/components/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (<>
   <TaxManHero/>
   <ServicesSection/>
   <WhyChooseSection/>
   </>
  );
}
