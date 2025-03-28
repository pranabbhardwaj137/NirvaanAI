import React from 'react';
import { Waves, Brain, Heart, Instagram, Twitter, Facebook, MessageCircle } from 'lucide-react';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920"
            alt="Peaceful background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to
            <span className="text-stress-yellow"> Nirvaan</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Your journey to mental wellness begins here. Let us guide you through proven techniques for stress management and peaceful living.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-stress-yellow text-stress-dark px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Start Your Journey
            </button>
            <button 
              onClick={() => window.open('#chatbot-url', '_blank')}
              className="flex items-center space-x-2 bg-stress-dark border-2 border-stress-yellow text-stress-yellow px-8 py-3 rounded-full hover:bg-stress-yellow hover:text-stress-dark transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Talk to Nirvaan</span>
            </button>
          </div>
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
                We are a team of dedicated professionals passionate about helping people find balance in their lives. With over a decade of experience in stress management and mental wellness, we've helped thousands of individuals achieve lasting peace.
              </p>
              <p className="text-gray-300">
                Our approach combines traditional wisdom with modern science, creating a unique methodology that adapts to your individual needs and lifestyle.
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