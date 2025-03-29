import React from 'react';
import MoodAssessment from '../components/MoodAssessment';
import backgroundImage from '../imgs/sentiscopeBG.jpeg';

const MoodAssessmentPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-8 z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-stress-yellow mb-4 drop-shadow-lg group-hover:text-white transition-colors duration-300">
            Sentiscope
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Take a moment to assess your current emotional state. This will help us provide you with the most suitable therapy recommendations.
          </p>
        </div>
        <MoodAssessment />
      </div>
    </div>
  );
};

export default MoodAssessmentPage; 