import React, { useEffect, useRef } from 'react';
import { Waves, Brain, Heart, Instagram, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Typewriter from '../components/Typewriter';

function Home() {
  const vantaRef = useRef(null);

  useEffect(() => {
    if (window.VANTA) {
      window.VANTA.BIRDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color1: 0xffea00,
        color2: 0x2fff
      });
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 z-0" />
        <div className="z-10 container mx-auto px-4 flex items-center justify-between">
          {/* Left side - Image */}
          
          
          {/* Right side - Text content */}
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Welcome to
              <span className="text-stress-yellow drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"> Nirvaan</span>
            </h1>
            <p className="text-xl mb-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <Typewriter 
                text="Your journey to mental wellness begins here. Let us guide you through proven techniques for stress management and peaceful living."
                speed={30}
              />
            </p>

            

            <div className="flex space-x-4">
              <Link to="/services" className="bg-stress-yellow text-stress-dark px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                Start Your Journey
              </Link>
              <button 
                onClick={() => window.open('#chatbot-url', '_blank')}
                className="flex items-center space-x-2 bg-stress-dark border-2 border-stress-yellow text-stress-yellow px-8 py-3 rounded-full hover:bg-stress-yellow hover:text-stress-dark transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Talk to Nirvaan</span>


               
              </button>
            </div>
          </div>
        </div>
        image div
         <div className="hidden lg:block w-1/2">
            <img 
              src="/src/imgs/lady_sitting_for_therapy.png"
              alt="Therapy session"
              className="rounded-2xl shadow-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
            />
          </div>
      </header>

      {/* About Us Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800"
                alt="Our team"
                className="rounded-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                About <span className="text-stress-yellow">Us</span>
              </h2>
              <p className="text-gray-300 mb-6">
              At Nirvaan, we believe that true well-being comes from a balance of mind, body, and soul. Our approach blends ancient wisdom with modern science, offering you a personalized path to inner peace and mental clarity.
              </p>
              <p className="text-gray-300 mb-6">
            Through proven techniques, we help you reduce stress, regain balance, and cultivate mindfulness - empowering you to lead a more fulfilling life.</p>

            <p className="text-gray-300 mb-6">
            Breathe. Heal. Transform. Your journey to wellness begins today.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stress-gray py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Nirv<span className="text-stress-yellow">aan</span></h3>
              <p className="text-gray-400">Your journey to inner peace starts with us.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-stress-yellow">Home</a></li>
                <li><a href="/services" className="hover:text-stress-yellow">Services</a></li>
                <li><a href="/login" className="hover:text-stress-yellow">Login</a></li>
                <li><a href="/signup" className="hover:text-stress-yellow">Sign Up</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/services" className="hover:text-stress-yellow">Audio Therapy</a></li>
                <li><a href="/services" className="hover:text-stress-yellow">Physical Therapy</a></li>
                <li><a href="/services" className="hover:text-stress-yellow">Laughing Therapy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-stress-yellow">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-stress-yellow">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-stress-yellow">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nirvaan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;