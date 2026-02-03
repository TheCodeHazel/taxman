'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, GraduationCap, Briefcase, Globe, 
  Star, Sparkles, Shield, Building2, CheckCircle
} from 'lucide-react';

const TeamSection = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            setVisibleSections((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);

    return () => observer.disconnect();
  }, []);

  const PartnerSection = ({ member, sectionId, sectionRef }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isVisible = visibleSections.includes(sectionId);
    const SpecialtyIcon = member.specialtyIcon;
    const cardRef = useRef(null);

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
        className={`relative ${member.bgColor} py-12 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible`}
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
                className={`sticky top-20 lg:top-24 transition-all duration-500 transform ${
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
      />

      {/* Partner 2 - Muhammad Yaseen */}
      <PartnerSection 
       key={'sec2'}
        member={member2} 
        sectionId="partner-2"
        sectionRef={section2Ref}
      />
    </>
  );
};

export default TeamSection;
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Award, GraduationCap, Briefcase, Globe, 
//   Star, Sparkles, Shield, Building2, CheckCircle
// } from 'lucide-react';

// const TeamSection = () => {
//   const [visibleSections, setVisibleSections] = useState([]);
//   const section1Ref = useRef(null);
//   const section2Ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('data-section-id');
//             setVisibleSections((prev) => [...new Set([...prev, id])]);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (section1Ref.current) observer.observe(section1Ref.current);
//     if (section2Ref.current) observer.observe(section2Ref.current);

//     return () => observer.disconnect();
//   }, []);

//   const PartnerSection = ({ member, sectionId, sectionRef }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const isVisible = visibleSections.includes(sectionId);
//     const SpecialtyIcon = member.specialtyIcon;

//     return (
//       <section 
//         ref={sectionRef}
//         data-section-id={sectionId}
//         className={`relative ${member.bgColor} py-12 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible`}
//       >
//         {/* Background decorations */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div 
//             className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
//             style={{ background: `${member.color}08` }}
//           />
//           <div 
//             className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-50"
//             style={{ background: 'rgba(255,165,0,0.08)' }}
//           />
//         </div>

//         {/* Floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: `${Math.random() * 3 + 2}px`,
//                 height: `${Math.random() * 3 + 2}px`,
//                 background: member.color,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 opacity: 0.15,
//                 animation: `float-partner ${5 + Math.random() * 3}s ease-in-out infinite`,
//                 animationDelay: `${Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative max-w-7xl mx-auto min-h-screen">
//           <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
//             {/* LEFT SIDE - STICKY OVERVIEW */}
//             <div className="lg:col-span-2">
//               <div 
//                 className={`sticky top-20 lg:top-24 transition-all duration-700 transform ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 style={{ maxHeight: 'calc(100vh - 6rem)' }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-2xl border-2 border-[#E0E0E0] hover:border-[#982017] transition-all duration-500">
//                   {/* Section badge */}
//                   <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mb-4 lg:mb-6">
//                     <Sparkles className="w-4 h-4 text-[#982017]" />
//                     <span className="text-[#982017] text-xs font-bold uppercase tracking-wider">
//                       {member.sectionTitle}
//                     </span>
//                   </div>

//                   {/* Profile Image */}
//                   <div className="flex justify-center mb-4 lg:mb-6">
//                     <div className="relative">
//                       <div 
//                         className={`w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-white text-3xl lg:text-4xl font-bold shadow-2xl transition-all duration-500 ${
//                           isHovered ? 'scale-110 rotate-6' : 'scale-100'
//                         }`}
//                         style={{
//                           background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
//                         }}
//                       >
//                         {member.image}
//                       </div>

//                       {/* Badge */}
//                       <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center space-x-1">
//                         <Award className="w-3 h-3 text-white" />
//                         <span className="text-white text-xs font-bold">{member.badgeText}</span>
//                       </div>

//                       {/* Sparkles */}
//                       {isHovered && (
//                         <>
//                           <Sparkles 
//                             className="absolute -top-3 -left-3 w-6 h-6 animate-pulse"
//                             style={{ color: member.color }}
//                           />
//                           <Sparkles 
//                             className="absolute -top-3 -right-3 w-5 h-5"
//                             style={{ 
//                               color: member.color,
//                               animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
//                             }}
//                           />
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* Name & Title */}
//                   <div className="text-center mb-4 lg:mb-6">
//                     <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
//                       {member.name}
//                     </h3>
//                     <p 
//                       className="text-base lg:text-lg font-bold mb-1"
//                       style={{ color: member.color }}
//                     >
//                       {member.designation}
//                     </p>
//                     <p className="text-xs lg:text-sm text-gray-600 font-medium">
//                       {member.role}
//                     </p>

//                     {/* Credentials */}
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full border border-[#982017]/20 mt-3">
//                       <GraduationCap className="w-3 lg:w-4 h-3 lg:h-4 text-[#982017]" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         {member.credentials}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 gap-3 mb-4 lg:mb-6">
//                     <div 
//                       className="rounded-xl p-3 lg:p-4 text-center"
//                       style={{ background: `${member.color}08` }}
//                     >
//                       <Briefcase className="w-4 lg:w-5 h-4 lg:h-5 mx-auto mb-2" style={{ color: member.color }} />
//                       <div className="text-xl lg:text-2xl font-bold" style={{ color: member.color }}>
//                         {member.experience}
//                       </div>
//                       <div className="text-xs text-gray-600 font-semibold">Years</div>
//                     </div>
//                     <div 
//                       className="rounded-xl p-3 lg:p-4 text-center"
//                       style={{ background: `${member.color}08` }}
//                     >
//                       <Star className="w-4 lg:w-5 h-4 lg:h-5 mx-auto mb-2 fill-current" style={{ color: member.color }} />
//                       <div className="text-xl lg:text-2xl font-bold" style={{ color: member.color }}>
//                         {member.projects}
//                       </div>
//                       <div className="text-xs text-gray-600 font-semibold">Projects</div>
//                     </div>
//                   </div>

//                   {/* Focus Badge */}
//                   <div className="flex justify-center">
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] px-3 lg:px-4 py-2 lg:py-2.5 rounded-full shadow-lg">
//                       <SpecialtyIcon className="w-4 h-4 text-white" />
//                       <span className="text-white text-xs font-bold">
//                         {member.focus}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Decorative bottom accent */}
//                   <div 
//                     className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
//                     style={{
//                       background: `linear-gradient(90deg, ${member.color}, #C32B2B)`
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE - SCROLLABLE DETAILS */}
//             <div className="lg:col-span-3 space-y-6">
//               {/* Expertise Card */}
//               <div 
//                 className={`bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-100 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center"
//                     style={{ background: `${member.color}15` }}
//                   >
//                     <Shield className="w-6 h-6" style={{ color: member.color }} />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900">
//                     Areas of Expertise
//                   </h4>
//                 </div>
//                 <div className="space-y-3">
//                   {member.expertise.map((exp, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300 group"
//                     >
//                       <div 
//                         className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
//                         style={{ background: member.color }}
//                       />
//                       <span className="text-gray-700 leading-relaxed group-hover:text-gray-900">
//                         {exp}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Qualifications Card */}
//               <div 
//                 className={`bg-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-200 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center"
//                     style={{ background: `${member.color}15` }}
//                   >
//                     <Award className="w-6 h-6" style={{ color: member.color }} />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900">
//                     Professional Credentials
//                   </h4>
//                 </div>
//                 <div className="space-y-3">
//                   {member.qualifications.map((qual, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300"
//                     >
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-gray-700 leading-relaxed">
//                         {qual}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <div 
//                 className={`transition-all duration-700 delay-300 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <button
//                   className="w-full py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
//                   style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
//                 >
//                   <Briefcase className="w-5 h-5" />
//                   <span>Schedule Consultation</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <style jsx>{`
//           @keyframes float-partner {
//             0%, 100% {
//               transform: translate(0, 0) rotate(0deg);
//               opacity: 0.15;
//             }
//             50% {
//               transform: translate(15px, -30px) rotate(180deg);
//               opacity: 0.25;
//             }
//           }
//         `}</style>
//       </section>
//     );
//   };

//   const member1 = {
//     name: "Abid Ali",
//     designation: "Partner & Tax Litigation Expert",
//     role: "Corporate Tax & SECP Compliance Specialist",
//     credentials: "CIPFA – England & Wales",
//     badgeText: "CIPFA",
//     image: "AA",
//     experience: "25+",
//     projects: "100+",
//     specialtyIcon: Building2,
//     color: "#982017",
//     bgColor: "bg-white",
//     focus: "Pakistan Tax Laws & Corporate Compliance",
//     sectionTitle: "Partner Profile",
//     expertise: [
//       "Corporate Tax Planning & Strategic Advisory",
//       "Tax Litigation & Appeals before FBR & Appellate Tribunals",
//       "SECP Compliance & NBFC Regulatory Management",
//       "Federal & Provincial Tax Laws (Income Tax, Sales Tax)",
//       "Internal & External Audit Representation",
//       "Business Incorporation, Restructuring & Corporate Conversions",
//       "Foreign Branch & Liaison Office Establishment",
//       "Tax Assessment, Rectification & Dispute Resolution"
//     ],
//     qualifications: [
//       "Chartered Institute of Public Finance and Accountancy (CIPFA) – England & Wales",
//       "Vice Chairman, Tax Resolution Committee – Federation of Chambers of Commerce & Industry Pakistan",
//       "Member, Rawalpindi Islamabad Tax Bar Association",
//       "Tax Trainer, Ministry of Industries & Production, Pakistan (Pakistan Institute of Management)"
//     ]
//   };

//   const member2 = {
//     name: "Muhammad Yaseen",
//     designation: "USA Bookkeeper & Tax Filer",
//     role: "International Tax & Financial Reporting Specialist",
//     credentials: "CPA (USA), MS Finance",
//     badgeText: "CPA",
//     image: "MY",
//     experience: "15+",
//     projects: "50+",
//     specialtyIcon: Globe,
//     color: "#C32B2B",
//     bgColor: "bg-[#F8F8F8]",
//     focus: "USA Tax & International Financial Services",
//     sectionTitle: "Senior Professional",
//     expertise: [
//       "US Federal & State Tax Compliance (Forms 1040, 1065, 1120-S, 1120, 990)",
//       "Full-Charge Bookkeeping & Accounting for US-Based Businesses",
//       "Financial Statement Preparation (GAAP & IFRS Standards)",
//       "QuickBooks Online, Oracle, SAP & Cloud-Based Accounting Systems",
//       "Real Estate & Construction Project Finance Management",
//       "Cross-Border Tax Advisory & International Compliance",
//       "Financial Data Analytics & Automation (Excel, Power BI, Python)",
//       "Multi-Entity Consolidation & Intercompany Reconciliations"
//     ],
//     qualifications: [
//       "Certified Public Accountant (CPA) – United States of America",
//       "MS Finance – International Islamic University, Islamabad",
//       "QuickBooks ProAdvisor (Level 1 & 2) – Intuit Certified",
//       "CFA Level III Candidate – CFA Institute",
//       "Google Data Analytics Professional Certificate"
//     ]
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <section className="relative bg-gradient-to-b from-white to-[#F8F8F8] py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-[#E0E0E0] shadow-sm">
//             <Sparkles className="w-5 h-5 text-[#982017]" />
//             <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
//               Meet Our Partners
//             </span>
//           </div>

//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//             Specialized Expertise
//             <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
//               For Every Tax Need
//             </span>
//           </h2>

//           <p className="text-xl text-gray-600 leading-relaxed">
//             Combining Pakistani tax mastery with USA accounting expertise to serve clients globally
//           </p>
//         </div>
//       </section>

//       {/* Partner 1 - Abid Ali */}
//       <PartnerSection 
//         member={member1} 
//         sectionId="partner-1"
//         sectionRef={section1Ref}
//       />

//       {/* Partner 2 - Muhammad Yaseen */}
//       <PartnerSection 
//         member={member2} 
//         sectionId="partner-2"
//         sectionRef={section2Ref}
//       />
//     </>
//   );
// };

// export default TeamSection;
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Award, GraduationCap, Briefcase, Globe, 
//   Star, Sparkles, Shield, Building2, CheckCircle
// } from 'lucide-react';

// const TeamSection = () => {
//   const [visibleSections, setVisibleSections] = useState([]);
//   const section1Ref = useRef(null);
//   const section2Ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('data-section-id');
//             setVisibleSections((prev) => [...new Set([...prev, id])]);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (section1Ref.current) observer.observe(section1Ref.current);
//     if (section2Ref.current) observer.observe(section2Ref.current);

//     return () => observer.disconnect();
//   }, []);

//   const PartnerSection = ({ member, sectionId, sectionRef }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const isVisible = visibleSections.includes(sectionId);
//     const SpecialtyIcon = member.specialtyIcon;

//     return (
//       <section 
//         ref={sectionRef}
//         data-section-id={sectionId}
//         className={`relative ${member.bgColor} py-12 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen`}
//       >
//         {/* Background decorations */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div 
//             className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
//             style={{ background: `${member.color}08` }}
//           />
//           <div 
//             className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-50"
//             style={{ background: 'rgba(255,165,0,0.08)' }}
//           />
//         </div>

//         {/* Floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: `${Math.random() * 3 + 2}px`,
//                 height: `${Math.random() * 3 + 2}px`,
//                 background: member.color,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 opacity: 0.15,
//                 animation: `float-partner ${5 + Math.random() * 3}s ease-in-out infinite`,
//                 animationDelay: `${Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
//             {/* LEFT SIDE - STICKY OVERVIEW */}
//             <div className="lg:col-span-2">
//               <div 
//                 className={`sticky top-4 lg:top-24 z-10 transition-all duration-700 transform ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#E0E0E0] hover:border-[#982017] transition-all duration-500">
//                   {/* Section badge */}
//                   <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mb-6">
//                     <Sparkles className="w-4 h-4 text-[#982017]" />
//                     <span className="text-[#982017] text-xs font-bold uppercase tracking-wider">
//                       {member.sectionTitle}
//                     </span>
//                   </div>

//                   {/* Profile Image */}
//                   <div className="flex justify-center mb-6">
//                     <div className="relative">
//                       <div 
//                         className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl transition-all duration-500 ${
//                           isHovered ? 'scale-110 rotate-6' : 'scale-100'
//                         }`}
//                         style={{
//                           background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
//                         }}
//                       >
//                         {member.image}
//                       </div>

//                       {/* Badge */}
//                       <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center space-x-1">
//                         <Award className="w-3 h-3 text-white" />
//                         <span className="text-white text-xs font-bold">{member.badgeText}</span>
//                       </div>

//                       {/* Sparkles */}
//                       {isHovered && (
//                         <>
//                           <Sparkles 
//                             className="absolute -top-3 -left-3 w-6 h-6 animate-pulse"
//                             style={{ color: member.color }}
//                           />
//                           <Sparkles 
//                             className="absolute -top-3 -right-3 w-5 h-5"
//                             style={{ 
//                               color: member.color,
//                               animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
//                             }}
//                           />
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* Name & Title */}
//                   <div className="text-center mb-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                       {member.name}
//                     </h3>
//                     <p 
//                       className="text-lg font-bold mb-1"
//                       style={{ color: member.color }}
//                     >
//                       {member.designation}
//                     </p>
//                     <p className="text-sm text-gray-600 font-medium">
//                       {member.role}
//                     </p>

