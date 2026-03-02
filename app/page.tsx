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
  title: '365AccounTix - 拉瓦尔品第与伊斯兰堡会计、税务与企业注册服务',
  description: '365AccounTix 在拉瓦尔品第和伊斯兰堡提供专业会计服务、税务咨询、SECP 公司注册、NTN 与 STR 注册、簿记服务及薪资管理。立即获取专业商业解决方案！',
  keywords: [
    "拉瓦尔品第会计服务",
    "伊斯兰堡税务顾问",
    "拉瓦尔品第企业注册",
    "巴基斯坦 NTN 注册",
    "伊斯兰堡 STR 注册",
    "巴基斯坦簿记服务",
    "拉瓦尔品第薪资管理",
    "伊斯兰堡财务咨询",
    "巴基斯坦企业税务服务",
    "伊斯兰堡初创公司注册"
  ],
  authors: [{ name: "365AccounTix" }],
  applicationName: '365AccounTix',
  alternates: {
    canonical: 'https://365accountix.com'
  },
  openGraph: {
    title: '365AccounTix - 会计、税务与企业注册专家',
    description: '在拉瓦尔品第与伊斯兰堡提供专业会计、税务咨询、SECP 公司注册、NTN 与 STR 注册、簿记及薪资管理服务。',
    type: 'website',
    siteName: "365AccounTix",
    locale: "zh_CN",
    url: "https://365accountix.com",
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: '365AccounTix 会计与税务服务',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '365AccounTix - 会计、税务与企业注册服务',
    description: '在拉瓦尔品第与伊斯兰堡提供专业会计、报税、SECP 注册、NTN 与 STR 服务、簿记及薪资管理。',
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
  themeColor: '#982017', // 品牌主色
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
