import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageCircle, User, ChevronDown } from 'lucide-react';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuth } from '../context/AuthContext';
import Chatbot from './components/Chatbot';
import AudioTherapy from './pages/AudioTherapy';
import MoodAssessmentPage from './pages/MoodAssessmentPage';
import DoctorConsultation from './pages/DoctorConsultation';
import ChatWithNirvaan from './pages/ChatWithNirvaan';
import LaughingTherapy from './pages/LaughingTherapy';
import ReadingTherapy from './pages/ReadingTherapy';

function App() {
  const { user, logout } = useAuth();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="bg-black/90 backdrop-blur-sm fixed w-full z-50 border-b border-yellow-500/20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-yellow-500">
              Nirv<span className="text-yellow-400">aan</span>
            </Link>
            <div className="flex items-center space-x-8">
              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <Link to="/services" className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-400 transition-colors">
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                <div className={`absolute top-full left-0 mt-2 w-48 bg-black border border-yellow-500/20 rounded-lg shadow-lg transition-all duration-200 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="py-2">
                    <Link to="/services/audio" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Audio Therapy</Link>
                    <Link to="/services/video" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Video Therapy</Link>
                    <Link to="/services/chat" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Chat Therapy</Link>
                    <Link to="/services/meditation" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Meditation</Link>
                    <Link to="/services/laughing" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Laughing Therapy</Link>
                    <Link to="/services/reading" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Reading Therapy</Link>
                    <Link to="/doctor-consultation" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Doctor Consultation</Link>
                  </div>
                </div>
              </div>

              {/* Sentiscope Link */}
              <Link 
                to="/mood-assessment"
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Sentiscope
              </Link>

              {/* Chatbot Button */}
              <button 
                onClick={() => setShowChat(!showChat)}
                className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                aria-label="Chat with us"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Now</span>
              </button>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-yellow-500">{user.username}</span>
                    <button 
                      onClick={logout}
                      className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition-all font-semibold"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors">
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link to="/signup" className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition-all font-semibold">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home setShowChat={setShowChat} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/audio" element={<AudioTherapy />} />
            <Route path="/services/video" element={<Services />} />
            <Route path="/services/chat" element={<Services />} />
            <Route path="/services/meditation" element={<Services />} />
            <Route path="/services/laughing" element={<LaughingTherapy />} />
            <Route path="/services/reading" element={<ReadingTherapy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat-with-nirvaan" element={<ChatWithNirvaan />} />
            <Route path="/doctor-consultation" element={<DoctorConsultation />} />  

            <Route path="/mood-assessment" element={<MoodAssessmentPage />} />
          </Routes>
        </div>

        {/* Chatbot Component */}
        {showChat && <Chatbot showChat={showChat} setShowChat={setShowChat} />}
      </div>
    </Router>
  );
}

export default App;
