import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Recommendation {
  _id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  userId: {
    username: string;
    email: string;
  };
}

function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recommendations');
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to load recommendations');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stress-yellow text-xl">Loading recommendations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stress-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Community Recommendations</h1>
          {user && (
            <div className="flex space-x-4">
              <Link
                to="/create-task"
                className="bg-stress-yellow text-stress-dark px-6 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center"
              >
                <span className="mr-2">Post Task</span>
              </Link>
              <Link
                to="/create-recommendation"
                className="bg-stress-yellow text-stress-dark px-6 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center"
              >
                <span className="mr-2">Post a Recommendation</span>
              </Link>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div
              key={rec._id}
              className="bg-stress-gray rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-stress-yellow text-stress-dark px-3 py-1 rounded-full text-sm">
                  {rec.type}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(rec.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{rec.title}</h3>
              <p className="text-gray-300 mb-4">{rec.description}</p>
              <div className="text-sm text-gray-400">
                Posted by {rec.userId.username}
              </div>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No recommendations yet. Be the first to post one!
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendations; 