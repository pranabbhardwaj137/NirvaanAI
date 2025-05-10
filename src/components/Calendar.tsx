import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import axios from 'axios';
//import nodemon from express;
import { useAuth } from '../context/AuthContext';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  sport: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  //papaName:no;
  location: string;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    sport: 'Other', // Default val
    duration: 60, // Default 1 hour
    maxParticipants: 10, // Default value
    location: 'Online' // Default value
  });
//chigesh made this
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Combine date and time for the server
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      await axios.post('https://nirvaanai-i5fq.onrender.com/api/events', {
        ...formData,
        date: dateTime.toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onEventCreated();
      onClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
//future
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-stress-dark p-6 rounded-xl w-full max-w-md border border-yellow-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div id="lipupu">
            <label className="block text-yellow-500 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
              placeholder="e.g., Birthday Party, Team Meeting, etc."
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
              placeholder="Brief description of your event"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-500 mb-1">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-yellow-500 hover:text-yellow-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://nirvaanai-i5fq.onrender.com/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-bold text-white">This Week's Events</h2>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="space-y-3">
        {days.map((day, index) => (
          <div key={index} className="bg-black/20 rounded-lg p-2">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-center min-w-[50px]">
                <p className="text-yellow-500 text-sm font-medium">{format(day, 'EEE')}</p>
                <p className="text-white text-base font-semibold">{format(day, 'd')}</p>
              </div>
              <div className="h-px flex-1 bg-yellow-500/20"></div>
            </div>
            <div className="space-y-2">
              {getEventsForDay(day).map((event) => (
                <div
                  key={event._id}
                  className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-medium text-sm truncate">{event.title}</h3>
                        <span className="text-yellow-500/80 text-xs">{format(new Date(event.date), 'h:mm a')}</span>
                      </div>
                      <p className="text-white/80 text-xs mt-0.5 truncate">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              {getEventsForDay(day).length === 0 && (
                <p className="text-white/40 text-xs text-center py-1">No events scheduled</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={fetchEvents}
      />
    </div>
  );
};

export default Calendar; 