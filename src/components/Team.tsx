'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, GraduationCap, Briefcase, Globe, 
  Star, Sparkles, Shield, Building2, CheckCircle,
  LucideIcon
} from 'lucide-react';
type Member = {
  name: string;
  designation: string;
  role: string;
  credentials: string;
  badgeText: string;
  image: string;
  experience: string;
  projects: string;
  specialtyIcon: LucideIcon;
  color: string;
  bgColor: string;
  focus: string;
  sectionTitle: string;
  expertise: string[];
  qualifications: string[];
};

type PartnerSectionProps = {
  member: Member;
  sectionId: string;
  sectionRef: React.RefObject<HTMLElement | null> ;
    isVisible: boolean;  // Pass visibility as prop instead of accessing parent state

};


  const PartnerSection = ({ member, sectionId, sectionRef,isVisible }: PartnerSectionProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // const isVisible = visibleSections.includes(sectionId);
    const SpecialtyIcon = member.specialtyIcon;
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          // When card reaches top 100px, switch to floating mode
          setIsScrolled(rect.top <= 100);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <section 
        ref={sectionRef}
        data-section-id={sectionId}
        className={`relative  z-0  ${member.bgColor} py-12 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
            style={{ background: `${member.color}08` }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-50"
            style={{ background: 'rgba(255,165,0,0.08)' }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                background: member.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.15,
                animation: `float-partner ${5 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* <div className="relative max-w-7xl mx-auto min-h-screen"> */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* LEFT SIDE - STICKY OVERVIEW */}
            <div className="lg:col-span-2">
              <div 
                ref={cardRef}
                className={`sticky top-20 z-10 lg:top-24 transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isScrolled ? 'lg:scale-100' : ''}`}
                style={{ 
                  maxHeight: 'calc(100vh - 6rem)',
                  transform: isScrolled && window.innerWidth < 1024 ? 'scale(0.85)' : ''
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className={`bg-white rounded-3xl shadow-2xl border-2 transition-all duration-500 ${
                  isScrolled && window.innerWidth < 1024 
                    ? 'p-4 border-[#982017] shadow-[0_8px_30px_rgba(152,32,23,0.3)]' 
                    : 'p-6 lg:p-8 border-[#E0E0E0] hover:border-[#982017]'
                }`}>
                  {/* Section badge - hide on mobile when floating */}
                  <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mb-4 lg:mb-6 transition-all duration-300 ${
                    isScrolled && window.innerWidth < 1024 ? 'scale-75 mb-2' : ''
                  }`}>
                    <Sparkles className="w-4 h-4 text-[#982017]" />
                    <span className="text-[#982017] text-xs font-bold uppercase tracking-wider">
                      {member.sectionTitle}
                    </span>
                  </div>

                  {/* Profile Image */}
                  <div className={`flex justify-center transition-all duration-300 ${
                    isScrolled && window.innerWidth < 1024 ? 'mb-2' : 'mb-4 lg:mb-6'
                  }`}>
                    <div className="relative">
                      <div 
                        className={`rounded-full flex items-center justify-center text-white font-bold shadow-2xl transition-all duration-500 ${
                          isHovered ? 'scale-110 rotate-6' : 'scale-100'
                        } ${
                          isScrolled && window.innerWidth < 1024 
                            ? 'w-16 h-16 text-2xl' 
                            : 'w-24 h-24 lg:w-32 lg:h-32 text-3xl lg:text-4xl'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
                        }}
                      >
                        {member.image}
                      </div>

                      {/* Badge - hide on mobile when floating */}
                      {!(isScrolled && window.innerWidth < 1024) && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center space-x-1">
                          <Award className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-bold">{member.badgeText}</span>
                        </div>
                      )}

                      {/* Sparkles */}
                      {isHovered && (
                        <>
                          <Sparkles 
                            className="absolute -top-3 -left-3 w-6 h-6 animate-pulse"
                            style={{ color: member.color }}
                          />
                          <Sparkles 
                            className="absolute -top-3 -right-3 w-5 h-5"
                            style={{ 
                              color: member.color,
                              animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className={`text-center transition-all duration-300 ${
                    isScrolled && window.innerWidth < 1024 ? 'mb-2' : 'mb-4 lg:mb-6'
                  }`}>
                    <h3 className={`font-bold text-gray-900 mb-1 transition-all duration-300 ${
                      isScrolled && window.innerWidth < 1024 ? 'text-base' : 'text-xl lg:text-2xl mb-2'
                    }`}>
                      {member.name}
                    </h3>
                    <p 
                      className={`font-bold transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-xs mb-1' : 'text-base lg:text-lg mb-1'
                      }`}
                      style={{ color: member.color }}
                    >
                      {member.designation}
                    </p>
                    
                    {/* Hide role on mobile when floating */}
                    {!(isScrolled && window.innerWidth < 1024) && (
                      <p className="text-xs lg:text-sm text-gray-600 font-medium">
                        {member.role}
                      </p>
                    )}

                    {/* Credentials - smaller on mobile when floating */}
                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 rounded-full border border-[#982017]/20 transition-all duration-300 ${
                      isScrolled && window.innerWidth < 1024 
                        ? 'px-2 py-1 mt-1' 
                        : 'px-3 lg:px-4 py-1.5 lg:py-2 mt-3'
                    }`}>
                      <GraduationCap className={`text-[#982017] transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'w-3 h-3' : 'w-3 lg:w-4 h-3 lg:h-4'
                      }`} />
                      <span className={`font-semibold text-gray-700 transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-[10px]' : 'text-xs'
                      }`}>
                        {member.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* Stats - compact on mobile when floating */}
                  <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${
                    isScrolled && window.innerWidth < 1024 ? 'mb-2' : 'gap-3 mb-4 lg:mb-6'
                  }`}>
                    <div 
                      className={`rounded-xl text-center transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'p-2' : 'p-3 lg:p-4'
                      }`}
                      style={{ background: `${member.color}08` }}
                    >
                      <Briefcase className={`mx-auto mb-1 transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'w-3 h-3' : 'w-4 lg:w-5 h-4 lg:h-5 mb-2'
                      }`} style={{ color: member.color }} />
                      <div className={`font-bold transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-base' : 'text-xl lg:text-2xl'
                      }`} style={{ color: member.color }}>
                        {member.experience}
                      </div>
                      <div className={`text-gray-600 font-semibold transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-[10px]' : 'text-xs'
                      }`}>Years</div>
                    </div>
                    <div 
                      className={`rounded-xl text-center transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'p-2' : 'p-3 lg:p-4'
                      }`}
                      style={{ background: `${member.color}08` }}
                    >
                      <Star className={`mx-auto mb-1 fill-current transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'w-3 h-3' : 'w-4 lg:w-5 h-4 lg:h-5 mb-2'
                      }`} style={{ color: member.color }} />
                      <div className={`font-bold transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-base' : 'text-xl lg:text-2xl'
                      }`} style={{ color: member.color }}>
                        {member.projects}
                      </div>
                      <div className={`text-gray-600 font-semibold transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-[10px]' : 'text-xs'
                      }`}>Projects</div>
                    </div>
                  </div>

                  {/* Focus Badge - compact on mobile when floating */}
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] rounded-full shadow-lg transition-all duration-300 ${
                      isScrolled && window.innerWidth < 1024 ? 'px-3 py-1.5' : 'px-3 lg:px-4 py-2 lg:py-2.5'
                    }`}>
                      <SpecialtyIcon className={`text-white transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'w-3 h-3' : 'w-4 h-4'
                      }`} />
                      <span className={`text-white font-bold transition-all duration-300 ${
                        isScrolled && window.innerWidth < 1024 ? 'text-[10px]' : 'text-xs'
                      }`}>
                        {isScrolled && window.innerWidth < 1024 ? member.badgeText : member.focus}
                      </span>
                    </div>
                  </div>

                  {/* Decorative bottom accent */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                    style={{
                      background: `linear-gradient(90deg, ${member.color}, #C32B2B)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - SCROLLABLE DETAILS */}
            <div className="lg:col-span-3 space-y-6">
              {/* Expertise Card */}
              <div 
                className={`bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-100 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${member.color}15` }}
                  >
                    <Shield className="w-6 h-6" style={{ color: member.color }} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Areas of Expertise
                  </h4>
                </div>
                <div className="space-y-3">
                  {member.expertise.map((exp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300 group"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: member.color }}
                      />
                      <span className="text-gray-700 leading-relaxed group-hover:text-gray-900">
                        {exp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications Card */}
              <div 
                className={`bg-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-200 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${member.color}15` }}
                  >
                    <Award className="w-6 h-6" style={{ color: member.color }} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Professional Credentials
                  </h4>
                </div>
                <div className="space-y-3">
                  {member.qualifications.map((qual, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">
                        {qual}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div 
                className={`transition-all duration-700 delay-300 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <button
                  className="w-full py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-partner {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
              opacity: 0.15;
            }
            50% {
              transform: translate(15px, -30px) rotate(180deg);
              opacity: 0.25;
            }
          }
        `}</style>
      </section>
    );
  };



const TeamSection = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const section1Ref = useRef<HTMLElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('data-section-id');
//             // setVisibleSections((prev) => [...new Set([...prev, id])]);
//             if (id) {
//   setVisibleSections(prev => Array.from(new Set([...prev, id])));
// }
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (section1Ref.current) observer.observe(section1Ref.current);
//     if (section2Ref.current) observer.observe(section2Ref.current);

//     return () => observer.disconnect();
//   }, []);
useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) {
              setVisibleSections(prev => Array.from(new Set([...prev, id])));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);

    return () => observer.disconnect();
  }, []);


  const member1 = {
    name: "Abid Ali",
    designation: "Partner & Tax Litigation Expert",
    role: "Corporate Tax & SECP Compliance Specialist",
    credentials: "CIPFA – England & Wales",
    badgeText: "CIPFA",
    image: "AA",
    experience: "25+",
    projects: "100+",
    specialtyIcon: Building2,
    color: "#982017",
    bgColor: "bg-white",
    focus: "Pakistan Tax Laws & Corporate Compliance",
    sectionTitle: "Partner Profile",
    expertise: [
      "Corporate Tax Planning & Strategic Advisory",
      "Tax Litigation & Appeals before FBR & Appellate Tribunals",
      "SECP Compliance & NBFC Regulatory Management",
      "Federal & Provincial Tax Laws (Income Tax, Sales Tax)",
      "Internal & External Audit Representation",
      "Business Incorporation, Restructuring & Corporate Conversions",
      "Foreign Branch & Liaison Office Establishment",
      "Tax Assessment, Rectification & Dispute Resolution"
    ],
    qualifications: [
      "Chartered Institute of Public Finance and Accountancy (CIPFA) – England & Wales",
      "Vice Chairman, Tax Resolution Committee – Federation of Chambers of Commerce & Industry Pakistan",
      "Member, Rawalpindi Islamabad Tax Bar Association",
      "Tax Trainer, Ministry of Industries & Production, Pakistan (Pakistan Institute of Management)"
    ]
  };

  const member2 = {
    name: "Muhammad Yaseen",
    designation: "USA Bookkeeper & Tax Filer",
    role: "International Tax & Financial Reporting Specialist",
    credentials: "CPA (USA), MS Finance",
    badgeText: "CPA",
    image: "MY",
    experience: "15+",
    projects: "50+",
    specialtyIcon: Globe,
    color: "#C32B2B",
    bgColor: "bg-[#F8F8F8]",
    focus: "USA Tax & International Financial Services",
    sectionTitle: "Senior Professional",
    expertise: [
      "US Federal & State Tax Compliance (Forms 1040, 1065, 1120-S, 1120, 990)",
      "Full-Charge Bookkeeping & Accounting for US-Based Businesses",
      "Financial Statement Preparation (GAAP & IFRS Standards)",
      "QuickBooks Online, Oracle, SAP & Cloud-Based Accounting Systems",
      "Real Estate & Construction Project Finance Management",
      "Cross-Border Tax Advisory & International Compliance",
      "Financial Data Analytics & Automation (Excel, Power BI, Python)",
      "Multi-Entity Consolidation & Intercompany Reconciliations"
    ],
    qualifications: [
      "Certified Public Accountant (CPA) – United States of America",
      "MS Finance – International Islamic University, Islamabad",
      "QuickBooks ProAdvisor (Level 1 & 2) – Intuit Certified",
      "CFA Level III Candidate – CFA Institute",
      "Google Data Analytics Professional Certificate"
    ]
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative bg-gradient-to-b from-white to-[#F8F8F8] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-[#E0E0E0] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#982017]" />
            <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
              Meet Our Partners
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Specialized Expertise
            <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
              For Every Tax Need
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Combining Pakistani tax mastery with USA accounting expertise to serve clients globally
          </p>
        </div>
      </section>

      {/* Partner 1 - Abid Ali */}
      <PartnerSection 
      key={'sec1'}
        member={member1} 
        sectionId="partner-1"
        sectionRef={section1Ref}
        isVisible={visibleSections.includes("partner-1")}
      />

      {/* Partner 2 - Muhammad Yaseen */}
      <PartnerSection 
       key={'sec2'}
        member={member2} 
        sectionId="partner-2"
        sectionRef={section2Ref}
        isVisible={visibleSections.includes("partner-1")}
      />
    </>
  );
};

export default TeamSection; 