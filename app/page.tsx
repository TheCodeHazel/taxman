import AboutSection from "@/src/components/AboutUs";
import AccounTixHero from "@/src/components/HeroSection";
import HowItWorksSection from "@/src/components/HowWorks";
import ServicesSection from "@/src/components/OurServices";
import TeamSection from "@/src/components/Team";
import TestimentionalSection from "@/src/components/Testimentional";
import WhyChooseSection from "@/src/components/WhyChoose";
import hero_zh from '@/locales/zh/hero.json'
import team_zh from '@/locales/zh/team.json'
import service_zh from '@/locales/zh/services.json'
import whycho0se_zh from '@/locales/zh/why-choose.json'
import howwork_zh from '@/locales/zh/how-it-works.json'
import about_zh from '@/locales/zh/about.json'
import testi_zh from '@/locales/zh/testimonials-faq-footer.json'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: '365AccounTix - Accounting, Tax & Business Registration Services in Rawalpindi & Islamabad',
  description: '365AccounTix provides expert accounting services, tax consultancy, SECP company registration, NTN & STR registration, bookkeeping, and payroll management in Rawalpindi and Islamabad. Get professional business solutions today!',
  keywords: [
    "Accounting Services Rawalpindi",
    "Tax Consultant Islamabad",
    "Business Registration Rawalpindi",
    "NTN Registration Pakistan",
    "STR Registration Islamabad",
    "Bookkeeping Services Pakistan",
    "Payroll Management Rawalpindi",
    "Financial Consultancy Islamabad",
    "Corporate Tax Services Pakistan",
    "Startup Company Registration Islamabad"
  ],
  authors: [{ name: "365AccounTix" }],
  applicationName: '365AccounTix',
  alternates: {
    canonical: 'https://365accountix.com'
  },
  openGraph: {
    title: '365AccounTix - Accounting, Tax & Business Registration Experts',
    description: 'Professional accounting, tax consultancy, SECP company registration, NTN & STR registration, bookkeeping, and payroll management services in Rawalpindi & Islamabad.',
    type: 'website',
    siteName: "365AccounTix",
    locale: "en_PK",
    url: "https://365accountix.com",
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: '365AccounTix Accounting and Tax Services',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '365AccounTix - Accounting, Tax & Business Registration Services',
    description: 'Expert accounting, tax filing, SECP registration, NTN & STR services, bookkeeping, and payroll management in Rawalpindi & Islamabad.',
    creator: '@365accountix',
    images: ['/images/logo.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png', 
    shortcut: '/logo.png', 
  },
  robots: 'index, follow',
  themeColor: '#982017', // matches brand color
};

export default function Home() {
  return (<>


 <AccounTixHero msg={hero_zh}/>
  <TeamSection tr={team_zh}/>
   <ServicesSection tr={service_zh}/>
   <WhyChooseSection tr={whycho0se_zh}/>
   <HowItWorksSection tr={howwork_zh}/>
   <AboutSection tr={about_zh}/>
   <TestimentionalSection tr={testi_zh}/>  
   </>
  );
}
