import React from 'react';

function AudioTherapy() {
  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1610041321327-b794c052db27)',
          zIndex: -1
        }}
      />
      <div className="max-w-6xl mx-auto relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-12 shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="text-stress-yellow">Audio</span> Therapy
          </h1>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome to Our Audio Therapy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Listen to Music, Motivational Podcasts and Audiobooks
              to gain some happiness, knowledge and also lighten your stress side by side.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioTherapy; 