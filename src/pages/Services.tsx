import React from 'react';
import { Music, Activity, Laugh, BookOpen, User, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stress-dark via-stress-gray to-stress-dark animate-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-stress-yellow/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            <span className="text-stress-yellow group-hover:text-white transition-colors duration-300">Our</span>{' '}
            <span className="text-stress-yellow group-hover:text-white transition-colors duration-300">Services</span>
          </h1>
          <div className="w-24 h-1 bg-stress-yellow mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <p className="text-gray-300 mt-4 text-lg">
            Discover our comprehensive mental wellness solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Nirvaan AI Chat */}
          <div className="rounded-lg border border-white/10 p-6 flex flex-col h-full bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <MessageCircle className="w-6 h-6 text-stress-yellow" />
              <h3 className="text-xl font-semibold text-white">Chat with Nirvaan AI</h3>
            </div>
            <p className="text-gray-300 flex-grow">
              Experience 24/7 mental health support through our advanced AI companion.
            </p>
            <button 
              onClick={() => navigate('/chat-with-nirvaan')}
              className="w-full px-6 py-3 rounded-full bg-stress-yellow text-stress-dark font-medium hover:bg-yellow-400 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Audio Therapy */}
          <div className="rounded-lg border border-white/10 p-6 flex flex-col h-full bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <Music className="w-6 h-6 text-stress-yellow" />
              <h3 className="text-xl font-semibold text-white">Audio Therapy</h3>
            </div>
            <p className="text-gray-300 flex-grow">
              Experience the healing power of sound through our specialized audio therapy sessions.
            </p>
            <button 
              onClick={() => navigate('/services/audio')}
              className="w-full px-6 py-3 rounded-full bg-stress-yellow text-stress-dark font-medium hover:bg-yellow-400 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Physical Therapy */}
          <div className="rounded-lg border border-white/10 p-6 flex flex-col h-full bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <Activity className="w-6 h-6 text-stress-yellow" />
              <h3 className="text-xl font-semibold text-white">Physical Therapy</h3>
            </div>
            <p className="text-gray-300 flex-grow">
              Reconnect with your body through guided movement sessions. Our physical therapy combines stress relief with gentle exercise.
            </p>
            <button 
              onClick={() => navigate('/services/physical')}
              className="w-full px-6 py-3 rounded-full bg-stress-yellow text-stress-dark font-medium hover:bg-yellow-400 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Laughing Therapy */}
          <div className="rounded-lg border border-white/10 p-6 flex flex-col h-full bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <Laugh className="w-6 h-6 text-stress-yellow" />
              <h3 className="text-xl font-semibold text-white">Laughing Therapy</h3>
            </div>
            <p className="text-gray-300 flex-grow">
              Experience the joy of laughter yoga and group sessions. Release stress and boost your mood naturally through the power of laughter.
            </p>
            <button 
              onClick={() => navigate('/services/laughing')}
              className="w-full px-6 py-3 rounded-full bg-stress-yellow text-stress-dark font-medium hover:bg-yellow-400 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Reading Therapy */}
          <div className="rounded-lg border border-white/10 p-6 flex flex-col h-full bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <BookOpen className="w-6 h-6 text-stress-yellow" />
              <h3 className="text-xl font-semibold text-white">Reading Therapy</h3>
            </div>
            <p className="text-gray-300 flex-grow">
              Discover healing through literature with our guided reading therapy sessions.
            </p>
            <button 
              onClick={() => navigate('/services/reading')}
              className="w-full px-6 py-3 rounded-full bg-stress-yellow text-stress-dark font-medium hover:bg-yellow-400 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Doctor Consultation */}
          <div className="rounded-lg border border-white/10 p-6 flex flex-col h-full bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <User className="w-6 h-6 text-stress-yellow" />
              <h3 className="text-xl font-semibold text-white">Doctor Consultation</h3>
            </div>
            <p className="text-gray-300 flex-grow">
              Connect with experienced healthcare professionals for expert medical guidance.
            </p>
            <button 
              onClick={() => navigate('/doctor-consultation')}
              className="w-full px-6 py-3 rounded-full bg-stress-yellow text-stress-dark font-medium hover:bg-yellow-400 transition-colors duration-300 mt-auto flex items-center justify-center gap-2"
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