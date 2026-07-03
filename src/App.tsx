import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scale, Phone, FileText, Scroll as ScrollIcon, User, Gavel, 
  ArrowUpRight, ArrowRight, ShieldCheck, Clock, 
  TrendingUp, Check, Calendar, Lock, ChevronRight, CheckCircle,
  MapPin, KeyRound, Globe, ChevronDown, AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip 
} from 'recharts';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom interfaces for state
interface TimelineItem {
  year: string;
  title: string;
  recovery: string;
  description: string;
  detail: string;
  category: string;
}

interface Partner {
  name: string;
  role: string;
  image: string;
  bio: string;
  cases: string;
}

export default function App() {
  // Hero section refs
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroCenterRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const trustedLogosRef = useRef<HTMLDivElement>(null);

  // Expertise Matrix state
  const [activeMatrixHover, setActiveMatrixHover] = useState<number | null>(null);
  const [matrixMousePos, setMatrixMousePos] = useState({ x: 0, y: 0 });

  // Timeline Refs & states
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  // Partner Spotlight state
  const [activePartner, setActivePartner] = useState<number | null>(null);
  const [partnerMousePos, setPartnerMousePos] = useState({ x: 0, y: 0 });
  const partnerContainerRef = useRef<HTMLDivElement>(null);

  // Stats / Analytics state
  const [statsInView, setStatsInView] = useState(false);
  const analyticsSectionRef = useRef<HTMLDivElement>(null);
  
  // Custom counters
  const [caseCount, setCaseCount] = useState(0);
  const [satisfiedCount, setSatisfiedCount] = useState(0);
  const [riskReduction, setRiskReduction] = useState(0);
  const [resolutionCount, setResolutionCount] = useState(0);

  // Booking portal state
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  
  // Form input states
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [legalSector, setLegalSector] = useState('');
  const [caseBrief, setCaseBrief] = useState('');
  const [urgency, setUrgency] = useState('Standard');

  // Input focus animation helper states
  const [focusInput, setFocusInput] = useState<string | null>(null);

  // --- NEW ELITE INTERACTIVE STATES ---
  // Section 6: War Room Ledger
  const [activeLedger, setActiveLedger] = useState<number>(0);
  
  // Section 7: Sovereign Asset Shield
  const [selectedAssetTier, setSelectedAssetTier] = useState<string>('sovereign');
  const [shieldRotation, setShieldRotation] = useState<number>(0);

  // Executive Utility Button Interactive States
  const [activeUtility, setActiveUtility] = useState<'util-doc' | 'util-scroll' | 'util-user' | 'util-gavel'>('util-doc');
  const [decryptionProgress, setDecryptionProgress] = useState<number>(0);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [customClientName, setCustomClientName] = useState<string>('');
  const [generatedDecree, setGeneratedDecree] = useState<string>('');
  const [dialState, setDialState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [simulatedJudgeRisk, setSimulatedJudgeRisk] = useState<'idle' | 'calculating' | 'done'>('idle');
  const [decreeError, setDecreeError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [step1Error, setStep1Error] = useState<string | null>(null);
  const [signatureError, setSignatureError] = useState<string | null>(null);

  // Section 8: Geopolitical Radar
  const [activeRadarNode, setActiveRadarNode] = useState<string>('washington');
  const [radarPulse, setRadarPulse] = useState<boolean>(true);

  // Section 9: Litigious AI Risk Simulator
  const [simIndustry, setSimIndustry] = useState<string>('tech');
  const [simThreat, setSimThreat] = useState<string>('sec');
  const [simState, setSimState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [simProgress, setSimProgress] = useState<number>(0);

  // Section 10: Signature Vault Retainers
  const [selectedVaultTier, setSelectedVaultTier] = useState<string>('imperial');
  const [signatureInitials, setSignatureInitials] = useState<string>('');
  const [vaultUnlocked, setVaultUnlocked] = useState<boolean>(false);

  // 2. Interactive Expertise Matrix Grid Data
  const practiceGrid = [
    {
      title: "Hostile Takeovers & M&A",
      code: "M&A.DEFENSE",
      bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      description: "Pre-emptive poison pill architecture, tactical boardroom proxies, and rapid multi-billion dollar transaction clearance.",
      highlight: "Over $14.8B in corporate takeovers neutralized or closed in fiscal 2025."
    },
    {
      title: "Venture FinTech Scaling",
      code: "FINTECH.SEC",
      bgImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      description: "Guiding rapid-growth tech leaders through compliance structures, SEC sandbox approvals, and strategic Series A-E financing.",
      highlight: "Secured structural clearance for 18 industry-shaping technology unicorns."
    },
    {
      title: "Biotech & AI Prosecution",
      code: "IP.PROSECUTION",
      bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      description: "Defending deep-learning proprietary models, automated trading infrastructure, and global patent exclusivity frameworks.",
      highlight: "Prosecuted over 450+ high-utility software and hardware patents globally."
    },
    {
      title: "White-Collar Auditing",
      code: "DOJ.LITIGATION",
      bgImage: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
      description: "Direct executive representation during intense multi-agency investigations, audit-fraud inquiries, and pre-indictment trials.",
      highlight: "94% case resolution rate prior to public filing or regulatory escalation."
    },
    {
      title: "Sovereign Board Governance",
      code: "BOARD.PROXY",
      bgImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
      description: "Advising Fortune 100 boards of directors on fiduciary risk mitigation, ethical compliance audits, and critical proxy standoffs.",
      highlight: "Exclusive legal architects to 42 Fortune 500 board structures."
    },
    {
      title: "Multi-Jurisdiction Transactions",
      code: "GLOBAL.ESCROW",
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      description: "Formulating cross-border intellectual escrow policies, dual-taxation treaties, and sovereign compliance protocols.",
      highlight: "Active strategic defense counsel across 32 jurisdictions worldwide."
    }
  ];

  // 3. Landmark Success Timeline Data
  const timelineData: TimelineItem[] = [
    {
      year: "2018",
      title: "Silicon Core Acquisition",
      recovery: "$1.2 Billion",
      description: "Navigated complex cross-border antitrust and IP litigation to clear the acquisition of an EU-based microchip fab under intense FTC scrutiny.",
      detail: "Lead Counsel • Silicon M&A Team",
      category: "Antitrust & M&A"
    },
    {
      year: "2020",
      title: "Sovereign Gas Deflection",
      recovery: "$850 Million",
      description: "Successfully shielded a global energy conglomerate from class-action pricing liability, resulting in a landmark complete defense summary judgment.",
      detail: "Lead Defense Trial • Executive Litigation",
      category: "Antitrust Defense"
    },
    {
      year: "2022",
      title: "FinTech Debt Liquidity Restructuring",
      recovery: "$3.4 Billion",
      description: "Formulated and executed a dual-listed corporate restructuring strategy across both London and New York stock exchanges within 48 hours.",
      detail: "Lead Architects • Global Insolvency Group",
      category: "Corporate Restructuring"
    },
    {
      year: "2024",
      title: "Decentralized Escrow Clearance",
      recovery: "SEC Immunity",
      description: "Engineered a pioneering cryptographic compliance escrow model that completely resolved a multi-year federal oversight probe, paving the way for public IPO.",
      detail: "SEC Strategic Trial Group • Advisory",
      category: "Federal Resolution"
    }
  ];

  // 4. Partner Spotlight Data
  const partners: Partner[] = [
    {
      name: "Alexander Vance",
      role: "Senior Managing Partner",
      image: "https://i.ibb.co/PzWvSN0s/Mastering-Necktie-Etiquette-The-Perfect-Tie-for-Every-Situation.jpg",
      bio: "Uncompromising trial lawyer with over two decades of courtroom dominance. Alexander represents elite boards under aggressive federal scrutiny.",
      cases: "180+ High-Profile Verdicts"
    },
    {
      name: "Eleanor Sterling",
      role: "Chief of M&A Practice",
      image: "https://i.ibb.co/sph3H5R4/Ein-professionelles-Bewerbungsfoto-ist-der-Schl-ssel-zum-Erfolg-Es-ist-oft-das-erste-was-Person.jpg",
      bio: "Former lead merger examiner at the Federal Trade Commission. Eleanor directs multi-billion dollar global mergers and cross-border regulatory clearance.",
      cases: "$42B+ Completed Mergers"
    },
    {
      name: "Marcus Thorne",
      role: "Chief of Tech IP & Patent Defense",
      image: "https://i.ibb.co/xKgQRdMc/download-5.jpg",
      bio: "Dual-degree computer scientist and litigator. Marcus handles high-stakes artificial intelligence and complex cryptographic patent disputes.",
      cases: "450+ Patents Secured"
    }
  ];

  // 5. Recharts Analytics Data
  const speedData = [
    { month: 'Jan', days: 60, target: 50 },
    { month: 'Feb', days: 55, target: 50 },
    { month: 'Mar', days: 52, target: 45 },
    { month: 'Apr', days: 48, target: 45 },
    { month: 'May', days: 46, target: 45 },
    { month: 'Jun', days: 45, target: 45 },
  ];

  // --- NEW ELITE INTERACTIVE SECTIONS DATA ---
  const warRoomLedgerData = [
    {
      title: "Hostile Buyout Deflection",
      target: "Vandermeer Holdings",
      stake: "$4.6 Billion",
      status: "TACTICAL NEUTRALIZATION",
      incidentBrief: "An aggressive offshore sovereign proxy launched a silent creeping acquisition of shares. Our team instituted an immediate dual-tier defensive voting trust, neutralizing voting block leverage within 14 hours of detection.",
      actionPlan: "Phase 1: Issue Sterling Poison Pill • Phase 2: Enforce Federal Rule 13D Injunction • Phase 3: Dilute Outlier Positions.",
      readout: "THREAT INDEX: 1.2% (NEUTRALIZED)"
    },
    {
      title: "Biotech Trade Secret Rescue",
      target: "Helix Bioscience Group",
      stake: "$1.8 Billion",
      status: "PROPRIETARY RECOVERY",
      incidentBrief: "A departing research director attempted to export active proprietary genetic sequences to a foreign competitor. We executed an emergency ex-parte federal seizure, locking down offshore servers and retrieving all biological blueprints.",
      actionPlan: "Phase 1: Ex-Parte Seizure Order • Phase 2: Secure Server Isolation • Phase 3: Enforce Non-Compete Injunction.",
      readout: "EXCLUSIVITY PRESERVED - 100%"
    },
    {
      title: "Sovereign Sovereign Bond Shield",
      target: "Latam Infrastructure Fund",
      stake: "$7.2 Billion",
      status: "ESCROW ARBITRATION",
      incidentBrief: "An unexpected regulatory freeze threatened to trigger a technical sovereign default on institutional bonds. We established a private secondary escrow vault in Swiss jurisdiction, insulating critical infrastructure asset liquidity.",
      actionPlan: "Phase 1: Construct Swiss Trust Vault • Phase 2: Refactor Bond Covenant Clauses • Phase 3: Consolidate Debt Tranches.",
      readout: "LIQUIDITY GUARANTEED - TRIPLE-A"
    }
  ];

  const assetShieldTiers = {
    sovereign: {
      name: "Sovereign Asset Insulation",
      coverage: "$250M+ Threshold",
      custody: "Swiss/Cayman Multi-Trusts",
      mechanisms: ["Intergenerational Land Patents", "Cryptographic Corporate Escrow", "Dynamic Fiduciary Offsets"],
      shieldLevel: "99.997% Immutable",
      brief: "Designed for family offices and multinational boards requiring complete strategic insulation of liquid and illiquid wealth from domestic political risks."
    },
    imperial: {
      name: "Imperial Corporate Holdings",
      coverage: "$1B+ Threshold",
      custody: "Dual-Domicile Sovereign Escrow",
      mechanisms: ["Multi-Sig Structural Shells", "Cross-Border IP Licensing Vaults", "Private Executive Fiduciary Insulators"],
      shieldLevel: "100% Structural Insulation",
      brief: "A bespoke corporate holding framework that splits corporate control, structural cashflow, and tax exposure across three distinct non-extradition jurisdictions."
    },
    diplomatic: {
      name: "Sovereign Immunity Retainer",
      coverage: "$5B+ Threshold",
      custody: "Sovereign Wealth Joint-Custody",
      mechanisms: ["Consular Immunity Escrow Agreements", "Bespoke Treaty-Protected Assets", "Intergovernmental Escrow Shields"],
      shieldLevel: "Absolute Supreme Protection",
      brief: "The absolute zenith of wealth protection. We leverage reciprocal sovereign trade treaties to house private capital within treaty-insulated infrastructure projects."
    }
  };

  const geopoliticalThreats = {
    washington: {
      city: "Washington, D.C.",
      agency: "FTC & SEC Oversight",
      riskLevel: "CRITICAL ALERT",
      trend: "Aggressive Antitrust Prosecution",
      brief: "US regulatory bureaus are pursuing pre-emptive acquisitions, requiring bulletproof tactical filings and aggressive pre-filing clearance lobbying.",
      strategy: "Enact Pre-emptive Proxy Trusts and establish secondary Delaware holding matrices."
    },
    brussels: {
      city: "Brussels, EU",
      agency: "European Commission DG Comp",
      riskLevel: "ELEVATED CONCERN",
      trend: "Digital Sovereign Auditing",
      brief: "Unprecedented enforcement of digital service acts and sovereign competition regulations targeting cross-border artificial intelligence and SaaS platforms.",
      strategy: "Implement decentralised data storage escrows and dual-entity structural isolation."
    },
    london: {
      city: "London, UK",
      agency: "CMA Merger Oversight",
      riskLevel: "STABLE",
      trend: "Bespoke Restructuring Scrutiny",
      brief: "Post-Brexit regulatory friction demands highly localized corporate transaction architecture to bypass CMA acquisition delays.",
      strategy: "Structure independent UK operating subsidiaries with isolated corporate assets."
    },
    tokyo: {
      city: "Tokyo, Japan",
      agency: "SESC Financial Audit",
      riskLevel: "MONITORED",
      trend: "Cross-Border Capital Oversight",
      brief: "Strict auditing of international venture capital transfers and capital liquidity repatriation rules.",
      strategy: "Utilize localized sovereign bonds and strategic corporate Joint-Ventures."
    }
  };

  const simulatorOutcomes = {
    tech: {
      sec: "CRITICAL THREAT TRIGGERED: Launch 'Sterling Protocol' immediately. Establish a parallel Delaware holding firm, insulate intellectual property under a Swiss licensing subsidiary, and issue formal responses utilizing legal privilege.",
      ip: "PROPRIETARY SHIELD BREACHED: Initiate immediate ex-parte international seizure orders. Freeze foreign developer source repositories under Section 512(f) and issue cease-and-desists backed by escrow damage clauses.",
      ftc: "ANTITRUST CONFLICT IDENTIFIED: Restructure merger covenants into isolated regional entities. Utilize localized management boards to demonstrate localized operating sovereignty and bypass aggregate acquisition caps."
    },
    banking: {
      sec: "FIDUCIARY COMPLIANCE FRAUD WARNING: Enact Multi-Sig Asset Escrow immediately. Channel active transactional capital into secure, treasury-backed instruments across isolated banking coordinates.",
      ip: "FINTECH CORE PATENT CONFLICT: Retroactively file continuation patents, activate mutual-indemnification pools with venture partners, and enforce cryptographic arbitration parameters.",
      ftc: "REGULATORY CARTEL ALLEGATIONS: Dissolve aggregate pooling arrangements and transition immediately to independent, algorithmically insulated private market liquidity networks."
    },
    energy: {
      sec: "LIQUIDITY DISCLOSURE DISPUTE: Initiate direct confidential administrative settlement. Deploy private sovereign energy production audits to counter government resource estimates.",
      ip: "GEOTHERMAL/FUSION BLUEPRINT BREACH: Enforce international national security classification protocols under the Defense Production Act, retrieving all intellectual files under federal warrants.",
      ftc: "MONOPOLY MARKET SCRUTINY: Restructure transport pipeline pipelines into independent, state-chartered utility operators with isolated voting structures."
    }
  };

  // Dynamic Glow Mouse Tracking inside Matrix Grid
  const handleMatrixMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMatrixMousePos({ x, y });
    setActiveMatrixHover(index);
  };

  // Parallax Mouse Tracking inside Partner List
  const handlePartnerMouseMove = (e: React.MouseEvent) => {
    if (!partnerContainerRef.current) return;
    const rect = partnerContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPartnerMousePos({ x, y });
  };

  // Triggering the Simulated Risk Audit Diagnostic
  const handleRunSimulation = () => {
    setSimState('scanning');
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimState('complete');
          return 100;
        }
        return prev + 4;
      });
    }, 60);
  };

  // Setup GSAP Animations
  useEffect(() => {
    // 1. Initial Hero Entry Animations
    const tl = gsap.timeline();
    
    tl.fromTo(heroLeftRef.current, 
      { opacity: 0, x: -60 }, 
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
    );
    
    tl.fromTo(heroCenterRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power4.out' },
      '-=1.0'
    );
    
    tl.fromTo(heroRightRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1.2'
    );

    tl.fromTo(trustedLogosRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', onComplete: () => setStatsInView(true) },
      '-=0.6'
    );

    // 2. Timeline ScrollTrigger - Drawing Gold Line
    if (timelineSectionRef.current) {
      ScrollTrigger.create({
        trigger: timelineSectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onUpdate: (self) => {
          setTimelineProgress(self.progress);
        }
      });
    }

    // 3. Stats Section Intersection Trigger for Count Ups
    if (analyticsSectionRef.current) {
      ScrollTrigger.create({
        trigger: analyticsSectionRef.current,
        start: "top 75%",
        onEnter: () => {
          setStatsInView(true);
        }
      });
    }

    // Subtle ambient rotation for the Asset Shield rotating element
    let angle = 0;
    const shieldTimer = setInterval(() => {
      angle = (angle + 0.3) % 360;
      setShieldRotation(angle);
    }, 50);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      clearInterval(shieldTimer);
    };
  }, []);

  // Stats Counters Incrementor
  useEffect(() => {
    if (!statsInView) return;

    const endC = 10000;
    const durationC = 2000; // ms
    const stepC = Math.ceil(endC / (durationC / 30));
    
    const endS = 98;
    const endR = 99.4;
    const endD = 45;

    const timer = setInterval(() => {
      setCaseCount(prev => {
        if (prev >= endC) return endC;
        return prev + stepC;
      });

      setSatisfiedCount(prev => {
        if (prev >= endS) return endS;
        return prev + 1;
      });

      setRiskReduction(prev => {
        if (prev >= endR) return endR;
        return Number((prev + 2.1).toFixed(1));
      });

      setResolutionCount(prev => {
        if (prev <= endD) return endD;
        return prev - 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [statsInView]);

  // Handle Secure Counsel Booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime || !companyName || !contactPerson) {
      setBookingError('All fields marked as mandatory must be completed before transmission.');
      return;
    }

    setBookingError(null);
    setIsBookingSuccess(true);
    
    // Confetti explosion for premium confirmation feel
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#08090B', '#A37F43', '#E2E8F0']
    });
  };

  const resetBookingForm = () => {
    setBookingStep(1);
    setCompanyName('');
    setContactPerson('');
    setLegalSector('');
    setCaseBrief('');
    setBookingDate('');
    setBookingTime('');
    setIsBookingSuccess(false);
    setIsCalendarOpen(false);
  };

  // Static list of premium available time slots
  const availableTimes = [
    "09:00 AM EST", "11:00 AM EST", "02:00 PM EST", "04:30 PM EST"
  ];

  // Dynamic Scales of Justice rotation and positions
  const beamRotation = activeUtility === 'util-doc' ? -12 
                    : activeUtility === 'util-gavel' ? 12 
                    : activeUtility === 'util-user' ? 6 
                    : 0; 
  
  const scaleRad = (beamRotation * Math.PI) / 180;
  const leftPanX = 200 - 100 * Math.cos(scaleRad);
  const leftPanY = 80 - 100 * Math.sin(scaleRad);
  const rightPanX = 200 + 100 * Math.cos(scaleRad);
  const rightPanY = 80 + 100 * Math.sin(scaleRad);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1D1F] font-sans selection:bg-[#9D7D4B] selection:text-white transition-colors duration-500">
      
      {/* ELITE COMPLIANCE & SUCCESS BANNER */}
      <div className="bg-[#0A0B0E] border-b border-[#A37A3E]/30 px-6 py-2.5 text-center relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[9px] text-[#A37A3E] tracking-[0.25em] font-extrabold uppercase">
          <span className="flex items-center gap-1.5 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            VERDICT STATUS: 100% SUCCESS RATE IN SUPREME COURT LITIGATION
          </span>
          <span className="hidden md:inline text-zinc-800">|</span>
          <span>RETAINED ASSET COVERAGE: SECURED $42.8B</span>
          <span className="hidden md:inline text-zinc-800">|</span>
          <span>CREED: "WE DON'T PLAY THE ODDS, WE PLAY THE MAN."</span>
        </div>
      </div>

      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0E1015]/95 backdrop-blur-md border-b border-[#A37A3E]/20 px-6 lg:px-16 py-4.5 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo with Majestic Sovereign Gold Seal */}
          <a href="#" className="flex items-center gap-3.5 group relative" id="nav-logo">
            <div className="relative flex items-center justify-center">
              {/* Golden Core Aura Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#A37A3E] to-[#E6C594] rounded-full blur-md opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
              <div className="w-11 h-11 bg-[#111215] border-2 border-[#A37A3E] rounded-xl flex items-center justify-center text-[#E6C594] shadow-xl shadow-[#A37A3E]/10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-105 relative z-10">
                <Scale className="w-5.5 h-5.5 text-[#E6C594] drop-shadow-[0_0_6px_rgba(230,197,148,0.7)]" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans font-black tracking-[0.25em] text-lg text-white leading-none transition-colors duration-300 group-hover:text-[#E6C594]">
                  LEGALINK
                </span>
                <span className="text-[9px] font-mono font-bold text-[#A37A3E] tracking-widest">PSC</span>
              </div>
              <span className="text-[7.5px] tracking-[0.35em] text-[#A37A3E] font-mono uppercase mt-1.5 leading-none font-bold block">
                Specter Litt Elite Counsel
              </span>
            </div>
          </a>

          {/* Premium Center Links */}
          <nav className="hidden md:flex items-center gap-8 bg-[#161821]/80 px-6 py-2 rounded-full border border-zinc-800/80 shadow-inner">
            {[
              { label: "About us", href: "#about-us" },
              { label: "Services", href: "#services" },
              { label: "Cases", href: "#cases" },
              { label: "Practice", href: "#practice" },
              { label: "Clients", href: "#clients" }
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="font-sans font-bold text-[10px] uppercase tracking-[0.22em] text-zinc-400 hover:text-[#E6C594] transition-all duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#E6C594] scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Side Secure Retainer Action CTA */}
          <div>
            <a 
              href="#secure-portal" 
              className="flex items-center gap-2.5 px-6 py-3 bg-[#A37A3E] hover:bg-white border-2 border-[#A37A3E] text-[#111215] hover:text-[#111215] rounded-full text-[10px] font-black tracking-[0.18em] uppercase transition-all duration-500 group shadow-lg shadow-[#A37A3E]/10 active:scale-95"
              id="btn-call-us"
            >
              <Phone className="w-3.5 h-3.5 text-[#111215] group-hover:rotate-12 transition-transform duration-300" />
              <span>Secure Retainer</span>
            </a>
          </div>

        </div>
      </header>

      {/* GRAND HERO SECTION - MAGNIFICENT DARK PENTHOUSE CORPORATE SUITE THEME */}
      <section className="relative px-6 lg:px-16 py-28 lg:py-36 bg-[#090A0E] border-b border-[#A37A3E]/20 overflow-hidden flex flex-col justify-between" id="about-us">
        
        {/* Sublime backglow spot radiating power */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#A37A3E]/10 via-transparent to-transparent pointer-events-none z-0" />

        {/* Subtle background luxury watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-serif font-extrabold text-[#A37A3E]/2 tracking-tighter uppercase select-none pointer-events-none z-0">
          SPECTER LITT
        </div>

        {/* Content Container - fits the page shape directly without nested blocks */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch overflow-visible relative">
            
            {/* Left Column: Brand Mission & Editorial Authority (Col-span-5) */}
            <div ref={heroLeftRef} className="lg:col-span-5 flex flex-col justify-center text-left relative z-10" id="hero-left-column">
              <div className="inline-flex items-center gap-2 bg-[#A37A3E]/10 border border-[#A37A3E]/30 px-3.5 py-1.5 rounded-full mb-6 max-w-max">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E6C594]" />
                <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#E6C594]">
                  ELITE TRIAL DIVISION // RETAINED BY FORTUNE 100
                </span>
              </div>
              
              {/* Premium Title tailored for commanding legal dominance */}
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.05] font-black text-white tracking-tight mb-6 uppercase">
                Dominance<br />
                By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C594] via-[#A37A3E] to-[#E6C594] italic underline decoration-[#A37A3E]/30 underline-offset-[6px]">Design</span>.
              </h1>

              {/* Harvey's Signature Quotation Callout */}
              <div className="border-l-2 border-[#A37A3E] pl-4 py-1 mb-6">
                <p className="text-[13.5px] text-[#E6C594] font-serif leading-relaxed italic">
                  "We don't play the odds. We play the opponent."
                </p>
                <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-mono block mt-1">
                  — HARVEY SPECTER, SENIOR TRIAL PARTNER
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8 max-w-lg font-sans">
                At Legalink, we convert high-stakes corporate disputes and complex litigation threats into absolute boardroom leverage. Our partnership with the legendary trial division of Specter Litt guarantees unrivaled sovereign protection.
              </p>

              {/* Action Buttons with sharp polished prestige */}
              <div className="flex items-center gap-6 mb-8">
                <a 
                  href="#secure-portal" 
                  className="px-8 py-4 bg-[#A37A3E] hover:bg-white text-zinc-950 font-black uppercase rounded-full text-[10px] tracking-widest transition-all duration-300 shadow-xl shadow-[#A37A3E]/20 hover:-translate-y-0.5 active:scale-95"
                  id="btn-consult-now"
                >
                  Acquire Counsel
                </a>
                <a 
                  href="#practice" 
                  className="text-[10px] font-bold uppercase tracking-widest text-[#E6C594] hover:text-white flex items-center gap-2 transition-colors duration-200 group py-2"
                >
                  <span>Explore Practice</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">▸</span>
                </a>
              </div>

              {/* Secondary Trust statistics bar */}
              <div className="flex gap-8 border-t border-[#A37A3E]/10 pt-6">
                <div>
                  <span className="text-[8px] font-mono text-zinc-500 block uppercase tracking-widest">ASSETS PROTECTED</span>
                  <span className="text-lg font-bold text-white">$14.2 Billion</span>
                </div>
                <div className="w-[1px] h-8 bg-[#A37A3E]/10 self-center" />
                <div>
                  <span className="text-[8px] font-mono text-zinc-500 block uppercase tracking-widest">ACTIVE TRIAL COUNCIL</span>
                  <span className="text-lg font-bold text-white">Specter Litt PSC</span>
                </div>
              </div>

            </div>

            {/* Middle Column: Sovereign Scales of Justice & Control Console (Col-span-4) */}
            <div ref={heroCenterRef} className="lg:col-span-4 flex flex-col justify-between" id="hero-center-column">
              
              {/* Dynamic Scales of Justice SVG Card */}
              <div className="bg-[#111218]/90 rounded-2xl border border-[#A37A3E]/25 p-5 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl">
                {/* Visual Ambient Glow behind scale */}
                <div className="absolute w-32 h-32 bg-[#A37A3E]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#A37A3E]/15 transition-all duration-500" />
                
                <span className="text-[8.5px] font-mono text-[#E6C594] uppercase tracking-[0.25em] block mb-3.5 font-bold text-center">
                  ✦ SOVEREIGN BALANCE OF LAW ✦
                </span>

                <svg viewBox="0 0 400 240" className="w-full max-w-[280px] mx-auto text-[#E6C594] filter drop-shadow-[0_0_12px_rgba(163,122,62,0.15)]" id="scales-of-justice-svg">
                  {/* Base and Stand of the Scales */}
                  <path d="M185,220 L215,220 L210,100 L190,100 Z" fill="url(#goldGrad)" className="opacity-90" />
                  <rect x="150" y="220" width="100" height="8" rx="2" fill="url(#goldGrad)" />
                  <circle cx="200" cy="80" r="8" fill="url(#goldGrad)" />
                  
                  {/* The Tilting Beam */}
                  <line x1={leftPanX} y1={leftPanY} x2={rightPanX} y2={rightPanY} stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" className="transition-all duration-500 ease-out" />
                  <circle cx={leftPanX} cy={leftPanY} r="4" fill="url(#goldGrad)" className="transition-all duration-500 ease-out" />
                  <circle cx={rightPanX} cy={rightPanY} r="4" fill="url(#goldGrad)" className="transition-all duration-500 ease-out" />
                  
                  {/* Left Pan Suspenders */}
                  <line x1={leftPanX} y1={leftPanY} x2={leftPanX - 18} y2={leftPanY + 70} stroke="#A37A3E" strokeWidth="1" className="transition-all duration-500 ease-out opacity-80" />
                  <line x1={leftPanX} y1={leftPanY} x2={leftPanX + 18} y2={leftPanY + 70} stroke="#A37A3E" strokeWidth="1" className="transition-all duration-500 ease-out opacity-80" />
                  {/* Left Pan Bowl */}
                  <path d={`M${leftPanX - 22},${leftPanY + 70} Q${leftPanX},${leftPanY + 82} ${leftPanX + 22},${leftPanY + 70} Z`} fill="url(#goldGrad)" className="transition-all duration-500 ease-out opacity-90" />
                  {/* Left Pan Weight Glow Indicator */}
                  <circle cx={leftPanX} cy={leftPanY + 62} r={activeUtility === 'util-doc' ? 6 : 2} fill={activeUtility === 'util-doc' ? '#F59E0B' : '#A37A3E'} className="transition-all duration-500 ease-out animate-pulse" />

                  {/* Right Pan Suspenders */}
                  <line x1={rightPanX} y1={rightPanY} x2={rightPanX - 18} y2={rightPanY + 70} stroke="#A37A3E" strokeWidth="1" className="transition-all duration-500 ease-out opacity-80" />
                  <line x1={rightPanX} y1={rightPanY} x2={rightPanX + 18} y2={rightPanY + 70} stroke="#A37A3E" strokeWidth="1" className="transition-all duration-500 ease-out opacity-80" />
                  {/* Right Pan Bowl */}
                  <path d={`M${rightPanX - 22},${rightPanY + 70} Q${rightPanX},${rightPanY + 82} ${rightPanX + 22},${rightPanY + 70} Z`} fill="url(#goldGrad)" className="transition-all duration-500 ease-out opacity-90" />
                  {/* Right Pan Weight Glow Indicator */}
                  <circle cx={rightPanX} cy={rightPanY + 62} r={activeUtility === 'util-gavel' ? 6 : 2} fill={activeUtility === 'util-gavel' ? '#EF4444' : '#A37A3E'} className="transition-all duration-500 ease-out animate-pulse" />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E6C594" />
                      <stop offset="50%" stopColor="#A37A3E" />
                      <stop offset="100%" stopColor="#E6C594" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* The 4 Tactical Console Cards acting as controllers */}
              <div className="grid grid-cols-2 gap-3 mt-4" id="strategic-console-buttons">
                {[
                  { id: "util-doc" as const, title: "Case Decryptor", desc: "Litigation Target Briefs", icon: <FileText className="w-4 h-4" /> },
                  { id: "util-scroll" as const, title: "Decree Shield", desc: "Sovereign Protection", icon: <ScrollIcon className="w-4 h-4" /> },
                  { id: "util-user" as const, title: "Partner Hotline", desc: "Private Satellite Link", icon: <User className="w-4 h-4" /> },
                  { id: "util-gavel" as const, title: "Outcome Forecast", desc: "Algorithmic Risk Index", icon: <Gavel className="w-4 h-4" /> }
                ].map((item) => {
                  const isActive = activeUtility === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveUtility(item.id);
                        // reset states per item
                        if (item.id === 'util-doc') {
                          setDecryptionProgress(0);
                          setIsDecrypting(false);
                        } else if (item.id === 'util-scroll') {
                          setDecreeError(null);
                        } else if (item.id === 'util-user') {
                          setDialState('idle');
                        } else if (item.id === 'util-gavel') {
                          setSimulatedJudgeRisk('idle');
                        }
                      }}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] active:scale-95 flex flex-col justify-between h-[84px] group relative ${
                        isActive 
                          ? 'border-[#E6C594] bg-gradient-to-br from-[#A37A3E]/20 to-[#12131A] shadow-lg shadow-[#A37A3E]/10' 
                          : 'border-[#A37A3E]/15 bg-[#12131A] hover:border-[#E6C594]/40 hover:bg-[#151722]'
                      }`}
                      id={`console-btn-${item.id}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#E6C594] text-zinc-950' : 'bg-zinc-900 text-[#E6C594]'}`}>
                          {item.icon}
                        </div>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#E6C594] animate-ping" />}
                      </div>
                      <div>
                        <span className={`block text-[9.5px] font-mono font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                          {item.title}
                        </span>
                        <span className="block text-[7.5px] text-zinc-500 leading-tight">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Live Terminal Readout Board & Analytics (Col-span-3) */}
            <div ref={heroRightRef} className="lg:col-span-3 flex flex-col justify-between text-left relative z-10" id="hero-right-column">
              
              {/* THE ACTIVE EXECUTIVE UTILITY READOUT BOARD */}
              <div className="bg-[#12141F]/90 rounded-2xl border border-[#A37A3E]/30 p-5 flex flex-col justify-between h-full min-h-[340px] relative overflow-hidden shadow-2xl backdrop-blur-md">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#A37A3E]/5 rounded-bl-full pointer-events-none" />
                
                {activeUtility === 'util-doc' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-[#A37A3E]/15 pb-2">
                      <span className="text-[8.5px] uppercase tracking-[0.25em] font-mono text-[#E6C594] font-extrabold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping"></span>
                        SECURE CASE DECRYPTOR
                      </span>
                      <span className="text-[7.5px] uppercase font-mono bg-[#A37A3E]/10 text-[#E6C594] px-2 py-0.5 rounded-md font-bold">
                        LEVEL: SIGMA
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mb-4">
                      Access active litigation briefs, acquisition targets, and settlement risk indexes for our active $100M+ corporate defenses.
                    </p>

                    {decryptionProgress === 0 && !isDecrypting ? (
                      <button 
                        onClick={() => {
                          setIsDecrypting(true);
                          let progress = 0;
                          const interval = setInterval(() => {
                            progress += 10;
                            setDecryptionProgress(progress);
                            if (progress >= 100) {
                              clearInterval(interval);
                              setIsDecrypting(false);
                            }
                          }, 100);
                        }}
                        className="w-full py-2 bg-[#A37A3E] hover:bg-[#E6C594] text-zinc-950 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300"
                      >
                        DECRYPT ACTIVE CASE FILE
                      </button>
                    ) : isDecrypting ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                          <span>DECRYPTING CIPHER INDEX...</span>
                          <span>{decryptionProgress}%</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                          <div className="bg-gradient-to-r from-[#A37A3E] to-[#E6C594] h-full transition-all duration-100" style={{ width: `${decryptionProgress}%` }}></div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#0A0B0E] border border-[#A37A3E]/20 rounded-lg p-3 space-y-2.5">
                        <div className="flex justify-between text-[9px] font-mono text-zinc-400 border-b border-zinc-800/60 pb-1">
                          <span>FILE TARGET: APEX ENERGY</span>
                          <span className="text-emerald-400 font-bold">SECURED</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-sans">
                          <div>
                            <span className="text-zinc-500 block text-[8px] font-mono">PROXY CLAIM RATIO</span>
                            <span className="text-zinc-200 font-bold">4.2% (Defended)</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] font-mono">SETTLEMENT OUTCOME</span>
                            <span className="text-emerald-400 font-bold">98.9% Success</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setDecryptionProgress(0)}
                          className="text-[8px] font-mono text-[#E6C594] hover:underline"
                        >
                          Re-lock file
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeUtility === 'util-scroll' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-[#A37A3E]/15 pb-2">
                      <span className="text-[8.5px] uppercase tracking-[0.25em] font-mono text-[#E6C594] font-extrabold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        SOVEREIGN DECREE CONSTRUCT
                      </span>
                      <span className="text-[7.5px] uppercase font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                        IRONCLAD
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mb-4">
                      Generate a custom legally binding, sovereign non-disclosure template tailored for your corporate defense outline.
                    </p>

                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="ENTER ENTERPRISE NAME"
                        value={customClientName}
                        onChange={(e) => setCustomClientName(e.target.value)}
                        className="w-full bg-[#0A0B0E] border border-[#A37A3E]/30 rounded-lg px-3 py-2 text-white placeholder-zinc-600 text-[10px] font-mono focus:outline-none focus:border-[#E6C594] transition-colors"
                      />
                      
                      <button 
                        onClick={() => {
                          if (!customClientName.trim()) {
                            setDecreeError("Enterprise name is required.");
                            return;
                          }
                          setDecreeError(null);
                          setGeneratedDecree(`BE IT SOVEREIGNLY RESOLVED that Specter Litt PSC hereby immunizes all proprietary computational software architectures and patent registries owned by ${customClientName.toUpperCase()} from any third-party hostile claims.`);
                          
                          confetti({
                            particleCount: 80,
                            spread: 50,
                            colors: ['#A37A3E', '#E6C594']
                          });
                        }}
                        className="w-full py-2 bg-[#A37A3E] hover:bg-[#E6C594] text-zinc-950 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300"
                      >
                        CONSTRUCT DEFENSE SHIELD
                      </button>

                      {decreeError && (
                        <span className="text-[9px] text-red-500 font-mono font-bold block">{decreeError}</span>
                      )}

                      {generatedDecree && !decreeError && (
                        <div className="bg-[#0A0B0E] border border-dashed border-[#A37A3E]/45 rounded-lg p-3">
                          <span className="text-[7px] font-mono text-[#E6C594] block mb-1">Generated Clause</span>
                          <p className="text-[9.5px] text-zinc-200 font-serif leading-relaxed italic">
                            "{generatedDecree}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeUtility === 'util-user' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-[#A37A3E]/15 pb-2">
                      <span className="text-[8.5px] uppercase tracking-[0.25em] font-mono text-[#E6C594] font-extrabold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        PARTNER ROUTING LINE
                      </span>
                      <span className="text-[7.5px] uppercase font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md font-bold">
                        SATELLITE
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mb-4">
                      Initialize a secured routing link to establish contact with Senior Litigation Partner Harvey Specter.
                    </p>

                    {dialState === 'idle' ? (
                      <button 
                        onClick={() => {
                          setDialState('calling');
                          setTimeout(() => {
                            setDialState('connected');
                          }, 1500);
                        }}
                        className="w-full py-2 bg-[#A37A3E] hover:bg-[#E6C594] text-zinc-950 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3 h-3 text-zinc-950 animate-bounce" />
                        DIAL HARVEY SPECTER LINE
                      </button>
                    ) : dialState === 'calling' ? (
                      <div className="bg-[#0A0B0E] border border-zinc-800 rounded-lg p-4 text-center space-y-2">
                        <div className="flex justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594] animate-bounce delay-100" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594] animate-bounce delay-200" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594] animate-bounce delay-300" />
                        </div>
                        <span className="text-[8.5px] font-mono text-zinc-400 block uppercase tracking-wider">
                          ROUTING SATELLITE HANDSHAKE...
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[#0A0B0E] border border-emerald-500/20 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between text-[8px] font-mono text-emerald-400">
                          <span>SECURED SATELLITE CONNECTION</span>
                          <span>ONLINE</span>
                        </div>
                        <p className="text-[10px] text-zinc-300 font-sans leading-relaxed italic">
                          "Let's make one thing clear: we don't hold handshakes, we secure boardrooms. I am routed to your company outpost."
                        </p>
                        <button 
                          onClick={() => setDialState('idle')}
                          className="text-[8px] font-mono text-zinc-500 hover:text-white"
                        >
                          Disconnect Line
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeUtility === 'util-gavel' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-[#A37A3E]/15 pb-2">
                      <span className="text-[8.5px] uppercase tracking-[0.25em] font-mono text-[#E6C594] font-extrabold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        TRIAL OUTCOME FORECASTER
                      </span>
                      <span className="text-[7.5px] uppercase font-mono bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-md font-bold">
                        RISK MATRIX
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mb-4">
                      Run our proprietary algorithmic outcome prediction formula against hostile corporate regulatory claims.
                    </p>

                    {simulatedJudgeRisk === 'idle' ? (
                      <button 
                        onClick={() => {
                          setSimulatedJudgeRisk('calculating');
                          setTimeout(() => {
                            setSimulatedJudgeRisk('done');
                          }, 1200);
                        }}
                        className="w-full py-2 bg-[#A37A3E] hover:bg-[#E6C594] text-zinc-950 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300"
                      >
                        RUN OUTCOME CALCULATION
                      </button>
                    ) : simulatedJudgeRisk === 'calculating' ? (
                      <div className="bg-[#0A0B0E] border border-zinc-800 rounded-lg p-4 text-center space-y-2">
                        <span className="text-[8.5px] font-mono text-zinc-400 block uppercase tracking-wider animate-pulse">
                          CORRELATING TRIAL STRATEGY...
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[#0A0B0E] border border-[#A37A3E]/20 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between text-[8px] font-mono text-[#E6C594]">
                          <span>PREDICTIVE ACCURACY</span>
                          <span>99.4% CONFIDENCE</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[12px] font-black text-white block">100% DISMISSAL RATE</span>
                          <p className="text-[9.5px] text-zinc-400 leading-relaxed font-sans">
                            Our leverage metrics reveal high settle disposition. No trial stage required under Specter PSC leadership.
                          </p>
                        </div>
                        <button 
                          onClick={() => setSimulatedJudgeRisk('idle')}
                          className="text-[8px] font-mono text-[#E6C594] hover:underline"
                        >
                          Reset calculations
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Stats embedded beautifully at the base of the terminal */}
                <div className="flex items-end justify-between border-t border-[#A37A3E]/20 pt-4 mt-6">
                  <div className="flex justify-between w-full text-left">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.18em] font-sans font-extrabold text-[#A37A3E] leading-tight">
                        CASES NEUTRALIZED
                      </p>
                      <p className="text-xl font-extrabold text-white tracking-tight mt-1">
                        {caseCount >= 10000 ? "10K+" : `${Math.floor(caseCount / 1000)}K+`}
                      </p>
                    </div>
                    
                    <div className="w-[1px] h-6 bg-[#A37A3E]/25 self-end mb-1" />

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.18em] font-sans font-extrabold text-[#A37A3E] leading-tight text-right">
                        GUARANTEED WIN RATE
                      </p>
                      <p className="text-xl font-extrabold text-white tracking-tight mt-1 text-right">
                        {satisfiedCount}%
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* SECTION 1: INTERACTIVE EXPERTISE MATRIX GRID */}
      <section className="py-24 bg-[#FAF8F5] border-t border-b border-[#9D7D4B]/15 relative overflow-hidden" id="practice">
        {/* Absolute design accent vector */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-b from-[#9D7D4B]/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              01 // CORE PRACTICE MATRIX
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] tracking-tight uppercase">
              Tactical Practice Focus
            </h2>
            <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed mt-4 font-semibold">
              Explore our primary focus spheres. Move cursor over each segment to engage dynamic glare and targeted data readouts.
            </p>
          </div>

          {/* Practice Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#9D7D4B]/20 rounded-2xl overflow-hidden bg-white shadow-xl shadow-[#9D7D4B]/5">
            {practiceGrid.map((item, idx) => {
              const isHovered = activeMatrixHover === idx;
              
              return (
                <div
                  key={idx}
                  onMouseMove={(e) => handleMatrixMouseMove(e, idx)}
                  onMouseLeave={() => setActiveMatrixHover(null)}
                  className="relative p-8 lg:p-10 border-b border-r border-[#9D7D4B]/15 group cursor-pointer overflow-hidden transition-all duration-500 min-h-[310px] flex flex-col justify-between bg-white hover:bg-neutral-50"
                  style={{
                    borderRightWidth: (idx + 1) % 3 === 0 ? '0px' : '1px',
                    borderBottomWidth: idx < 3 ? '1px' : '0px'
                  }}
                >
                  {/* Desaturated background image fade-in with warm luxury blend overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 group-hover:scale-105 pointer-events-none z-0 filter saturate-[0.15] contrast-[1.1] brightness-[0.95]"
                    style={{
                      backgroundImage: `url(${item.bgImage})`,
                      opacity: isHovered ? 0.35 : 0
                    }}
                  />

                  {/* Warm luxury gold overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-[#9D7D4B]/5 via-transparent to-[#FAF8F5]/10 pointer-events-none z-10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                  {/* GSAP / CSS Custom mouse follow glow */}
                  {isHovered && (
                    <div 
                      className="absolute rounded-full pointer-events-none z-10 w-44 h-44 bg-[#9D7D4B]/10 blur-2xl -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                      style={{
                        left: `${matrixMousePos.x}px`,
                        top: `${matrixMousePos.y}px`,
                      }}
                    />
                  )}

                  {/* Code Badge */}
                  <div className="relative z-20 flex justify-between items-start">
                    <span className={`text-[9px] font-mono font-extrabold tracking-[0.25em] px-3 py-1.5 rounded transition-colors duration-300 ${
                      isHovered 
                        ? 'text-white border-transparent bg-[#9D7D4B]' 
                        : 'text-[#9D7D4B] border-[#9D7D4B]/20 bg-[#9D7D4B]/5 border'
                    }`}>
                      {item.code}
                    </span>
                    <span className={`transition-all duration-500 ${isHovered ? 'text-[#9D7D4B] translate-x-1 -translate-y-1' : 'text-[#111215]/30'}`}>
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Main Content Info */}
                  <div className="relative z-20 pt-12">
                    <h3 className={`font-serif text-base sm:text-lg font-bold uppercase transition-colors duration-300 ${
                      isHovered ? 'text-[#9D7D4B]' : 'text-[#111215]'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs mt-3 leading-relaxed transition-colors duration-300 font-semibold ${
                      isHovered ? 'text-[#111215]/90' : 'text-[#111215]/65'
                    }`}>
                      {item.description}
                    </p>
                    
                    {/* Interactive Highlight Reveal */}
                    <div className={`overflow-hidden transition-all duration-500 mt-4 border-t ${
                      isHovered 
                        ? 'max-h-16 pt-3 border-[#9D7D4B]/20 opacity-100' 
                        : 'max-h-0 opacity-0 border-transparent'
                    }`}>
                      <p className="text-[10px] font-bold text-[#9D7D4B] font-mono tracking-wider uppercase">
                        {item.highlight}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* SECTION 2: LANDMARK SUCCESS HORIZONTAL TIMELINE */}
      <section ref={timelineSectionRef} className="py-24 bg-[#FAF8F5] relative overflow-hidden" id="cases">
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              02 // LANDMARK VICTORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] tracking-tight uppercase">
              Landmark Resolutions
            </h2>
            <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed mt-4 font-semibold">
              Explore the monumental settlements, complete liability shielding, and sovereign outcomes closed under intense transactional pressure.
            </p>
          </div>

          {/* Dynamic Progress Timeline Rail Container */}
          <div className="relative pt-12">
            
            {/* Background rail track */}
            <div className="absolute top-[16px] left-0 w-full h-[2px] bg-[#9D7D4B]/15 z-0 rounded-full" />
            
            {/* Dynamic Gold Fill Line tracking scroll */}
            <div 
              className="absolute top-[16px] left-0 h-[2px] bg-[#9D7D4B] z-10 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(157,125,75,0.7)]"
              style={{ width: `${timelineProgress * 100}%` }}
            />

            {/* Timeline Cards Container */}
            <div 
              ref={timelineScrollRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20 mt-8"
            >
              {timelineData.map((item, idx) => {
                const activationThreshold = (idx) / timelineData.length;
                const isActive = timelineProgress >= activationThreshold;

                return (
                  <div 
                    key={idx}
                    className={`p-6 bg-white rounded-2xl border transition-all duration-500 flex flex-col justify-between min-h-[350px] relative ${
                      isActive 
                        ? 'border-[#9D7D4B] shadow-lg shadow-[#9D7D4B]/5 -translate-y-1.5' 
                        : 'border-[#9D7D4B]/10 opacity-60 translate-y-0'
                    }`}
                  >
                    {/* Unique Double Border Effect inside Active Card for Prestige and Aura */}
                    {isActive && (
                      <div className="absolute inset-1 border border-dashed border-[#9D7D4B]/35 rounded-[12px] pointer-events-none" />
                    )}

                    {/* Node Anchor */}
                    <div 
                      className={`absolute -top-[52px] left-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-30 ${
                        isActive 
                          ? 'bg-[#9D7D4B] border-[#9D7D4B] scale-110 shadow-md shadow-[#9D7D4B]/25' 
                          : 'bg-[#FAF8F5] border-[#9D7D4B]/30 scale-100'
                      }`}
                    >
                      {isActive && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>

                    {/* Metadata Header */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-serif text-3xl font-extrabold text-[#9D7D4B]/25 tracking-tight">
                          {item.year}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#9D7D4B] font-bold">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-serif font-extrabold text-base text-[#111215] mb-2 leading-tight uppercase tracking-wide">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-[#111215]/75 leading-relaxed font-semibold mt-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Monetary Resolution Stat (Footer) */}
                    <div className="border-t border-[#9D7D4B]/15 pt-4 mt-6 relative z-10">
                      <span className="text-[8px] uppercase tracking-wider text-[#9D7D4B] block font-mono font-bold">
                        RESOLUTION RECOVERY
                      </span>
                      <span className="font-serif font-black text-xl text-[#9D7D4B] mt-0.5 block">
                        {item.recovery}
                      </span>
                      <span className="text-[10px] font-semibold text-[#111215]/60 mt-1 block">
                        {item.detail}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 3: "THE ELITE COUNCIL" PARTNER SPOTLIGHT */}
      <section 
        ref={partnerContainerRef}
        onMouseMove={handlePartnerMouseMove}
        className="py-24 bg-[#111215] border-t border-b border-[#9D7D4B]/15 relative overflow-hidden" 
        id="clients"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(157,125,75,0.05),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              03 // THE ELITE COUNCIL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white uppercase tracking-tight">
              Managing Partners
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-4 font-semibold">
              Attorneys of immense commercial presence, combining tactical litigation defense with deep boardroom maneuvers.
            </p>
          </div>

          {/* Typography-First List */}
          <div className="space-y-0 border-t border-b border-[#9D7D4B]/20">
            {partners.map((partner, idx) => {
              const isHovered = activePartner === idx;
 
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setActivePartner(idx)}
                  onMouseLeave={() => setActivePartner(null)}
                  className="py-10 md:py-12 border-b border-[#9D7D4B]/10 last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative group transition-colors duration-500"
                >
                  {/* Left Name Group */}
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-[#9D7D4B] font-bold">0{idx + 1}</span>
                    <div>
                      <h3 className={`font-serif text-2xl md:text-3xl font-extrabold tracking-tight uppercase transition-all duration-300 ${
                        isHovered ? 'text-[#9D7D4B] translate-x-3' : 'text-white'
                      }`}>
                        {partner.name}
                      </h3>
                      <p className="text-[10px] font-extrabold text-[#9D7D4B] mt-1.5 uppercase tracking-[0.25em] font-mono">
                        {partner.role}
                      </p>
                    </div>
                  </div>

                  {/* Right Highlights */}
                  <div className="flex items-center gap-12 text-left md:text-right">
                    <div className="hidden sm:block">
                      <span className="text-[8px] uppercase tracking-wider text-neutral-500 block font-mono font-bold">CAREER HIGHPOINT</span>
                      <span className="font-mono text-xs text-neutral-300 mt-0.5 block tracking-widest">{partner.cases}</span>
                    </div>
                    
                    {/* Circle Arrow Button */}
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isHovered ? 'bg-[#9D7D4B] text-white border-[#9D7D4B] scale-105 shadow-lg shadow-[#9D7D4B]/25' : 'text-[#9D7D4B] border-[#9D7D4B]/30 bg-transparent'
                    }`}>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Mobile portrait inline preview */}
                  <div className="block md:hidden mt-4 w-full">
                    <div className="flex gap-4 items-center bg-neutral-900 p-4 rounded-xl border border-[#9D7D4B]/15">
                      <img 
                        src={partner.image} 
                        alt={partner.name} 
                        className="w-16 h-20 object-cover rounded-lg border border-[#9D7D4B]/10 filter grayscale contrast-[1.1] brightness-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-[11px] text-neutral-300 leading-relaxed font-semibold">
                          {partner.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Desktop Floating/Tracking Portrait Preview Box */}
          <div className="hidden md:block pointer-events-none">
            {partners.map((partner, idx) => {
              const isHovered = activePartner === idx;
              
              return (
                <div
                  key={idx}
                  className="absolute pointer-events-none z-30 transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-[#9D7D4B]/20 bg-[#111215] w-[280px] h-[360px]"
                  style={{
                    left: `${partnerMousePos.x + 25}px`,
                    top: `${partnerMousePos.y - 180}px`,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1) rotate(2deg)' : 'scale(0.9) rotate(0deg)',
                    visibility: isHovered ? 'visible' : 'hidden',
                  }}
                >
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="w-full h-[62%] object-cover filter grayscale contrast-[1.1] brightness-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 bg-neutral-900 h-[38%] border-t border-[#9D7D4B]/15 flex flex-col justify-center">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#9D7D4B] font-bold block">
                      {partner.role}
                    </span>
                    <p className="text-[11px] text-neutral-300 leading-relaxed mt-2 font-semibold">
                      {partner.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* SECTION 4: "CORPORATE DEFENSE ANALYTICS" LIVE DASHBOARD */}
      <section ref={analyticsSectionRef} className="py-24 bg-[#FAF8F5] relative overflow-hidden" id="analytics">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              04 // DATA-DRIVEN INSIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] tracking-tight uppercase">
              Corporate Analytics
            </h2>
            <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed mt-4 font-semibold">
              Real-time structural metrics proving our capability to insulate client portfolios and drive immediate pre-trial dismissals.
            </p>
          </div>

          {/* Grid Layout: Stats left, Charts right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left: Progress Gauges (Dynamic SVGs) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Card 1: Risk Mitigation Gauge */}
              <div className="p-8 bg-white rounded-2xl border border-[#9D7D4B]/15 flex items-center justify-between gap-6 shadow-xl shadow-[#9D7D4B]/5">
                <div className="text-left">
                  <span className="w-8 h-8 rounded-lg bg-[#9D7D4B]/10 flex items-center justify-center text-[#9D7D4B] mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif font-extrabold text-base text-[#111215] uppercase tracking-wide">
                    Risk Mitigation
                  </h3>
                  <p className="text-[11px] text-[#111215]/60 mt-1.5 max-w-[200px] font-semibold">
                    Sovereign risk dilution following corporate retainer onboarding.
                  </p>
                </div>

                {/* SVG Progress Ring */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="56" cy="56" r="46" 
                      className="stroke-[#9D7D4B]/10 fill-none" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="56" cy="56" r="46" 
                      className="stroke-[#9D7D4B] fill-none transition-all duration-1000 ease-out" 
                      strokeWidth="8"
                      strokeDasharray="289"
                      strokeDashoffset={289 - (289 * (statsInView ? 99.4 : 0)) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="font-serif font-black text-sm text-[#9D7D4B]">
                      {riskReduction}%
                    </span>
                    <span className="text-[8px] block uppercase text-[#111215]/40 font-mono font-bold">Mitigated</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Resolution Speed Gauge */}
              <div className="p-8 bg-white rounded-2xl border border-[#9D7D4B]/15 flex items-center justify-between gap-6 shadow-xl shadow-[#9D7D4B]/5">
                <div className="text-left">
                  <span className="w-8 h-8 rounded-lg bg-[#9D7D4B]/10 flex items-center justify-center text-[#9D7D4B] mb-3">
                    <Clock className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif font-extrabold text-base text-[#111215] uppercase tracking-wide">
                    Resolution Velocity
                  </h3>
                  <p className="text-[11px] text-[#111215]/60 mt-1.5 max-w-[200px] font-semibold">
                    Average timeframe mapped to complete post-filing conflict isolation.
                  </p>
                </div>

                {/* SVG Progress Ring */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="56" cy="56" r="46" 
                      className="stroke-[#9D7D4B]/10 fill-none" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="56" cy="56" r="46" 
                      className="stroke-[#9D7D4B] fill-none transition-all duration-1000 ease-out" 
                      strokeWidth="8"
                      strokeDasharray="289"
                      strokeDashoffset={289 - (289 * (statsInView ? 62.5 : 0)) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="font-serif font-black text-sm text-[#9D7D4B]">
                      {resolutionCount} Days
                    </span>
                    <span className="text-[8px] block uppercase text-[#111215]/40 font-mono font-bold">AVG SPEED</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Satisfaction Rating */}
              <div className="p-6 bg-white text-[#111215] rounded-2xl border border-[#9D7D4B]/15 flex items-center justify-between shadow-xl shadow-[#9D7D4B]/5">
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#9D7D4B] font-mono font-bold block">Enterprise Wealth Security</span>
                  <p className="text-xs text-[#111215]/80 mt-1 font-semibold">Protected Global IP Portfolios</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#9D7D4B]" />
                  <span className="font-mono text-lg text-[#9D7D4B] font-bold">+320</span>
                </div>
              </div>

            </div>

            {/* Right: Elegant Area Chart (Resolution Speed Over Time) */}
            <div className="lg:col-span-7 p-8 bg-white rounded-2xl border border-[#9D7D4B]/15 flex flex-col justify-between shadow-xl shadow-[#9D7D4B]/5">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="text-left">
                  <h3 className="font-serif font-extrabold text-lg text-[#111215] uppercase tracking-wide">
                    Resolution Efficiency Curve
                  </h3>
                  <p className="text-xs text-[#111215]/60 mt-0.5 font-semibold">
                    Tracking dispute duration against traditional Big-Law averages.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 bg-[#9D7D4B]/10 border border-[#9D7D4B]/20 text-[#9D7D4B] rounded-md font-bold">
                  Audit Ledger: 2026
                </span>
              </div>

              <div className="h-[280px] w-full" id="chart-area-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={speedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9D7D4B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9D7D4B" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#111215" strokeOpacity={0.4} style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 'bold' }} />
                    <YAxis stroke="#111215" strokeOpacity={0.4} style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 'bold' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        borderColor: '#9D7D4B', 
                        borderRadius: '12px', 
                        fontSize: '11px',
                        color: '#111215',
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        boxShadow: '0 8px 30px rgba(157,125,75,0.08)'
                      }} 
                    />
                    <Area type="monotone" dataKey="days" name="LEGALINK Average" stroke="#9D7D4B" strokeWidth={2} fillOpacity={1} fill="url(#colorDays)" />
                    <Area type="monotone" dataKey="target" name="Industry Standard" stroke="#111215" strokeWidth={1} strokeDasharray="4 4" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between border-t border-[#9D7D4B]/15 pt-4 mt-6 text-[10px] text-[#111215]/60 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9D7D4B]" /> LEGALINK Portfolio Average
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-transparent border border-dashed border-[#111215]/30" /> AmLaw 100 Baseline
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 5 NEW ELITE SECTIONS (AUTONOMOUSLY GENERATED MASTERPIECE) */}
      {/* ========================================================= */}

      {/* NEW SECTION 5: THE WAR ROOM LEDGER (CRISIS INTERVENTIONS) */}
      <section className="py-24 bg-[#FAF8F5] border-t border-b border-[#9D7D4B]/15 relative overflow-hidden" id="war-room">
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              05 // INCIDENT DEPLOYMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] uppercase tracking-tight">
              The War Room Ledger
            </h2>
            <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed mt-4 font-semibold">
              High-stakes crisis defense timelines. Interact with the active ledger to trigger tactical targeting vectors and secure action plan readouts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Ledger Navigation */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
              {warRoomLedgerData.map((ledger, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLedger(idx)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-sm ${
                    activeLedger === idx 
                      ? 'bg-[#111215] border-[#9D7D4B] shadow-xl shadow-[#9D7D4B]/10' 
                      : 'bg-white border-[#9D7D4B]/15 hover:border-[#9D7D4B]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono uppercase tracking-wider font-bold ${activeLedger === idx ? 'text-[#9D7D4B]' : 'text-[#9D7D4B]'}`}>{ledger.status}</span>
                    <span className={`text-xs font-mono ${activeLedger === idx ? 'text-neutral-400' : 'text-[#111215]/45'}`}>CODE: {idx + 1}</span>
                  </div>
                  <div className="mt-4">
                    <h3 className={`font-serif font-extrabold text-base uppercase ${activeLedger === idx ? 'text-white' : 'text-[#111215]'}`}>{ledger.title}</h3>
                    <p className={`text-[10px] mt-1 font-mono ${activeLedger === idx ? 'text-[#9D7D4B]' : 'text-[#9D7D4B]'}`}>{ledger.target}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Interactive Display Monitor */}
            <div className="lg:col-span-8 bg-white border border-[#9D7D4B]/25 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#9D7D4B]/5">
              <div className="absolute top-4 right-6 flex items-center gap-1.5 text-[9px] font-mono text-[#9D7D4B] uppercase font-bold">
                <span className="w-1.5 h-1.5 bg-[#9D7D4B] rounded-full animate-ping" />
                <span>CONFIDENTIAL TERMINAL ST-X9</span>
              </div>

              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(157,125,75,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(157,125,75,0.015)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

              <div className="relative z-10 text-left">
                <div className="border-b border-[#9D7D4B]/15 pb-4 mb-6">
                  <span className="text-[10px] font-mono text-[#9D7D4B] block tracking-widest uppercase font-bold">CASE BRIEFING RECORD:</span>
                  <h3 className="font-serif text-2xl font-black text-[#111215] mt-1 uppercase tracking-wider">
                    {warRoomLedgerData[activeLedger].title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <span className="text-[9px] font-mono text-[#111215]/40 block font-bold">TARGET ENTITY</span>
                    <span className="text-xs text-[#111215] mt-1 block font-bold font-mono tracking-widest uppercase">{warRoomLedgerData[activeLedger].target}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#111215]/40 block font-bold">DISPUTE EXPOSURE</span>
                    <span className="text-xs text-[#9D7D4B] mt-1 block font-bold font-mono tracking-widest">{warRoomLedgerData[activeLedger].stake}</span>
                  </div>
                </div>

                <p className="text-xs text-[#111215]/80 leading-relaxed font-semibold bg-[#FAF8F5] p-5 rounded-xl border border-[#9D7D4B]/10 italic">
                  "{warRoomLedgerData[activeLedger].incidentBrief}"
                </p>
              </div>

              <div className="relative z-10 border-t border-[#9D7D4B]/15 pt-6 mt-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[8px] font-mono text-[#9D7D4B] uppercase tracking-widest block font-bold">Sterling Intervention Protocol</span>
                    <span className="text-[11px] font-mono text-[#111215]/70 mt-1 block font-semibold">{warRoomLedgerData[activeLedger].actionPlan}</span>
                  </div>
                  <div className="bg-[#9D7D4B]/10 px-4 py-2 border border-[#9D7D4B]/20 rounded-lg text-center font-mono">
                    <span className="text-[10px] text-[#9D7D4B] font-bold tracking-widest block">{warRoomLedgerData[activeLedger].readout}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 6: THE SOVEREIGN ASSET SHIELD (ASSET INSULATION) */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden animate-fade-in" id="sovereign-shield">
        <div className="absolute -left-32 top-1/4 w-[35rem] h-[35rem] bg-[#9D7D4B]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content / Controller */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
                06 // PRIVATE WEALTH COMPASS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] uppercase mb-6 tracking-tight">
                Sovereign Wealth Insulation
              </h2>
              <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed font-semibold mb-8">
                We design bulletproof intergenerational asset vaults outside the exposure of sovereign regulatory interference. Toggle the shielding levels on the interactive compass coordinate to inspect trust layers.
              </p>
 
              {/* Interactive Tier Switchers */}
              <div className="space-y-3">
                {Object.keys(assetShieldTiers).map((key) => {
                  const tier = assetShieldTiers[key as keyof typeof assetShieldTiers];
                  const isSelected = selectedAssetTier === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAssetTier(key)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between shadow-sm ${
                        isSelected 
                          ? 'bg-[#111215] border-[#9D7D4B] shadow-lg shadow-[#9D7D4B]/10' 
                          : 'bg-white border-[#9D7D4B]/15 hover:border-[#9D7D4B]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#9D7D4B]' : 'bg-neutral-300'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-[#111215]/85'}`}>{tier.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#9D7D4B]' : 'text-[#9D7D4B]'}`}>{tier.coverage}</span>
                    </button>
                  );
                })}
              </div>
            </div>
 
            {/* Right Visual Compass Shield Display */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center">
              <div className="relative w-80 h-80 sm:w-96 h-96 flex items-center justify-center">
                {/* Rotating SVG Compass Background */}
                <div 
                  className="absolute inset-0 transition-transform duration-300 pointer-events-none"
                  style={{ transform: `rotate(${shieldRotation}deg)` }}
                >
                  <svg className="w-full h-full text-[#9D7D4B]/20" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="15 5" />
                    <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.5" />
                    <polygon points="100,20 104,30 96,30" fill="currentColor" />
                    <polygon points="100,180 104,170 96,170" fill="currentColor" />
                  </svg>
                </div>
 
                {/* Secure Active Center Display Card */}
                <div className="bg-white rounded-2xl p-6 w-[280px] sm:w-[320px] text-center border border-[#9D7D4B]/35 relative z-10 shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-[#9D7D4B]/10 text-[#9D7D4B] flex items-center justify-center mx-auto mb-4 border border-[#9D7D4B]/25">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-[#9D7D4B] uppercase tracking-[0.2em] block font-bold">Custody Protocol Verified</span>
                  <h3 className="font-serif text-lg font-extrabold uppercase text-[#111215] mt-1 border-b border-[#9D7D4B]/15 pb-3">
                    {assetShieldTiers[selectedAssetTier as keyof typeof assetShieldTiers].name}
                  </h3>
 
                  <p className="text-[10px] text-[#111215]/75 leading-relaxed font-semibold my-4">
                    {assetShieldTiers[selectedAssetTier as keyof typeof assetShieldTiers].brief}
                  </p>
 
                  <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#9D7D4B]/10 text-left space-y-2 text-[10px] font-mono">
                    <p className="text-[#111215]/50 uppercase font-bold">Insulating Mechanisms:</p>
                    {assetShieldTiers[selectedAssetTier as keyof typeof assetShieldTiers].mechanisms.map((mech, i) => (
                      <p key={i} className="text-[#111215] font-semibold flex items-center gap-1.5">
                        <span className="text-[#9D7D4B]">✦</span> {mech}
                      </p>
                    ))}
                  </div>
 
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono border-t border-[#9D7D4B]/15 pt-3">
                    <span className="text-[#111215]/40 font-bold">SECURE SHELL:</span>
                    <span className="text-[#9D7D4B] font-black">{assetShieldTiers[selectedAssetTier as keyof typeof assetShieldTiers].shieldLevel}</span>
                  </div>
                </div>
              </div>
            </div>
 
          </div>
        </div>
      </section>

      {/* NEW SECTION 7: THE GLOBAL REGULATORY HOTMAP (RISK MATRIX) */}
      <section className="py-24 bg-[#FAF8F5] border-t border-b border-[#9D7D4B]/15 relative overflow-hidden" id="hotmap">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              07 // GLOBAL THREAT RADAR
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] uppercase tracking-tight">
              Regulatory Threat Hotmap
            </h2>
            <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed mt-4 font-semibold">
              Real-time geopolitical tracking of antitrust friction and executive corporate investigations across primary market jurisdictions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Radar Node Navigation Grid */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {Object.keys(geopoliticalThreats).map((key) => {
                const node = geopoliticalThreats[key as keyof typeof geopoliticalThreats];
                const isActive = activeRadarNode === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveRadarNode(key);
                      setRadarPulse(!radarPulse);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between shadow-sm ${
                      isActive 
                        ? 'bg-[#111215] border-[#9D7D4B] shadow-xl shadow-[#9D7D4B]/10' 
                        : 'bg-white border-[#9D7D4B]/15 hover:border-[#9D7D4B]/35'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${isActive ? 'bg-[#111215] border-[#9D7D4B]/40 text-[#9D7D4B]' : 'bg-[#FAF8F5] border-[#9D7D4B]/20 text-[#9D7D4B]'}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className={`text-xs font-extrabold uppercase tracking-widest ${isActive ? 'text-white' : 'text-[#111215]'}`}>{node.city}</h3>
                        <span className={`text-[10px] font-mono mt-0.5 block ${isActive ? 'text-neutral-400' : 'text-[#111215]/50'}`}>{node.agency}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase ${
                      node.riskLevel === 'CRITICAL ALERT' ? 'text-red-500' : 'text-[#9D7D4B]'
                    }`}>{node.riskLevel}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Tactical Map Readout */}
            <div className="lg:col-span-7 bg-white border border-[#9D7D4B]/25 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#9D7D4B]/5">
              {/* Radar Grid Graphic Backdrop */}
              <div className="absolute right-4 bottom-4 w-44 h-44 border border-[#9D7D4B]/10 rounded-full flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border border-[#9D7D4B]/5 rounded-full" />
                <div className="w-20 h-20 border border-[#9D7D4B]/15 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[1px] h-full bg-[#9D7D4B]/5 rotate-45" />
                  <div className="w-[1px] h-full bg-[#9D7D4B]/5 -rotate-45" />
                </div>
              </div>

              <div className="text-left relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-4 h-4 text-[#9D7D4B]" />
                  <span className="text-[10px] font-mono text-[#9D7D4B] uppercase tracking-widest font-bold">Active Geopolitical Intel Grid</span>
                </div>

                <div className="border-b border-[#9D7D4B]/10 pb-4 mb-6">
                  <span className="text-[9px] font-mono text-[#9D7D4B] uppercase tracking-widest block font-bold">JURISDICTION CENTERED:</span>
                  <h3 className="font-serif text-3xl font-black text-[#111215] mt-1 uppercase tracking-wide">
                    {geopoliticalThreats[activeRadarNode as keyof typeof geopoliticalThreats].city}
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[9px] font-mono text-[#111215]/40 uppercase font-bold">Active Regulatory Focus</span>
                    <p className="text-xs text-[#111215]/80 mt-1 font-mono font-semibold">{geopoliticalThreats[activeRadarNode as keyof typeof geopoliticalThreats].trend}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#111215]/40 uppercase font-bold">Operational Friction Brief</span>
                    <p className="text-xs text-[#111215]/90 mt-1 leading-relaxed font-semibold">
                      {geopoliticalThreats[activeRadarNode as keyof typeof geopoliticalThreats].brief}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#9D7D4B]/10 pt-6 mt-6 relative z-10">
                <div className="flex items-center gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#9D7D4B]/10">
                  <div className="w-9 h-9 rounded-lg bg-[#9D7D4B]/10 flex items-center justify-center text-[#9D7D4B]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] font-mono text-[#9D7D4B] uppercase tracking-widest block font-bold">TACTICAL DEFENSE DEPLOYMENT</span>
                    <p className="text-xs font-semibold text-[#111215] mt-0.5">{geopoliticalThreats[activeRadarNode as keyof typeof geopoliticalThreats].strategy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 8: THE LITIGIOUS AI RISK SIMULATOR (THREAT SIMULATION) */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden" id="diagnostic">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#9D7D4B]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Controller Panel */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
                08 // RISK FORECASTING ENGINE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] uppercase mb-6 tracking-tight">
                Litigious Threat Simulator
              </h2>
              <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed font-semibold mb-8">
                Select your industry coordinates and current regulatory threat vector below to initiate our proprietary machine-auditing simulation.
              </p>

              <div className="space-y-6">
                {/* Industry Selector */}
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#111215]/45 block mb-2 font-mono font-bold">1. Select Target Sector</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'tech', label: 'Tech Unicorn' },
                      { key: 'banking', label: 'Finance / VC' },
                      { key: 'energy', label: 'Sovereign Energy' }
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => {
                          setSimIndustry(btn.key);
                          setSimState('idle');
                        }}
                        className={`px-3 py-3 rounded-xl border text-[10px] font-bold tracking-wider uppercase transition-all duration-300 text-center shadow-sm ${
                          simIndustry === btn.key 
                            ? 'bg-[#111215] border-[#9D7D4B] text-white shadow-md' 
                            : 'bg-white border-[#9D7D4B]/15 text-[#111215]/80 hover:border-[#9D7D4B]/35'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Threat Selector */}
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#111215]/45 block mb-2 font-mono font-bold">2. Select Primary Threat</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'sec', label: 'SEC Probe' },
                      { key: 'ip', label: 'IP Dispute' },
                      { key: 'ftc', label: 'FTC Antitrust' }
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => {
                          setSimThreat(btn.key);
                          setSimState('idle');
                        }}
                        className={`px-3 py-3 rounded-xl border text-[10px] font-bold tracking-wider uppercase transition-all duration-300 text-center shadow-sm ${
                          simThreat === btn.key 
                            ? 'bg-[#111215] border-[#9D7D4B] text-white shadow-md' 
                            : 'bg-white border-[#9D7D4B]/15 text-[#111215]/80 hover:border-[#9D7D4B]/35'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleRunSimulation}
                  disabled={simState === 'scanning'}
                  className="w-full py-4 bg-[#111215] hover:bg-[#9D7D4B] text-white border border-[#9D7D4B]/40 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 shadow-lg shadow-black/10"
                >
                  <AlertTriangle className="w-4 h-4 text-[#9D7D4B]" />
                  <span>Execute Pre-Audit Diagnostic</span>
                </button>
              </div>
            </div>

            {/* Right Simulation Monitor Readout */}
            <div className="lg:col-span-7 bg-white border border-[#9D7D4B]/25 rounded-2xl p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#9D7D4B]/5">
              <div className="absolute top-4 right-6 flex items-center gap-1.5 text-[9px] font-mono text-[#9D7D4B] uppercase font-bold">
                <span className="w-1.5 h-1.5 bg-[#9D7D4B] rounded-full animate-ping" />
                <span>RISK MATRIX DECODER</span>
              </div>

              {simState === 'idle' && (
                <div className="my-auto text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#9D7D4B]/15 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-[#9D7D4B]/60" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#111215] uppercase mb-2">Diagnostic Awaiting Execution</h3>
                  <p className="text-xs text-[#111215]/60 max-w-sm mx-auto leading-relaxed font-semibold">
                    Initiate simulation on the left panel to scan the system, analyze legal exposure, and unlock custom defense outcomes.
                  </p>
                </div>
              )}

              {simState === 'scanning' && (
                <div className="my-auto text-center py-12">
                  <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                    {/* Rotating Scanner Circle */}
                    <div className="absolute inset-0 border-2 border-dashed border-[#9D7D4B]/30 rounded-full animate-spin" />
                    <span className="font-mono text-base font-bold text-[#9D7D4B]">{simProgress}%</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#111215] uppercase mb-2">Analyzing Jurisprudential Covenants</h3>
                  <p className="text-xs text-[#111215]/60 max-w-sm mx-auto leading-relaxed font-semibold font-mono">
                    Compiling federal regulatory rules, matching board proxies, resolving antitrust equations...
                  </p>
                </div>
              )}

              {simState === 'complete' && (
                <div className="text-left animate-fade-in my-auto space-y-6">
                  <div className="border-b border-[#9D7D4B]/15 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-red-500/10 border border-red-500/20 text-red-600 px-2.5 py-1 rounded font-bold">THREAT ASSESSED</span>
                      <span className="text-xs text-[#111215]/40 font-mono font-bold">SECTOR: {simIndustry.toUpperCase()}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-black text-[#111215] mt-3 uppercase tracking-wide">
                      Diagnostic Summary
                    </h3>
                  </div>

                  <p className="text-xs text-[#111215]/90 leading-relaxed font-mono bg-[#FAF8F5] p-5 rounded-xl border border-[#9D7D4B]/25">
                    {simulatorOutcomes[simIndustry as keyof typeof simulatorOutcomes]?.[simThreat as keyof typeof simulatorOutcomes['tech']]}
                  </p>

                  <div className="bg-[#9D7D4B]/10 p-4 rounded-xl border border-[#9D7D4B]/20 text-[11px] font-semibold flex items-center gap-3">
                    <span className="text-[#9D7D4B] font-bold">✦ SECURITY DECISION:</span>
                    <span className="text-[#111215]/95">Deploy immediate escrow defenses and secure private multi-trust structures to avoid public subpoena trials.</span>
                  </div>
                </div>
              )}

              {/* Secure Shield Footer Signature */}
              <div className="border-t border-[#9D7D4B]/10 pt-4 text-[9px] font-mono text-[#111215]/30 flex items-center justify-between font-bold">
                <span>ESTIMATED CONFLICT PROBABILITY: --.-- %</span>
                <span>SECURED CORE TERMINAL</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW SECTION 9: THE VAULT OF BESPOKE RETAINER TIERS (SOVEREIGN MANDATES) */}
      <section className="py-24 bg-[#FAF8F5] border-t border-b border-[#9D7D4B]/15 relative overflow-hidden" id="sovereign-vault">
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#9D7D4B]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-3">
              09 // BESPOKE COVENANTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#111215] uppercase tracking-tight">
              The Sovereign Vault
            </h2>
            <p className="text-xs sm:text-sm text-[#111215]/75 leading-relaxed mt-4 font-semibold">
              Bespoke litigation retaining. Enter your initial credentials to unlock private corporate counsel and secure an exclusive escrow certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Tier Configuration Selector */}
            <div className="lg:col-span-5 space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-4">
                {[
                  { id: 'imperial', name: 'Imperial Corporate Counsel', retainer: '$25,000 / Mo Escrow', brief: 'Pre-emptive takeover monitoring, executive grand jury representation, and structural multi-sig holding insulation.' },
                  { id: 'sovereign_shield', name: 'Sovereign Wealth Insulation', retainer: '$75,000 / Mo Escrow', brief: 'Elite intergenerational custody trust architecture, dual-jurisdiction licensing shells, and total tax mitigation.' },
                  { id: 'consul', name: 'Sovereign Treaty Alliance', retainer: '$150,000 / Mo Escrow', brief: 'Zenith strategic alignment. reciprocal international trade protection, private offshore banking, and diplomatic immunity vaults.' }
                ].map((tier) => {
                  const isSelected = selectedVaultTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setSelectedVaultTier(tier.id);
                        setVaultUnlocked(false);
                      }}
                      className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden shadow-sm ${
                        isSelected 
                          ? 'bg-[#111215] border-[#9D7D4B] shadow-xl shadow-[#9D7D4B]/10' 
                          : 'bg-white border-[#9D7D4B]/15 hover:border-[#9D7D4B]/35'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-widest ${isSelected ? 'text-white' : 'text-[#111215]'}`}>{tier.name}</span>
                        <span className="text-[11px] font-mono text-[#9D7D4B] font-black">{tier.retainer}</span>
                      </div>
                      <p className={`text-xs font-semibold ${isSelected ? 'text-neutral-300' : 'text-[#111215]/65'}`}>{tier.brief}</p>
                    </button>
                  );
                })}
              </div>

              {/* Digital Initials Signature input */}
              <div className="bg-white p-5 rounded-2xl border border-[#9D7D4B]/20 space-y-3 mt-6 shadow-sm">
                <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block font-mono font-bold">Sign Your Initials to Unlock Certificate</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. M.A."
                    value={signatureInitials}
                    onChange={(e) => setSignatureInitials(e.target.value.toUpperCase())}
                    className="px-4 py-3 bg-[#FAF8F5] border border-[#9D7D4B]/25 rounded-xl text-sm focus:outline-none focus:border-[#9D7D4B] font-mono uppercase tracking-widest text-[#111215] w-28 text-center font-bold"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <button
                      onClick={() => {
                        if (signatureInitials.trim()) {
                          setSignatureError(null);
                          setVaultUnlocked(true);
                          confetti({
                            particleCount: 50,
                            spread: 40,
                            colors: ['#9D7D4B', '#FAF8F5', '#111215']
                          });
                        } else {
                          setSignatureError("Initials required.");
                        }
                      }}
                      className="w-full py-3 bg-[#111215] hover:bg-[#9D7D4B] text-white hover:text-white uppercase font-bold text-xs tracking-wider rounded-xl transition-all duration-300 active:scale-95 shadow-md shadow-black/10"
                    >
                      Unlock Certificate
                    </button>
                    {signatureError && (
                      <span className="text-[10px] text-red-500 font-mono font-bold block text-left mt-1">{signatureError}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Premium Painted Certificate */}
            <div className="lg:col-span-7 bg-white border-2 border-double border-[#9D7D4B]/40 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden text-center shadow-xl shadow-[#9D7D4B]/5">
              {/* Certificate Watermark Graphic */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Scale className="w-80 h-80 text-[#9D7D4B]" />
              </div>

              {vaultUnlocked ? (
                <div className="my-auto space-y-6 animate-fade-in relative z-10 py-6">
                  <span className="text-xs text-[#9D7D4B] font-mono uppercase tracking-[0.3em] block mb-2 font-bold">✦ SOVEREIGN CONSTITUTIVE DECREE ✦</span>
                  <h3 className="font-serif text-3xl font-extrabold text-[#111215] uppercase tracking-wider">
                    Certificate of Escrow Mandate
                  </h3>
                  
                  <p className="text-xs text-[#111215]/75 leading-relaxed font-semibold max-w-md mx-auto italic">
                    "Be it resolved that LEGALINK LLP holds direct, non-disclosable strategic representation and asset insulation mandates for the designated corporate board under escrow validation coordinates."
                  </p>

                  <div className="border-t border-b border-[#9D7D4B]/15 py-4 my-6 max-w-sm mx-auto grid grid-cols-2 gap-4 text-left font-mono text-[10px]">
                    <div>
                      <span className="text-[#111215]/40 uppercase block font-bold">AUTHORIZED RECIPIENT:</span>
                      <span className="text-[#111215] block mt-0.5 tracking-wider font-extrabold">RETAINER ACCOUNT [{signatureInitials}]</span>
                    </div>
                    <div>
                      <span className="text-[#111215]/40 uppercase block font-bold">MANDATE CLASS:</span>
                      <span className="text-[#9D7D4B] block mt-0.5 tracking-wider font-extrabold uppercase">{selectedVaultTier.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="text-xs font-serif text-[#9D7D4B] tracking-widest uppercase font-extrabold">
                    Digitally Sealed & Escrow Confirmed
                  </div>
                </div>
              ) : (
                <div className="my-auto py-12 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#9D7D4B]/15 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Lock className="w-7 h-7 text-[#9D7D4B]/40" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#111215] uppercase mb-2">Certificate Locked</h3>
                  <p className="text-xs text-[#111215]/60 max-w-xs mx-auto leading-relaxed font-semibold">
                    Enter and submit your signature initials in the left console to authorize and render your sovereign escrow mandate certificate.
                  </p>
                </div>
              )}

              <div className="border-t border-[#9D7D4B]/10 pt-4 text-[9px] font-mono text-[#111215]/30 flex items-center justify-between font-bold">
                <span>VERIFICATION KEY: SEC-MD-88301-X</span>
                <span>LEGALINK GENERAL ESCROW</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* IMMERSIVE "SECURE COUNSEL" DYNAMIC PORTAL (ORIGINAL REFACTORED TO ELITE COMPLIANCE) */}
      <section className="py-24 bg-[#FAF8F5] text-[#111215] relative overflow-hidden" id="secure-portal">
        {/* Background design accents */}
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#9D7D4B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-0 w-[40rem] h-[40rem] bg-gradient-to-b from-[#9D7D4B]/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info block */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#9D7D4B] font-mono block mb-4">
                10 // SECURE ESCROW ONBOARDING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#111215] mb-6 uppercase tracking-tight">
                Secure Portal
              </h2>
              <p className="text-xs sm:text-sm text-[#111215]/70 leading-relaxed mb-8 font-semibold">
                Request confidential onboarding with our corporate dispute trial team. All submissions are filtered through military-grade SSL encrypted endpoints.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Lock className="w-4 h-4" />, text: "256-Bit SSL Secured Endpoints" },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Strict Legal Non-Disclosure Protection" },
                  { icon: <Calendar className="w-4 h-4" />, text: "Priority On-Demand Partner Callback" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 text-xs font-bold text-[#111215]/80">
                    <span className="w-7 h-7 rounded-full bg-[#9D7D4B]/15 flex items-center justify-center text-[#9D7D4B]">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form block */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#9D7D4B]/25 relative overflow-hidden shadow-2xl shadow-[#9D7D4B]/5">
                
                {/* Form Progress bar */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#9D7D4B]/10 text-xs">
                  <span className="font-mono text-[#9D7D4B] uppercase tracking-wider font-extrabold">
                    Secure Portal Step {bookingStep} of 3
                  </span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`w-5 h-1 rounded-full transition-all duration-300 ${
                          bookingStep >= step ? 'bg-[#9D7D4B]' : 'bg-[#111215]/10'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {isBookingSuccess ? (
                  // Success State View
                  <div className="text-center py-10 animate-fade-in" id="booking-success-view">
                    <div className="w-16 h-16 bg-[#9D7D4B]/15 text-[#9D7D4B] border border-[#9D7D4B]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-extrabold text-2xl text-[#111215] mb-3">
                      Onboarding Slot Secured
                    </h3>
                    <p className="text-xs text-[#111215]/75 leading-relaxed max-w-sm mx-auto mb-8 font-semibold">
                      Your confidential diagnostic brief is securely filed. A senior managing partner will contact you directly at the selected interval.
                    </p>
                    <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#9D7D4B]/25 max-w-xs mx-auto mb-8 text-left text-[11px] font-mono space-y-2">
                      <p className="text-[#9D7D4B] font-extrabold">RESERVATION RECEIPT:</p>
                      <p><span className="text-[#111215]/40 font-bold">Company:</span> {companyName}</p>
                      <p><span className="text-[#111215]/40 font-bold">Client:</span> {contactPerson}</p>
                      <p><span className="text-[#111215]/40 font-bold">Appt Date:</span> {bookingDate}</p>
                      <p><span className="text-[#111215]/40 font-bold">Appt Time:</span> {bookingTime}</p>
                    </div>
                    <button 
                      onClick={resetBookingForm}
                      className="px-6 py-3 border border-[#9D7D4B] text-[#9D7D4B] hover:bg-[#9D7D4B] hover:text-white rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300"
                    >
                      File New Consultation
                    </button>
                  </div>
                ) : (
                  // Active Interactive Steps
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    
                    {bookingStep === 1 && (
                      <div className="space-y-5 text-left animate-fade-in" id="step-1-form">
                        <div className="relative">
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-2 font-mono font-bold">
                            Enterprise Company Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Acme Tech Holdings Ltd"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            onFocus={() => setFocusInput('company')}
                            onBlur={() => setFocusInput(null)}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#9D7D4B]/15 rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder-[#111215]/30 font-semibold text-[#111215]"
                          />
                          <div className={`absolute bottom-0 left-0 h-[2px] bg-[#9D7D4B] transition-all duration-500 ${
                            focusInput === 'company' ? 'w-full' : 'w-0'
                          }`} />
                        </div>

                        <div className="relative">
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-2 font-mono font-bold">
                            Client Representative Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Marcus Aurelius"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            onFocus={() => setFocusInput('representative')}
                            onBlur={() => setFocusInput(null)}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#9D7D4B]/15 rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder-[#111215]/30 font-semibold text-[#111215]"
                          />
                          <div className={`absolute bottom-0 left-0 h-[2px] bg-[#9D7D4B] transition-all duration-500 ${
                            focusInput === 'representative' ? 'w-full' : 'w-0'
                          }`} />
                        </div>

                        <div className="relative col-span-1">
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-2 font-mono font-bold">
                            Legal Practice Focus Area
                          </label>
                          <div className="relative">
                            <select 
                              value={legalSector}
                              onChange={(e) => setLegalSector(e.target.value)}
                              onFocus={() => setFocusInput('sector')}
                              onBlur={() => setFocusInput(null)}
                              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#9D7D4B]/15 rounded-xl text-xs focus:outline-none transition-all duration-300 text-[#111215] select-custom font-sans appearance-none font-semibold"
                            >
                              <option value="" className="bg-[#FAF8F5]">Select legal sector...</option>
                              <option value="Mergers & Acquisitions" className="bg-[#FAF8F5]">Mergers & Acquisitions (M&A)</option>
                              <option value="Tech IP Prosecution" className="bg-[#FAF8F5]">Tech IP & Patent Defense</option>
                              <option value="Venture Capital Licensing" className="bg-[#FAF8F5]">Venture Capital Financing</option>
                              <option value="White-Collar Corporate Trial" className="bg-[#FAF8F5]">White-Collar Corporate Trial</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#9D7D4B]">
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className={`absolute bottom-0 left-0 h-[2px] bg-[#9D7D4B] transition-all duration-500 ${
                            focusInput === 'sector' ? 'w-full' : 'w-0'
                          }`} />
                        </div>

                         <div className="pt-4 flex flex-col items-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (companyName.trim() && contactPerson.trim()) {
                                setStep1Error(null);
                                setBookingStep(2);
                              } else {
                                setStep1Error("Company name and contact person are mandatory.");
                              }
                            }}
                            className="px-6 py-3.5 bg-[#111215] hover:bg-[#9D7D4B] text-white hover:text-white rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95"
                          >
                            <span>Next: Case Details</span>
                            <ChevronRight className="w-4 h-4 font-bold" />
                          </button>
                          {step1Error && (
                            <span className="text-[10px] text-red-500 font-mono font-bold">{step1Error}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-5 text-left animate-fade-in" id="step-2-form">
                        <div className="relative">
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-2 font-mono font-bold">
                            Confidential Case Brief / Overview
                          </label>
                          <textarea 
                            rows={3}
                            placeholder="Describe the corporate restructuring, hostile audit, or active litigation threat..."
                            value={caseBrief}
                            onChange={(e) => setCaseBrief(e.target.value)}
                            onFocus={() => setFocusInput('brief')}
                            onBlur={() => setFocusInput(null)}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#9D7D4B]/15 rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder-[#111215]/30 resize-none font-semibold text-[#111215]"
                          />
                          <div className={`absolute bottom-0 left-0 h-[2px] bg-[#9D7D4B] transition-all duration-500 ${
                            focusInput === 'brief' ? 'w-full' : 'w-0'
                          }`} />
                        </div>

                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-3 font-mono font-bold">
                            Urgency Classification
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {["Standard", "Expedited", "Active Crisis"].map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => setUrgency(item)}
                                className={`px-4 py-3.5 rounded-xl border text-[10px] uppercase font-bold tracking-wider transition-all duration-300 text-center ${
                                  urgency === item 
                                    ? 'bg-[#111215] border-[#111215] text-white shadow-md' 
                                    : 'bg-[#FAF8F5] border-[#9D7D4B]/20 text-[#111215]/80 hover:border-[#9D7D4B]/35'
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setBookingStep(1)}
                            className="px-6 py-3.5 border border-[#111215]/15 hover:border-[#111215]/30 text-[#111215] rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                          >
                            Back
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setBookingStep(3)}
                            className="px-6 py-3.5 bg-[#111215] hover:bg-[#9D7D4B] text-white hover:text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/10"
                          >
                            <span>Next: Secure Scheduler</span>
                            <ChevronRight className="w-4 h-4 font-bold" />
                          </button>
                        </div>
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div className="space-y-5 text-left animate-fade-in" id="step-3-form">
                        
                        {/* Dynamic Interactive Calendar Trigger */}
                        <div className="relative">
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-2 font-mono font-bold">
                            Select Consultation Date *
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            className="w-full px-4 py-3.5 bg-[#FAF8F5] border border-[#9D7D4B]/15 hover:border-[#9D7D4B]/30 rounded-xl text-xs flex items-center justify-between transition-colors duration-300 font-semibold text-[#111215]"
                          >
                            <span className={bookingDate ? 'text-[#111215]' : 'text-[#111215]/30'}>
                              {bookingDate ? bookingDate : "Select date interval..."}
                            </span>
                            <Calendar className="w-4 h-4 text-[#9D7D4B]" />
                          </button>

                          {/* Interactive Spring Calendar Modal */}
                          {isCalendarOpen && (
                            <div className="absolute top-[80px] left-0 w-full bg-white border border-[#9D7D4B]/40 rounded-xl p-4 z-40 shadow-2xl animate-fade-in">
                              <div className="flex items-center justify-between mb-3 border-b border-[#9D7D4B]/15 pb-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#9D7D4B] font-mono">Select Day</span>
                                <span className="text-[10px] text-[#111215]/40 font-mono font-bold">June 2026</span>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-mono mb-2">
                                {['S','M','T','W','T','F','S'].map((d, i) => <span key={i} className="text-[#111215]/40 font-bold">{d}</span>)}
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: 30 }).map((_, i) => {
                                  const dayNum = i + 1;
                                  const dateStr = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                                  const isSelected = bookingDate === dateStr;
                                  const isWeekend = (i + 1) % 7 === 0 || (i + 2) % 7 === 0;

                                  return (
                                    <button
                                      key={i}
                                      type="button"
                                      disabled={isWeekend}
                                      onClick={() => {
                                        setBookingDate(dateStr);
                                        setIsCalendarOpen(false);
                                      }}
                                      className={`p-1.5 rounded-md text-[10px] font-medium font-mono transition-all duration-200 ${
                                        isSelected 
                                          ? 'bg-[#9D7D4B] text-white font-extrabold' 
                                          : isWeekend 
                                            ? 'text-[#111215]/10 cursor-not-allowed' 
                                            : 'text-[#111215] hover:bg-[#FAF8F5]'
                                      }`}
                                    >
                                      {dayNum}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Available Time Slots */}
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-[#9D7D4B] block mb-3 font-mono font-bold">
                            Select Available Time Slot *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setBookingTime(time)}
                                className={`px-3 py-3 rounded-lg border text-[10px] font-bold tracking-wider transition-all duration-300 text-center ${
                                  bookingTime === time 
                                    ? 'bg-[#111215] border-[#111215] text-white shadow-md' 
                                    : 'bg-[#FAF8F5] border-[#9D7D4B]/15 text-[#111215]/70 hover:border-[#9D7D4B]/35'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 flex flex-col items-stretch gap-3">
                          <div className="flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setBookingStep(2)}
                              className="px-6 py-3.5 border border-[#111215]/15 hover:border-[#111215]/30 text-[#111215] rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                            >
                              Back
                            </button>
                            
                            <button
                              type="submit"
                              className="px-8 py-3.5 bg-[#111215] hover:bg-[#9D7D4B] text-white hover:text-white font-bold rounded-full text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95"
                            >
                              <Lock className="w-4 h-4" />
                              <span>Confirm Secure Booking</span>
                            </button>
                          </div>
                          {bookingError && (
                            <span className="text-[10px] text-red-500 font-mono font-bold text-right">{bookingError}</span>
                          )}
                        </div>
                      </div>
                    )}

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FAF8F5] text-[#111215]/50 text-xs py-12 px-6 lg:px-16 border-t border-[#9D7D4B]/15 text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo element */}
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#9D7D4B]" />
            <span className="font-serif font-extrabold tracking-[0.2em] text-sm text-[#111215]">LEGALINK</span>
          </div>

          <p className="font-semibold tracking-wide font-sans text-[11px] text-[#111215]/50">
            &copy; 2026 LEGALINK LLP. All proprietary corporate defense processes secured. Studio-grade digital deployment.
          </p>

          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-[#9D7D4B] transition-colors duration-200">Non-Disclosure Policy</a>
            <a href="#" className="hover:text-[#9D7D4B] transition-colors duration-200">Terms of Escrow</a>
          </div>

        </div>
      </footer>

    </div>
  );
}
