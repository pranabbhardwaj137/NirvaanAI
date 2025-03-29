import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
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
import { Brain, TrendingUp, TrendingDown, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodData {
  date: string;
  score: number;
  mood: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated mood history data - replace with actual API call
    const mockData: MoodData[] = [
      { date: '2024-03-01', score: 75, mood: 'Happy' },
      { date: '2024-03-02', score: 65, mood: 'Calm' },
      { date: '2024-03-03', score: 85, mood: 'Very Happy' },
      { date: '2024-03-04', score: 70, mood: 'Happy' },
      { date: '2024-03-05', score: 60, mood: 'Calm' },
      { date: '2024-03-06', score: 80, mood: 'Very Happy' },
      { date: '2024-03-07', score: 75, mood: 'Happy' },
    ];
    setMoodHistory(mockData);
    setLoading(false);
  }, []);

  const chartData = {
    labels: moodHistory.map(data => data.date),
    datasets: [
      {
        label: 'Mood Score',
        data: moodHistory.map(data => data.score),
        borderColor: 'rgb(234, 179, 8)', // yellow-500
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sentiscope History',
        color: 'white',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  const calculateAverageMood = () => {
    const sum = moodHistory.reduce((acc, curr) => acc + curr.score, 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'stable';
    const firstScore = moodHistory[0].score;
    const lastScore = moodHistory[moodHistory.length - 1].score;
    return lastScore > firstScore ? 'improving' : lastScore < firstScore ? 'declining' : 'stable';
  };

  const getMoodVolatility = () => {
    if (moodHistory.length < 2) return 'low';
    const scores = moodHistory.map(data => data.score);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
    return variance > 100 ? 'high' : variance > 50 ? 'moderate' : 'low';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-yellow-500">{user?.username}</span>'s Profile
          </h1>
          <p className="text-xl text-white/80">
            Track your emotional journey and mental wellness progress
          </p>
        </div>

        {/* Mood Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-500/10 backdrop-blur-3xl p-6 rounded-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Average Mood</h3>
                  <p className="text-white/60 text-sm">Last 7 days</p>
                </div>
              </div>
              <span className="text-3xl font-bold text-yellow-500">{calculateAverageMood()}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${calculateAverageMood()}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-500/10 backdrop-blur-3xl p-6 rounded-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getMoodTrend() === 'improving' ? (
                  <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                ) : getMoodTrend() === 'declining' ? (
                  <TrendingDown className="w-8 h-8 text-red-500 mr-3" />
                ) : (
                  <Activity className="w-8 h-8 text-yellow-500 mr-3" />
                )}
                <div>
                  <h3 className="text-lg font-semibold">Mood Trend</h3>
                  <p className="text-white/60 text-sm">Overall direction</p>
                </div>
              </div>
              <span className="text-2xl font-bold capitalize">
                {getMoodTrend() === 'improving' ? (
                  <span className="text-green-500">Improving</span>
                ) : getMoodTrend() === 'declining' ? (
                  <span className="text-red-500">Declining</span>
                ) : (
                  <span className="text-yellow-500">Stable</span>
                )}
              </span>
            </div>
          </div>

          <div className="bg-gray-500/10 backdrop-blur-3xl p-6 rounded-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Mood Volatility</h3>
                  <p className="text-white/60 text-sm">Emotional stability</p>
                </div>
              </div>
              <span className="text-2xl font-bold capitalize">
                {getMoodVolatility() === 'high' ? (
                  <span className="text-red-500">High</span>
                ) : getMoodVolatility() === 'moderate' ? (
                  <span className="text-yellow-500">Moderate</span>
                ) : (
                  <span className="text-green-500">Low</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Mood History Chart */}
        <div className="bg-gray-500/10 backdrop-blur-3xl p-6 rounded-xl border border-white/20">
          <div className="h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Mood Entries */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Sentiscope Entries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moodHistory.map((entry, index) => (
              <div
                key={index}
                className="bg-gray-500/10 backdrop-blur-3xl p-4 rounded-xl border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{entry.mood}</h3>
                    <p className="text-sm text-white/60">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-yellow-500">{entry.score}</span>
                    <p className="text-sm text-white/40">points</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 