//                     {/* Credentials */}
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mt-3">
//                       <GraduationCap className="w-4 h-4 text-[#982017]" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         {member.credentials}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div 
//                       className="rounded-xl p-4 text-center"
//                       style={{ background: `${member.color}08` }}
//                     >
//                       <Briefcase className="w-5 h-5 mx-auto mb-2" style={{ color: member.color }} />
//                       <div className="text-2xl font-bold" style={{ color: member.color }}>
//                         {member.experience}
//                       </div>
//                       <div className="text-xs text-gray-600 font-semibold">Years</div>
//                     </div>
//                     <div 
//                       className="rounded-xl p-4 text-center"
//                       style={{ background: `${member.color}08` }}
//                     >
//                       <Star className="w-5 h-5 mx-auto mb-2 fill-current" style={{ color: member.color }} />
//                       <div className="text-2xl font-bold" style={{ color: member.color }}>
//                         {member.projects}
//                       </div>
//                       <div className="text-xs text-gray-600 font-semibold">Projects</div>
//                     </div>
//                   </div>

//                   {/* Focus Badge */}
//                   <div className="flex justify-center">
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] px-4 py-2.5 rounded-full shadow-lg">
//                       <SpecialtyIcon className="w-4 h-4 text-white" />
//                       <span className="text-white text-xs font-bold">
//                         {member.focus}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Decorative bottom accent */}
//                   <div 
//                     className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
//                     style={{
//                       background: `linear-gradient(90deg, ${member.color}, #C32B2B)`
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE - SCROLLABLE DETAILS */}
//             <div className="lg:col-span-3 space-y-6 mt-6 lg:mt-0">
//               {/* Expertise Card */}
//               <div 
//                 className={`bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-100 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center"
//                     style={{ background: `${member.color}15` }}
//                   >
//                     <Shield className="w-6 h-6" style={{ color: member.color }} />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900">
//                     Areas of Expertise
//                   </h4>
//                 </div>
//                 <div className="space-y-3">
//                   {member.expertise.map((exp, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300 group"
//                     >
//                       <div 
//                         className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
//                         style={{ background: member.color }}
//                       />
//                       <span className="text-gray-700 leading-relaxed group-hover:text-gray-900">
//                         {exp}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Qualifications Card */}
//               <div 
//                 className={`bg-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-200 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center"
//                     style={{ background: `${member.color}15` }}
//                   >
//                     <Award className="w-6 h-6" style={{ color: member.color }} />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900">
//                     Professional Credentials
//                   </h4>
//                 </div>
//                 <div className="space-y-3">
//                   {member.qualifications.map((qual, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300"
//                     >
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-gray-700 leading-relaxed">
//                         {qual}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <div 
//                 className={`transition-all duration-700 delay-300 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <button
//                   className="w-full py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
//                   style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
//                 >
//                   <Briefcase className="w-5 h-5" />
//                   <span>Schedule Consultation</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <style jsx>{`
//           @keyframes float-partner {
//             0%, 100% {
//               transform: translate(0, 0) rotate(0deg);
//               opacity: 0.15;
//             }
//             50% {
//               transform: translate(15px, -30px) rotate(180deg);
//               opacity: 0.25;
//             }
//           }
//         `}</style>
//       </section>
//     );
//   };

