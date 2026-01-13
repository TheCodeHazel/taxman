'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Zap, DollarSign, Users, Lock, Headphones, Sparkles, CheckCircle } from 'lucide-react';

type Feature = {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
};
const WhyChooseSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const features:Feature[] = [
    {
      id: 1,
      icon: MapPin,
      title: "Local Expertise",
      description: "Deep knowledge of Pakistani tax laws & FBR procedures. Our team stays updated with the latest regulations to ensure your complete compliance.",
      gradient: "from-[#982017] to-[#C32B2B]"
    },
    {
      id: 2,
      icon: Zap,
      title: "Fast Processing",
      description: "Average 48-hour turnaround on tax returns. We value your time and work efficiently without compromising on accuracy or quality.",
      gradient: "from-[#C32B2B] to-[#982017]"
    },
    {
      id: 3,
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, clear quotes upfront. You'll know exactly what you're paying for before we start working on your case.",
      gradient: "from-[#982017] to-[#C32B2B]"
    },
    {
      id: 4,
      icon: Users,
      title: "Personalized Service",
      description: "Dedicated consultant for your account. Build a lasting relationship with an expert who understands your unique financial situation.",
      gradient: "from-[#C32B2B] to-[#982017]"
    },
    {
      id: 5,
      icon: Lock,
      title: "Tech-Enabled",
      description: "Secure online document submission. Upload your files safely through our encrypted platform, accessible 24/7 from anywhere.",
      gradient: "from-[#982017] to-[#C32B2B]"
    },
    {
      id: 6,
      icon: Headphones,
      title: "Post-Filing Support",
      description: "Free FBR query handling for 6 months. We don't disappear after filing - we're here to support you through any follow-up questions.",
      gradient: "from-[#C32B2B] to-[#982017]"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((feature, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => [...new Set([...prev, feature.id])]);
              }, index * 200);
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

  const FeatureBlock = ({ feature, index, isReversed }: {
  feature: Feature;
  index: number;
  isReversed: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = feature.icon;
    const isVisible = visibleFeatures.includes(feature.id);

    return (
      <div
        className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isReversed ? 'translate-x-8' : '-translate-x-8'}`
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Icon Side */}
        <div className={`${isReversed ? 'md:order-2' : 'md:order-1'} flex justify-center md:justify-${isReversed ? 'start' : 'end'}`}>
          <div className="relative group">
            {/* Outer pulsing ring */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-700 ${
                isHovered ? 'scale-125 opacity-30' : 'scale-100 opacity-0'
              }`}
              style={{
                background: `linear-gradient(135deg, ${feature.gradient.includes('from-[#982017]') ? '#982017' : '#C32B2B'}, ${feature.gradient.includes('to-[#C32B2B]') ? '#C32B2B' : '#982017'})`,
                filter: 'blur(20px)'
              }}
            />

            {/* Middle ring */}
            <div 
              className={`absolute inset-2 rounded-full transition-opacity duration-500 ${
                isHovered ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(255,165,0,0.4), transparent 70%)'
              }}
            />

            {/* Main icon container */}
            <div 
              className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                isHovered ? 'scale-110 shadow-2xl' : 'scale-100'
              }`}
              style={{
                background: `linear-gradient(135deg, ${feature.gradient.includes('from-[#982017]') ? '#982017' : '#C32B2B'}, ${feature.gradient.includes('to-[#C32B2B]') ? '#C32B2B' : '#982017'})`,
                boxShadow: isHovered ? '0 20px 40px rgba(152, 32, 23, 0.4)' : '0 10px 25px rgba(152, 32, 23, 0.2)'
              }}
            >
              <Icon 
                className={`w-14 h-14 text-white transition-transform duration-500 ${
                  isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                }`}
              />
            </div>

            {/* Sparkle decoration */}
            {isHovered && (
              <>
                <Sparkles 
                  className="absolute -top-3 -right-3 w-6 h-6 text-[#982017] animate-pulse"
                />
                <Sparkles 
                  className="absolute -bottom-3 -left-3 w-5 h-5 text-[#C32B2B]"
                  style={{ animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                />
              </>
            )}

            {/* Checkmark badge */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#F8F8F8] shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className={`${isReversed ? 'md:order-1' : 'md:order-2'} space-y-4`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#E0E0E0] shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#982017] animate-pulse" />
            <span className="text-[#982017] text-xs font-semibold uppercase tracking-wide">
              Feature #{index + 1}
            </span>
          </div>

          <h3 className={`text-3xl font-bold text-gray-900 transition-colors duration-300 ${
            isHovered ? 'text-[#982017]' : ''
          }`}>
            {feature.title}
          </h3>

          <p className="text-gray-600 leading-relaxed text-lg">
            {feature.description}
          </p>

          {/* Animated underline */}
          <div className="relative pt-2">
            <div 
              className={`h-1 rounded-full transition-all duration-500 ${
                isHovered ? 'w-24' : 'w-16'
              }`}
              style={{
                background: `linear-gradient(90deg, #982017, #C32B2B)`,
                boxShadow: isHovered ? '0 4px 12px rgba(152, 32, 23, 0.4)' : 'none'
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative bg-[#F8F8F8] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Radial gradient backgrounds for depth */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(152,32,23,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,165,0,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Decorative grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#982017 1px, transparent 1px), linear-gradient(90deg, #982017 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#E0E0E0] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#982017]" />
            <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
              Why Choose TaxMan
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Your Success Is
            <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
              Our Priority
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine local expertise with modern technology to deliver exceptional tax and business consultancy services
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <FeatureBlock
              key={feature.id}
              feature={feature}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-24 bg-white rounded-3xl shadow-xl p-8 border border-[#E0E0E0]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
                15+
              </div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#982017]/10"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-slow ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          33% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translate(-20px, -60px) scale(0.8);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;