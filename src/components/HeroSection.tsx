'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Award, Users, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { TMessages } from '@/locales/type';
import Link from 'next/link';
type  Props = {
  msg: TMessages
}

function Whatsapp () {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"></path>
</svg>)
}
function WeChat(){
  return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wechat" viewBox="0 0 16 16">
  <path d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.32.32 0 0 0-.12.366l.218.81a.6.6 0 0 1 .029.117.166.166 0 0 1-.162.162.2.2 0 0 1-.092-.03l-1.057-.61a.5.5 0 0 0-.256-.074.5.5 0 0 0-.142.021 5.7 5.7 0 0 1-1.576.22M9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.6.6 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.63.63 0 0 0 .098.356"></path>
  <path d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.5.5 0 0 0-.032.14.19.19 0 0 0 .193.193q.06 0 .111-.029l1.268-.733a.6.6 0 0 1 .308-.088q.088 0 .171.025a6.8 6.8 0 0 0 1.625.26 4.5 4.5 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02l.15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826m4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0m3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0"></path>
</svg>)
}
const AccounTixHero = ({msg}:Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const topBarRef = React.useRef<HTMLDivElement>(null);
const [topBarHeight, setTopBarHeight] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  if (topBarRef.current) {
    setTopBarHeight(topBarRef.current.offsetHeight);
  }

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.service) {
      alert(msg.alerts.validationError);
      return;
    }
    console.log('Form submitted:', formData);
    alert(msg.alerts.successMessage);
    setFormData({ name: '', phone: '', email: '', service: '' });
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/923001234567?text=${msg.whatsapp.defaultMessage}`, '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden"> 
    {/* Top Bar */}
<div
  ref={topBarRef}
  className="w-full bg-[#7A1812] text-white text-sm"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
    
    {/* Left side */}
   <div className="flex items-center space-x-2">
 <a 
                href="#" 
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
              >
                <WeChat />
                <span>{msg.navbar.menu.wechat}</span>
              </a>
              <a 
                href="https://wa.me/923350522833" 
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#C32B2B] to-[#C32B2B] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
              >
                <Whatsapp />
                <span>{msg.navbar.menu.whatsapp}</span>
              </a>
              <a 
                href="mailto:ceo@abidalico.com" 
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r to-[#982017] from-[#C32B2B] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
              >
                <Mail className="w-4 h-4" />
                <span>{msg.navbar.menu.email}</span>
              </a>
   {/* WeChat */}
  {/* <a
    href="https://weixin.qq.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-green-100 hover:border-green-400 transition"
  >
    <MessageCircle className="w-5 h-5 text-green-600" />
    <span className="text-white font-medium">WeChat</span>
  </a> */}

  {/* WhatsApp */}
  {/* <a
    href="https://wa.me/923001234567"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-green-100 hover:border-green-500 transition"
  >
    <Whatsapp   />
    <span className="text-gray-700 font-medium">WhatsApp</span>
  </a> */}

  {/* Email */}
  {/* <a
    href="mailto:ceo@abidalico.com"
    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-orange-100 hover:border-orange-400 transition"
  >
    <Mail className="w-5 h-5 text-orange-500" />
    <span className="text-gray-700 font-medium">Email</span>
  </a> */}
</div>

    {/* Right side */}
    <div className="flex items-center space-x-4">
        {/* English */}
  <Link href={'/en'} className="relative px-3 py-1 font-semibold text-white overflow-hidden rounded-md group">
    {/* <span className="absolute inset-0 bg-[url('/flags/gb.svg')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition"></span>
    <span className="relative z-10">EN</span> */}
    <img src="/pk.png" alt="" className=" h-6 w-10" />
  </Link>

  {/* Chinese */}
  <Link href={'/'} className="relative px-3 py-1 font-semibold text-white overflow-hidden rounded-md group">
  <img src="/ch.png" alt="" className=" h-6 w-10" />
    {/* <span className="absolute inset-0 bg-[url('/cn.png')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition"></span> */}
    {/* <span className="relative z-10">ZH</span> */}
  </Link>

      {/* <button className="hover:underline">EN</button>
      <button className="hover:underline">UR</button> */}
    </div>

  </div>
</div>
<nav
  style={{
    top: isScrolled ? 0 : topBarHeight
  }}
  className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled
      ? 'bg-white shadow-lg py-3'
      : 'bg-transparent py-5'
  }`}
