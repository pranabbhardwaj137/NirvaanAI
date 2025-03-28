import React from 'react';
import { Music, Activity, Laugh } from 'lucide-react';

function Services() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">
          Our <span className="text-stress-yellow">Services</span>
        </h1>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Audio Therapy */}
          <div className="bg-stress-gray rounded-2xl overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1920"
                alt="Audio Therapy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Music className="w-6 h-6 text-stress-yellow" />
                <h3 className="text-xl font-semibold">Audio Therapy</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Experience the healing power of sound with our specialized audio therapy sessions. From binaural beats to nature sounds, find your perfect harmony.
              </p>
              <button className="w-full bg-stress-yellow text-stress-dark py-2 rounded-full hover:bg-opacity-90 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Physical Therapy */}
          <div className="bg-stress-gray rounded-2xl overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920"
                alt="Physical Therapy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-stress-yellow" />
                <h3 className="text-xl font-semibold">Physical Therapy</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Reconnect with your body through guided movement sessions. Our physical therapy combines stress relief with gentle exercise.
              </p>
              <button className="w-full bg-stress-yellow text-stress-dark py-2 rounded-full hover:bg-opacity-90 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Laughing Therapy */}
          <div className="bg-stress-gray rounded-2xl overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517242027094-631f8c218a0f?auto=format&fit=crop&q=80&w=1920"
                alt="Laughing Therapy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Laugh className="w-6 h-6 text-stress-yellow" />
                <h3 className="text-xl font-semibold">Laughing Therapy</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Experience the joy of laughter yoga and group sessions. Release stress and boost your mood naturally through the power of laughter.
              </p>
              <button className="w-full bg-stress-yellow text-stress-dark py-2 rounded-full hover:bg-opacity-90 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;