//   const member1 = {
//     name: "Abid Ali",
//     designation: "Partner & Tax Litigation Expert",
//     role: "Corporate Tax & SECP Compliance Specialist",
//     credentials: "CIPFA – England & Wales",
//     badgeText: "CIPFA",
//     image: "AA",
//     experience: "25+",
//     projects: "100+",
//     specialtyIcon: Building2,
//     color: "#982017",
//     bgColor: "bg-white",
//     focus: "Pakistan Tax Laws & Corporate Compliance",
//     sectionTitle: "Partner Profile",
//     expertise: [
//       "Corporate Tax Planning & Strategic Advisory",
//       "Tax Litigation & Appeals before FBR & Appellate Tribunals",
//       "SECP Compliance & NBFC Regulatory Management",
//       "Federal & Provincial Tax Laws (Income Tax, Sales Tax)",
//       "Internal & External Audit Representation",
//       "Business Incorporation, Restructuring & Corporate Conversions",
//       "Foreign Branch & Liaison Office Establishment",
//       "Tax Assessment, Rectification & Dispute Resolution"
//     ],
//     qualifications: [
//       "Chartered Institute of Public Finance and Accountancy (CIPFA) – England & Wales",
//       "Vice Chairman, Tax Resolution Committee – Federation of Chambers of Commerce & Industry Pakistan",
//       "Member, Rawalpindi Islamabad Tax Bar Association",
//       "Tax Trainer, Ministry of Industries & Production, Pakistan (Pakistan Institute of Management)"
//     ]
//   };

//   const member2 = {
//     name: "Muhammad Yaseen",
//     designation: "USA Bookkeeper & Tax Filer",
//     role: "International Tax & Financial Reporting Specialist",
//     credentials: "CPA (USA), MS Finance",
//     badgeText: "CPA",
//     image: "MY",
//     experience: "15+",
//     projects: "50+",
//     specialtyIcon: Globe,
//     color: "#C32B2B",
//     bgColor: "bg-[#F8F8F8]",
//     focus: "USA Tax & International Financial Services",
//     sectionTitle: "Senior Professional",
//     expertise: [
//       "US Federal & State Tax Compliance (Forms 1040, 1065, 1120-S, 1120, 990)",
//       "Full-Charge Bookkeeping & Accounting for US-Based Businesses",
//       "Financial Statement Preparation (GAAP & IFRS Standards)",
//       "QuickBooks Online, Oracle, SAP & Cloud-Based Accounting Systems",
//       "Real Estate & Construction Project Finance Management",
//       "Cross-Border Tax Advisory & International Compliance",
//       "Financial Data Analytics & Automation (Excel, Power BI, Python)",
//       "Multi-Entity Consolidation & Intercompany Reconciliations"
//     ],
//     qualifications: [
//       "Certified Public Accountant (CPA) – United States of America",
//       "MS Finance – International Islamic University, Islamabad",
//       "QuickBooks ProAdvisor (Level 1 & 2) – Intuit Certified",
//       "CFA Level III Candidate – CFA Institute",
//       "Google Data Analytics Professional Certificate"
//     ]
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <section className="relative bg-gradient-to-b from-white to-[#F8F8F8] py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-[#E0E0E0] shadow-sm">
//             <Sparkles className="w-5 h-5 text-[#982017]" />
//             <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
//               Meet Our Partners
//             </span>
//           </div>

