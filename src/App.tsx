/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  NavLink
} from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  CheckCircle, 
  Clock, 
  Star, 
  Zap, 
  Building2, 
  Stethoscope,
  Droplets,
  Thermometer,
  AlertTriangle,
  Home as HomeIcon,
  Waves,
  Wrench,
  ChevronRight,
  MapPin,
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  Quote,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Helpers ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

// --- Shared Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl font-black font-display text-primary tracking-tighter uppercase">
            JK Plumbers <span className="text-on-surface font-medium text-sm md:text-base opacity-50">DBN</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href} 
              className={({ isActive }) => 
                `font-bold transition-all text-xs uppercase tracking-[0.2em] hover:text-primary ${isActive ? 'text-primary' : 'text-on-surface-variant'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <a 
            href="tel:0832304725" 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-2 text-sm"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-on-surface p-2 rounded-xl bg-surface-light"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 top-[72px] bg-surface z-40 lg:hidden"
          >
            <div className="flex flex-col p-8 gap-6 h-full bg-surface-light">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  className={({ isActive }) => 
                    `text-2xl font-bold font-display tracking-tight ${isActive ? 'text-primary' : 'text-on-surface-variant'}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-auto pb-12 space-y-4">
                <p className="text-on-surface-variant font-bold text-xs uppercase tracking-widest">Emergency Line</p>
                <a 
                  href="tel:0832304725" 
                  className="bg-primary text-white p-6 rounded-3xl font-bold text-center flex items-center justify-center gap-3 text-xl shadow-lg"
                >
                  <Phone size={24} />
                  083 230 4725
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block mb-8">
            <span className="text-2xl font-black font-display text-primary tracking-tighter uppercase">
              JK Plumbers <span className="text-white font-medium text-sm opacity-30">DBN</span>
            </span>
          </Link>
          <p className="text-lg leading-relaxed max-w-md mb-10 text-gray-400">
            Precision, Flow, and Reliability. Your trusted plumbing partner in the heart of Durban since 2012. Providing professional solutions for every drip and drop.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all hover:-translate-y-1">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs mb-8 uppercase tracking-[0.3em]">Quick Links</h4>
          <ul className="space-y-4 font-bold text-sm uppercase tracking-widest">
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Our Team</Link></li>
            <li><Link to="/reviews" className="hover:text-primary transition-colors">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Get A Quote</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs mb-8 uppercase tracking-[0.3em]">Support</h4>
          <ul className="space-y-4 font-bold text-sm uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Use</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()} JK Plumbers (Pty) Ltd. Durban, ZA.</p>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
          <p className="flex items-center gap-2">Built for <span className="text-white">Reliability</span></p>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => (
  <PageTransition>
    {/* Hero */}
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2070&auto=format&fit=crop" 
          alt="Technical Flow" 
          className="w-full h-full object-cover opacity-20 contrast-125 saturate-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-surface/90 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/40 to-surface"></div>
      </div>
      <div className="absolute inset-0 z-0 opacity-10 wave-pattern"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <CheckCircle size={14} /> Certified Master Plumbers
            </span>
            <span className="px-4 py-2 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2">
              <Clock size={14} /> 24/7 Rapid Response
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-medium text-white mb-8 leading-[0.95] tracking-tighter">
            Durban's Most <br/>
            <span className="text-primary italic font-black">Reliable</span> Flow.
          </h1>
          
          <p className="text-xl text-on-surface-variant mb-12 max-w-lg leading-relaxed font-medium">
            We don't just fix pipes; we restore peace of mind. Professional, commercial-grade plumbing for your home and business.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <a 
              href="tel:0832304725" 
              className="bg-primary hover:bg-primary-dark text-white px-12 py-6 rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 group"
            >
              <Phone size={24} className="group-hover:rotate-12 transition-transform" />
              Emergency Help
            </a>
            <Link 
              to="/contact" 
              className="glass text-white px-12 py-6 rounded-[2rem] font-black text-lg hover:bg-surface-light transition-all flex items-center justify-center gap-2 active:scale-95 border border-white/10"
            >
              Get Free Quote
            </Link>
          </div>

                <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-surface bg-surface-light flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i+20}`} alt="User" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm font-bold text-white tracking-wide">Loved by 450+ Locals</p>
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-2xl"></div>
          <div className="relative overflow-hidden rounded-[3rem] border border-white/5 glow-primary group">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
              alt="Plumbing Work" 
              className="w-full h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-10 left-10 right-10 p-8 glass rounded-[2rem]">
              <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Live Updates</p>
              <div className="flex items-center justify-between">
                 <h4 className="text-xl font-bold text-white">Technician En-Route</h4>
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-on-surface-variant mt-2">Currently solving a leak in Umhlanga Rocks.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Quick Services Grid */}
    <section className="py-32 bg-surface-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <div className="max-w-xl">
                    <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Core Expertise</span>
                    <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter leading-none">
                        Precision Fixes for <br/> 
                        <span className="text-secondary">Every Pressure.</span>
                    </h2>
                </div>
                <Link to="/services" className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">
                    View All Services <ArrowRight size={20} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Leak Detection", icon: <Waves />, color: "from-primary/20 to-transparent" },
                    { title: "Geyser Overhaul", icon: <Thermometer />, color: "from-accent/20 to-transparent" },
                    { title: "Pipe Relining", icon: <Wrench />, color: "from-white/10 to-transparent" }
                ].map((s, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ y: -10 }}
                        className={`p-12 rounded-[2.5rem] bg-surface relative overflow-hidden group border border-white/5`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all">
                                {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white mb-4">{s.title}</h3>
                            <p className="text-on-surface-variant leading-relaxed mb-8">Professional diagnosis using thermographic and acoustic tech.</p>
                            <Link to="/contact" className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                                Book Now <ChevronRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  </PageTransition>
);

const AboutPage = () => (
  <PageTransition>
    <section className="pt-40 pb-32 bg-surface min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop" 
          alt="Technical blueprint" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
                    alt="Our Team" 
                    className="rounded-[3rem] shadow-2xl relative z-10 border border-white/5 h-[600px] object-cover"
                />
                <div className="absolute -bottom-10 -right-10 glass p-10 rounded-[2.5rem] z-20 shadow-2xl">
                    <p className="text-5xl font-black text-primary font-display tracking-tighter">12+</p>
                    <p className="text-xs font-black text-white uppercase tracking-widest mt-2">Years In Durban</p>
                </div>
            </div>
            
            <div>
                <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">Established 2012</span>
                <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-10 tracking-tighter leading-none">
                    Decades of <br/>
                    <span className="text-primary italic">Expertise.</span>
                </h2>
                <div className="space-y-8 text-lg text-on-surface-variant leading-relaxed font-medium">
                    <p>
                        JK Plumbers (Pty) Ltd. is a Durban-bred legacy of excellence. Founded on the principle that essential services should be anything but ordinary, we've spent over a decade perfecting the art of precision plumbing.
                    </p>
                    <p>
                        Our technicians aren't just workers—they are certified master craftsmen who treat every home like a palace and every commercial site like a mission-critical facility. We prioritize cleanliness, transparency, and the long-term health of your infrastructure.
                    </p>
                </div>
                
                <div className="mt-16 grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-4xl font-display font-black text-white tracking-tighter">100%</p>
                        <p className="text-xs font-black text-primary uppercase tracking-widest mt-2">Certified Techs</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-black text-white tracking-tighter">24/7</p>
                        <p className="text-xs font-black text-primary uppercase tracking-widest mt-2">Emergency Gear</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  </PageTransition>
);

const ServicesPage = () => {
  const services = [
    { title: "Advanced Leak Detection", desc: "Non-invasive electronic leak detection and thermal imaging diagnostics.", icon: <Droplets /> },
    { title: "Geyser & Solar Systems", desc: "Specialists in heat pump installation, solar geysers, and high-pressure valves.", icon: <Thermometer /> },
    { title: "Emergency Response", desc: "24/7 rapid response for burst pipes, sewage backups, and major flooding.", icon: <AlertTriangle /> },
    { title: "Bathroom Renovations", desc: "A-Z plumbing design and fit-outs for luxury bathroom and kitchen remodels.", icon: <HomeIcon /> },
    { title: "Drain & Sewer Clearing", desc: "High-pressure hydro-jetting and mechanical rooter services.", icon: <Waves /> },
    { title: "Industrial Maintenance", desc: "Preventative plumbing maintenance for factories, malls, and schools.", icon: <Building2 /> },
    { title: "Gas Installations", desc: "Certified gas plumbing and leak testing for residential and commercial.", icon: <Zap /> },
    { title: "Water Filtration", desc: "Whole-home filtration and reverse osmosis system installations.", icon: <Droplets /> },
  ];

  return (
    <PageTransition>
      <section className="pt-40 pb-32 bg-surface min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none wave-pattern"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24 relative z-10">
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Our Catalog</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tighter">Full Spectrum Solutions.</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-[2rem] bg-surface-light border border-white/5 hover:border-primary/50 hover:shadow-2xl shadow-primary/5 transition-all group"
                >
                    <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12">
                        {React.cloneElement(s.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4">{s.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed text-sm font-medium">{s.desc}</p>
                </motion.div>
            ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-32">
            <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 tracking-tighter">Need a Custom Solution?</h2>
                    <p className="text-white/90 text-lg mb-12 font-medium tracking-wide">We handle bespoke plumbing projects for architects, developers, and homeowners.</p>
                    <Link to="/contact" className="bg-white text-primary px-12 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-white/90 transition-all inline-block shadow-2xl">
                        Talk To An Expert
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </PageTransition>
  );
};

const ReviewsPage = () => {
  const reviews = [
    { name: "Sarah Johnson", area: "Durban North", text: "Extremely reliable and always there during emergencies. They fixed our burst pipe in the middle of the night!", initial: "S" },
    { name: "Michael Pillay", area: "Westville", text: "Prompt and reliable service. The technician was very professional and explained exactly what was wrong with my geyser.", initial: "M" },
    { name: "David Zulu", area: "Queensburgh", text: "Very neat job, highly satisfied. They did the plumbing for our kitchen renovation and everything works perfectly.", initial: "D" },
    { name: "Amara Okoronkwo", area: "Umhlanga", text: "Fastest response time I've ever experienced. Had a technician at my door in 25 minutes for a major leak.", initial: "A" },
    { name: "Johan Steyn", area: "Hillcrest", text: "Professional, clean, and honest. They pointed out things other plumbers missed and saved us thousands.", initial: "J" },
    { name: "Fatima Meer", area: "Berea", text: "Used them for our commercial restaurant fit-out. Exceptional understanding of code and industrial standards.", initial: "F" },
  ];

  return (
    <PageTransition>
      <section className="pt-40 pb-32 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24">
            <span className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4 block">Proven Flow</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tighter">Voices of Durban.</h2>
            <div className="flex justify-center gap-1 text-accent mt-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={32} fill="currentColor" />)}
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass p-12 rounded-[2.5rem] relative flex flex-col group hover:bg-surface-light transition-all"
                >
                    <Quote size={60} className="text-primary/5 absolute top-10 right-10" />
                    <p className="text-xl italic text-white mb-12 flex-grow leading-relaxed font-medium">"{r.text}"</p>
                    <div className="flex items-center gap-5 mt-auto">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center font-black text-white text-2xl group-hover:scale-110 transition-transform">
                            {r.initial}
                        </div>
                        <div>
                            <p className="font-black text-white uppercase tracking-widest text-xs">{r.name}</p>
                            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mt-1">{r.area}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>
    </PageTransition>
  );
};

const ContactPage = () => (
  <PageTransition>
    <section className="pt-40 pb-32 bg-surface min-h-screen overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
            <div>
                <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">Ready to Flow</span>
                <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-12 tracking-tighter leading-none">
                    Start Your <br/>
                    <span className="text-primary italic">Precision Repair.</span>
                </h2>
                
                <div className="space-y-12">
                    <div className="flex items-center gap-10 group">
                        <div className="w-20 h-20 rounded-[2rem] bg-surface-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6 shadow-xl border border-white/5">
                            <Phone size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Emergency 24/7</p>
                            <a href="tel:0832304725" className="text-2xl md:text-4xl font-display font-bold text-white hover:text-primary transition-colors">083 230 4725</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="w-20 h-20 rounded-[2rem] bg-surface-light flex items-center justify-center text-primary shadow-xl border border-white/5">
                            <MapPin size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">HQ Location</p>
                            <p className="text-xl md:text-2xl font-bold text-white tracking-tight">42 Kemp Place, Queensburgh, Durban</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="w-20 h-20 rounded-[2rem] bg-surface-light flex items-center justify-center text-primary shadow-xl border border-white/5">
                            <Clock size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Service Hours</p>
                            <p className="text-xl md:text-2xl font-bold text-white tracking-tight">Mon-Fri: 8am - 5pm | Emergency: 24/7</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                     <a 
                        href="https://wa.me/27832304725" 
                        className="inline-flex items-center gap-4 bg-[#25D366] text-white px-12 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-green-500/20 hover:scale-105 transition-transform"
                    >
                        <MessageSquare size={24} />
                        WhatsApp Support
                    </a>
                </div>
            </div>

            <div className="bg-surface-light rounded-[4rem] p-10 md:p-20 border border-white/5 shadow-2xl relative overflow-hidden">
                <h3 className="text-3xl font-display font-bold text-white mb-12 tracking-tight">Request Free Quote</h3>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Your Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. John Doe"
                                className="w-full px-8 py-5 rounded-3xl bg-surface border border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-white font-medium shadow-inner"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="john@example.com"
                                className="w-full px-8 py-5 rounded-3xl bg-surface border border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-white font-medium shadow-inner"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Service Type</label>
                        <select className="w-full px-8 py-5 rounded-3xl bg-surface border border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-white font-medium appearance-none shadow-inner">
                            <option>Leak Detection</option>
                            <option>Geyser Repair</option>
                            <option>Emergency Line</option>
                            <option>New Installation</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Issue Details</label>
                        <textarea 
                            rows={4}
                            placeholder="Briefly describe the plumbing issue..."
                            className="w-full px-8 py-5 rounded-3xl bg-surface border border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-white font-medium resize-none shadow-inner"
                        ></textarea>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95">
                        Submit Request
                    </button>
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant mt-8 opacity-40">Secure, direct digital dispatch.</p>
                </form>
            </div>
        </div>
      </div>
    </section>
  </PageTransition>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
