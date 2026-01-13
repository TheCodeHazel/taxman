'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FileText, Building2, FileCheck, Shield, TrendingUp, Receipt, ArrowRight, Sparkles } from 'lucide-react';

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      icon: FileText,
      title: "Individual Tax Filing",
      description: "Hassle-free personal income tax returns with maximum deductions and timely FBR submissions.",
      color: "#982017"
    },
    {
      id: 2,
      icon: Building2,
      title: "Corporate Tax Services",
      description: "Comprehensive corporate tax planning, compliance, and strategic advisory for businesses of all sizes.",
      color: "#982017"
    },
    {
      id: 3,
      icon: FileCheck,
      title: "Business Registration",
      description: "Complete business setup including NTN, SECP registration, and all regulatory documentation.",
      color: "#982017"
    },
    {
      id: 4,
      icon: Shield,
      title: "Audit & Compliance",
      description: "Professional audit services and regulatory compliance management to keep your business secure.",
      color: "#982017"
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Financial Planning",
      description: "Strategic financial advisory, budgeting, and growth planning for sustainable business success.",
      color: "#982017"
    },
    {
      id: 6,
      icon: Receipt,
      title: "VAT/Sales Tax Returns",
      description: "Expert handling of sales tax registrations, monthly returns, and FBR compliance requirements.",
      color: "#982017"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            services.forEach((service, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, service.id])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = service.icon;
    const isVisible = visibleCards.includes(service.id);

    return (
      <div
        className={`relative group transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Hover glow effect */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at center, rgba(255,165,0,0.15), transparent 70%)',
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />

        {/* Main card */}
        <div className="relative bg-[#FAFAFA] rounded-2xl p-8 border border-[#E0E0E0] hover:border-[#982017]/30 transition-all duration-500 h-full flex flex-col shadow-sm hover:shadow-xl">
          {/* Decorative corner accent */}
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
            style={{
              background: 'linear-gradient(135deg, rgba(152,32,23,0.1), transparent)'
            }}
          />

          {/* Icon container with animation */}
          <div className="relative mb-6">
            <div 
              className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
              }`}
              style={{
                background: isHovered 
                  ? 'linear-gradient(135deg, #982017, #C32B2B)'
                  : 'rgba(152,32,23,0.1)'
              }}
            >
              <Icon 
                className={`w-8 h-8 transition-colors duration-500 ${
                  isHovered ? 'text-white' : 'text-[#982017]'
                }`}
              />
            </div>
            
            {/* Floating sparkle on hover */}
            {isHovered && (
              <Sparkles 
                className="absolute -top-2 -right-2 w-5 h-5 text-[#982017] animate-pulse"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#982017] transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {service.description}
            </p>
          </div>

          {/* Learn More link */}
          <div className="flex items-center space-x-2 text-[#982017] font-semibold text-sm group/link cursor-pointer">
            <span className="group-hover/link:underline">Learn More</span>
            <ArrowRight 
              className={`w-4 h-4 transition-transform duration-300 ${
                isHovered ? 'translate-x-2' : 'translate-x-0'
              }`}
            />
          </div>

          {/* Bottom gradient line */}
          <div 
            className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, #982017, #C32B2B)'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#982017]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#982017]/5 px-4 py-2 rounded-full border border-[#982017]/10">
            <Sparkles className="w-4 h-4 text-[#982017]" />
            <span className="text-[#982017] text-sm font-semibold">Our Services</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Comprehensive Tax &
            <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
              Business Solutions
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From individual tax filing to complex corporate compliance, we provide end-to-end financial services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-[#982017]/5 to-[#C32B2B]/5 px-8 py-4 rounded-2xl border border-[#982017]/10">
            <p className="text-gray-700 font-medium">
              Need a custom solution?
            </p>
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#982017]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;