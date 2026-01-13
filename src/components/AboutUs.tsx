'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, TrendingUp, MapPin, Heart, Shield, CheckCircle, Sparkles, Star } from 'lucide-react';


type VisibleElement = 'text' | 'certs' | 'stats';

type Stat = {
  id: 1 | 2 | 3;
  icon: React.ElementType;
  number: string;
  label: string;
  target: number;
  suffix: string;
  color: string;
};


const AboutSection = () => {
const [visibleElements, setVisibleElements] = useState<VisibleElement[]>([]);
  const [counters, setCounters] = useState({ years: 0, clients: 0, retention: 0 });
  const sectionRef = useRef(null);

  const stats:Stat[] = [
    {
      id: 1,
      icon: Award,
      number: "15+",
      label: "Years in Business",
      target: 15,
      suffix: "+",
      color: "#982017"
    },
    {
      id: 2,
      icon: Users,
      number: "500+",
      label: "Happy Clients",
      target: 500,
      suffix: "+",
      color: "#C32B2B"
    },
    {
      id: 3,
      icon: TrendingUp,
      number: "98%",
      label: "Client Retention",
      target: 98,
      suffix: "%",
      color: "#982017"
    }
  ];

  const certifications = [
    { name: "SECP Registered", icon: Shield },
    { name: "FBR Authorized", icon: CheckCircle },
    { name: "ISO 9001 Certified", icon: Award },
    { name: "ICAP Member", icon: Star }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger text animation
            setTimeout(() => setVisibleElements((prev) => [...prev, 'text']), 200);
            setTimeout(() => setVisibleElements((prev) => [...prev, 'certs']), 400);
            setTimeout(() => setVisibleElements((prev) => [...prev, 'stats']), 600);

            // Animate counters
            stats.forEach((stat, index) => {
              setTimeout(() => {
                animateCounter(stat.id, stat.target);
              }, 800 + index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (id:number, target:number) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters((prev) => ({
        ...prev,
        [id === 1 ? 'years' : id === 2 ? 'clients' : 'retention']: Math.floor(current)
      }));
    }, 30);
  };

  const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = stat.icon;
    const counterValue = stat.id === 1 ? counters.years : stat.id === 2 ? counters.clients : counters.retention;

    return (
      <div
        className={`relative group transition-all duration-700 transform ${
          visibleElements.includes('stats') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover glow */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle at center, ${stat.color}20, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />

        {/* Main card */}
        <div className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-500 ${
          isHovered ? 'border-[#982017] shadow-2xl scale-105' : 'border-[#E0E0E0] shadow-lg'
        }`}>
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-6' : 'scale-100'
              }`}
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, ${stat.color}, #C32B2B)`
                  : `${stat.color}15`
              }}
            >
              <Icon
                className={`w-7 h-7 transition-colors duration-500`}
                style={{ color: isHovered ? '#FFFFFF' : stat.color }}
              />
            </div>
          </div>

          {/* Number */}
          <div className="text-center space-y-2">
            <div
              className="text-4xl font-bold bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent"
            >
              {counterValue}{stat.suffix}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `linear-gradient(90deg, ${stat.color}, #C32B2B)`
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative bg-[#F8F8F8] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#982017]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 ? '#982017' : '#C32B2B',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.15,
              animation: `float-about ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#E0E0E0] shadow-sm mb-6">
            <Heart className="w-5 h-5 text-[#982017] fill-[#982017]" />
            <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
              About TaxMan
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Your Partner in
            <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
              Financial Success
            </span>
          </h2>
        </div>

        {/* Main Content - 50/50 Split */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Story */}
            <div
              className={`space-y-6 transition-all duration-700 transform ${
                visibleElements.includes('text') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Founded in <span className="font-bold text-[#982017]">2010</span>, TaxMan Consultancy has grown from a small tax advisory firm into one of Islamabad's most trusted names in financial services. What started as a passion for helping individuals navigate complex tax regulations has evolved into a comprehensive consultancy serving over 500 businesses and individuals.
                </p>

                <p className="text-gray-700 leading-relaxed text-lg">
                  Our team of <span className="font-bold text-[#982017]">25+ certified professionals</span> brings together decades of combined experience in taxation, accounting, and business advisory. We don't just file your taxes—we become your long-term financial partners, invested in your growth and success.
                </p>

                <p className="text-gray-700 leading-relaxed text-lg">
                  From our headquarters in Islamabad, we proudly serve clients across <span className="font-bold text-[#982017]">Rawalpindi, Lahore, Karachi, and beyond</span>. Our commitment to transparency, personalized service, and staying ahead of regulatory changes has earned us a 98% client retention rate—a testament to the trust our clients place in us.
                </p>
              </div>

              {/* Location Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-6 py-3 rounded-xl border border-[#982017]/20">
                <MapPin className="w-5 h-5 text-[#982017]" />
                <span className="text-gray-800 font-semibold">
                  Serving Islamabad, Rawalpindi & Beyond
                </span>
              </div>
            </div>

            {/* Certifications */}
            <div
              className={`transition-all duration-700 transform ${
                visibleElements.includes('certs') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-[#982017]" />
                <span>Certifications & Memberships</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-3 bg-white px-4 py-3 rounded-xl border border-[#E0E0E0] hover:border-[#982017] hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#982017]/10 to-[#C32B2B]/10 flex items-center justify-center group-hover:from-[#982017] group-hover:to-[#C32B2B] transition-all duration-300">
                        <Icon className="w-4 h-4 text-[#982017] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#982017] transition-colors duration-300">
                        {cert.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Stats Card */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#982017]/20 to-[#C32B2B]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#C32B2B]/20 to-[#982017]/20 rounded-full blur-2xl" />

            {/* Stats container */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#E0E0E0]">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-[#982017]" />
                  <span className="text-[#982017] text-sm font-bold">Our Achievements</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Numbers That Speak
                </h3>
                <p className="text-gray-600 mt-2">
                  Building trust through excellence
                </p>
              </div>

              {/* Stats Grid */}
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <StatCard key={stat.id} stat={stat} index={index} />
                ))}
              </div>

              {/* Bottom decoration */}
              <div className="mt-8 pt-6 border-t border-[#E0E0E0]">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Heart className="w-4 h-4 text-[#982017] fill-[#982017]" />
                  <span>Trusted by businesses across Pakistan</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -top-4 -left-4 transition-all duration-700 transform ${
                visibleElements.includes('stats') ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <div className="bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="font-bold">Since 2010</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-xl border border-[#E0E0E0]">
            <p className="text-xl text-gray-700 mb-6 max-w-2xl">
              Ready to experience the TaxMan difference? Let's start building your financial success story together.
            </p>
            <button
              className="px-10 py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
              style={{ boxShadow: '0 8px 25px rgba(152, 32, 23, 0.3)' }}
            >
              <span>Schedule a Consultation</span>
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-about {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.15;
          }
          33% {
            transform: translate(15px, -25px) rotate(120deg);
            opacity: 0.25;
          }
          66% {
            transform: translate(-15px, -50px) rotate(240deg);
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;