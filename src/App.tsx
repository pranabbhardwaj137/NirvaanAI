// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { MessageCircle, User, ChevronDown } from 'lucide-react';
// import Home from './pages/Home';
// import Services from './pages/Services';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

// function App() {
//   const { user, logout } = useAuth(); // Access user information and logout function

//   const [isServicesOpen, setIsServicesOpen] = useState(false);

//   return (
//     <Router>
//       <div className="bg-stress-dark min-h-screen text-white">
//         {/* Navigation */}
//         <nav className="bg-stress-gray fixed w-full z-50">
//           <div className="max-w-6xl mx-auto px-4 py-4">
//             <div className="flex justify-between items-center">
//               <Link to="/" className="text-2xl font-bold">
//                 Nirv<span className="text-stress-yellow">aan</span>
//               </Link>
              
//               <div className="flex items-center space-x-8">
//                 {/* Services Dropdown */}
//                 <div 
//                   className="relative"
//                   onMouseEnter={() => setIsServicesOpen(true)}
//                   onMouseLeave={() => setIsServicesOpen(false)}
//                 >
//                   <button className="flex items-center space-x-1 hover:text-stress-yellow transition-colors">
//                     <span>Services</span>
//                     <ChevronDown className="w-4 h-4" />
//                   </button>
                  
//                   {/* Dropdown Menu */}
//                   <div className={`absolute top-full left-0 mt-2 w-48 bg-stress-gray rounded-lg shadow-lg transition-all duration-200 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
//                     <div className="py-2">
//                       <Link to="/services/audio" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Audio Therapy
//                       </Link>
//                       <Link to="/services/video" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Video Therapy
//                       </Link>
//                       <Link to="/services/chat" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Chat Therapy
//                       </Link>
//                       <Link to="/services/meditation" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Meditation
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Chatbot Button */}
//                 <button 
//                   onClick={() => window.open('#chatbot-url', '_blank')}
//                   className="flex items-center space-x-2 bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
//                   aria-label="Chat with us"
//                 >
//                   <MessageCircle className="w-5 h-5" />
//                   <span>Chat Now</span>
//                 </button>
                
//                 {/* Auth Buttons */}
//                 <div className="flex items-center space-x-4">
//                   {user ? (
//                     <>
//                       <span className="text-stress-yellow">{user.username}</span>
//                       <button 
//                         onClick={logout}
//                         className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
//                         aria-label="Logout"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link 
//                         to="/login"
//                         className="flex items-center space-x-2 text-stress-yellow hover:text-stress-yellow/80 transition-colors"
//                       >
//                         <User className="w-5 h-5" />
//                         <span>Login</span>
//                       </Link>
//                       <Link 
//                         to="/signup"
//                         className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
//                       >
//                         Sign Up
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Routes */}
//         <div className="pt-16">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/services/audio" element={<Services />} />
//             <Route path="/services/video" element={<Services />} />
//             <Route path="/services/chat" element={<Services />} />
//             <Route path="/services/meditation" element={<Services />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { MessageCircle, User, ChevronDown } from 'lucide-react';
// import Home from './pages/Home';
// import Services from './pages/Services';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
// import Chatbot from './components/Chatbot'; // Import Chatbot component

// function App() {
//   const { user, logout } = useAuth(); // Access user information and logout function

//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const [showChat, setShowChat] = useState<boolean>(false); // State for chatbot visibility

//   return (
//     <Router>
//       <div className="bg-stress-dark min-h-screen text-white">
//         {/* Navigation */}
//         <nav className="bg-stress-gray fixed w-full z-50">
//           <div className="max-w-6xl mx-auto px-4 py-4">
//             <div className="flex justify-between items-center">
//               <Link to="/" className="text-2xl font-bold">
//                 Nirv<span className="text-stress-yellow">aan</span>
//               </Link>
              