//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//             Specialized Expertise
//             <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
//               For Every Tax Need
//             </span>
//           </h2>

//           <p className="text-xl text-gray-600 leading-relaxed">
//             Combining Pakistani tax mastery with USA accounting expertise to serve clients globally
//           </p>
//         </div>
//       </section>

//       {/* Partner 1 - Abid Ali */}
//       <PartnerSection 
//       key={'asdf'}
//         member={member1} 
//         sectionId="partner-1"
//         sectionRef={section1Ref}
//       />

//       {/* Partner 2 - Muhammad Yaseen */}
//       <PartnerSection 
//        key={'asdffa'}
//         member={member2} 
//         sectionId="partner-2"
//         sectionRef={section2Ref}
//       />
//     </>
//   );
// };

// export default TeamSection;
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Award, GraduationCap, Briefcase, Globe, 
//   Star, Sparkles, Shield, Building2, CheckCircle
// } from 'lucide-react';

// const TeamSection = () => {
//   const [visibleSections, setVisibleSections] = useState([]);
//   const section1Ref = useRef(null);
//   const section2Ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('data-section-id');
//             setVisibleSections((prev) => [...new Set([...prev, id])]);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (section1Ref.current) observer.observe(section1Ref.current);
//     if (section2Ref.current) observer.observe(section2Ref.current);

//     return () => observer.disconnect();
//   }, []);

//   const PartnerSection = ({ member, sectionId, sectionRef }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const isVisible = visibleSections.includes(sectionId);
//     const SpecialtyIcon = member.specialtyIcon;

//     return (
//       <section 
//         ref={sectionRef}
//         data-section-id={sectionId}
//         className={`relative ${member.bgColor} py-12 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden`}
//       >
//         {/* Background decorations */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div 
//             className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
//             style={{ background: `${member.color}08` }}
//           />
//           <div 
//             className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-50"
//             style={{ background: 'rgba(255,165,0,0.08)' }}
//           />
//         </div>

//         {/* Floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: `${Math.random() * 3 + 2}px`,
//                 height: `${Math.random() * 3 + 2}px`,
//                 background: member.color,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 opacity: 0.15,
//                 animation: `float-partner ${5 + Math.random() * 3}s ease-in-out infinite`,
//                 animationDelay: `${Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
//             {/* LEFT SIDE - STICKY OVERVIEW */}
//             <div className="lg:col-span-2">
//               <div 
//                 className={`lg:sticky lg:top-24 transition-all duration-700 transform ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#E0E0E0] hover:border-[#982017] transition-all duration-500">
//                   {/* Section badge */}
//                   <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mb-6">
//                     <Sparkles className="w-4 h-4 text-[#982017]" />
//                     <span className="text-[#982017] text-xs font-bold uppercase tracking-wider">
//                       {member.sectionTitle}
//                     </span>
//                   </div>

//                   {/* Profile Image */}
//                   <div className="flex justify-center mb-6">
//                     <div className="relative">
//                       <div 
//                         className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl transition-all duration-500 ${
//                           isHovered ? 'scale-110 rotate-6' : 'scale-100'
//                         }`}
//                         style={{
//                           background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
//                         }}
//                       >
//                         {member.image}
//                       </div>

//                       {/* Badge */}
//                       <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center space-x-1">
//                         <Award className="w-3 h-3 text-white" />
//                         <span className="text-white text-xs font-bold">{member.badgeText}</span>
//                       </div>

//                       {/* Sparkles */}
//                       {isHovered && (
//                         <>
//                           <Sparkles 
//                             className="absolute -top-3 -left-3 w-6 h-6 animate-pulse"
//                             style={{ color: member.color }}
//                           />
//                           <Sparkles 
//                             className="absolute -top-3 -right-3 w-5 h-5"
//                             style={{ 
//                               color: member.color,
//                               animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
//                             }}
//                           />
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* Name & Title */}
//                   <div className="text-center mb-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                       {member.name}
//                     </h3>
//                     <p 
//                       className="text-lg font-bold mb-1"
//                       style={{ color: member.color }}
//                     >
//                       {member.designation}
//                     </p>
//                     <p className="text-sm text-gray-600 font-medium">
//                       {member.role}
//                     </p>

//                     {/* Credentials */}
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mt-3">
//                       <GraduationCap className="w-4 h-4 text-[#982017]" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         {member.credentials}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div 
//                       className="rounded-xl p-4 text-center"
//                       style={{ background: `${member.color}08` }}
//                     >
//                       <Briefcase className="w-5 h-5 mx-auto mb-2" style={{ color: member.color }} />
//                       <div className="text-2xl font-bold" style={{ color: member.color }}>
//                         {member.experience}
//                       </div>
//                       <div className="text-xs text-gray-600 font-semibold">Years</div>
//                     </div>
//                     <div 
//                       className="rounded-xl p-4 text-center"
//                       style={{ background: `${member.color}08` }}
//                     >
//                       <Star className="w-5 h-5 mx-auto mb-2 fill-current" style={{ color: member.color }} />
//                       <div className="text-2xl font-bold" style={{ color: member.color }}>
//                         {member.projects}
//                       </div>
//                       <div className="text-xs text-gray-600 font-semibold">Projects</div>
//                     </div>
//                   </div>

//                   {/* Focus Badge */}
//                   <div className="flex justify-center">
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] px-4 py-2.5 rounded-full shadow-lg">
//                       <SpecialtyIcon className="w-4 h-4 text-white" />
//                       <span className="text-white text-xs font-bold">
//                         {member.focus}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Decorative bottom accent */}
//                   <div 
//                     className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
//                     style={{
//                       background: `linear-gradient(90deg, ${member.color}, #C32B2B)`
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE - SCROLLABLE DETAILS */}
//             <div className="lg:col-span-3 space-y-6">
//               {/* Expertise Card */}
//               <div 
//                 className={`bg-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-100 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center"
//                     style={{ background: `${member.color}15` }}
//                   >
//                     <Shield className="w-6 h-6" style={{ color: member.color }} />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900">
//                     Areas of Expertise
//                   </h4>
//                 </div>
//                 <div className="space-y-3">
//                   {member.expertise.map((exp, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300 group"
//                     >
//                       <div 
//                         className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
//                         style={{ background: member.color }}
//                       />
//                       <span className="text-gray-700 leading-relaxed group-hover:text-gray-900">
//                         {exp}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Qualifications Card */}
//               <div 
//                 className={`bg-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0] transition-all duration-700 delay-200 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center"
//                     style={{ background: `${member.color}15` }}
//                   >
//                     <Award className="w-6 h-6" style={{ color: member.color }} />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-900">
//                     Professional Credentials
//                   </h4>
//                 </div>
//                 <div className="space-y-3">
//                   {member.qualifications.map((qual, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors duration-300"
//                     >
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-gray-700 leading-relaxed">
//                         {qual}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <div 
//                 className={`transition-all duration-700 delay-300 transform ${
//                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//                 }`}
//               >
//                 <button
//                   className="w-full py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
//                   style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
//                 >
//                   <Briefcase className="w-5 h-5" />
//                   <span>Schedule Consultation</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <style jsx>{`
//           @keyframes float-partner {
//             0%, 100% {
//               transform: translate(0, 0) rotate(0deg);
//               opacity: 0.15;
//             }
//             50% {
//               transform: translate(15px, -30px) rotate(180deg);
//               opacity: 0.25;
//             }
//           }
//         `}</style>
//       </section>
//     );
//   };

