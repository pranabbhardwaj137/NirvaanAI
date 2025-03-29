import React from 'react';
import { Music, Activity, Laugh, BookOpen, User, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">
          Our <span className="text-stress-yellow">Services</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Nirvaan AI Chat */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Chat with Nirvaan AI</h3>
            </div>
            <p className="text-gray-600 flex-grow">
              Experience 24/7 mental health support through our advanced AI companion.
            </p>
            <button 
              onClick={() => navigate('/chat-with-nirvaan')}
              className="w-full px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Audio Therapy */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <Music className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Audio Therapy</h3>
            </div>
            <p className="text-gray-600 flex-grow">
              Experience the healing power of sound through our specialized audio therapy sessions.
            </p>
            <button 
              onClick={() => navigate('/audio-therapy')}
              className="w-full px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Physical Therapy */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <Activity className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Physical Therapy</h3>
            </div>
            <p className="text-gray-600 flex-grow">
              Reconnect with your body through guided movement sessions. Our physical therapy combines stress relief with gentle exercise.
            </p>
            <button 
              onClick={() => navigate('/physical-therapy')}
              className="w-full px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Laughing Therapy */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <Laugh className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-800">Laughing Therapy</h3>
            </div>
            <p className="text-gray-600 flex-grow">
              Experience the joy of laughter yoga and group sessions. Release stress and boost your mood naturally through the power of laughter.
            </p>
            <button 
              onClick={() => navigate('/services/laughing')}
              className="w-full px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Reading Therapy */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <BookOpen className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-800">Reading Therapy</h3>
            </div>
            <p className="text-gray-600 flex-grow">
              Discover healing through literature with our guided reading therapy sessions.
            </p>
            <button 
              onClick={() => navigate('/reading-therapy')}
              className="w-full px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Doctor Consultation */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <User className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Doctor Consultation</h3>
            </div>
            <p className="text-gray-600 flex-grow">
              Connect with experienced healthcare professionals for expert medical guidance.
            </p>
            <button 
              onClick={() => navigate('/doctor-consultation')}
              className="w-full px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;