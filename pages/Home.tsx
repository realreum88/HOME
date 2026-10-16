import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Clock, Sparkles, Quote, Rss, Calendar, Loader2, ArrowUpRight, Target, Compass, Heart, Zap, Shield, Trees, Home as LucideHome, Leaf, ShieldAlert, ChevronDown, HelpCircle, MousePointerClick, ClipboardCheck, Wrench, MapPin, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';

const zelkovaHero = 'images/original-hero.jpg';
const zelkovaMobileHero = 'images/original-hero.jpg';
const expertPhilosophyMobile = 'https://i.ibb.co/HLmZYq8S/image.png';
const expertPhilosophyDesktop = 'https://i.ibb.co/pBCh5d2x/pc.png';
const anxietyTopImage = 'images/lab-1.jpg';



interface NaverRssItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  thumbnail: string;
  description: string;
  content: string;
  blogName?: string;
  blogCode?: string;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=850&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=850&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=850&auto=format&fit=crop&q=80'
];

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  categoryName: string;
  qas: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    "category": "reservation",
    "categoryName": "접수 · 견적",
    "qas": [
      {
        "q": "어떤 정보를 알려드리면 되나요?",
        "a": "기기 모델명, 고장 증상, 이전 수리 여부를 알려주세요. 화면 파손 등 외관 문제는 사진이 있으면 상담에 도움이 됩니다."
      },
      {
        "q": "수리 비용은 어떻게 결정되나요?",
        "a": "모델과 고장 부위, 필요한 작업에 따라 달라집니다. 점검 결과를 바탕으로 수리 범위와 비용을 확인한 뒤 진행 여부를 결정하세요."
      }
    ]
  },
  {
    "category": "process",
    "categoryName": "수리 과정",
    "qas": [
      {
        "q": "수리 시간은 얼마나 걸리나요?",
        "a": "모델과 증상, 부품 수급 상황에 따라 다릅니다. 접수 시 예상 소요 시간을 확인해주세요."
      },
      {
        "q": "전원이 켜지지 않아도 점검할 수 있나요?",
        "a": "전원 불량은 배터리, 충전 회로, 메인보드 등 여러 원인으로 발생할 수 있습니다. 증상을 바탕으로 점검 가능 여부를 상담해주세요."
      }
    ]
  },
  {
    "category": "data",
    "categoryName": "데이터 · 준비",
    "qas": [
      {
        "q": "수리 전에 백업해야 하나요?",
        "a": "가능하면 방문 전 중요한 데이터를 백업해주세요. 기기 상태와 작업 방식에 따라 데이터에 영향을 줄 수 있으므로 접수 시 데이터 보존 필요 여부를 알려주세요."
      },
      {
        "q": "침수된 기기는 어떻게 해야 하나요?",
        "a": "충전과 전원 켜기를 피하고, 가능한 상태 그대로 상담해주세요. 겉이 마른 상태만으로 내부가 안전하다고 판단하기는 어렵습니다."
      }
    ]
  },
  {
    "category": "aftercare",
    "categoryName": "보증 · 사후 관리",
    "qas": [
      {
        "q": "수리 후 보증은 어떻게 되나요?",
        "a": "보증 기간과 적용 범위는 수리 항목에 따라 확인이 필요합니다. 접수 시 보증 조건과 제외 사항을 안내받으세요."
      },
      {
        "q": "기업이나 학교의 여러 기기도 상담할 수 있나요?",
        "a": "기기별 모델, 수량, 증상과 희망 일정을 정리해 상담해주세요. 작업 가능 범위와 일정을 함께 확인할 수 있습니다."
      }
    ]
  }
];