//   const member1 = {
//     name: "Abid Ali",
//     designation: "Partner & Tax Litigation Expert",
//     role: "Corporate Tax & SECP Compliance Specialist",
//     credentials: "CIPFA – England & Wales",
//     badgeText: "CIPFA",
//     image: "AA",
//     experience: "25+",
//     projects: "100+",
//     specialtyIcon: Building2,
//     color: "#982017",
//     bgColor: "bg-white",
//     focus: "Pakistan Tax Laws & Corporate Compliance",
//     sectionTitle: "Partner Profile",
//     expertise: [
//       "Corporate Tax Planning & Strategic Advisory",
//       "Tax Litigation & Appeals before FBR & Appellate Tribunals",
//       "SECP Compliance & NBFC Regulatory Management",
//       "Federal & Provincial Tax Laws (Income Tax, Sales Tax)",
//       "Internal & External Audit Representation",
//       "Business Incorporation, Restructuring & Corporate Conversions",
//       "Foreign Branch & Liaison Office Establishment",
//       "Tax Assessment, Rectification & Dispute Resolution"
//     ],
//     qualifications: [
//       "Chartered Institute of Public Finance and Accountancy (CIPFA) – England & Wales",
//       "Vice Chairman, Tax Resolution Committee – Federation of Chambers of Commerce & Industry Pakistan",
//       "Member, Rawalpindi Islamabad Tax Bar Association",
//       "Tax Trainer, Ministry of Industries & Production, Pakistan (Pakistan Institute of Management)"
//     ]
//   };

//   const member2 = {
//     name: "Muhammad Yaseen",
//     designation: "USA Bookkeeper & Tax Filer",
//     role: "International Tax & Financial Reporting Specialist",
//     credentials: "CPA (USA), MS Finance",
//     badgeText: "CPA",
//     image: "MY",
//     experience: "15+",
//     projects: "50+",
//     specialtyIcon: Globe,
//     color: "#C32B2B",
//     bgColor: "bg-[#F8F8F8]",
//     focus: "USA Tax & International Financial Services",
//     sectionTitle: "Senior Professional",
//     expertise: [
//       "US Federal & State Tax Compliance (Forms 1040, 1065, 1120-S, 1120, 990)",
//       "Full-Charge Bookkeeping & Accounting for US-Based Businesses",
//       "Financial Statement Preparation (GAAP & IFRS Standards)",
//       "QuickBooks Online, Oracle, SAP & Cloud-Based Accounting Systems",
//       "Real Estate & Construction Project Finance Management",
//       "Cross-Border Tax Advisory & International Compliance",
//       "Financial Data Analytics & Automation (Excel, Power BI, Python)",
//       "Multi-Entity Consolidation & Intercompany Reconciliations"
//     ],
//     qualifications: [
//       "Certified Public Accountant (CPA) – United States of America",
//       "MS Finance – International Islamic University, Islamabad",
//       "QuickBooks ProAdvisor (Level 1 & 2) – Intuit Certified",
//       "CFA Level III Candidate – CFA Institute",
//       "Google Data Analytics Professional Certificate"
//     ]
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <section className="relative bg-gradient-to-b from-white to-[#F8F8F8] py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-[#E0E0E0] shadow-sm">
//             <Sparkles className="w-5 h-5 text-[#982017]" />
//             <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
//               Meet Our Partners
//             </span>
//           </div>

//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//             Specialized Expertise
//             <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
//               For Every Tax Need
//             </span>
//           </h2>

//           <p className="text-xl text-gray-600 leading-relaxed">
//             Combining Pakistani tax mastery with USA accounting expertise to serve clients globally
//           </p>
//         </div>
//       </section>

//       {/* Partner 1 - Abid Ali */}
//       <PartnerSection 
//         member={member1} 
//         sectionId="partner-1"
//         sectionRef={section1Ref}
//       />

//       {/* Partner 2 - Muhammad Yaseen */}
//       <PartnerSection 
//         member={member2} 
//         sectionId="partner-2"
//         sectionRef={section2Ref}
//       />
//     </>
//   );
// };

// export default TeamSection;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Award, GraduationCap, Briefcase, Globe, Flag, 
//   FileText, Star, Sparkles, TrendingUp, Shield, Building2, DollarSign
// } from 'lucide-react';

// const TeamSection = () => {
//   const [visibleCards, setVisibleCards] = useState([]);
//   const [activeCard, setActiveCard] = useState(null);
//   const sectionRef = useRef(null);

