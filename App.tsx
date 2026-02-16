
import React, { useState, useEffect, useRef } from 'react';
import { 
  Droplets, Menu, X, ShieldCheck, Tags, Handshake, Truck, MessageCircle, 
  Mail, ArrowRight, Sparkles, Globe, Heart, Eye,
  ClipboardCheck, CheckCircle2, ChevronDown, Camera, Upload, Utensils, MapPin, User, Phone, Package, Info, QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setVisible(true); });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 overflow-y-auto py-10">
      <div className="fixed inset-0 bg-[#001a33]/90 backdrop-blur-2xl transition-opacity" onClick={onClose}></div>
      <div className="relative bg-gradient-to-br from-[#003366] to-[#001a33] w-full max-w-4xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-8 right-8 z-10">
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 md:p-16">
          <div className="mb-12">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.8em] font-bold block mb-4">Glosiya Exclusive</span>
            <h2 className="text-4xl md:text-5xl font-light text-white serif italic">{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const links = [
    { name: 'About', id: 'philosophy' },
    { name: 'Mission', id: 'mission' },
    { name: 'Services', id: 'services' },
    { name: 'Partner', id: 'partner' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#003366]/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-2xl font-bold tracking-[0.2em] serif text-white">GLOSIYA</button>
        
        <div className="hidden lg:flex items-center space-x-10">
          {links.map(link => (
            <button key={link.id} onClick={() => scrollToId(link.id)} className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/70 hover:text-white transition-colors">{link.name}</button>
          ))}
          <button onClick={() => scrollToId('partner')} className="px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all bg-white text-[#003366] hover:scale-105">Connect</button>
        </div>

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-[#003366] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {links.map(link => (
          <button key={link.id} onClick={() => { setIsOpen(false); scrollToId(link.id); }} className="text-white text-xl uppercase tracking-widest font-light serif italic">{link.name}</button>
        ))}
        <button onClick={() => { setIsOpen(false); scrollToId('partner'); }} className="bg-white text-[#003366] px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm">Connect</button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      left: Math.random() * 100,
      duration: Math.random() * 7 + 4,
      delay: Math.random() * 5
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden liquid-gradient">
      <div className="light-burst"></div>
      <div className="ripple-overlay"></div>
      {bubbles.map(b => (
        <div 
          key={b.id} 
          className="bubble" 
          style={{ 
            width: b.size, 
            height: b.size, 
            left: `${b.left}%`, 
            '--duration': `${b.duration}s`,
            animationDelay: `${b.delay}s`
          } as any}
        />
      ))}

      <div className="relative z-10 text-center px-6">
        <Reveal>
          <h1 className="text-8xl md:text-[11rem] text-white font-light tracking-[-0.04em] mb-4 leading-none select-none serif drop-shadow-2xl">
            Glosiya
          </h1>
        </Reveal>
        
        <Reveal delay={200}>
          <p className="text-white/90 text-lg md:text-2xl font-light tracking-[0.5em] mb-16 uppercase italic flex items-center justify-center gap-4">
            Pure Water. Pure Life.
          </p>
        </Reveal>
        
        <Reveal delay={400}>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button onClick={() => scrollToId('partner')} className="px-12 py-5 bg-white text-[#003366] rounded-full text-[11px] font-bold tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 shadow-2xl">
              Become a Partner
            </button>
            <button onClick={() => scrollToId('services')} className="px-12 py-5 bg-transparent border border-white/30 text-white rounded-full text-[11px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-white/10 active:scale-95 backdrop-blur-md">
              Our Expertise
            </button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToId('philosophy')}>
        <ChevronDown className="text-white/40" size={32} />
      </div>
    </section>
  );
};

const PurityPromise = () => (
  <section className="bg-[#00aed9] relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-6 py-48 md:py-64 text-center text-white relative z-10">
      <Reveal>
        <span className="text-white/70 text-[10px] uppercase tracking-[1em] font-bold block mb-12">Commitment</span>
        <h2 className="text-5xl md:text-7xl font-light serif mb-16 italic leading-tight">The Signature Guarantee</h2>
        <p className="text-2xl md:text-3xl font-light leading-relaxed tracking-wide italic serif max-w-5xl mx-auto px-4 drop-shadow-lg">
          "Every drop of Glosiya water undergoes strict purification and quality control to ensure unmatched clarity, safety and freshness. We are committed to delivering premium hydration with professional excellence."
        </p>
        <div className="mt-20 flex justify-center">
          <Sparkles className="text-white/40 animate-pulse" size={48} />
        </div>
      </Reveal>
    </div>
  </section>
);

