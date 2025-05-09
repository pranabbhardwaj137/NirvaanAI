import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  Calendar, 
  Clock, 
  Heart, 
  MessageCircle, 
  Settings, 
  LogOut,
  User,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import CalendarComponent from '../components/Calendar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UserProfile {
  username: string;
  email: string;
  joinDate: string;
  lastActive: string;
  totalSessions: number;
  favoriteTherapy: string;
}

interface AssessmentResult {
  date: string;
  score: number;
  recommendation: string;
  recommendedTherapy: string;
}

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    if (user) {
      const results = localStorage.getItem(`sentiscope_history_${user.username}`);
      if (results) {
        setAssessmentHistory(JSON.parse(results));
      }
    }
  }, [user]);

  // If no user is logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data - replace with actual user data from your backend
  const profileData: UserProfile = {
    username: user.username,
    email: user.email || 'user@example.com',
    joinDate: new Date().toLocaleDateString(),
    lastActive: 'Just now',
    totalSessions: assessmentHistory.length,
    favoriteTherapy: assessmentHistory.length > 0 
      ? assessmentHistory[assessmentHistory.length - 1].recommendedTherapy 
      : 'Audio Therapy'
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const moodHistory = {
    labels: assessmentHistory.map(result => new Date(result.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Score',
        data: assessmentHistory.map(result => result.score),
        borderColor: '#EAB308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const generateMoodAnalysis = () => {
    if (assessmentHistory.length === 0) {
      return "You haven't taken any mood assessments yet. Try taking one to track your emotional well-being!";
    }

    const scores = assessmentHistory.map(result => result.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const trend = scores[scores.length - 1] - scores[0];
    const trendPercentage = Math.round((trend / scores[0]) * 100);

    let analysis = `Your mood has shown a ${trendPercentage > 0 ? 'positive' : 'negative'} trend over the past ${assessmentHistory.length} assessments, with an overall ${trendPercentage > 0 ? 'improvement' : 'decline'} of ${Math.abs(trendPercentage)}%. `;
    
    if (average >= 70) {
      analysis += "You're maintaining a generally positive outlook. Keep up the good work!";
    } else if (average >= 50) {
      analysis += "You're experiencing moderate emotional well-being. Consider exploring some of our therapy options to boost your mood.";
    } else {
      analysis += "You might be going through a challenging period. We recommend trying our therapy services to help improve your emotional well-being.";
    }

    return analysis;
  };

  return (
    <div className="min-h-screen bg-stress-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar */}
          <div className="lg:col-span-1">
            <CalendarComponent />
          </div>

          {/* Right Column - Profile Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-yellow-500/20">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <User className="w-12 h-12 text-yellow-500" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-400 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileData.username}</h1>
                  <p className="text-yellow-500/80">{profileData.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <Activity className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-500/80">Total Sessions</p>
                    <p className="text-2xl font-bold text-white">{profileData.totalSessions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <Heart className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-500/80">Favorite Therapy</p>
                    <p className="text-2xl font-bold text-white">{profileData.favoriteTherapy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiscope History */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-yellow-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Sentiscope History</h2>
              <div className="space-y-6">
                <div className="bg-black/20 rounded-xl p-6">
                  <div className="h-64">
                    {assessmentHistory.length > 0 ? (
                      <Line data={moodHistory} options={options} />
                    ) : (
                      <div className="h-full flex items-center justify-center text-white/70">
                        No mood assessment history available yet.
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-black/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold text-white">Mood Analysis</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {generateMoodAnalysis()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-yellow-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {assessmentHistory.slice(-3).reverse().map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Activity className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-white">Mood Assessment - {result.score}%</p>
                        <p className="text-sm text-yellow-500/80">{new Date(result.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-yellow-500/60" />
                  </div>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 px-6 py-3 rounded-xl transition-colors border border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 