//               <div className="flex items-center space-x-8">
//                 {/* Services Dropdown */}
//                 <div 
//                   className="relative"
//                   onMouseEnter={() => setIsServicesOpen(true)}
//                   onMouseLeave={() => setIsServicesOpen(false)}
//                 >
//                   <button className="flex items-center space-x-1 hover:text-stress-yellow transition-colors">
//                     <span>Services</span>
//                     <ChevronDown className="w-4 h-4" />
//                   </button>
                  
//                   {/* Dropdown Menu */}
//                   <div className={`absolute top-full left-0 mt-2 w-48 bg-stress-gray rounded-lg shadow-lg transition-all duration-200 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
//                     <div className="py-2">
//                       <Link to="/services/audio" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Audio Therapy
//                       </Link>
//                       <Link to="/services/video" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Video Therapy
//                       </Link>
//                       <Link to="/services/chat" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Chat Therapy
//                       </Link>
//                       <Link to="/services/meditation" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">
//                         Meditation
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Chatbot Button */}
//                 <button 
//                   onClick={() => setShowChat(!showChat)} // Toggle chatbot visibility
//                   className="flex items-center space-x-2 bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
//                   aria-label="Chat with us"
//                 >
//                   <MessageCircle className="w-5 h-5" />
//                   <span>Chat Now</span>
//                 </button>

//                 {/* Auth Buttons */}
//                 <div className="flex items-center space-x-4">
//                   {user ? (
//                     <>
//                       <span className="text-stress-yellow">{user.username}</span>
//                       <button 
//                         onClick={logout}
//                         className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
//                         aria-label="Logout"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link 
//                         to="/login"
//                         className="flex items-center space-x-2 text-stress-yellow hover:text-stress-yellow/80 transition-colors"
//                       >
//                         <User className="w-5 h-5" />
//                         <span>Login</span>
//                       </Link>
//                       <Link 
//                         to="/signup"
//                         className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
//                       >
//                         Sign Up
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Routes */}
//         <div className="pt-16">
//           <Routes>
//             <Route path="/" element={<Home setShowChat={setShowChat} />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/services/audio" element={<Services />} />
//             <Route path="/services/video" element={<Services />} />
//             <Route path="/services/chat" element={<Services />} />
//             <Route path="/services/meditation" element={<Services />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//           </Routes>
//         </div>

//         {/* Chatbot */}
//         <Chatbot showChat={showChat} setShowChat={setShowChat} /> {/* Render Chatbot component */}
//       </div>
//     </Router>
//   );
// }

// export default App;



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

function App() {
  const { user, logout } = useAuth();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="bg-stress-dark min-h-screen text-white">
        {/* Navigation */}
        <nav className="bg-stress-gray fixed w-full z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              Nirv<span className="text-stress-yellow">aan</span>
            </Link>
            <div className="flex items-center space-x-8">
              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <button className="flex items-center space-x-1 hover:text-stress-yellow transition-colors">
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`absolute top-full left-0 mt-2 w-48 bg-stress-gray rounded-lg shadow-lg transition-all duration-200 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="py-2">
                    <Link to="/services/audio" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">Audio Therapy</Link>
                    <Link to="/services/video" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">Video Therapy</Link>
                    <Link to="/services/chat" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">Chat Therapy</Link>
                    <Link to="/services/meditation" className="block px-4 py-2 hover:bg-stress-dark hover:text-stress-yellow transition-colors">Meditation</Link>
                  </div>
                </div>
              </div>

              {/* Chatbot Button */}
              <button 
                onClick={() => setShowChat(!showChat)}
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
                    <Link to="/login" className="flex items-center space-x-2 text-stress-yellow hover:text-stress-yellow/80 transition-colors">
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link to="/signup" className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-full hover:bg-opacity-90 transition-all">
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>

        {/* Chatbot Component */}
        {showChat && <Chatbot showChat={showChat} setShowChat={setShowChat} />}
      </div>
    </Router>
  );
}

export default App;
