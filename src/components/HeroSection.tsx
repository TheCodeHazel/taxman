'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Award, Users, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const AccounTixHero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.service) {
      alert('Please fill all required fields');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you within 2 hours.');
    setFormData({ name: '', phone: '', email: '', service: '' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/923001234567?text=Hello, I need tax consultation', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-[#FFFFFF] to-[#DCDCDC]' 
                  : 'bg-white backdrop-blur-sm'
              }`}>
              {/* <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-[#982017] to-[#C32B2B]' 
                  : 'bg-white/10 backdrop-blur-sm'
              }`}> */}
                {/* <Award className={`w-7 h-7 transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`} /> */}
                {/* <Image src="/365Png.png" height={28} width={28} alt='logo'
                style={{filter: 'brightness(0) invert(1);'}}
                /> */}
                <Image src="/365Png.png" height={28} width={28} alt='logo'
                // style={{filter: 'brightness(0) invert(1);'}}
                />
              </div>
              <div>
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#982017]' : 'text-white'
                }`}>
                  365AccounTix
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-white/80'
                }`}>
                  Accounting | Tax | Business Solution
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#services" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Services
              </a>
              <a href="#about" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                About
              </a>
              <a href="#process" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                How It Works
              </a>
              <a href="#contact" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Contact
              </a>
              <a 
                href="tel:+923001234567" 
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3">
              <a href="#services" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Services
              </a>
              <a href="#about" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                About
              </a>
              <a href="#process" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                How It Works
              </a>
              <a href="#contact" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Contact
              </a>
              <a 
                href="tel:+923001234567" 
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-medium shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-[#982017] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C32B2B]/30 rounded-full blur-3xl" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 60% */}
            <div className="lg:col-span-3 space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Trusted by 500+ Businesses</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Islamabad's Trusted
                  <span className="block mt-2 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    Tax & Business Consultancy
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                  Expert tax filing, business registration & financial consulting for individuals & businesses across Pakistan
                </p>
              </div>

              {/* Key USPs */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">15+ Years</p>
                  <p className="text-white/80 text-sm">Experience</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">500+</p>
                  <p className="text-white/80 text-sm">Clients Served</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">Certified</p>
                  <p className="text-white/80 text-sm">By Government</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">SECP Registered</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">FBR Authorized</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
              </div>
            </div>

            {/* Right Form - 40% */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Free Consultation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fill the form below and our expert will contact you
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="+92 300 1234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none appearance-none"
                      >
                        <option value="">Select a service</option>
                        <option value="tax-filing">Individual Tax Filing</option>
                        <option value="corporate-tax">Corporate Tax Services</option>
                        <option value="business-reg">Business Registration</option>
                        <option value="audit">Audit & Compliance</option>
                        <option value="financial">Financial Planning</option>
                        <option value="vat">VAT/Sales Tax Returns</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                    style={{ boxShadow: '0 8px 20px rgba(152, 32, 23, 0.3)' }}
                  >
                    <span>Get Free Consultation</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-4 bg-[#25D366] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-2">
                    ⚡ Response within 2 hours • 100% confidential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccounTixHero;