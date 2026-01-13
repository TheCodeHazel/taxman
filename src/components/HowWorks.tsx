"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  MessageSquare,
  Upload,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef(null);

  const steps = [
    {
      id: 1,
      number: "01",
      icon: Phone,
      title: "Contact Us",
      description: "Call or submit form",
      details:
        "Reach out via phone, WhatsApp, or our online form. We're available 24/7 to receive your inquiry.",
      color: "#982017",
    },
    {
      id: 2,
      number: "02",
      icon: MessageSquare,
      title: "Consultation",
      description: "Discuss your needs",
      details:
        "Schedule a free consultation with our expert. We'll understand your requirements and provide tailored solutions.",
      color: "#C32B2B",
    },
    {
      id: 3,
      number: "03",
      icon: Upload,
      title: "Documentation",
      description: "Securely share documents",
      details:
        "Upload your files through our encrypted portal. All documents are handled with complete confidentiality.",
      color: "#982017",
    },
    {
      id: 4,
      number: "04",
      icon: CheckCircle,
      title: "Completion",
      description: "Receive filed returns",
      details:
        "Get your completed tax returns and all necessary documentation. We handle FBR submissions on your behalf.",
      color: "#C32B2B",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate steps appearing
            steps.forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, step.id])]);
              }, index * 300);
            });

            // Animate connecting line
            let progress = 0;
            const lineInterval = setInterval(() => {
              progress += 2;
              setLineProgress(progress);
              if (progress >= 100) {
                clearInterval(lineInterval);
              }
            }, 20);
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

  const StepCard = ({ step, index, isLast }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = step.icon;
    const isVisible = visibleSteps.includes(step.id);
    const isActive = activeStep === index;

    return (
      <div className="flex-1 relative">
        <div
          className={`transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
          onMouseEnter={() => {
            setIsHovered(true);
            setActiveStep(index);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Step Card */}
          <div
            className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-500 ${
              isHovered || isActive
                ? "border-[#982017] shadow-2xl scale-105"
                : "border-[#E0E0E0] shadow-lg scale-100"
            }`}
            style={{
              boxShadow:
                isHovered || isActive
                  ? "0 20px 50px rgba(152, 32, 23, 0.2)"
                  : "0 10px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                isHovered || isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,165,0,0.2), transparent 70%)",
                filter: "blur(20px)",
                transform: "scale(1.1)",
              }}
            />

            {/* Number Badge */}
            <div className="relative flex justify-center mb-6">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl transition-all duration-500 ${
                  isHovered || isActive ? "scale-110" : "scale-100"
                }`}
                style={{
                  background:
                    isHovered || isActive
                      ? `linear-gradient(135deg, ${step.color}, #C32B2B)`
                      : `${step.color}15`,
                  color: isHovered || isActive ? "#FFFFFF" : step.color,
                  boxShadow:
                    isHovered || isActive
                      ? `0 8px 25px ${step.color}40`
                      : "none",
                }}
              >
                {step.number}
              </div>

              {/* Pulsing ring */}
              {(isHovered || isActive) && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: `${step.color}20`,
                    animationDuration: "2s",
                  }}
                />
              )}

              {/* Sparkles */}
              {(isHovered || isActive) && (
                <>
                  <Sparkles
                    className="absolute -top-2 -right-2 w-5 h-5 animate-pulse"
                    style={{ color: step.color }}
                  />
                  <Sparkles
                    className="absolute -bottom-2 -left-2 w-4 h-4"
                    style={{
                      color: step.color,
                      animation:
                        "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                </>
              )}
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  isHovered || isActive
                    ? "scale-110 rotate-6"
                    : "scale-100 rotate-0"
                }`}
                style={{
                  background:
                    isHovered || isActive
                      ? `linear-gradient(135deg, ${step.color}, #C32B2B)`
                      : `${step.color}10`,
                }}
              >
                <Icon
                  className={`w-8 h-8 transition-colors duration-500`}
                  style={{
                    color: isHovered || isActive ? "#FFFFFF" : step.color,
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-3">
              <h3
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isHovered || isActive ? "text-[#982017]" : "text-gray-900"
                }`}
              >
                {step.title}
              </h3>

              <p className="text-gray-600 font-medium">{step.description}</p>

              {/* Expandable details */}
              {/* <div
                className={`overflow-hidden transition-all duration-500 ${
                  isHovered || isActive
                    ? 'max-h-32 opacity-100 mt-4'
                    : 'max-h-0 opacity-0 mt-0'
                }`}
              > */}
              <div
                className={`relative bg-white rounded-2xl p-8 border-2
  transition-all duration-500 ease-out will-change-transform ${
    isHovered || isActive
      ? "border-[#982017] shadow-2xl scale-[1.04]"
      : "border-[#E0E0E0] shadow-lg scale-100"
  }`}
              >
                <p className="text-sm text-gray-500 leading-relaxed px-2">
                  {step.details}
                </p>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl transition-all duration-500 ${
                isHovered || isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: `linear-gradient(90deg, ${step.color}, #C32B2B)`,
              }}
            />
          </div>

          {/* Connecting Line (not for last step) */}
          {!isLast && (
            <div className="hidden lg:block absolute top-14 left-full w-full h-1 -ml-4 -mr-4">
              <div className="relative w-full h-full flex items-center">
                {/* Base line */}
                <div className="w-full h-0.5 bg-[#E0E0E0]" />

                {/* Animated progress line */}
                <div
                  className="absolute left-0 h-1 rounded-full transition-all duration-1000"
                  style={{
                    width: `${lineProgress}%`,
                    background: `linear-gradient(90deg, ${step.color}, #C32B2B)`,
                    boxShadow: `0 0 10px ${step.color}60`,
                  }}
                />

                {/* Arrow at the end */}
                <div
                  className={`absolute transition-all duration-500 ${
                    lineProgress > 90
                      ? "opacity-100 right-0"
                      : "opacity-0 right-4"
                  }`}
                  style={{ color: step.color }}
                >
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile connector arrow */}
        {!isLast && (
          <div className="lg:hidden flex justify-center my-6">
            <div
              className={`transition-all duration-700 transform ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{
                transitionDelay: `${index * 150 + 150}ms`,
                color: step.color,
              }}
            >
              <ArrowRight className="w-8 h-8 rotate-90" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#982017] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C32B2B] rounded-full blur-3xl" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "#982017" : "#C32B2B",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
              animation: `float-process ${
                4 + Math.random() * 4
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#982017]/10 to-[#C32B2B]/10 px-5 py-2.5 rounded-full border border-[#982017]/20">
            <Sparkles className="w-5 h-5 text-[#982017]" />
            <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
              Simple Process
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            How It
            <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in just 4 simple steps. We've streamlined the process to
            make tax filing effortless
          </p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-[#982017]/5 to-[#C32B2B]/5 px-10 py-8 rounded-2xl border border-[#982017]/10 shadow-lg">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                Ready to get started?
              </p>
              <p className="text-gray-600">Join 500+ satisfied clients today</p>
            </div>
            <button
              className="px-8 py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 text-lg"
              style={{ boxShadow: "0 8px 25px rgba(152, 32, 23, 0.3)" }}
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-process {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.3);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-40px) translateX(-10px) scale(0.8);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