>
{/* <nav
  className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled
      ? 'top-0 bg-white shadow-lg py-3'
      : `top-[${topBarHeight}px] bg-transparent py-5`
  }`}
> */}
      {/* <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center"> 
            <div className="flex items-center space-x-3 group">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-[#FFFFFF] to-[#DCDCDC]' 
                  : 'bg-white backdrop-blur-sm'
              }`}>
             
                <Image src="/365Png.png" height={28} width={28} alt='logo'
                 
                />
              </div>
              <div>
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#982017]' : 'text-white'
                }`}>
                  {msg.brand.name}
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-white/80'
                }`}>
                  {msg.brand.tagline}
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#services" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.services}
              </a>
              <a href="#about" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.about}
              </a>
              <a href="#process" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.howItWorks}
              </a>
              <a href="#contact" className={`font-medium transition-colors duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.contact}
              </a>
              <a 
                href="tel:+923001234567" 
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 4px 15px rgba(152, 32, 23, 0.3)' }}
              >
                <Phone className="w-4 h-4" />
                <span>{msg.navbar.menu.callNow}</span>
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
                {msg.navbar.menu.services}
              </a>
              <a href="#about" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.about}
              </a>
              <a href="#process" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.howItWorks}
              </a>
              <a href="#contact" className={`block py-2 font-medium transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {msg.navbar.menu.contact}
              </a>
              <a 
                href="tel:+923001234567" 
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white rounded-lg font-medium shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>{msg.navbar.menu.callNow}</span>
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
                  <span className="text-white text-sm font-medium">{msg.hero.trustedBadge}</span>
                </div>
                
                {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-4 sm:leading-4 lg:leading-5">
                  {msg.hero.headline.line1}
                  <span className="block mt-2 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    {msg.hero.headline.line2}
                  </span>
                </h1> */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
  {msg.hero.headline.line1}

  <span className="block mt-0.5 text-2xl sm:text-3xl lg:text-4xl font-normal bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent leading-[1.05]">
    {msg.hero.headline.line2}
  </span>
</h1>
                
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                  {msg.hero.description}
                </p>
              </div>

              {/* Key USPs */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{msg.stats.experience.value}</p>
                  <p className="text-white/80 text-sm">{msg.stats.experience.label}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{msg.stats.clients.value}</p>
                  <p className="text-white/80 text-sm">{msg.stats.experience.label}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{msg.stats.certified.value}</p>
                  <p className="text-white/80 text-sm">{msg.stats.certified.label}</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">{msg.trustBadges.secp}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">{msg.trustBadges.fbr}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">{msg.trustBadges.iso}</span>
                </div>
              </div>
            </div>

            {/* Right Form - 40% */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {msg.form.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {msg.form.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {msg.form.fields.fullName.label}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none"
                      placeholder={msg.form.fields.fullName.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {msg.form.fields.phone.label}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none"
                      placeholder={msg.form.fields.phone.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {msg.form.fields.email.label}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none"
                      placeholder={msg.form.fields.email.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {msg.form.fields.service.label}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#982017] focus:border-transparent transition-all duration-300 outline-none appearance-none"
                      >
                        <option value="">{msg.form.fields.service.placeholder}</option>
                        <option value="tax-filing">{msg.form.fields.service.options.taxFiling}</option>
                        <option value="corporate-tax">{msg.form.fields.service.options.corporateTax}</option>
                        <option value="business-reg">{msg.form.fields.service.options.businessRegistration}</option>
                        <option value="audit">{msg.form.fields.service.options.audit}</option>
                        <option value="financial">{msg.form.fields.service.options.financialPlanning}</option>
                        <option value="vat">{msg.form.fields.service.options.vat}</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-gradient-to-r from-[#982017] to-[#C32B2B] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                    style={{ boxShadow: '0 8px 20px rgba(152, 32, 23, 0.3)' }}
                  >
                    <span>{msg.form.buttons.submit}</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-4 bg-[#25D366] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{msg.form.buttons.whatsapp}</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-2">
                    {msg.form.footerNote}
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