//   const teamMembers = [
//     {
//       id: 1,
//       name: "Abid Ali",
//       designation: "Partner & Tax Litigation Expert",
//       role: "Corporate Tax & SECP Compliance Specialist",
//       credentials: "CIPFA – England & Wales",
//       image: "AA",
//       expertise: [
//         "Corporate Tax Planning & Advisory",
//         "Tax Litigation & Appeals",
//         "SECP & NBFC Compliance",
//         "Federal & Provincial Tax Laws",
//         "Audit Representation",
//         "Business Incorporation & Restructuring"
//       ],
//       qualifications: [
//         "Chartered Institute of Public Finance and Accountancy (CIPFA)",
//         "Vice Chairman - Tax Resolution Committee, FPCCI",
//         "Member - Rawalpindi Islamabad Tax Bar Association",
//         "Tax Trainer - Ministry of Industries & Production"
//       ],
//       experience: "25+ Years",
//       clients: "100+",
//       specialtyIcon: Building2,
//       color: "#982017",
//       focus: "Pakistan Tax Laws & Corporate Compliance"
//     },
//     {
//       id: 2,
//       name: "Muhammad Yaseen",
//       designation: "USA Bookkeeper & Tax Filer",
//       role: "International Tax & Financial Reporting Specialist",
//       credentials: "CPA (USA), MS Finance",
//       image: "MY",
//       expertise: [
//         "US Tax Compliance (1040, 1065, 1120-S, 990)",
//         "GAAP/IFRS Financial Reporting",
//         "QuickBooks & Cloud Accounting",
//         "Real Estate & Construction Finance",
//         "Cross-Border Tax Advisory",
//         "Data Analytics & Financial Automation"
//       ],
//       qualifications: [
//         "Certified Public Accountant (CPA) - USA",
//         "MS Finance - International Islamic University",
//         "QuickBooks ProAdvisor (Level 1 & 2)",
//         "CFA Level III Candidate"
//       ],
//       experience: "15+ Years",
//       clients: "50+",
//       specialtyIcon: Globe,
//       color: "#C32B2B",
//       focus: "USA Tax & International Financial Services"
//     }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             teamMembers.forEach((_, index) => {
//               setTimeout(() => {
//                 setVisibleCards((prev) => [...new Set([...prev, index])]);
//               }, index * 300);
//             });
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const TeamCard = ({ member, index }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const [showDetails, setShowDetails] = useState(false);
//     const isVisible = visibleCards.includes(index);
//     const isActive = activeCard === member.id;
//     const SpecialtyIcon = member.specialtyIcon;

//     return (
//       <div
//         className={`transition-all duration-700 transform ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
//         }`}
//         style={{ transitionDelay: `${index * 150}ms` }}
//         onMouseEnter={() => {
//           setIsHovered(true);
//           setActiveCard(member.id);
//         }}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className={`relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 transition-all duration-500 ${
//           isHovered || isActive
//             ? 'border-[#982017] shadow-2xl scale-105'
//             : 'border-[#E0E0E0] shadow-lg scale-100'
//         }`}>
//           {/* Top gradient header */}
//           <div 
//             className="relative h-40 overflow-hidden"
//             style={{
//               background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
//             }}
//           >
//             {/* Animated pattern */}
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
//               <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" 
//                 style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} 
//               />
//             </div>

//             {/* Specialty Icon */}
//             <div className="absolute top-6 right-6">
//               <SpecialtyIcon className="w-12 h-12 text-white/40" />
//             </div>

//             {/* Focus Area Badge */}
//             <div className="absolute bottom-4 left-6 right-6">
//               <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
//                 <Flag className="w-4 h-4 text-white" />
//                 <span className="text-white text-xs font-bold">
//                   {member.focus}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Profile section */}
//           <div className="relative -mt-16 flex justify-center">
//             <div className="relative">
//               <div 
//                 className={`w-32 h-32 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white text-4xl font-bold transition-all duration-500 ${
//                   isHovered ? 'scale-110' : 'scale-100'
//                 }`}
//                 style={{
//                   background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
//                 }}
//               >
//                 {member.image}
//               </div>

//               {/* Certification badge */}
//               <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center space-x-1">
//                 <Award className="w-4 h-4 text-white" />
//                 <span className="text-white text-xs font-bold">{member.credentials.split(' ')[0]}</span>
//               </div>

//               {/* Sparkles on hover */}
//               {isHovered && (
//                 <>
//                   <Sparkles 
//                     className="absolute -top-3 -left-3 w-6 h-6 animate-pulse"
//                     style={{ color: member.color }}
//                   />
//                   <Sparkles 
//                     className="absolute -top-3 -right-3 w-5 h-5"
//                     style={{ 
//                       color: member.color,
//                       animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
//                     }}
//                   />
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Content */}
//           <div className="px-8 pt-6 pb-8">
//             {/* Name & Designation */}
//             <div className="text-center mb-6">
//               <h3 className={`text-2xl font-bold transition-colors duration-300 mb-2 ${
//                 isHovered ? 'bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent' : 'text-gray-900'
//               }`}>
//                 {member.name}
//               </h3>
              
//               <div className="space-y-2">
//                 <p className="text-[#982017] font-bold text-lg">
//                   {member.designation}
//                 </p>
//                 <p className="text-gray-600 text-sm font-medium">
//                   {member.role}
//                 </p>
//               </div>
              
//               {/* Credentials badge */}
//               <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mt-4">
//                 <GraduationCap className="w-4 h-4 text-[#982017]" />
//                 <span className="text-xs font-semibold text-gray-700">
//                   {member.credentials}
//                 </span>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-[#F8F8F8] rounded-xl p-4 text-center">
//                 <div className="flex justify-center mb-2">
//                   <Briefcase className="w-5 h-5 text-[#982017]" />
//                 </div>
//                 <div className="text-2xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
//                   {member.experience}
//                 </div>
//                 <div className="text-xs text-gray-600 font-medium">Experience</div>
//               </div>
//               <div className="bg-[#F8F8F8] rounded-xl p-4 text-center">
//                 <div className="flex justify-center mb-2">
//                   <Star className="w-5 h-5 text-[#982017] fill-[#982017]" />
//                 </div>
//                 <div className="text-2xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
//                   {member.clients}
//                 </div>
//                 <div className="text-xs text-gray-600 font-medium">Projects</div>
//               </div>
//             </div>

//             {/* Core Expertise */}
//             <div className="mb-6">
//               <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
//                 <Shield className="w-4 h-4 text-[#982017]" />
//                 <span>Areas of Expertise</span>
//               </h4>
//               <div className="space-y-2">
//                 {member.expertise.slice(0, 3).map((exp, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-start space-x-2 text-sm text-gray-700"
//                   >
//                     <div className="w-1.5 h-1.5 rounded-full bg-[#982017] mt-1.5 flex-shrink-0" />
//                     <span>{exp}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Toggle Details Button */}
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className="w-full py-3 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 hover:from-[#982017]/20 hover:to-[#C32B2B]/20 text-[#982017] rounded-lg font-semibold text-sm transition-all duration-300 mb-4 flex items-center justify-center space-x-2"
//             >
//               <FileText className="w-4 h-4" />
//               <span>{showDetails ? 'Hide Full Profile' : 'View Complete Expertise'}</span>
//             </button>

//             {/* Expandable Details */}
//             <div
//               className={`overflow-hidden transition-all duration-500 ${
//                 showDetails ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
//               }`}
//             >
//               <div className="space-y-6 pt-4 border-t border-[#E0E0E0]">
//                 {/* All Expertise */}
//                 <div>
//                   <h5 className="text-xs font-bold text-gray-900 mb-3 flex items-center space-x-2">
//                     <DollarSign className="w-4 h-4 text-[#982017]" />
//                     <span>Complete Service Portfolio</span>
//                   </h5>
//                   <div className="grid grid-cols-1 gap-2">
//                     {member.expertise.map((exp, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-start space-x-2 text-xs text-gray-600 bg-[#F8F8F8] px-3 py-2 rounded-lg"
//                       >
//                         <div className="w-1 h-1 rounded-full bg-[#982017] mt-1.5 flex-shrink-0" />
//                         <span>{exp}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Qualifications */}
//                 <div>
//                   <h5 className="text-xs font-bold text-gray-900 mb-3 flex items-center space-x-2">
//                     <Award className="w-4 h-4 text-[#982017]" />
//                     <span>Professional Qualifications</span>
//                   </h5>
//                   <ul className="space-y-2">
//                     {member.qualifications.map((qual, idx) => (
//                       <li key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
//                         <Award className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
//                         <span>{qual}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Consult Button */}
//             <button
//               className="w-full py-3 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 mt-4"
//               style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
//             >
//               <Briefcase className="w-4 h-4" />
//               <span>Schedule Consultation</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section ref={sectionRef} className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       {/* Background decorations */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-[#982017]/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
//       </div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: `${Math.random() * 4 + 2}px`,
//               height: `${Math.random() * 4 + 2}px`,
//               background: i % 2 === 0 ? '#982017' : '#C32B2B',
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: 0.15,
//               animation: `float-team ${6 + Math.random() * 4}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 3}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-20 space-y-6">
//           <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-5 py-2.5 rounded-full border border-[#982017]/20">
//             <Sparkles className="w-5 h-5 text-[#982017]" />
//             <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
//               Our Expert Partners
//             </span>
//           </div>

