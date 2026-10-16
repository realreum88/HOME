import React from 'react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const { config } = useSite();
  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 md:pt-16 pb-28 md:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid: Company Info + Links + Services + Contact */}
        {/* Changed from grid-cols-1 to grid-cols-2 for mobile to mimic PC alignment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 mb-12 md:mb-16 items-start">
          
          {/* Column 1: Company Info */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-3xl font-extrabold text-white leading-tight">
              {config.companyInfo.name}
            </h3>
            <p className="text-gray-400 text-[11px] md:text-base font-medium leading-relaxed whitespace-pre-line break-keep">
              접수부터 수리까지 차근차근<br />
              기기를 살피는 세이프픽스.<br /><br className="hidden md:block" />
              고객님의 소중한 기기에<br />
              다시 일상을 연결합니다.
            </p>
            
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-[12px] md:text-lg font-bold text-white mb-4 md:mb-8 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 md:space-y-4 text-[11px] md:text-base">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                   <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium text-gray-400"
                  >
                    {item === 'Home' ? '홈' : 
                     item === 'About' ? '회사소개' : 
                     item === 'Services' ? '서비스' : 
                     item === 'Portfolio' ? '포트폴리오' : '견적문의'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="flex flex-col">
             <h4 className="text-[12px] md:text-lg font-bold text-white mb-4 md:mb-8 uppercase tracking-wider">Our Services</h4>
             <ul className="space-y-2 md:space-y-4 text-[11px] md:text-base">
               {config.services.slice(0, 5).map(s => (
                 <li key={s.id}>
                   <Link to={`/services/${s.id}`} className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium text-gray-400 truncate max-w-full">
                     {s.title}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h4 className="text-[12px] md:text-lg font-bold text-white mb-4 md:mb-8 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 md:space-y-6 text-[11px] md:text-base">
              <li className="flex items-start gap-2 md:gap-3">
                <MapPin className="flex-shrink-0 text-primary mt-0.5" size={14} />
                <span className="text-gray-400 font-medium leading-snug break-keep">
                  {config.companyInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <Phone className="flex-shrink-0 text-primary" size={14} />
                <a href="#/contact" className="hover:text-white text-gray-300 font-bold text-[13px] md:text-lg transition-colors">
                  연락처 안내 준비 중
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-center gap-2 md:gap-3">
                  <Mail className="flex-shrink-0 text-primary" size={14} />
                  <span className="text-gray-500 font-bold uppercase text-[9px] md:text-xs tracking-widest">Email</span>
                </div>
                <a 
                  href="#/contact" 
                  className="hover:text-white text-gray-300 font-medium pl-5 md:pl-8 text-[11px] md:text-base truncate transition-colors"
                >
                  이메일 안내 준비 중
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] md:text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} {config.companyInfo.name}. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-gray-500">
            Apple 기기 수리 · 세이프픽스
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;