const MissionVision = () => (
  <section id="mission" className="bg-[#003366] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[180px] rounded-full pointer-events-none -translate-y-1/2"></div>
    <div className="max-w-[1400px] mx-auto px-6 py-48 md:py-72 text-white relative z-10">
      <Reveal>
        <div className="text-center mb-32">
          <span className="text-white/40 text-[10px] uppercase tracking-[1em] font-bold block mb-8">Our Foundation</span>
          <h2 className="text-6xl md:text-[8rem] font-light serif italic leading-tight">Mission & Vision</h2>
        </div>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <Reveal>
          <div className="glass-premium p-12 md:p-20 rounded-[4rem] border border-white/5 h-full group transition-all duration-700 hover:border-white/20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 mb-10 group-hover:scale-110 transition-transform">
              <Heart size={32} />
            </div>
            <h3 className="text-4xl font-light serif mb-8 italic">Our Mission</h3>
            <p className="text-white/70 text-xl font-light leading-relaxed tracking-wide">
              To deliver safe, hygienic and premium quality drinking water with consistent purity and professional service, while building long-term partnerships across Bangladesh.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="glass-premium p-12 md:p-20 rounded-[4rem] border border-white/5 h-full group transition-all duration-700 hover:border-white/20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 mb-10 group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <h3 className="text-4xl font-light serif mb-8 italic">Our Vision</h3>
            <p className="text-white/70 text-xl font-light leading-relaxed tracking-wide">
              To become one of the most trusted and premium drinking water brands in Bangladesh, recognized for purity, elegance and professional supply solutions.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Services = () => {
  const [activeModal, setActiveModal] = useState<'restaurant' | 'event' | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedQrFile, setSelectedQrFile] = useState<string | null>(null);

  const items = [
    { 
      id: 'restaurant',
      title: "Restaurant Supply", 
      desc: "Bespoke bottling solutions for premium fine dining establishments.", 
      icon: <Droplets />,
      action: () => setActiveModal('restaurant')
    },
    { 
      id: 'event',
      title: "Customized Event Bottles", 
      desc: "Personalized labeling for weddings, corporate events, and galas.", 
      icon: <Tags />,
      action: () => setActiveModal('event')
    },
    { 
      id: 'corporate',
      title: "Corporate Bulk Orders", 
      desc: "Reliable, large-scale supply solutions for modern office spaces.", 
      icon: <Handshake />,
      action: () => scrollToId('partner')
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const handleQrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedQrFile(e.target.files[0].name);
    }
  };

  return (
    <section id="services" className="py-48 md:py-72 bg-[#002a54] text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-36">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.8em] font-bold block mb-6">Expertise</span>
            <h2 className="text-6xl md:text-8xl font-light serif italic leading-tight">Elevated Services</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div 
                onClick={item.action}
                className="p-12 rounded-[3.5rem] border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)] transition-all duration-700 h-full group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 mb-10 group-hover:bg-white group-hover:text-[#003366] transition-all">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-light serif mb-6 italic">{item.title}</h4>
                <p className="text-white/40 font-light leading-relaxed mb-10">{item.desc}</p>
                <div className="flex items-center gap-3 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Restaurant Partners Modal */}
      <Modal 
        isOpen={activeModal === 'restaurant'} 
        onClose={() => setActiveModal(null)}
        title="Our Esteemed Partners"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Royal Blue Fine Dining", location: "Gulshan 2, Dhaka", type: "Premium Partner" },
            { name: "The Skyline Lounge", location: "Banani, Dhaka", type: "Elite Venue" },
            { name: "Emerald Waters Bistro", location: "Dhanmondi, Dhaka", type: "Signature Supply" },
            { name: "Oceanic Grand Buffet", location: "Uttara, Dhaka", type: "Bulk Partner" }
          ].map((partner, i) => (
            <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-[#003366] flex items-center justify-center text-white/40 group-hover:text-white transition-colors shadow-inner">
                <Utensils size={28} />
              </div>
              <div>
                <h4 className="text-white text-lg font-light serif italic">{partner.name}</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">{partner.location}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/5 rounded-full text-[8px] text-white/50 tracking-widest uppercase font-bold">{partner.type}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm font-light italic mb-8">Want to see your restaurant here? Join our elite distribution network.</p>
          <button onClick={() => { setActiveModal(null); scrollToId('partner'); }} className="px-10 py-4 bg-white text-[#003366] rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:scale-105">Request Partnership</button>
        </div>
      </Modal>

      {/* Event Bottle Order Modal */}
      <Modal 
        isOpen={activeModal === 'event'} 
        onClose={() => setActiveModal(null)}
        title="Bespoke Event Branding"
      >
        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4">Full Name</label>
              <input type="text" placeholder="YOUR NAME" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4">WhatsApp</label>
              <input type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4">Event Category</label>
              <select className="w-full bg-[#001a33] border border-white/10 px-8 py-5 rounded-3xl text-white/50 text-[11px] tracking-widest outline-none input-focus-glow transition-all appearance-none cursor-pointer">
                <option>SELECT EVENT TYPE</option>
                <option>Wedding Celebration</option>
                <option>Corporate Seminar</option>
                <option>Gala Dinner / Party</option>
                <option>Other Special Occasion</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4">Quantity Required</label>
              <input type="number" placeholder="ESTIMATED BOTTLES" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><Tags size={12} /> Custom Brand Name</label>
            <input 
              type="text" 
              placeholder="NAME TO BE PRINTED ON BOTTLE" 
              className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4">Branding (Logo / Photo)</label>
              <div className="relative h-48">
                <input 
                  type="file" 
                  id="logo-upload" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="w-full h-full bg-white/5 border-2 border-dashed border-white/10 px-8 py-10 rounded-3xl text-center transition-all hover:border-white/30 hover:bg-white/[0.07] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                      <Upload size={20} />
                    </div>
                    <p className="text-[11px] text-white/40 tracking-widest font-light uppercase italic">
                      {selectedFile ? `File: ${selectedFile}` : 'Upload Logo'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4">QR Code (Optional)</label>
              <div className="relative h-48">
                <input 
                  type="file" 
                  id="qr-upload" 
                  onChange={handleQrFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="w-full h-full bg-white/5 border-2 border-dashed border-white/10 px-8 py-10 rounded-3xl text-center transition-all hover:border-white/30 hover:bg-white/[0.07] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                      <QrCode size={20} />
                    </div>
                    <p className="text-[11px] text-white/40 tracking-widest font-light uppercase italic">
                      {selectedQrFile ? `File: ${selectedQrFile}` : 'Upload QR Scan'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="button" onClick={() => setActiveModal(null)} className="w-full py-6 bg-white text-[#003366] rounded-[2rem] text-[11px] font-bold tracking-[0.5em] uppercase hover:bg-white/90 shadow-2xl transition-all active:scale-95">Inquire for Customization</button>
        </form>
      </Modal>
    </section>
  );
};

const TrustSection = () => {
  const trusts = [
    { icon: <ShieldCheck />, title: "Safe Production", desc: "Hygienic facility standards." },
    { icon: <ClipboardCheck />, title: "Custom Labeling", desc: "Bespoke branding support." },
    { icon: <Truck />, title: "Fast Delivery", desc: "Reliable logistics network." },
    { icon: <Globe />, title: "Elite Partnership", desc: "Trusted by the best venues." }
  ];
  return (
    <section className="py-32 md:py-48 bg-[#003366] border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
        {trusts.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center group">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/60 mx-auto mb-6 group-hover:bg-white group-hover:text-[#003366] transition-all">
                {t.icon}
              </div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-white/80">{t.title}</h5>
              <p className="text-xs text-white/30 font-light italic">{t.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const PartnerSection = () => {
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [qrFile, setQrFile] = useState<string | null>(null);

  return (
    <section id="partner" className="bg-[#002a54] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 py-48 md:py-72 grid lg:grid-cols-2 gap-24 items-start relative z-10">
        <Reveal>
          <div className="text-white sticky top-32">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.8em] font-bold block mb-8">Collaboration</span>
            <h2 className="text-6xl md:text-8xl font-light serif mb-12 italic leading-tight">Join Our <br/>Elite Circle</h2>
            <p className="text-white/50 text-2xl font-light leading-relaxed max-w-lg mb-12">
              Partner with Glosiya to provide the finest quality drinking water for your guests, branded specifically for your establishment.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-white/60"><CheckCircle2 className="text-white/30" /> Bespoke Bottle Labeling</li>
              <li className="flex items-center gap-4 text-white/60"><CheckCircle2 className="text-white/30" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-4 text-white/60"><CheckCircle2 className="text-white/30" /> Flexible Supply Logistics</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="glass-premium p-10 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><User size={12} /> Owner Name</label>
                  <input type="text" placeholder="FULL NAME" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><Utensils size={12} /> Event / Restaurant Name</label>
                  <input type="text" placeholder="NAME OF EVENT OR RESTAURANT" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><MapPin size={12} /> Full Address</label>
                <input type="text" placeholder="STREET, AREA, CITY" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><Phone size={12} /> Contact</label>
                  <input type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><Package size={12} /> Monthly Volume</label>
                  <select className="w-full bg-[#002a54] border border-white/10 px-8 py-5 rounded-3xl text-white/50 text-[11px] tracking-widest outline-none input-focus-glow transition-all appearance-none cursor-pointer">
                    <option>SELECT VOLUME</option>
                    <option>500 - 2,000 Units</option>
                    <option>2,000 - 10,000 Units</option>
                    <option>10,000+ Units</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><Tags size={12} /> Custom Brand Name</label>
                <input type="text" placeholder="BRAND NAME TO PRINT ON BOTTLE" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-3xl text-white text-[11px] tracking-widest outline-none input-focus-glow transition-all placeholder:text-white/20" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><Info size={12} /> Logo</label>
                  <div className="relative group">
                    <input type="file" onChange={(e) => setLogoFile(e.target.files?.[0]?.name || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full bg-white/5 border border-dashed border-white/10 px-6 py-8 rounded-3xl text-center transition-all group-hover:border-white/30 group-hover:bg-white/[0.07]">
                      <Upload size={16} className="mx-auto mb-3 text-white/40" />
                      <p className="text-[9px] text-white/30 tracking-widest font-light uppercase italic">
                        {logoFile || 'SUBMIT LOGO'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase ml-4 flex items-center gap-2"><QrCode size={12} /> QR Code (Optional)</label>
                  <div className="relative group">
                    <input type="file" onChange={(e) => setQrFile(e.target.files?.[0]?.name || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full bg-white/5 border border-dashed border-white/10 px-6 py-8 rounded-3xl text-center transition-all group-hover:border-white/30 group-hover:bg-white/[0.07]">
                      <Upload size={16} className="mx-auto mb-3 text-white/40" />
                      <p className="text-[9px] text-white/30 tracking-widest font-light uppercase italic">
                        {qrFile || 'SUBMIT QR'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button type="button" className="w-full py-6 bg-white text-[#003366] rounded-[2rem] text-[11px] font-bold tracking-[0.5em] uppercase hover:bg-white/90 shadow-2xl transition-all active:scale-95">Inquire for Partnership</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Connection = () => (
  <section id="contact" className="py-48 md:py-72 bg-[#003366] text-white relative overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <Reveal>
          <div>
            <span className="text-white/30 text-[10px] uppercase tracking-[0.8em] font-bold block mb-10">Direct Connect</span>
            <h2 className="text-6xl md:text-8xl font-light serif mb-16 leading-tight italic">Always at <br/>Your Service.</h2>
            
            <div className="space-y-12">
              <a href="https://wa.me/8801742609954" className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-[#003366] transition-all"><MessageCircle /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">WhatsApp Concierge</p>
                  <p className="text-2xl font-light tracking-tighter">01742609954</p>
                </div>
              </a>
              <a href="mailto:glosiya824@gmail.com" className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-[#003366] transition-all"><Mail /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Official Email</p>
                  <p className="text-xl font-light">glosiya824@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col items-center">
            <div className="p-12 bg-white/5 rounded-[4.5rem] border border-white/5 shadow-3xl flex flex-col items-center group">
              <div className="p-5 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-700">
                <QRCodeSVG 
                  value="https://wa.me/8801742609954" 
                  size={220}
                  level="H"
                />
              </div>
              <p className="mt-12 text-[9px] text-white/30 uppercase tracking-[0.5em] font-bold italic">Scan for instant inquiry</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#002a54] py-32 text-white/20 text-center border-t border-white/5">
    <div className="max-w-[1400px] mx-auto px-6">
      <h2 className="text-3xl font-bold tracking-[0.4em] text-white/10 mb-12 serif">GLOSIYA</h2>
      <div className="w-16 h-px bg-white/5 mx-auto mb-12"></div>
      <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/30">
        © {new Date().getFullYear()} Glosiya Premium Beverages. <br className="md:hidden" /> Crafted for the Visionaries of Bangladesh.
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="selection:bg-white selection:text-[#003366] bg-[#003366]">
      <Navbar />
      <Hero />
      
      <section id="philosophy" className="py-48 md:py-80 bg-[#95d5e8] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-6xl md:text-[9rem] font-light text-[#003366] serif mb-16 italic leading-none">Purity is <span className="text-white">Infinite</span>.</h2>
            <p className="text-2xl md:text-3xl text-[#003366]/70 font-extralight italic serif leading-relaxed max-w-4xl mx-auto">
              We define the standard of high-end hydration, blending artisan purification processes with professional business logistics.
            </p>
          </Reveal>
        </div>
      </section>

      <PurityPromise />
      <MissionVision />
      <Services />
      <TrustSection />
      <PartnerSection />
      <Connection />
      <Footer />

      <a href="https://wa.me/8801742609954" target="_blank" rel="noopener noreferrer" className="fixed bottom-10 right-10 z-[200] bg-[#25D366] text-white p-6 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all group">
        <MessageCircle size={30} />
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
      </a>
    </main>
  );
}
