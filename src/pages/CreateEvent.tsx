import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CreateEvent() {
  const [sport, setSport] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to create an event');
      }

      await axios.post(
        'http://localhost:5000/api/events',
        {
          sport,
          title,
          description,
          date,
          duration: parseInt(duration),
          maxParticipants: parseInt(maxParticipants),
          location
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate('/recommendations');
    } catch (error: any) {
      console.error('Error creating event:', error);
      setError(error.response?.data?.error || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Please log in to create an event</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stress-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Create an Event</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-gray-300 mb-2">
              Sport
            </label>
            <select
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              required
              disabled={loading}
            >
              <option value="">Select a sport</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Cricket">Cricket</option>
              <option value="Badminton">Badminton</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Enter event title"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Describe your event"
              rows={4}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              min="30"
              step="30"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-300 mb-2">
              Maximum Participants
            </label>
            <input
              type="number"
              id="maxParticipants"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              min="2"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Enter event location"
              required
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className={`flex-1 bg-stress-yellow text-stress-dark py-2 rounded-full font-semibold transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
              }`}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/recommendations')}
              className="flex-1 bg-stress-gray text-white py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent; 