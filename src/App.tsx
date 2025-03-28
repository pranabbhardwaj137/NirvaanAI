import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

function App() {
  const { user, logout } = useAuth(); // Access user information and logout function

  return (
    <Router>
      <div className="bg-stress-dark min-h-screen text-white">
        {/* Navigation */}
        <nav className="bg-stress-gray fixed w-full z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                Nirv<span className="text-stress-yellow">aan</span>
              </Link>
              
              <div className="flex items-center space-x-8">
                <Link to="/" className="hover:text-stress-yellow transition-colors">Home</Link>
                <Link to="/services" className="hover:text-stress-yellow transition-colors">Services</Link>
                
                {/* Chatbot Button */}
                <button 
                  onClick={() => window.open('#chatbot-url', '_blank')}
                  className="flex items-center space-x-2 bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
                  aria-label="Chat with us"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat Now</span>
                </button>
                
                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                  {user ? (
                    <>
                      <span className="text-stress-yellow">{user.username}</span>
                      <button 
                        onClick={logout}
                        className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
                        aria-label="Logout"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        className="flex items-center space-x-2 text-stress-yellow hover:text-stress-yellow/80 transition-colors"
                      >
                        <User className="w-5 h-5" />
                        <span>Login</span>
                      </Link>
                      <Link 
                        to="/signup"
                        className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
