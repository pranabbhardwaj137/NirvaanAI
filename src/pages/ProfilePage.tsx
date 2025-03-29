import React from 'react';
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
  ChevronRight
} from 'lucide-react';

interface UserProfile {
  username: string;
  email: string;
  joinDate: string;
  lastActive: string;
  totalSessions: number;
  favoriteTherapy: string;
}

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    totalSessions: 12,
    favoriteTherapy: 'Audio Therapy'
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-stress-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-yellow-500/80">Member Since</p>
                <p className="text-2xl font-bold text-white">{profileData.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-yellow-500/80">Last Active</p>
                <p className="text-2xl font-bold text-white">{profileData.lastActive}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-yellow-500/20">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white">Chat Session with Nirvaan</p>
                  <p className="text-sm text-yellow-500/80">30 minutes ago</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-yellow-500/60" />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white">Completed Mood Assessment</p>
                  <p className="text-sm text-yellow-500/80">2 hours ago</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-yellow-500/60" />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Heart className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white">Started Audio Therapy Session</p>
                  <p className="text-sm text-yellow-500/80">1 day ago</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-yellow-500/60" />
            </div>
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
  );
};

export default ProfilePage; 