import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, TrendingUp, Leaf, Home, Award, Shield, CheckCircle2, Phone, Mail, ArrowRight, Sprout, TreePine, Droplets, Sun, Sparkles, Users, Target, Zap, Clock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className="stat-number counter">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.message || "Farmland Inquiry"
      });
      toast.success("Thank you! Our team will contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFormErrors({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App farmland-theme">
      {/* Sticky Header Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'backdrop-blur-xl shadow-lg' : ''
        }`}
        style={{ 
          background: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          borderBottom: scrollY > 50 ? '1px solid rgba(90, 107, 16, 0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/aojdr133_AG%20logo%20without%20Arch.png" 
                alt="Agrocorp"
                className="h-12 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#current-project" className="text-sm font-medium hover:underline transition-colors" style={{ color: scrollY > 50 ? '#242e06' : '#0f172a' }}>
                Central Vista Farms
              </a>
              <a href="#investment-strategy" className="text-sm font-medium hover:underline transition-colors" style={{ color: scrollY > 50 ? '#242e06' : '#0f172a' }}>
                Investment Strategy
              </a>
              <Button
                onClick={scrollToForm}
                size="sm"
                className="farmland-button text-white font-semibold px-6"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </nav>

            {/* Mobile CTA */}
            <Button
              onClick={scrollToForm}
              size="sm"
              className="md:hidden farmland-button text-white font-semibold px-4"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress" 
        style={{ 
          transform: `scaleX(${scrollY / (document.documentElement.scrollHeight - window.innerHeight)})` 
        }}
      />

      {/* Sticky Mobile CTA Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl text-white p-4 shadow-2xl transform transition-transform duration-500 z-50 md:hidden ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          background: '#242e06',
          borderTop: '1px solid #3d4a0a',
          opacity: 0.95
        }}
        data-testid="sticky-mobile-cta"
      >
        <Button 
          onClick={scrollToForm}
          className="w-full farmland-button text-white font-semibold py-6 text-base"
          data-testid="sticky-cta-button"
        >
          Get Investment Strategy <ArrowRight className="w-4 h-4 ml-2 inline" />
        </Button>
      </div>

      {/* Hero Section */}
      <section className="hero-farmland relative overflow-hidden min-h-screen flex items-center pt-20" data-testid="hero-section">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(90, 107, 16, 0.2)' }}></div>
            <div className="absolute top-40 right-10 w-80 h-80 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'rgba(61, 74, 10, 0.2)' }}></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl animate-float-slow" style={{ backgroundColor: 'rgba(122, 142, 26, 0.2)' }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight scroll-animate"
                data-testid="hero-headline"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="text-slate-900">We Don't Just Sell Land.</span>
                <br />
                <span className="farmland-gradient bg-clip-text text-transparent">
                  We Sell a Lifestyle.
                </span>
              </h1>
              
              {/* Subheadline */}
              <p 
                className="text-lg sm:text-xl text-slate-700 mb-6 leading-relaxed scroll-animate"
                data-testid="hero-subheadline"
                style={{ animationDelay: '0.2s' }}
              >
                Your second home isn't just a retreat, it's your personal escape shaped around nature, comfort, and community. From curated locations to seamless infrastructure, we create spaces where
                <span className="font-bold" style={{ color: '#242e06' }}> weekends feel like vacations and every return feels like arrival.</span>
              </p>
              
              {/* Trust Badge - Moved here */}
              <div 
                className="mb-12 scroll-animate"
                data-testid="trust-badge"
                style={{ animationDelay: '0.3s' }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide mb-8" style={{ color: '#5a6b10' }}>101 Premium Farm Plots | Maintenance Services Available</p>
                
                {/* Feature Icons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto lg:mx-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                      <MapPin className="w-12 h-12" style={{ color: '#242e06', strokeWidth: 1.5 }} />
                    </div>
                    <p className="text-xs font-medium leading-tight" style={{ color: '#242e06' }}>60 Minutes from<br />Bangalore Airport</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                      <TreePine className="w-12 h-12" style={{ color: '#242e06', strokeWidth: 1.5 }} />
                    </div>
                    <p className="text-xs font-medium leading-tight" style={{ color: '#242e06' }}>28 Acres<br />of Lush Green</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                      <Leaf className="w-12 h-12" style={{ color: '#242e06', strokeWidth: 1.5 }} />
                    </div>
                    <p className="text-xs font-medium leading-tight" style={{ color: '#242e06' }}>Tropical Themed<br />Community</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                      <Sparkles className="w-12 h-12" style={{ color: '#242e06', strokeWidth: 1.5 }} />
                    </div>
                    <p className="text-xs font-medium leading-tight" style={{ color: '#242e06' }}>Modern Amenities &<br />Features</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center scroll-animate"
                style={{ animationDelay: '0.4s' }}
              >
                <Button 
                  onClick={scrollToForm}
                  size="lg" 
                  className="group farmland-button text-white font-semibold px-10 py-7 text-lg cta-glow magnetic-button shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
                  data-testid="hero-primary-cta"
                >
                  Schedule your Private Briefing
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Image - Aligned with content */}
            <div className="scroll-animate h-full" style={{ animationDelay: '0.5s' }}>
              <div className="relative rounded-3xl overflow-hidden h-full" style={{ 
                minHeight: '100%',
                boxShadow: '0 25px 50px -12px rgba(36, 46, 6, 0.25)'
              }}>
                {/* Actual Site Image */}
                <img 
                  src="https://customer-assets.emergentagent.com/job_alt-graph/artifacts/a97h88yi_1%20%281%29.jpg" 
                  alt="Happy family enjoying their lifestyle home - Central Vista Farms"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Floating Stats Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card-light rounded-2xl p-4" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold" style={{ color: '#242e06' }}>1200+</p>
                        <p className="text-xs" style={{ color: '#5a6b10' }}>Acres Delivered</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: '#242e06' }}>100%</p>
                        <p className="text-xs" style={{ color: '#5a6b10' }}>Clear Title</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: '#242e06' }}>1000+</p>
                        <p className="text-xs" style={{ color: '#5a6b10' }}>Satisfied Families</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Problem / Agitation Section */}
      <section id="investment-strategy" className="py-32 bg-white relative" data-testid="about-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 scroll-animate">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Why do you need a second home?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover the reasons why a second home is more than just property—it's peace, connection, and freedom.
            </p>
          </div>

          {/* Image Carousel */}
          <ImageCarousel />
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-gradient-to-b from-emerald-50 to-white relative" data-testid="why-invest-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 scroll-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Home className="w-4 h-4" style={{ color: '#5a6b10' }} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#242e06' }}>Premium Land & Lifestyle</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              The Elite Asset,
              <span className="block farmland-gradient bg-clip-text text-transparent">Lifestyle, Location, and Unmatched ROI</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We don't just secure your capital, we elevate your lifestyle. Premium managed land delivers three critical returns that secure both your wealth and your future quality of life.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8 mb-12">
            {/* Tangible Security */}
            <div className="modern-card glow-effect scroll-animate grid lg:grid-cols-5 gap-6" data-testid="benefit-card-0">
              <div className="lg:col-span-2">
                {/* Actual Site Image - Entrance Gate */}
                <div className="rounded-xl overflow-hidden h-full min-h-[250px] relative">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/f9mmiv5f_3.JPG" 
                    alt="Central Vista Farms - Modern entrance gate with decorative metal panel"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#242e06' }}>
                  Security and Peace of Mind
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Land is the one asset that never loses its truth. It doesn't vanish, crash, or depreciate, it endures. At Agrocorp, that permanence is backed by our 13-year legacy of clear titles and a spotless, zero-litigation record. When you invest with us, your trust is built on solid ground.
                </p>
              </div>
            </div>

            {/* Second Home Premium */}
            <div className="modern-card glow-effect scroll-animate grid lg:grid-cols-5 gap-6" style={{ animationDelay: '0.2s' }} data-testid="benefit-card-1">
              <div className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#242e06' }}>
                  Premium Managed Asset
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Escape the noise. This is a fully managed escape, ready for you to build your personal villa or simply enjoy the curated surroundings. We deliver the luxury of a private retreat without the friction of personal management.
                </p>
              </div>
              <div className="lg:col-span-2 order-1 lg:order-2">
                {/* Actual Site Image - Managed Farming */}
                <div className="rounded-xl overflow-hidden h-full min-h-[250px] relative">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/bp251ap8_4.jpg" 
                    alt="Central Vista Farms - Managed farming with professional care"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* High-Control Appreciation */}
            <div className="modern-card glow-effect scroll-animate grid lg:grid-cols-5 gap-6" style={{ animationDelay: '0.4s' }} data-testid="benefit-card-2">
              <div className="lg:col-span-2">
                {/* Actual Site Image - Aerial View */}
                <div className="rounded-xl overflow-hidden h-full min-h-[250px] relative">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/v01k37b0_2.JPG" 
                    alt="Central Vista Farms - Aerial view showing strategic layout and infrastructure"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#242e06' }}>
                  High-Controlled Appreciation with Maximum ROI
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We strategically position your asset on the path of rapid urban expansion, ensuring <strong style={{ color: '#5a6b10' }}>Maximum ROI</strong>. You control the timing and direction of the investment, while our location strategy accelerates the profit.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card-light rounded-2xl p-8 scroll-animate text-center">
            <p className="text-lg text-slate-700 italic leading-relaxed">
              "We've transformed land investment into a sophisticated asset class that delivers both lifestyle enhancement and superior financial returns. This is where security meets opportunity."
            </p>
            <p className="text-sm font-semibold mt-4" style={{ color: '#5a6b10' }}>People at Agrocorp</p>
          </div>
        </div>
      </section>

      {/* Bangalore Advantage Section */}
      <section className="py-32 bg-white relative" data-testid="bangalore-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <MapPin className="w-4 h-4" style={{ color: '#5a6b10' }} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#242e06' }}>Market Insights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              The Bangalore Advantage:
              <span className="block farmland-gradient bg-clip-text text-transparent">Securing the Next High-Value Corridor</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Bangalore's premium boundaries are constantly evolving. At Agrocorp, we understand that location defines legacy. That's why every one of our projects begins with strategic land selection, a process perfected over years to ensure enduring value and return.
            </p>
          </div>

          <div className="max-w-4xl mx-auto scroll-animate">
            <div className="space-y-8">
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
                Land is transitioning into low-density, high-value residential havens far faster than the city core can adapt.
              </p>

              <div className="rounded-xl p-8" style={{ 
                background: 'linear-gradient(135deg, rgba(90, 107, 16, 0.1) 0%, rgba(122, 142, 26, 0.1) 100%)',
                border: '2px solid rgba(90, 107, 16, 0.2)'
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#242e06' }}>The Key Insight</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We select land parcels on the absolute path of inevitable urban expansion. By focusing on <strong style={{ color: '#5a6b10' }}>Location Superiority</strong> and <strong style={{ color: '#5a6b10' }}>Legal Certainty</strong>, we ensure your investment realizes maximum value as the city's elite lifestyle shifts outward.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#242e06' }}>Strategic Advantages</h3>
                <div className="space-y-4">
                  {[
                    "Positioned on high-growth corridors",
                    "Adjacent to premium infrastructure",
                    "Exclusive access near burgeoning employment and high foot fall areas",
                    "Positioned to capitalize on confirmed public infrastructure expansion"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#5a6b10' }} />
                      <span className="text-lg text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                You are investing in a <strong style={{ color: '#5a6b10' }}>future address</strong>, not just acreage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Project Spotlight - Redesigned */}
      <section id="current-project" className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8faf0 0%, #ffffff 100%)' }} data-testid="project-section">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#5a6b10' }}></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#7a8e1a' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 scroll-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#5a6b10' }} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#242e06' }}>Project Showcase</span>
            </div>
            <div className="flex justify-center mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/vz0cvah2_CVF%20Logo.png" 
                alt="Central Vista Farms"
                className="h-48 w-auto"
              />
            </div>
            <p className="text-xl" style={{ color: '#5a6b10', fontStyle: 'italic' }}>A Masterpiece of Strategic Investment</p>
          </div>

          {/* Main Project Card with Image */}
          <div className="scroll-animate mb-16">
            <div className="rounded-3xl overflow-hidden relative" style={{ 
              minHeight: '600px',
              boxShadow: '0 25px 50px -12px rgba(36, 46, 6, 0.25)'
            }}>
              {/* Actual Project Image */}
              <img 
                src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/t5ig6izs_6.jpg" 
                alt="Central Vista Farms - Beautiful fountain with palm trees and landscaping"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12">
                {/* Top badges */}
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="glass-card-light px-4 py-2 rounded-full" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: '#5a6b10' }} />
                      <span className="text-sm font-semibold" style={{ color: '#242e06' }}>Prime Location</span>
                    </div>
                  </div>
                  <div className="glass-card-light px-4 py-2 rounded-full" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" style={{ color: '#5a6b10' }} />
                      <span className="text-sm font-semibold" style={{ color: '#242e06' }}>Limited Plots Available</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom content */}
                <div>
                  <div className="glass-card-light rounded-2xl p-6 sm:p-8 max-w-4xl" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#242e06' }}>
                      The Central Vista Farms Difference
                    </h3>
                    <p className="text-lg sm:text-xl mb-6" style={{ color: '#5a6b10' }}>
                      This project is not merely a purchase, it is a private sanctuary and strategic placement built to deliver maximum appreciation and zero hassle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid - Clean Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 scroll-animate">
            {[
              {
                title: "Location Superiority",
                desc: "60 Mins from Bangalore International Airport, bang on NH44 and just 7 mins from upcoming Bangalore-Vijayawada Expressway",
                icon: MapPin
              },
              {
                title: "Tropical Themed Community",
                desc: "28 Acre of themed community with only 101 premium plots",
                icon: Home
              },
              {
                title: "Clear Title Guarantee",
                desc: "Every plot is vetted on our multi-stage legal checklist before public offering. Your investment is safe, guaranteed.",
                icon: Shield
              },
              {
                title: "Modern Infrastructure",
                desc: "At Central Vista Farms, every detail is designed to let you breathe, connect, and belong. Wide open spaces, curated amenities, and nature all around, beautifully managed to stay pristine, effortless, and alive.",
                icon: CheckCircle2
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="glass-card-light rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                style={{ borderLeft: '4px solid #5a6b10' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ 
                    background: 'linear-gradient(135deg, rgba(90, 107, 16, 0.1) 0%, rgba(122, 142, 26, 0.1) 100%)' 
                  }}>
                    <feature.icon className="w-7 h-7" style={{ color: '#5a6b10' }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#242e06' }}>{feature.title}</h4>
                    <p className="text-slate-700 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="scroll-animate">
            <div className="rounded-2xl p-8 sm:p-12" style={{ 
              background: 'linear-gradient(135deg, rgba(90, 107, 16, 0.08) 0%, rgba(122, 142, 26, 0.05) 100%)',
              border: '2px solid rgba(90, 107, 16, 0.2)'
            }}>
              <div className="flex items-start gap-6 flex-col sm:flex-row">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ 
                  background: 'linear-gradient(135deg, #5a6b10 0%, #7a8e1a 100%)' 
                }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#242e06' }}>
                    Your Confidence is Our Foundation
                  </h4>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Every aspect of Central Vista Farms has been engineered for your confidence and returns. Legal verification, modern infrastructure, and location selection, all done before you make your decision.
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2" style={{ color: '#5a6b10' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-semibold">Zero Litigation</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#5a6b10' }}>
                      <Shield className="w-5 h-5" />
                      <span className="font-semibold">13 Years of Expertise</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#5a6b10' }}>
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">On-Time Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 scroll-animate">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="farmland-button text-white font-bold px-12 py-7 text-lg cta-glow magnetic-button"
              data-testid="project-cta"
            >
              Secure Your Piece of Central Vista Farms <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="mt-6 text-slate-600 text-sm">
              🔒 Your information is secure and confidential
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white relative overflow-hidden" data-testid="testimonials-section">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#5a6b10' }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#7a8e1a' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 scroll-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Users className="w-4 h-4" style={{ color: '#5a6b10' }} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#242e06' }}>Client Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
            <p className="text-lg sm:text-xl text-slate-600">Real experiences from satisfied landowners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sreepriya H",
                quote: "The team explained everything with honesty and clarity. Agrocorp's managed farmland model gives us real peace of mind, our land's cared for, even when we're not around.",
                rating: 5,
                link: "https://www.google.com/maps/reviews/@13.0676209,77.5934492,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChZDSUhNMG9nS0VJQ0FnSUR1bzhHdVhBEAE!2m1!1s0x0:0x515f22706541e4e4!5m1!1e4?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
              },
              {
                name: "Manoj Inamdar",
                quote: "Loved the concept of managed farmlands with all the comforts of a gated community. The site was green, well kept, and beautifully planned, an ideal investment and weekend escape.",
                rating: 5,
                link: "https://www.google.com/maps/reviews/@13.0676209,77.5934492,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChZDSUhNMG9nS0VJQ0FnSURtOFpyYmVREAE!2m1!1s0x0:0x515f22706541e4e4!5m1!1e4?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
              },
              {
                name: "Gita Vijaykumar",
                quote: "Loved the idea of owning a managed farm. Big thanks to Syed for arranging our visit and to Deepak for his patient walkthrough. We had a great experience, our puppy had the best time too!",
                rating: 5,
                link: "https://www.google.com/maps/reviews/@13.0676209,77.5934492,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChdDSUhNMG9nS0VJQ0FnSUNhcnFITDN3RRAB!2m1!1s0x0:0x515f22706541e4e4!5m1!1e4?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
              }
            ].map((testimonial, idx) => (
              <div 
                key={idx} 
                className="testimonial-card-modern stagger-item flex flex-col"
                data-testid={`testimonial-card-${idx}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" style={{ color: '#7a8e1a' }} viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-slate-700 italic leading-relaxed text-lg flex-grow mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <a 
                  href={testimonial.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold mb-6 transition-colors hover:underline"
                  style={{ color: '#5a6b10' }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-3 pt-4 border-t mt-auto" style={{ borderColor: 'rgba(90, 107, 16, 0.2)' }}>
                  {/* Profile Image Placeholder */}
                  <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(90, 107, 16, 0.2), rgba(122, 142, 26, 0.2))' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-200"></div>
                    <span className="text-2xl font-bold relative z-10" style={{ color: '#242e06' }}>{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 relative" style={{ background: 'linear-gradient(180deg, #f5f7ed 0%, #e8edd5 50%, #ffffff 100%)' }} data-testid="contact-section">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#5a6b10' }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: '#7a8e1a' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Your Journey to <span className="farmland-gradient bg-clip-text text-transparent">Secured Wealth</span> Starts Here
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              We have solved the problem of secure, high-value asset diversification. Now it's time to secure your piece of proven land. We handle the location selection, the legalities, and the management. <strong style={{ color: '#5a6b10' }}>You handle the decision.</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div 
              id="contact-form" 
              className="form-container-light scroll-animate"
              data-testid="contact-form"
            >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Yes, I Want to Secure My Piece of Central Vista Farms</h3>
              <p className="text-slate-600">Fill in your details to receive your personalized investment strategy within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <Label htmlFor="name" className="text-slate-700 font-medium mb-2 block text-base">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className={`farmland-input ${formErrors.name ? 'border-red-500' : ''}`}
                  data-testid="form-input-name"
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-2" data-testid="form-error-name">{formErrors.name}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block text-base">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`farmland-input ${formErrors.email ? 'border-red-500' : ''}`}
                    data-testid="form-input-email"
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-2" data-testid="form-error-email">{formErrors.email}</p>}
                </div>

                <div className="form-group">
                  <Label htmlFor="phone" className="text-slate-700 font-medium mb-2 block text-base">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`farmland-input ${formErrors.phone ? 'border-red-500' : ''}`}
                    data-testid="form-input-phone"
                    required
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-2" data-testid="form-error-phone">{formErrors.phone}</p>}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-gray-300"
                  style={{ accentColor: '#5a6b10' }}
                />
                <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
                  I authorise Agrocorp Landbase & its representatives to contact me with updates and notifications via email/sms/What'sApp/call. This will override DND/NDNC.
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full farmland-button-large text-white font-bold py-7 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="form-submit-button"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Privacy Assurance */}
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(90, 107, 16, 0.2)' }}>
              <div className="flex items-center justify-center gap-3 text-slate-600">
                <Shield className="w-5 h-5" style={{ color: '#5a6b10' }} />
                <p className="text-sm">
                  <strong>Privacy Assurance:</strong> We respect your privacy. Your details are secured and will only be used to discuss your investment strategy with Central Vista Farms.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
                  <Phone className="w-5 h-5" style={{ color: '#5a6b10' }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Call Us</div>
                  <a href="tel:+919555261111" className="font-semibold" style={{ color: '#5a6b10' }}>+91 9555 26 1111</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
                  <Mail className="w-5 h-5" style={{ color: '#5a6b10' }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Email Us</div>
                  <a href="mailto:info@agrocorp.co.in" className="font-semibold" style={{ color: '#5a6b10' }}>info@agrocorp.co.in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="scroll-animate hidden lg:block h-full" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-3xl overflow-hidden relative h-full" style={{ 
              minHeight: '100%',
              boxShadow: '0 25px 50px -12px rgba(36, 46, 6, 0.25)'
            }}>
              {/* Actual Site Image */}
              <img 
                src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/i8exjsz4_5.JPG" 
                alt="Central Vista Farms - Beautiful landscaped path with palm trees and greenery"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          </div>

          <div className="text-center mt-12 scroll-animate">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ 
              backgroundColor: 'rgba(90, 107, 16, 0.1)',
              border: '1px solid rgba(90, 107, 16, 0.2)'
            }}>
              <svg className="w-5 h-5" style={{ color: '#5a6b10' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#242e06' }}>SSL Secured • 256-bit Encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12" data-testid="footer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
            {/* Call Us */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5a6b10' }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>CALL US</h4>
                <a href="tel:+919555261111" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  (+91) 9555 26 1111
                </a>
              </div>
            </div>

            {/* Write to Us */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5a6b10' }}>
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>WRITE TO US</h4>
                <a href="mailto:info@agrocorp.co.in" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  info@agrocorp.co.in
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5a6b10' }}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>ADDRESS</h4>
                <p className="text-white leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  1st Floor, 90, Bellary Road,<br />
                  Byatarayanapura (Bangalore) Urban,<br />
                  Karnataka, 560092
                </p>
              </div>
            </div>
          </div>

          {/* Middle Section with Logo and Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-gray-800">
            {/* Logo Section */}
            <div>
              <div className="mb-4">
                {/* Agrocorp Company Logo */}
                <img 
                  src="https://customer-assets.emergentagent.com/job_farmland-conversion/artifacts/600cjw6l_AG_%26_LS_Logovv%20-%20Copy%20%283%29.png" 
                  alt="Agrocorp - real estate. reimagined."
                  className="h-40 w-auto"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h4 className="text-white font-semibold text-xl mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>QUICK LINKS</h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>About</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Contact</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Projects</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Terms & Conditions</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Media Insights</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Privacy Policy</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Blogs</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Disclaimer</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>FAQ</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sitemap</a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              © Agrocorp Landbase Pvt. Ltd, All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;