//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//             Specialized Expertise
//             <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
//               For Every Tax Need
//             </span>
//           </h2>

//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Combining local Pakistani tax mastery with international USA tax expertise to serve clients globally
//           </p>
//         </div>

//         {/* Team Grid */}
//         <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
//           {teamMembers.map((member, index) => (
//             <TeamCard key={member.id} member={member} index={index} />
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-20 text-center">
//           <div className="inline-block bg-gradient-to-r from-[#F8F8F8] to-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0]">
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <TrendingUp className="w-8 h-8 text-[#982017]" />
//               <h3 className="text-2xl font-bold text-gray-900">
//                 Need Tax or Financial Expertise?
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-6 max-w-2xl">
//               Whether you need Pakistan tax compliance or USA bookkeeping services, our specialized team is ready to help
//             </p>
//             <button
//               className="px-10 py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
//               style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
//             >
//               <span>Get Expert Consultation</span>
//               <Award className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float-team {
//           0%, 100% {
//             transform: translate(0, 0) rotate(0deg) scale(1);
//             opacity: 0.15;
//           }
//           33% {
//             transform: translate(20px, -30px) rotate(120deg) scale(1.2);
//             opacity: 0.25;
//           }
//           66% {
//             transform: translate(-20px, -60px) rotate(240deg) scale(0.9);
//             opacity: 0.2;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TeamSection;
// // import React, { useState, useEffect, useRef } from 'react';
// // import { 
// //   Award, GraduationCap, Briefcase, Mail, Phone, MapPin, 
// //   Linkedin, CheckCircle, Star, Sparkles, TrendingUp, Shield
// // } from 'lucide-react';

// // const TeamSection = () => {
// //   const [visibleCards, setVisibleCards] = useState([]);
// //   const [activeCard, setActiveCard] = useState(null);
// //   const sectionRef = useRef(null);