const Home: React.FC = () => {
  const { config } = useSite();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rssItems, setRssItems] = useState<NaverRssItem[]>([]);
  const [rssLoading, setRssLoading] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [spotlights, setSpotlights] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [activeFAQTab, setActiveFAQTab] = useState<string>('all');
  const [openFAQIdx, setOpenFAQIdx] = useState<string | null>(null);
  const [faqDropdownOpen, setFaqDropdownOpen] = useState(false);


  const handleCardMouseMove = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlights(prev => ({
      ...prev,
      [idx]: { x, y }
    }));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

    return (
    <div className="flex flex-col bg-light text-textMain">
{/* 구조(애플바 메인 기준): 퀵메뉴 → 메인배너 → 수리 서비스 배너 → 매장 안내 → 리얼 후기 → 이벤트·제휴 → 공지·FAQ → 상담 배너 → 실시간 수리현황 */}
<section id="quick" className="py-10 md:py-14 bg-white relative border-b border-slate-100"><div className="max-w-7xl mx-auto px-4 md:px-8"><div className="grid grid-cols-4 gap-3 sm:gap-6">{[{t:'이용후기',to:'/portfolio',I:Star},{t:'수리 상담',to:'/contact',I:ClipboardCheck},{t:'수리 서비스',to:'/services',I:Wrench},{t:'매장 안내',to:'/locations',I:MapPin}].map(({t,to,I})=><motion.div key={t} whileHover={{y:-6}}><Link to={to} className="p-4 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><I className="text-primary mb-3 md:mb-5" size={30}/><span className="text-[13px] md:text-xl font-extrabold text-slate-900 whitespace-nowrap">{t}</span></Link></motion.div>)}</div></div></section>
<section id="top" className="relative min-h-[calc(100vh-6rem)] md:h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white">
        {/* Mobile Background Image (Absolute full-bleed background on mobile for vertical image) */}
        <div className="block md:hidden absolute inset-0 z-0">
          <img 
            src={zelkovaMobileHero} 
            alt="원본 디자인의 그린 히어로 배경" 
            className="w-full h-full object-cover object-center"
          />
          {/* Elegant overlay that lets the image show through clearly and vividly, keeping the text readable */}
          <div className="absolute inset-0 bg-white/50" />
        </div>

        {/* Desktop Background Image (Hidden on mobile, absolute overlay on PC) */}
        <div 
          className="hidden md:block absolute inset-0 z-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.05)`
          }}
        >
          <img 
            src={zelkovaHero} 
            alt="원본 디자인의 그린 히어로 배경" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/30 md:bg-white/25" />
        </div>

        {/* Text and Buttons Container */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 md:py-0 -translate-y-10 md:translate-y-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl md:max-w-6xl mx-auto flex flex-col items-center justify-center"
          >
            <h1 className="font-extrabold text-slate-900 mb-4 md:mb-8 leading-tight drop-shadow-sm break-keep text-center flex flex-col items-center">
              <span className="block text-[13px] sm:text-sm md:text-2xl text-[#444a53] font-extrabold mb-1.5 md:mb-4 uppercase tracking-[0.2em]">
                SAFE REPAIR. BETTER EVERYDAY.
              </span>
              <span className="text-[25px] sm:text-4xl md:text-7xl block mb-1 md:mb-3">
                정확한 <span className="text-[#0071e3] font-black">진단</span>으로
              </span>
              <span className="text-[25px] sm:text-4xl md:text-7xl block">
                <span className="text-[#0071e3] font-black">소중한 기기</span>를 되살립니다
              </span>
            </h1>

            <div className="text-[18px] md:text-xl text-[#000000] mb-5 md:mb-10 leading-[26px] md:leading-relaxed font-bold max-w-2xl md:max-w-3xl mx-auto break-keep text-center">
              <p className="mb-4 md:mb-6 md:text-[25.5px] md:leading-relaxed">
                아이패드부터 아이폰까지,<br />기기의 상태를 먼저 확인하고<br />
                필요한 수리를 안내합니다.
              </p>
              <p className="md:text-[25.5px] md:leading-relaxed">
                다시 안심하고 사용할 수 있도록<br />
                수리의 기본을 지킵니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link to="/contact" className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-primary text-white text-base sm:text-lg font-bold rounded-xl hover:bg-primaryDark transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
                  수리 상담 준비 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
<section id="services" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 md:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-2xl md:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4">전문적인 수리 솔루션</h3>
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md transition-all">
              <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
              <span>아래 사진을 클릭하면 이동합니다</span>
              <span className="inline-block animate-bounce text-base sm:text-lg">👇</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {config.services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="w-full h-full lg:max-w-[310px] lg:mx-auto"
              >
                <Link 
                  to={`/services/${service.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full w-full"
                >
                  <div className="h-32 sm:h-48 lg:h-52 overflow-hidden relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex items-center justify-center text-center">
                    <h4 className="text-[17px] sm:text-[20px] md:text-[22px] lg:text-[23px] font-extrabold text-slate-900 group-hover:text-primary transition-colors break-keep">
                      {service.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<section id="locations" className="py-16 md:py-24 bg-surface relative"><div className="max-w-7xl mx-auto px-4 md:px-8"><div className="text-center mb-10 md:mb-16"><h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">방문 · 접수 안내</h2><p className="text-slate-500 text-sm md:text-base">매장 주소와 연락처, 운영시간은 확정 후 안내됩니다.</p><Link to="/contact" className="inline-flex items-center gap-1 mt-4 text-primary hover:text-primaryDark font-bold text-sm md:text-base">더보기 <ArrowRight size={16}/></Link></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">매장 위치</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">주소 안내 준비 중</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">연락처</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">상담 채널 안내 준비 중</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">운영시간</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">영업시간 안내 준비 중</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">접수 전 준비</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">모델명 · 증상 · 데이터 백업</p></motion.div></div></div></section>
<section id="reviews" className="py-16 md:py-24 bg-white relative border-t border-slate-100"><div className="max-w-7xl mx-auto px-4 md:px-8"><div className="text-center mb-10 md:mb-16"><h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">수리 이야기 · 이용후기</h2><p className="text-slate-500 text-sm md:text-base">실제 고객 후기는 준비되는 대로 이곳에 안내하겠습니다.</p><Link to="/contact" className="inline-flex items-center gap-1 mt-4 text-primary hover:text-primaryDark font-bold text-sm md:text-base">더보기 <ArrowRight size={16}/></Link></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">{config.services.slice(0,5).map(s=><motion.div key={s.id} whileHover={{y:-6}}><Link to={`/services/${s.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"><div className="relative aspect-video w-full overflow-hidden bg-slate-100"><img src={s.image} alt={s.title+' 안내 이미지'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/><span className="absolute top-3 left-3 bg-primary text-white text-xs font-black px-2 py-0.5 rounded">수리 안내</span></div><div className="p-4 md:p-5"><h4 className="text-sm md:text-lg font-bold text-slate-900 mb-2">{s.title}</h4><p className="text-slate-500 text-xs md:text-sm line-clamp-2">{s.description}</p></div></Link></motion.div>)}</div></div></section>
<section id="b2b" className="py-16 md:py-24 bg-surface relative"><div className="max-w-7xl mx-auto px-4 md:px-8"><div className="text-center mb-10 md:mb-16"><h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">이벤트 · 기업·기관 제휴</h2><p className="text-slate-500 text-sm md:text-base">여러 대의 기기는 모델, 수량, 증상과 희망 일정을 정리해주세요.</p><Link to="/contact" className="inline-flex items-center gap-1 mt-4 text-primary hover:text-primaryDark font-bold text-sm md:text-base">더보기 <ArrowRight size={16}/></Link></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">기업 · 법인</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">업무용 기기 점검 상담</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">학교 · 교육기관</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">학습용 기기 수리 상담</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">다수 기기</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">기기별 증상·수량·일정 협의</p></motion.div></div></div></section>
<section id="faq" className="py-20 md:py-28 bg-gradient-to-br from-[#f1f5fa] via-[#fafbfd] to-[#edf2f8] relative overflow-hidden border-b border-slate-100/80">
        {/* Premium subtle dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#0071e3_0.8px,transparent_0.8px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.06] pointer-events-none" />
        
        {/* Soft eco-inspired backdrop highlights */}
        <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-blue-400/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-sky-400/12 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[18px] min-[360px]:text-[20px] min-[400px]:text-[22px] sm:text-[32px] md:text-[36.4px] font-black text-slate-900 mb-3.5 leading-tight tracking-tight whitespace-nowrap">
              가장 많이 질문하시는 <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-500 bg-clip-text text-transparent underline decoration-blue-300 decoration-wavy underline-offset-8">안심 Q&A</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-bold max-w-2xl mx-auto break-keep">
              궁금한 점을 명쾌하게 해결해 드립니다.
            </p>
          </div>

          {/* Mobile FAQ Dropdown Selector */}
          <div className="block md:hidden relative mb-8 z-30">
            <button
              onClick={() => setFaqDropdownOpen(!faqDropdownOpen)}
              className="w-full flex items-center justify-between bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50/90 border-2 border-blue-500 rounded-2xl px-3.5 sm:px-5 py-3.5 text-sm font-extrabold text-slate-900 shadow-md shadow-blue-500/10 active:scale-[0.99] transition-all duration-200"
            >
              <span className="flex items-center gap-2 overflow-hidden">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                {activeFAQTab === 'all' ? (
                  <span className="flex items-center gap-1.5 min-[380px]:gap-2 whitespace-nowrap overflow-hidden">
                    <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black shadow-sm shrink-0">
                      전체 보기
                    </span>
                    <span className="text-[11.5px] min-[360px]:text-xs min-[400px]:text-[13px] text-blue-950 font-extrabold tracking-tight whitespace-nowrap">
                      (궁금하신 카테고리 선택)
                    </span>
                  </span>
                ) : (
                  <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black shadow-sm">
                    {FAQ_DATA.find((cat) => cat.category === activeFAQTab)?.categoryName || ''}
                  </span>
                )}
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm ml-1">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    faqDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {faqDropdownOpen && (
              <>
                {/* Backdrop to close dropdown easily on clicking outside */}
                <div
                  className="fixed inset-0 z-20 cursor-default"
                  onClick={() => setFaqDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-30 py-1.5"
                >
                  <button
                    onClick={() => {
                      setActiveFAQTab('all');
                      setOpenFAQIdx(null);
                      setFaqDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-between ${
                      activeFAQTab === 'all'
                        ? 'bg-blue-50 text-[#005bb5] font-black'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>전체 보기</span>
                    {activeFAQTab === 'all' && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </button>
                  {FAQ_DATA.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => {
                        setActiveFAQTab(cat.category);
                        setOpenFAQIdx(null);
                        setFaqDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3.5 text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-between ${
                        activeFAQTab === cat.category
                          ? 'bg-blue-50 text-[#005bb5] font-black'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.categoryName}</span>
                      {activeFAQTab === cat.category && (
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>

          {/* Desktop Category Navigation Bar (Single Line Segmented Control) */}
          <div className="hidden md:flex items-center justify-center mb-10">
            <div className="inline-flex items-center p-1.5 bg-slate-100/90 backdrop-blur-md border border-slate-200/90 rounded-full shadow-inner max-w-full overflow-x-auto scrollbar-none gap-1">
              <button
                onClick={() => {
                  setActiveFAQTab('all');
                  setOpenFAQIdx(null);
                }}
                className={`whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-full text-xs lg:text-sm font-black transition-all duration-200 cursor-pointer ${
                  activeFAQTab === 'all'
                    ? 'bg-gradient-to-r from-[#005bb5] to-[#0071e3] text-white shadow-md shadow-blue-600/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                전체 보기
              </button>
              {FAQ_DATA.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveFAQTab(cat.category);
                    setOpenFAQIdx(null);
                  }}
                  className={`whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-full text-xs lg:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    activeFAQTab === cat.category
                      ? 'bg-gradient-to-r from-[#005bb5] to-[#0071e3] text-white shadow-md shadow-blue-600/25 font-black scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive FAQ Accordion List */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQ_DATA.filter(cat => activeFAQTab === 'all' || cat.category === activeFAQTab)
              .flatMap((cat) => cat.qas.map((qa, index) => {
                const uniqueKey = `${cat.category}-${index}`;
                const isOpen = openFAQIdx === uniqueKey;

                return (
                  <div
                    key={uniqueKey}
                    className={`bg-white border rounded-2xl md:rounded-3xl transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/5'
                        : 'border-slate-200/90 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    {/* Header / Question Trigger */}
                    <button
                      onClick={() => setOpenFAQIdx(isOpen ? null : uniqueKey)}
                      className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex gap-3 sm:gap-4 items-center flex-1">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-sm sm:text-base transition-colors ${
                          isOpen ? 'bg-[#005bb5] text-white shadow-md' : 'bg-blue-100/90 text-[#005bb5]'
                        }`}>
                          Q
                        </div>
                        <div className="flex-1">
                          <span className={`text-[15px] sm:text-[18px] md:text-[19px] font-extrabold leading-snug tracking-tight break-keep transition-colors duration-150 ${
                            isOpen ? 'text-[#005bb5]' : 'text-slate-900 group-hover:text-blue-700'
                          }`}>
                            {qa.q}
                          </span>
                        </div>
                      </div>
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen ? 'bg-blue-500 text-white rotate-180 shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}>
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </div>
                    </button>

                    {/* Collapsible Answer Body */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0
                      }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-7 sm:pb-7 text-left">
                        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 to-slate-50 border border-blue-100/80 flex gap-3.5 sm:gap-4 items-start shadow-inner">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            A
                          </div>
                          <div className="text-slate-800 text-[14px] sm:text-[16.5px] md:text-[17px] leading-relaxed font-semibold break-keep whitespace-pre-line flex-1">
                            {qa.a}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              }))}
          </div>

          {/* Bottom Trust Badge */}
          <div className="text-center mt-12 md:mt-16 p-6 sm:p-8 bg-gradient-to-r from-[#005bb5] via-[#005bb5] to-[#123454] text-white rounded-3xl max-w-2xl mx-auto shadow-xl shadow-blue-950/20 border border-blue-400/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg font-extrabold text-white leading-snug break-keep">
                💡 찾으시는 답변이 없으신가요?
              </p>
              <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1 break-keep">
                언제든 문의해 주시면 친절하고 속 시원히 안내해 드리겠습니다.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 px-5 py-2.5 bg-white text-[#005bb5] hover:bg-blue-50 text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 transform hover:scale-105"
            >
              <span>무료 상담 신청</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
<section id="contact" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[20px] sm:text-4xl md:text-5xl font-extrabold text-white mb-6 whitespace-nowrap"
          >
            소중한 기기, 다시 일상으로
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 mb-10 text-lg md:text-2xl font-medium break-keep"
          >
            기기 모델과 증상을 알려주세요. 필요한 수리부터 차근차근 살펴보겠습니다.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
             <motion.a 
               whileHover={{ scale: 1.04, y: -2 }}
               whileTap={{ scale: 0.96 }}
               href="#/contact" 
               className="px-6 py-4 md:px-10 md:py-5 bg-white text-primaryDark text-[16px] md:text-xl font-extrabold rounded-xl hover:bg-slate-50 transition-all shadow-lg whitespace-nowrap"
             >
               전화 상담 수리 상담 준비
             </motion.a>
             <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
               <Link to="/contact" className="block px-6 py-4 md:px-10 md:py-5 bg-primaryDark text-white text-[16px] md:text-xl font-extrabold rounded-xl hover:bg-[#0066cc] transition-all shadow-lg border border-white/20 whitespace-nowrap">
                 온라인 견적 문의
               </Link>
             </motion.div>
          </div>
        </div>
      </section>
<section id="status" className="py-16 md:py-24 bg-surface relative"><div className="max-w-7xl mx-auto px-4 md:px-8"><div className="text-center mb-10 md:mb-16"><h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">실시간 수리 현황</h2><p className="text-slate-500 text-sm md:text-base">접수와 완료 현황은 고객 정보를 가린 상태로 안내됩니다.</p></div><div className="rounded-3xl bg-white border border-slate-100/80 shadow-sm overflow-hidden"><table className="w-full text-left text-xs md:text-base"><thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="px-4 md:px-8 py-4 font-bold">상태</th><th scope="col" className="px-4 md:px-8 py-4 font-bold">고객</th><th scope="col" className="px-4 md:px-8 py-4 font-bold">기기</th><th scope="col" className="px-4 md:px-8 py-4 font-bold hidden sm:table-cell">접수일</th></tr></thead><tbody><tr><td colSpan={4} className="px-4 md:px-8 py-14 text-center"><Activity className="text-primary mx-auto mb-4" size={30}/><p className="font-extrabold text-slate-900 mb-2">수리 현황 공개 준비 중</p><p className="text-slate-500 text-xs md:text-sm">접수 현황은 준비되는 대로 이곳에 안내하겠습니다.</p></td></tr></tbody></table></div></div></section>
{false && (<>
<section id="process" className="py-20 md:py-28 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/30 border-b border-slate-100/80 relative overflow-hidden">
        {/* Natural & Eco-friendly Decorative Background Elements */}
        <div className="absolute top-10 -left-16 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Soft floating leaves and tree indicators */}
        <div className="absolute top-20 right-[8%] text-blue-600/5 pointer-events-none select-none transform rotate-12 hidden lg:block">
          <Leaf size={140} strokeWidth={0.8} />
        </div>
        <div className="absolute bottom-16 left-[5%] text-blue-700/5 pointer-events-none select-none transform -rotate-12 hidden lg:block">
          <Trees size={180} strokeWidth={0.6} />
        </div>
        <div className="absolute top-1/2 left-[8%] text-blue-500/5 pointer-events-none select-none transform rotate-45 hidden xl:block">
          <Leaf size={70} strokeWidth={0.8} />
        </div>

        {/* Inject CSS animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flowHorizontalRight {
            0% { left: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes flowVerticalDown {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes flowHorizontalLeft {
            0% { right: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { right: 100%; opacity: 0; }
          }
          .animate-flow-hr-right {
            animation: flowHorizontalRight 2s infinite linear;
          }
          .animate-flow-v-down {
            animation: flowVerticalDown 2s infinite linear;
          }
          .animate-flow-hr-left {
            animation: flowHorizontalLeft 2s infinite linear;
          }
        `}} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[22px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4 leading-tight break-keep">
              접수부터 출고까지, 세이프픽스의 5단계
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto break-keep">처음부터 끝까지 차근차근 안내하는 세이프픽스의 수리 과정입니다.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-16 max-w-2xl mx-auto relative">
            {/* Step 1 (Row 1 Col 1) */}
            <div 
              className="col-start-1 row-start-1 relative"
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex flex-col items-center text-center p-4 sm:p-6 md:p-7 bg-white border border-slate-100 hover:border-[#0071e3]/40 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:shadow-[0_15px_35px_-5px_rgba(15,23,42,0.12)] transition-all duration-100 w-full cursor-pointer h-full relative overflow-hidden"
              >
                <div className="px-3 py-1 bg-[#eef5ff] text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,113,227,0.5)] rounded-lg font-black text-xs sm:text-sm md:text-base flex items-center justify-center shadow-sm mb-3 transition-all duration-100">
                  01
                </div>
                <div className="w-full">
                  <h3 className="text-[15px] sm:text-lg md:text-[19px] font-extrabold text-slate-900 mb-2 tracking-tight break-keep leading-snug">모델과 증상, 접수 확인</h3>
                  <div className="space-y-1"><p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">기기 모델명과 고장 증상을 확인합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">이전 수리 이력과 데이터 보존 필요 여부도 알려주세요.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">상담 내용을 바탕으로 점검을 준비합니다.</p></div>
                </div>
              </motion.div>

              {/* Connector 1 -> 2: Horizontal Right */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[-24px] w-6 md:right-[-48px] md:w-12 h-6 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative w-full h-[2px] bg-slate-200">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#0071e3] transition-all duration-150 origin-left"
                    style={{ width: (hoveredIdx === null || hoveredIdx >= 1) ? '100%' : '0%' }}
                  />
                  {(hoveredIdx === null || hoveredIdx >= 1) && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_8px_#0071e3] animate-flow-hr-right" />
                  )}
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 border-t-2 border-r-2 rotate-45 transition-colors duration-100"
                    style={{ borderColor: (hoveredIdx === null || hoveredIdx >= 1) ? '#0071e3' : '#cbd5e1' }}
                  />
                </div>
              </div>
            </div>

            {/* Step 2 (Row 1 Col 2) */}
            <div 
              className="col-start-2 row-start-1 relative"
              onMouseEnter={() => setHoveredIdx(1)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex flex-col items-center text-center p-4 sm:p-6 md:p-7 bg-white border border-slate-100 hover:border-[#0071e3]/40 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:shadow-[0_15px_35px_-5px_rgba(15,23,42,0.12)] transition-all duration-100 w-full cursor-pointer h-full relative overflow-hidden"
              >
                <div className="px-3 py-1 bg-[#eef5ff] text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,113,227,0.5)] rounded-lg font-black text-xs sm:text-sm md:text-base flex items-center justify-center shadow-sm mb-3 transition-all duration-100">
                  02
                </div>
                <div className="w-full">
                  <h3 className="text-[15px] sm:text-lg md:text-[19px] font-extrabold text-slate-900 mb-2 tracking-tight break-keep leading-snug">기기 상태 확인 · 정밀 진단</h3>
                  <div className="space-y-1"><p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">기기의 외관과 기능을 확인합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">증상에 맞는 점검 범위를 안내합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">모델에 맞는 장비와 방법으로</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">고장 원인을 살펴봅니다.</p></div>
                </div>
              </motion.div>

              {/* Connector 2 -> 3: Vertical Down */}
              <div className="absolute bottom-[-40px] md:bottom-[-64px] left-1/2 -translate-x-1/2 h-10 md:h-16 w-6 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative h-full w-[2px] bg-slate-200">
                  <div 
                    className="absolute top-0 left-0 w-full bg-[#0071e3] transition-all duration-150 origin-top"
                    style={{ height: (hoveredIdx === null || hoveredIdx >= 2) ? '100%' : '0%' }}
                  />
                  {(hoveredIdx === null || hoveredIdx >= 2) && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_8px_#0071e3] animate-flow-v-down" />
                  )}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 border-r-2 border-b-2 rotate-45 transition-colors duration-100"
                    style={{ borderColor: (hoveredIdx === null || hoveredIdx >= 2) ? '#0071e3' : '#cbd5e1' }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3 (Row 2 Col 2) */}
            <div 
              className="col-start-2 row-start-2 relative"
              onMouseEnter={() => setHoveredIdx(2)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex flex-col items-center text-center p-4 sm:p-6 md:p-7 bg-white border border-slate-100 hover:border-[#0071e3]/40 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:shadow-[0_15px_35px_-5px_rgba(15,23,42,0.12)] transition-all duration-100 w-full cursor-pointer h-full relative overflow-hidden"
              >
                <div className="px-3 py-1 bg-[#eef5ff] text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,113,227,0.5)] rounded-lg font-black text-xs sm:text-sm md:text-base flex items-center justify-center shadow-sm mb-3 transition-all duration-100">
                  03
                </div>
                <div className="w-full">
                  <h3 className="text-[15px] sm:text-lg md:text-[19px] font-extrabold text-slate-900 mb-2 tracking-tight break-keep leading-snug">견적 안내 · 수리 동의</h3>
                  <div className="space-y-1"><p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">수리 범위와 예상 비용을 안내합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">소요 시간과 주의사항을 확인합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">동의하신 작업부터 진행합니다.</p></div>
                </div>
              </motion.div>

              {/* Connector 3 -> 4: Horizontal Left */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[-24px] w-6 md:left-[-48px] md:w-12 h-6 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative w-full h-[2px] bg-slate-200">
                  <div 
                    className="absolute top-0 right-0 h-full bg-[#0071e3] transition-all duration-150 origin-right"
                    style={{ width: (hoveredIdx === null || hoveredIdx >= 3) ? '100%' : '0%' }}
                  />
                  {(hoveredIdx === null || hoveredIdx >= 3) && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_8px_#0071e3] animate-flow-hr-left" />
                  )}
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b-2 border-l-2 rotate-45 transition-colors duration-100"
                    style={{ borderColor: (hoveredIdx === null || hoveredIdx >= 3) ? '#0071e3' : '#cbd5e1' }}
                  />
                </div>
              </div>
            </div>

            {/* Step 4 (Row 2 Col 1) */}
            <div 
              className="col-start-1 row-start-2 relative"
              onMouseEnter={() => setHoveredIdx(3)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex flex-col items-center text-center p-4 sm:p-6 md:p-7 bg-white border border-slate-100 hover:border-[#0071e3]/40 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:shadow-[0_15px_35px_-5px_rgba(15,23,42,0.12)] transition-all duration-100 w-full cursor-pointer h-full relative overflow-hidden"
              >
                <div className="px-3 py-1 bg-[#eef5ff] text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,113,227,0.5)] rounded-lg font-black text-xs sm:text-sm md:text-base flex items-center justify-center shadow-sm mb-3 transition-all duration-100">
                  04
                </div>
                <div className="w-full">
                  <h3 className="text-[15px] sm:text-lg md:text-[19px] font-extrabold text-slate-900 mb-2 tracking-tight break-keep leading-snug">필요한 부분을 정확하게 수리</h3>
                  <div className="space-y-1"><p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">기기 상태에 맞춰 수리를 진행합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">수리 부위를 확인하고</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">관련 기능을 점검합니다.</p></div>
                </div>
              </motion.div>

              {/* Connector 4 -> 5: Vertical Down */}
              <div className="absolute bottom-[-40px] md:bottom-[-64px] left-1/2 -translate-x-1/2 h-10 md:h-16 w-6 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative h-full w-[2px] bg-slate-200">
                  <div 
                    className="absolute top-0 left-0 w-full bg-[#0071e3] transition-all duration-150 origin-top"
                    style={{ height: (hoveredIdx === null || hoveredIdx >= 4) ? '100%' : '0%' }}
                  />
                  {(hoveredIdx === null || hoveredIdx >= 4) && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_8px_#0071e3] animate-flow-v-down" />
                  )}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 border-r-2 border-b-2 rotate-45 transition-colors duration-100"
                    style={{ borderColor: (hoveredIdx === null || hoveredIdx >= 4) ? '#0071e3' : '#cbd5e1' }}
                  />
                </div>
              </div>
            </div>

            {/* Step 5 (Row 3 Col 1 & 2 Span) */}
            <div 
              className="col-span-2 col-start-1 row-start-3 relative"
              onMouseEnter={() => setHoveredIdx(4)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex flex-col items-center text-center p-4 sm:p-6 md:p-7 bg-white border border-slate-100 hover:border-[#0071e3]/40 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:shadow-[0_15px_35px_-5px_rgba(15,23,42,0.12)] transition-all duration-100 w-full cursor-pointer h-full relative overflow-hidden"
              >
                <div className="px-3 py-1 bg-[#eef5ff] text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,113,227,0.5)] rounded-lg font-black text-xs sm:text-sm md:text-base flex items-center justify-center shadow-sm mb-3 transition-all duration-100">
                  05
                </div>
                <div className="w-full">
                  <h3 className="text-[15px] sm:text-lg md:text-[19px] font-extrabold text-slate-900 mb-2 tracking-tight break-keep leading-snug">최종 검수 · 출고 · 사후 안내</h3>
                  <div className="space-y-1"><p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">최종 점검 결과를 확인한 뒤 출고합니다.</p>
<p className="text-slate-700 text-[12.7px] sm:text-[14px] md:text-[14.5px] leading-[1.65] font-bold sm:font-medium break-keep">보증 조건과 사후 관리 방법을 안내합니다.</p></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
<section id="about" className="py-16 md:py-24 bg-gradient-to-b from-white via-[#f7f9fc] to-[#f0f4f8] relative overflow-hidden border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Section Graphic Image with Representative Greeting */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 mb-10 md:mb-14 max-w-5xl mx-auto px-4">
            {/* Speech Bubble (모바일: 12시 방향 말꼬리, 데스크톱: 우측 사진 방향 말꼬리) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] mx-auto sm:mx-0 select-none animate-float"
            >
              {/* Desktop Rectangular Speech Bubble (우측 사진을 향하는 3시 방향 말꼬리) */}
              <div className="hidden sm:block relative w-full">
                <svg 
                  viewBox="0 0 460 130" 
                  className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.07)] overflow-visible"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M 8 8 H 392 V 68 H 452 L 392 104 V 122 H 8 Z" 
                    fill="#ffffff" 
                    stroke="#0f172a" 
                    strokeWidth="5" 
                    strokeLinejoin="miter" 
                    strokeMiterlimit="10"
                  />
                </svg>

                {/* Centered Text for Desktop */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pr-[13%] pl-[2%]">
                  <h3 className="text-slate-900 font-black text-[20px] md:text-[23px] tracking-tight whitespace-nowrap text-center">
                    안녕하세요, <span className="text-[#005bb5] font-black">세이프픽스</span> 입니다
                  </h3>
                </div>
              </div>

              {/* Mobile Rectangular Speech Bubble (상단 사진을 향하는 12시 방향 말꼬리) */}
              <div className="block sm:hidden relative w-full">
                <svg 
                  viewBox="0 0 360 115" 
                  className="w-full h-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] overflow-visible"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M 8 28 H 155 L 180 6 L 205 28 H 352 V 107 H 8 Z" 
                    fill="#ffffff" 
                    stroke="#0f172a" 
                    strokeWidth="4.5" 
                    strokeLinejoin="miter" 
                    strokeMiterlimit="10"
                  />
                </svg>

                {/* Centered Text for Mobile */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-[22px] pb-[6px] px-3">
                  <h3 className="text-slate-900 font-black text-[15.5px] tracking-tight whitespace-nowrap text-center">
                    안녕하세요, <span className="text-[#005bb5] font-black">세이프픽스</span> 입니다
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Representative Image (우측 배치) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative shrink-0"
            >
              <img 
                src={anxietyTopImage} 
                alt="세이프픽스 수리 안내 참고 이미지" 
                className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] h-auto object-contain mx-auto drop-shadow-md rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-955 mb-4 leading-tight break-keep">
              <span className="block md:inline">수리업체를 알아볼 때,</span>
              <span className="block md:inline md:ml-2">이런 <span className="text-red-500 font-black">불쾌한 경험이나 두려움</span>이</span>
              <span className="block md:inline md:ml-2">앞서지 않으셨나요?</span>
            </h2>
            <p className="text-slate-600 text-[13px] md:text-[18.25px] font-bold max-w-2xl mx-auto break-keep leading-relaxed">
              <span className="block md:inline">비용, 수리 범위, 데이터 보존과 사후 관리까지.</span>
              <span className="block md:inline md:ml-1">접수 전에 궁금한 내용을 충분히 확인하세요.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
            {[
              {
                title: "예상하지 못한 추가 비용",
                desc: "모델과 고장 상태를 확인하고, 필요한 수리 범위와 견적을 먼저 설명합니다."
              },
              {
                title: "어떤 작업인지 모르는 수리",
                desc: "교체 부위와 점검 범위, 예상 소요 시간을 확인할 수 있도록 안내합니다."
              },
              {
                title: "소중한 데이터에 대한 걱정",
                desc: "작업 전 백업 필요 여부와 데이터에 영향을 줄 수 있는 사항을 확인합니다."
              },
              {
                title: "수리 이후의 불확실함",
                desc: (
                  <>
                    수리 후에는 관련 기능을 확인하고<br />
                    작업 항목에 따른 보증 조건과<br />
                    사후 관리 안내를 함께 확인해<br />
                    다시 안심하고 사용하도록 돕습니다.
                  </>
                )
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center h-full shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group duration-300 select-none cursor-default"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                  <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 block group-hover:hidden" />
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 hidden group-hover:block" />
                </div>
                <h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3 break-keep transition-colors duration-300 group-hover:text-[#005bb5]">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs md:text-[15px] leading-relaxed font-semibold break-keep">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Solution Highlight Banner */}
          <div className="max-w-4xl mx-auto text-center mt-8 p-6 md:p-10 bg-gradient-to-br from-[#253b55] to-[#172434] rounded-3xl border-none relative overflow-hidden shadow-lg shadow-blue-900/10">
            {/* Subtle decorative elements for the premium banner */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            
            <h4 className="text-[16px] sm:text-lg md:text-2xl font-black text-white mb-4 break-keep drop-shadow-sm">
              "세이프픽스은 고객님의 모든 의심과 피로를 정면으로 해결합니다."
            </h4>
            <p className="text-blue-50/90 text-xs sm:text-sm md:text-[17px] leading-relaxed md:leading-loose font-bold max-w-3xl mx-auto break-keep">
              소중한 기기와 데이터가 담긴 수리이기에
              <br className="block md:hidden" />
              <span className="hidden md:inline"> </span>
              수리 범위, 데이터 안내, 투명한 비용 설명은
              <br className="hidden md:block" />
              <span className="inline md:hidden"> </span>
              단순한
              <br className="block md:hidden" />
              <span className="hidden md:inline"> </span>
              서비스 규정이 아닌 브랜드의 핵심 윤리입니다.
              <br className="block md:hidden" />
              <span className="hidden md:inline"> </span>
              세이프픽스은 투명함과 철저함으로 보답합니다.
            </p>
          </div>
        </div>
      </section>
<section id="promise" className="py-16 md:py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-1 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">
              <span className="text-[#0071e3] font-black">사실</span>로만 입증하는 4대 안심 보장 조건
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 text-center">
            {[
              { icon: ShieldCheck, title: '수리 과정 안내', desc: '접수부터 출고까지\n필요한 과정을 안내합니다.' },
              { icon: CheckCircle2, title: '진단 후 견적 안내', desc: '기기 상태와 작업 범위 확인 후\n예상 비용 안내' },
              { icon: Clock, title: '기기별 맞춤 점검', desc: '모델과 증상에 맞춰\n필요한 점검을 진행합니다.' },
              { icon: Star, title: '수리 후 기능 확인', desc: '수리 항목에 맞춰\n관련 기능을 확인합니다.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="px-2 py-5 md:p-10 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-md md:shadow-xl shadow-slate-200/50 hover:border-primary/40 hover:shadow-2xl transition-all group duration-300 cursor-default"
              >
                <div className="w-11 h-11 md:w-20 md:h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-8 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all duration-300 shadow-sm">
                  <feature.icon className="w-5 h-5 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <h3 className="text-[12px] md:text-2xl font-extrabold text-slate-900 mb-1 md:mb-4 whitespace-nowrap break-keep group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-[10px] md:text-lg leading-snug md:leading-relaxed font-medium whitespace-pre-line hidden sm:block">
                  {feature.desc}
                </p>
                {/* Mobile version short description */}
                <p className="text-slate-500 text-[12px] leading-tight font-bold sm:hidden whitespace-pre-line">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<section id="devices" className="py-16 md:py-24 bg-surface relative"><div className="max-w-7xl mx-auto px-4 md:px-8"><div className="text-center mb-10 md:mb-16"><h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">아이패드부터 아이폰까지, 기기에 맞춘 상담</h2><p className="text-slate-500 text-sm md:text-base">정확한 모델명과 증상을 기준으로 작업 가능 여부를 확인합니다.</p></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">iPad</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">일반형 · mini · Air · Pro</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">iPhone</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">화면 · 배터리 · 충전 · 전원</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">MacBook</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">모델과 증상별 점검 상담</p></motion.div><motion.div whileHover={{y:-6}} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"><ShieldCheck className="text-primary mb-5" size={30}/><h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3">기타 Apple 기기</h3><p className="text-slate-600 text-xs md:text-sm leading-relaxed">기기 종류별 수리 가능 여부 문의</p></motion.div></div></div></section>
</>)}
    </div>
  );
};

export default Home;