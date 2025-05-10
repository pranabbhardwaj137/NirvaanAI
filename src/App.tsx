import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, User, ChevronDown, Activity } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chatbot from './legacy/Chatbot';
import AudioTherapy from './pages/AudioTherapy';
import MoodAssessmentPage from './pages/MoodAssessmentPage';
import DoctorConsultation from './pages/DoctorConsultation';
import ChatWithNirvaan from './features/chat/ChatWithNirvaan';
import LaughingTherapy from './pages/LaughingTherapy';
import ReadingTherapy from './pages/ReadingTherapy';
import PhysicalTherapy from './pages/PhysicalTherapy';
import CreateTask from './pages/CreateTask';
import Recommendations from './pages/Recommendations';
import CreateRecommendation from './pages/CreateRecommendation';
import CreateEvent from './pages/CreateEvent';
import Notifications from './components/Notifications';
import ProfilePage from './pages/ProfilePage';

// TODO: Consider moving these routes to a separate config file
// FIXME: Need to implement proper error boundaries for route components

function AppContent() {
  // TODO: Consider using a reducer for complex state management
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // FIXME: This should be memoized if performance becomes an issue
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Note: Keeping this simple for now, might need to be more sophisticated later
  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-black/90 backdrop-blur-sm fixed w-full z-50 border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">Nirv</span>
            <span className="text-stress-yellow">aan</span>
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
                  <Link to="/services/physical" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Physical Therapy</Link>
                  <Link to="/services/laughing" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Laughing Therapy</Link>
                  <Link to="/services/reading" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Reading Therapy</Link>
                  <Link to="/doctor-consultation" className="block px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors">Doctor Consultation</Link>
                </div>
              </div>
            </div>

            {/* Sentiscope Link */}
            <Link 
              to="/mood-assessment"
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 hover:text-yellow-400 transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/40"
            >
              <Activity className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Sentiscope</span>
              <span className="text-xs opacity-70 group-hover:opacity-100">Mood Check</span>
            </Link>

            {/* Community Link */}
            <Link 
              to="/recommendations"
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 hover:text-yellow-400 transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/40"
            >
              <span className="font-medium">Community</span>
            </Link>

            {/* Chatbot Button */}
            <Link
              to="/chat-with-nirvaan"
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400 shadow-lg hover:shadow-yellow-500/20"
              aria-label="Chat with us"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Chat Now</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Notifications />
                  <Link 
                    to="/profile"
                    className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 hover:text-yellow-400 transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/40"
                  >
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{user.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition-all font-semibold"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                    Login
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

      {/* Main Content */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/audio" element={<AudioTherapy />} />
          <Route path="/services/physical" element={<PhysicalTherapy />} />
          <Route path="/services/laughing" element={<LaughingTherapy />} />
          <Route path="/services/reading" element={<ReadingTherapy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat-with-nirvaan" element={<ChatWithNirvaan />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />  
          <Route path="/mood-assessment" element={<MoodAssessmentPage />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/create-recommendation" element={<CreateRecommendation />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>

      {/* Chatbot Component */}
      {showChat && <Chatbot showChat={showChat} setShowChat={setShowChat} />}
    </div>
  );
}

// Wrapper component to provide auth context
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