// //   const teamMembers = [
// //     {
// //       id: 1,
// //       name: "Abid Ali",
// //       title: "Partner",
// //       subtitle: "Abid Ali & Co",
// //       credentials: "CIPFA – England & Wales",
// //       image: "AA",
// //       email: "abid@365AccounTix.com",
// //       phone: "+92 51 1234567",
// //       location: "Islamabad",
// //       specializations: [
// //         "Corporate Tax Planning",
// //         "SECP Compliance",
// //         "Tax Litigation",
// //         "NBFC Regulations"
// //       ],
// //       memberships: [
// //         "CIPFA Member (England & Wales)",
// //         "Vice Chairman, Tax Resolution Committee – FPCCI",
// //         "Member, Rawalpindi Islamabad Tax Bar"
// //       ],
// //       experience: "25+ Years",
// //       clients: "100+",
// //       color: "#982017"
// //     },
// //     {
// //       id: 2,
// //       name: "Muhammad Yaseen",
// //       title: "Senior Finance & Tax Professional",
// //       subtitle: "CPA, MS Finance",
// //       credentials: "Certified Public Accountant",
// //       image: "MY",
// //       email: "yaseen@365AccounTix.com",
// //       phone: "+92 318 0677701",
// //       location: "Islamabad",
// //       specializations: [
// //         "US Tax Compliance",
// //         "Financial Reporting (GAAP/IFRS)",
// //         "Real Estate Finance",
// //         "Data Analytics & Automation"
// //       ],
// //       memberships: [
// //         "Certified Public Accountant (CPA)",
// //         "QuickBooks ProAdvisor",
// //         "CFA Level III Candidate"
// //       ],
// //       experience: "15+ Years",
// //       clients: "50+",
// //       color: "#C32B2B"
// //     }
// //   ];

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             teamMembers.forEach((_, index) => {
// //               setTimeout(() => {
// //                 setVisibleCards((prev) => [...new Set([...prev, index])]);
// //               }, index * 300);
// //             });
// //           }
// //         });
// //       },
// //       { threshold: 0.2 }
// //     );

// //     if (sectionRef.current) {
// //       observer.observe(sectionRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, []);

// //   const TeamCard = ({ member, index }) => {
// //     const [isHovered, setIsHovered] = useState(false);
// //     const [showDetails, setShowDetails] = useState(false);
// //     const isVisible = visibleCards.includes(index);
// //     const isActive = activeCard === member.id;

// //     return (
// //       <div
// //         className={`transition-all duration-700 transform ${
// //           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
// //         }`}
// //         style={{ transitionDelay: `${index * 150}ms` }}
// //         onMouseEnter={() => {
// //           setIsHovered(true);
// //           setActiveCard(member.id);
// //         }}
// //         onMouseLeave={() => setIsHovered(false)}
// //       >
// //         <div className={`relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 transition-all duration-500 ${
// //           isHovered || isActive
// //             ? 'border-[#982017] shadow-2xl scale-105'
// //             : 'border-[#E0E0E0] shadow-lg scale-100'
// //         }`}>
// //           {/* Top gradient header */}
// //           <div 
// //             className="relative h-32 overflow-hidden"
// //             style={{
// //               background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
// //             }}
// //           >
// //             {/* Animated pattern */}
// //             <div className="absolute inset-0 opacity-20">
// //               <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
// //               <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" 
// //                 style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} 
// //               />
// //             </div>

// //             {/* Decorative elements */}
// //             <div className="absolute top-4 right-4">
// //               <Award className="w-8 h-8 text-white/30" />
// //             </div>
// //           </div>

// //           {/* Profile picture */}
// //           <div className="relative -mt-16 flex justify-center">
// //             <div className="relative">
// //               <div 
// //                 className={`w-32 h-32 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white text-4xl font-bold transition-all duration-500 ${
// //                   isHovered ? 'scale-110' : 'scale-100'
// //                 }`}
// //                 style={{
// //                   background: `linear-gradient(135deg, ${member.color}, #C32B2B)`
// //                 }}
// //               >
// //                 {member.image}
// //               </div>

// //               {/* Status badge */}
// //               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
// //                 <CheckCircle className="w-5 h-5 text-white" />
// //               </div>

// //               {/* Sparkles on hover */}
// //               {isHovered && (
// //                 <>
// //                   <Sparkles 
// //                     className="absolute -top-3 -left-3 w-6 h-6 animate-pulse"
// //                     style={{ color: member.color }}
// //                   />
// //                   <Sparkles 
// //                     className="absolute -top-3 -right-3 w-5 h-5"
// //                     style={{ 
// //                       color: member.color,
// //                       animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
// //                     }}
// //                   />
// //                 </>
// //               )}
// //             </div>
// //           </div>

// //           {/* Content */}
// //           <div className="px-8 pt-6 pb-8">
// //             {/* Name & Title */}
// //             <div className="text-center mb-6">
// //               <h3 className={`text-2xl font-bold transition-colors duration-300 ${
// //                 isHovered ? 'bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent' : 'text-gray-900'
// //               }`}>
// //                 {member.name}
// //               </h3>
// //               <p className="text-[#982017] font-semibold text-sm mt-1">
// //                 {member.title}
// //               </p>
// //               <p className="text-gray-600 text-sm mt-1">
// //                 {member.subtitle}
// //               </p>
              
// //               {/* Credentials badge */}
// //               <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full border border-[#982017]/20 mt-3">
// //                 <GraduationCap className="w-4 h-4 text-[#982017]" />
// //                 <span className="text-xs font-semibold text-gray-700">
// //                   {member.credentials}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Stats */}
// //             <div className="grid grid-cols-2 gap-4 mb-6">
// //               <div className="bg-[#F8F8F8] rounded-xl p-4 text-center">
// //                 <div className="flex justify-center mb-2">
// //                   <Briefcase className="w-5 h-5 text-[#982017]" />
// //                 </div>
// //                 <div className="text-2xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
// //                   {member.experience}
// //                 </div>
// //                 <div className="text-xs text-gray-600 font-medium">Experience</div>
// //               </div>
// //               <div className="bg-[#F8F8F8] rounded-xl p-4 text-center">
// //                 <div className="flex justify-center mb-2">
// //                   <Star className="w-5 h-5 text-[#982017] fill-[#982017]" />
// //                 </div>
// //                 <div className="text-2xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
// //                   {member.clients}
// //                 </div>
// //                 <div className="text-xs text-gray-600 font-medium">Clients</div>
// //               </div>
// //             </div>

// //             {/* Specializations */}
// //             <div className="mb-6">
// //               <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
// //                 <Shield className="w-4 h-4 text-[#982017]" />
// //                 <span>Core Expertise</span>
// //               </h4>
// //               <div className="flex flex-wrap gap-2">
// //                 {member.specializations.map((spec, idx) => (
// //                   <span
// //                     key={idx}
// //                     className="px-3 py-1.5 bg-white border border-[#E0E0E0] rounded-lg text-xs text-gray-700 hover:border-[#982017] hover:text-[#982017] transition-colors duration-300"
// //                   >
// //                     {spec}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Toggle Details Button */}
// //             <button
// //               onClick={() => setShowDetails(!showDetails)}
// //               className="w-full py-3 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 hover:from-[#982017]/20 hover:to-[#C32B2B]/20 text-[#982017] rounded-lg font-semibold text-sm transition-all duration-300 mb-4"
// //             >
// //               {showDetails ? 'Hide Details' : 'View Full Profile'}
// //             </button>

// //             {/* Expandable Details */}
// //             <div
// //               className={`overflow-hidden transition-all duration-500 ${
// //                 showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
// //               }`}
// //             >
// //               <div className="space-y-4 pt-4 border-t border-[#E0E0E0]">
// //                 {/* Memberships */}
// //                 <div>
// //                   <h5 className="text-xs font-bold text-gray-900 mb-2 flex items-center space-x-2">
// //                     <Award className="w-4 h-4 text-[#982017]" />
// //                     <span>Memberships & Certifications</span>
// //                   </h5>
// //                   <ul className="space-y-2">
// //                     {member.memberships.map((membership, idx) => (
// //                       <li key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
// //                         <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
// //                         <span>{membership}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 {/* Contact */}
// //                 <div className="space-y-2">
// //                   <div className="flex items-center space-x-2 text-xs text-gray-600">
// //                     <Mail className="w-4 h-4 text-[#982017]" />
// //                     <a href={`mailto:${member.email}`} className="hover:text-[#982017] transition-colors">
// //                       {member.email}
// //                     </a>
// //                   </div>
// //                   <div className="flex items-center space-x-2 text-xs text-gray-600">
// //                     <Phone className="w-4 h-4 text-[#982017]" />
// //                     <a href={`tel:${member.phone}`} className="hover:text-[#982017] transition-colors">
// //                       {member.phone}
// //                     </a>
// //                   </div>
// //                   <div className="flex items-center space-x-2 text-xs text-gray-600">
// //                     <MapPin className="w-4 h-4 text-[#982017]" />
// //                     <span>{member.location}, Pakistan</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Contact Button */}
// //             <button
// //               className="w-full py-3 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
// //               style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
// //             >
// //               <Mail className="w-4 h-4" />
// //               <span>Contact {member.name.split(' ')[0]}</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section ref={sectionRef} className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
// //       {/* Background decorations */}
// //       <div className="absolute inset-0">
// //         <div className="absolute top-20 left-10 w-96 h-96 bg-[#982017]/5 rounded-full blur-3xl" />
// //         <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
// //       </div>

// //       {/* Floating particles */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {[...Array(15)].map((_, i) => (
// //           <div
// //             key={i}
// //             className="absolute rounded-full"
// //             style={{
// //               width: `${Math.random() * 4 + 2}px`,
// //               height: `${Math.random() * 4 + 2}px`,
// //               background: i % 2 === 0 ? '#982017' : '#C32B2B',
// //               left: `${Math.random() * 100}%`,
// //               top: `${Math.random() * 100}%`,
// //               opacity: 0.15,
// //               animation: `float-team ${6 + Math.random() * 4}s ease-in-out infinite`,
// //               animationDelay: `${Math.random() * 3}s`
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <div className="relative max-w-7xl mx-auto">
// //         {/* Section Header */}
// //         <div className="text-center mb-20 space-y-6">
// //           <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-5 py-2.5 rounded-full border border-[#982017]/20">
// //             <Sparkles className="w-5 h-5 text-[#982017]" />
// //             <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
// //               Our Expert Team
// //             </span>
// //           </div>

// //           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
// //             Meet the Professionals
// //             <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
// //               Behind Your Success
// //             </span>
// //           </h2>

// //           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
// //             Our team combines decades of expertise in taxation, finance, and business consultancy to deliver exceptional results for every client
// //           </p>
// //         </div>

// //         {/* Team Grid */}
// //         <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
// //           {teamMembers.map((member, index) => (
// //             <TeamCard key={member.id} member={member} index={index} />
// //           ))}
// //         </div>

// //         {/* Bottom CTA */}
// //         <div className="mt-20 text-center">
// //           <div className="inline-block bg-gradient-to-r from-[#F8F8F8] to-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0]">
// //             <div className="flex items-center justify-center space-x-3 mb-4">
// //               <TrendingUp className="w-8 h-8 text-[#982017]" />
// //               <h3 className="text-2xl font-bold text-gray-900">
// //                 Ready to Work With Us?
// //               </h3>
// //             </div>
// //             <p className="text-gray-600 mb-6 max-w-2xl">
// //               Schedule a consultation with our expert team and discover how we can help achieve your financial goals
// //             </p>
// //             <button
// //               className="px-10 py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
// //               style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
// //             >
// //               <span>Schedule Consultation</span>
// //               <Award className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes float-team {
// //           0%, 100% {
// //             transform: translate(0, 0) rotate(0deg) scale(1);
// //             opacity: 0.15;
// //           }
// //           33% {
// //             transform: translate(20px, -30px) rotate(120deg) scale(1.2);
// //             opacity: 0.25;
// //           }
// //           66% {
// //             transform: translate(-20px, -60px) rotate(240deg) scale(0.9);
// //             opacity: 0.2;
// //           }
// //         }
// //       `}</style>
// //     </section>
// //   );
// // };

// // export default TeamSection;