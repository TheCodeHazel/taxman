'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, Quote, ChevronDown, ChevronUp, Phone, Mail, MapPin, Clock,
  Facebook, Twitter, Linkedin, Instagram, MessageCircle, Send,
  FileText, Building2, Users, Sparkles
} from 'lucide-react';
import Image from 'next/image';


type Testimonial = {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const FinalSections = () => {
  // Testimonials state
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);
  const testimonialsRef = useRef<HTMLElement | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleFaqs, setVisibleFaqs] = useState<number[]>([]);
const faqRef = useRef<HTMLElement | null>(null);

  const testimonials:Testimonial[] = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "CEO, Tech Solutions Ltd",
      rating: 5,
      text: "365AccounTix has been handling our corporate taxes for 3 years now. Their expertise in Pakistani tax laws is unmatched. They saved us significant money through proper planning and always deliver on time.",
      avatar: "AH"
    },
    {
      id: 2,
      name: "Fatima Khan",
      role: "Small Business Owner",
      rating: 5,
      text: "As a first-time business owner, I was overwhelmed with tax compliance. 365AccounTix made everything so simple and explained every step. Their personalized service is worth every penny!",
      avatar: "FK"
    },
    {
      id: 3,
      name: "Usman Ali",
      role: "Freelance Consultant",
      rating: 5,
      text: "Filing individual returns used to be a nightmare. 365AccounTix's online system is incredibly easy, and their team is always available to answer questions. Highly recommended for freelancers!",
      avatar: "UA"
    }
  ];

  const faqs:Faq[] = [
    {
      id: 1,
      question: "What documents do I need for tax filing in Pakistan?",
      answer: "For individual tax filing, you'll need your CNIC, salary slips or income proof, bank statements, previous year's tax returns (if applicable), and details of any investments or property. For businesses, additional documents include business registration certificates, financial statements, and expense receipts. Our team will provide a complete checklist based on your specific situation."
    },
    {
      id: 2,
      question: "How much does tax consultancy cost in Islamabad?",
      answer: "Our pricing is transparent and competitive. Individual tax filing starts from PKR 5,000, while corporate tax services are customized based on business size and complexity. We provide detailed quotes upfront with no hidden fees. Contact us for a free consultation and personalized quote for your needs."
    },
    {
      id: 3,
      question: "Can you help with FBR registration online?",
      answer: "Yes! We handle complete FBR registration including NTN registration, sales tax registration, and income tax registration. Our team manages the entire online process through the FBR's IRIS portal, ensuring all documentation is correct and submitted on time. We also provide post-registration support for any FBR queries."
    },
    {
      id: 4,
      question: "What's the deadline for income tax returns in Pakistan?",
      answer: "The standard deadline for filing income tax returns in Pakistan is September 30th for salaried individuals and December 31st for businesses and non-salaried individuals. However, deadlines may vary based on your taxpayer category. We recommend filing early to avoid last-minute rush and potential penalties."
    },
    {
      id: 5,
      question: "Do you assist with corporate tax audits?",
      answer: "Absolutely! Our experienced team provides comprehensive audit support including pre-audit preparation, documentation review, representation before FBR officials, and post-audit compliance. We've successfully handled numerous corporate tax audits and help businesses navigate the audit process smoothly with minimal disruption."
    },
    {
      id: 6,
      question: "How do I contact 365AccounTix consultancy?",
      answer: "You can reach us multiple ways: Call us at +92 51 1234567, WhatsApp at +92 300 1234567, email us at info@365AccounTix.com, or visit our office in Blue Area, Islamabad. You can also fill out the contact form on our website for a callback within 2 hours during business hours."
    }
  ];

  useEffect(() => {
    // Testimonials intersection observer
    const testimonialsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTestimonials((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (testimonialsRef.current) {
      testimonialsObserver.observe(testimonialsRef.current);
    }

    // FAQ intersection observer
    const faqObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            faqs.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFaqs((prev) => [...new Set([...prev, index])]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (faqRef.current) {
      faqObserver.observe(faqRef.current);
    }

    return () => {
      testimonialsObserver.disconnect();
      faqObserver.disconnect();
    };
  }, []);

  const TestimonialCard = ({ testimonial, index }: {
  testimonial: Testimonial;
  index: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const isVisible = visibleTestimonials.includes(index);

    return (
      <div
        className={`transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative bg-white rounded-2xl p-8 shadow-lg border-l-4 transition-all duration-500 h-full ${
          isHovered ? 'shadow-2xl scale-105' : 'shadow-lg scale-100'
        }`}
          style={{
            borderImage: 'linear-gradient(180deg, #982017, #C32B2B) 1'
          }}
        >
          {/* Quotation mark */}
          <div className="absolute top-6 right-6 opacity-10">
            <Quote className="w-16 h-16 text-[#982017]" />
          </div>

          {/* Rating */}
          <div className="flex space-x-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-orange-400 text-orange-400"
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
            "{testimonial.text}"
          </p>

          {/* Author */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#982017] to-[#C32B2B] flex items-center justify-center text-white font-bold">
              {testimonial.avatar}
            </div>
            <div>
              <div className="font-bold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-600">{testimonial.role}</div>
            </div>
          </div>

          {/* Hover glow */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle at bottom right, rgba(255,165,0,0.1), transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
        </div>
      </div>
    );
  };

  const FaqItem = ({ faq, index }: {
  faq: Faq;
  index: number;
}) => {
    const isOpen = openFaq === faq.id;
    const isVisible = visibleFaqs.includes(index);

    return (
      <div
        className={`transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <div className="bg-white rounded-xl shadow-md border border-[#E0E0E0] overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <button
            onClick={() => setOpenFaq(isOpen ? null : faq.id)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
            <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-6 h-6 text-[#982017]" />
            </div>
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-5 pt-2">
              <div className="h-px bg-gradient-to-r from-[#982017] to-[#C32B2B] mb-4 opacity-20" />
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* TESTIMONIALS SECTION */}
      <section ref={testimonialsRef} className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-0 w-96 h-96 bg-[#982017] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#982017]/5 px-5 py-2.5 rounded-full border border-[#982017]/10">
              <Star className="w-5 h-5 text-[#982017] fill-[#982017]" />
              <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
                Client Testimonials
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              What Our Clients
              <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to share
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section ref={faqRef} className="relative bg-[#F8F8F8] py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#E0E0E0]">
              <Sparkles className="w-5 h-5 text-[#982017]" />
              <span className="text-[#982017] text-sm font-bold uppercase tracking-wider">
                FAQ
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Frequently Asked
              <span className="block mt-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>

            <p className="text-xl text-gray-600">
              Got questions? We've got answers
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.id} faq={faq} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Contact Our Team</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Company Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#DFDFDF] to-[#C32B2B] flex items-center justify-center">
                    {/* <FileText className="w-6 h-6 text-white" /> */}
                    <Image src="/365Png.png" height={28} width={28} alt='logo'/>
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-bold">365AccounTix</h3>
                    <p className="text-xs text-gray-400">Accounting | Tax | Business Solution</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  Your trusted partner in tax and business consultancy. Serving Islamabad and beyond since 2010.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#982017] transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#982017] transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#982017] transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#982017] transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="hover:text-[#982017] transition-colors duration-300 flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                    <span>Our Services</span>
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#982017] transition-colors duration-300 flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[#982017] transition-colors duration-300 flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                    <span>How It Works</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-[#982017] transition-colors duration-300 flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                    <span>Testimonials</span>
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#982017] transition-colors duration-300 flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="text-white text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#982017] flex-shrink-0 mt-1" />
                  <span className="text-sm">Blue Area, Plot 123, Islamabad, Pakistan</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#982017]" />
                  <a href="tel:+925112345678" className="text-sm hover:text-[#982017] transition-colors">
                    +92 51 1234567
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-[#982017]" />
                  <a href="https://wa.me/923001234567" className="text-sm hover:text-[#982017] transition-colors">
                    +92 300 1234567
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#982017]" />
                  <a href="mailto:info@365AccounTix.com" className="text-sm hover:text-[#982017] transition-colors">
                    info@365AccounTix.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Business Hours */}
            <div>
              <h4 className="text-white text-lg font-bold mb-6">Business Hours</h4>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#982017]" />
                  <span className="text-sm font-semibold text-white">Mon - Fri</span>
                </div>
                <p className="text-sm ml-8">9:00 AM - 6:00 PM</p>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#982017]" />
                  <span className="text-sm font-semibold text-white">Saturday</span>
                </div>
                <p className="text-sm ml-8">10:00 AM - 4:00 PM</p>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-500">Sunday</span>
                </div>
                <p className="text-sm ml-8 text-gray-500">Closed</p>
              </div>

              <a
                href="#"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-[#982017] rounded-lg transition-colors duration-300 text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>View on Map</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                © 2025 365AccounTix Consultancy. All rights reserved.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-[#982017] transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-[#982017] transition-colors">
                  Terms of Service
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-[#982017] transition-colors">
                  Cookie Policy
                </a>
              </div>
              
              <p className="text-sm text-gray-400">
                {/* Developed by <span className="text-[#982017] font-semibold">David</span> */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FinalSections;