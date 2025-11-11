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

// Project Tabs Component
const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Highlights" },
    { id: 1, label: "Masterplan" },
    { id: 2, label: "Location Advantages" },
    { id: 3, label: "Ammenities & Features" }
  ];

  const tabContent = {
    0: (
      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 60mins from Airport */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <MapPin className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>60 Minutes</p>
            <p className="text-sm text-slate-600">from Bangalore International Airport</p>
          </div>

          {/* 28 Acres */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <TreePine className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>28 Acres</p>
            <p className="text-sm text-slate-600">of Lush Green</p>
          </div>

          {/* Tropical Themed */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Leaf className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>Tropical Themed</p>
            <p className="text-sm text-slate-600">Community</p>
          </div>

          {/* Modern Amenities */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>Modern</p>
            <p className="text-sm text-slate-600">Amenities & Features</p>
          </div>

          {/* 101 Premium Plots */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Award className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>101 Premium</p>
            <p className="text-sm text-slate-600">Farm Plots</p>
          </div>

          {/* Plot Sizes */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Home className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>Multiple Sizes</p>
            <p className="text-sm text-slate-600">7000, 8000 & 10000 sqft</p>
          </div>

          {/* Approved */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-2" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#5a6b10' }} />
            </div>
            <p className="font-bold text-xl mb-1" style={{ color: '#242e06' }}>Approved with Plan Sanctions</p>
            <p className="text-sm text-slate-600">Fully Legal & Verified</p>
          </div>
        </div>
      </div>
    ),
    1: (
      <div className="p-8 sm:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h4 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#242e06' }}>
              Where Vision Becomes Reality
            </h4>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              The detailed master plan showcases how Central Vista has been carefully laid out to balance private and communal spaces while maintaining the integrity of the landscape.
            </p>
          </div>
          
          {/* Masterplan Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://customer-assets.emergentagent.com/job_alt-graph/artifacts/1j6dfvmr_masterplan.webp" 
              alt="Central Vista Farms Master Plan - Where Vision Becomes Reality"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Bangalore-Vijayawada Expressway */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>Bangalore-Vijayawada Expressway</p>
              <p className="text-sm text-slate-600">7 Mins</p>
            </div>
          </div>

          {/* Bengaluru-Hyderabad Highway */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>Bengaluru-Hyderabad Highway</p>
              <p className="text-sm text-slate-600">3 Mins</p>
            </div>
          </div>

          {/* NACIN Mega Campus */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Users className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>NACIN Mega Campus</p>
              <p className="text-sm text-slate-600">12 Mins</p>
            </div>
          </div>

          {/* Penukonda Fort */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Target className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>Penukonda Fort</p>
              <p className="text-sm text-slate-600">35 Mins</p>
            </div>
          </div>

          {/* BEL Mega Campus */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Users className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>BEL Mega Campus</p>
              <p className="text-sm text-slate-600">12 Mins</p>
            </div>
          </div>

          {/* Lepakshi Temple */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Home className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>Lepakshi Temple</p>
              <p className="text-sm text-slate-600">20 Mins</p>
            </div>
          </div>

          {/* APIIC Industrial Park */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Zap className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>APIIC Industrial Park</p>
              <p className="text-sm text-slate-600">12 Mins</p>
            </div>
          </div>

          {/* Puttaparthi Temple */}
          <div className="flex items-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Home className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>Puttaparthi Temple</p>
              <p className="text-sm text-slate-600">40 Mins</p>
            </div>
          </div>

          {/* Upcoming IT City */}
          <div className="flex items-center gap-4 p-6 rounded-xl sm:col-span-2" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(90, 107, 16, 0.15)' }}>
              <Sparkles className="w-6 h-6" style={{ color: '#5a6b10' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ color: '#242e06' }}>Upcoming IT City</p>
              <p className="text-sm text-slate-600">10 Mins</p>
            </div>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="p-8 sm:p-12">
        {/* Features Section */}
        <h4 className="text-2xl font-bold mb-6" style={{ color: '#242e06' }}>Features</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {/* Smart Drainage & Water Harvesting */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Droplets className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Smart Drainage & Water Harvesting</p>
          </div>

          {/* Smart Irrigation System */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sprout className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Smart Irrigation System</p>
          </div>

          {/* 12 Meter Internal Access Ways */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <TrendingUp className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>12 Meter Internal Access Ways</p>
          </div>

          {/* Avenue Plantation */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <TreePine className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Avenue Plantation</p>
          </div>

          {/* 24x7 Security */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Shield className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>24x7 Security</p>
          </div>

          {/* On Site Assistance */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Users className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>On Site Assistance</p>
          </div>

          {/* 90% Green & Open Spaces */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Leaf className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>90% Green & Open Spaces</p>
          </div>

          {/* RCC Panel Boundary Wall */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Home className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>RCC Panel Boundary Wall</p>
          </div>

          {/* Themed Water Bodies */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Droplets className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Themed Water Bodies</p>
          </div>

          {/* Centralised Water Storage */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Droplets className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Centralised Water Storage</p>
          </div>

          {/* Solar Street Lights */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sun className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Solar Street Lights</p>
          </div>

          {/* CCTV Surveillance */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Shield className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>CCTV Surveillance</p>
          </div>
        </div>

        {/* Amenities Section */}
        <h4 className="text-2xl font-bold mb-6 mt-8" style={{ color: '#242e06' }}>Amenities</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Jogging Tracks */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <TrendingUp className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Jogging Tracks</p>
          </div>

          {/* Yoga & Meditation Decks */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Users className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Yoga & Meditation Decks</p>
          </div>

          {/* Children Play Area */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Children Play Area</p>
          </div>

          {/* Senior Citizens Park */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Users className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Senior Citizens Park</p>
          </div>

          {/* Bonfire Pits */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Bonfire Pits</p>
          </div>

          {/* BBQ Zone */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>BBQ Zone</p>
          </div>

          {/* Stargazing Deck */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Stargazing Deck</p>
          </div>

          {/* Themed Gardens */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Leaf className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Themed Gardens</p>
          </div>

          {/* Amphitheatre */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Target className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Amphitheatre</p>
          </div>

          {/* Multipurpose Playgrounds */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <Sparkles className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Multipurpose Playgrounds</p>
          </div>

          {/* Cycling Tracks */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-shadow" style={{ backgroundColor: 'rgba(90, 107, 16, 0.05)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(90, 107, 16, 0.1)' }}>
              <TrendingUp className="w-7 h-7" style={{ color: '#5a6b10' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#242e06' }}>Cycling Tracks</p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="scroll-animate">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tab Header */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] px-6 py-4 text-center font-semibold transition-all duration-300 relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#5a6b10' : 'transparent'
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: '#242e06' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://customer-assets.emergentagent.com/job_alt-graph/artifacts/pj9pvf4v_1%20%2817%29.jpg",
      caption: "Invest with Trust. It's That Simple."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_alt-graph/artifacts/bsbh394u_1%20%2815%29.jpg",
      caption: "Legacy Home: Beyond a House, It's Your Heritage."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_alt-graph/artifacts/3fotpxg0_1%20%283%29.jpg",
      caption: "To Spend Quality Time with Family"
    },
    {
      image: "https://customer-assets.emergentagent.com/job_alt-graph/artifacts/bk0gyzqy_1%20%2816%29.jpg",
      caption: "Don't Just Live, Spread Out."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_alt-graph/artifacts/dvn8b7be_1%20%288%29.jpg",
      caption: "Unplug Together. Recharge Your Relationship."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_alt-graph/artifacts/s892mbuk_1%20%2810%29.jpg",
      caption: "Nature's Path to Self-Discovery."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '500px' }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="w-full p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {slide.caption}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
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
                <p className="text-base sm:text-lg font-bold uppercase tracking-wide mb-8" style={{ color: '#5a6b10' }}>101 Premium Farm Plots | Managed Services</p>
                
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
                  Schedule Your Site Visit
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
                  src="https://customer-assets.emergentagent.com/job_alt-graph/artifacts/mpze4q7e_1%20%2814%29.jpg" 
                  alt="Couple enjoying gardening together at their lifestyle home - Central Vista Farms"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Floating Stats Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card-light rounded-2xl p-4" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold" style={{ color: '#242e06' }}>10+</p>
                        <p className="text-xs" style={{ color: '#5a6b10' }}>Projects Delivered</p>
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
              Why do you need to own a farmhouse?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover the reasons why a farmhouse is more than just property—it's peace, connection, and freedom.
            </p>
          </div>

          {/* Image Carousel */}
          <ImageCarousel />
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

          {/* Project Facts Tabs */}
          <div className="mt-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-center mb-8" style={{ color: '#242e06' }}>
              Project Facts
            </h3>
            <ProjectTabs />
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