import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Kopiko:workzap1234@workzap.glrfvhu.mongodb.net/?retryWrites=true&w=majority&appName=Workzap')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Recommendation Schema
const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

// Event Schema
const eventSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sport: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  maxParticipants: { type: Number, required: true },
  currentParticipants: { type: Number, default: 0 },
  location: { type: String, required: true },
  status: { type: String, enum: ['open', 'full', 'cancelled'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// Event Participant Schema
const eventParticipantSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const EventParticipant = mongoose.model('EventParticipant', eventParticipantSchema);

// Notification Schema
const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  type: { type: String, enum: ['join_request', 'request_accepted', 'request_rejected'], required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'a-string-secret-at-least-256-bits-long');
    console.log("JWT WOKRING")
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, city, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, city, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ _id: user._id }, 'a-string-secret-at-least-256-bits-long');
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: 'Failed to create account' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt received:', { email: req.body.email });
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', { email });
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', { isMatch });
    
    if (!isMatch) {
      console.log('Invalid password for user:', { email });
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ _id: user._id }, 'a-string-secret-at-least-256-bits-long');
    console.log('Login successful:', { userId: user._id });
    
    // Return user data without password
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      city: user.city
    };

    res.json({ user: userData, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: 'Failed to login' });
  }
});

// Get Current User
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Get All Recommendations
app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// Create Recommendation (Protected)
app.post('/api/recommendations', auth, async (req, res) => {
  try {
    const { type, title, description } = req.body;
    
    if (!type || !title || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const recommendation = new Recommendation({
      userId: req.user._id,
      type,
      title,
      description
    });

    await recommendation.save();
    
    const populatedRecommendation = await Recommendation.findById(recommendation._id)
      .populate('userId', 'username email');

    res.status(201).json(populatedRecommendation);
  } catch (error) {
    console.error('Error creating recommendation:', error);
    res.status(500).json({ error: 'Failed to create recommendation' });
  }
});

// Create Event (Protected)
app.post('/api/events', auth, async (req, res) => {
  try {
    const { sport, title, description, date, duration, maxParticipants, location } = req.body;
    
    if (!sport || !title || !description || !date || !duration || !maxParticipants || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const event = new Event({
      creatorId: req.user._id,
      sport,
      title,
      description,
      date,
      duration,
      maxParticipants,
      location
    });

    await event.save();
    
    const populatedEvent = await Event.findById(event._id)
      .populate('creatorId', 'username email');

    res.status(201).json(populatedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get All Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('creatorId', 'username email')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Join Event (Protected)
app.post('/api/events/:eventId/join', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.status !== 'open') {
      return res.status(400).json({ error: 'Event is not open for joining' });
    }

    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is full' });
    }

    // Check if user is already a participant
    const existingParticipant = await EventParticipant.findOne({
      eventId: event._id,
      userId: req.user._id
    });

    if (existingParticipant) {
      return res.status(400).json({ error: 'You have already joined this event' });
    }

    // Create participant record
    const participant = new EventParticipant({
      eventId: event._id,
      userId: req.user._id
    });

    await participant.save();

    // Create notification for event creator
    const notification = new Notification({
      recipientId: event.creatorId,
      senderId: req.user._id,
      eventId: event._id,
      type: 'join_request',
      message: `${req.user.username} wants to join your event "${event.title}"`
    });

    await notification.save();

    res.status(201).json(participant);
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ error: 'Failed to join event' });
  }
});

// Accept/Reject Participant (Protected)
app.put('/api/events/:eventId/participants/:participantId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to manage this event' });
    }

    const participant = await EventParticipant.findById(req.params.participantId);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    participant.status = status;
    await participant.save();

    // Create notification for the participant
    const notification = new Notification({
      recipientId: participant.userId,
      senderId: req.user._id,
      eventId: event._id,
      type: status === 'accepted' ? 'request_accepted' : 'request_rejected',
      message: status === 'accepted' 
        ? `Your request to join "${event.title}" has been accepted!`
        : `Your request to join "${event.title}" has been rejected.`
    });

    await notification.save();

    // Update event participant count if accepted
    if (status === 'accepted') {
      event.currentParticipants += 1;
      if (event.currentParticipants >= event.maxParticipants) {
        event.status = 'full';
      }
      await event.save();
    }

    res.json(participant);
  } catch (error) {
    console.error('Error updating participant status:', error);
    res.status(500).json({ error: 'Failed to update participant status' });
  }
});

// Get User's Events (Protected)
app.get('/api/events/my-events', auth, async (req, res) => {
  try {
    const createdEvents = await Event.find({ creatorId: req.user._id })
      .populate('creatorId', 'username email')
      .sort({ date: 1 });

    const joinedEvents = await EventParticipant.find({ userId: req.user._id })
      .populate({
        path: 'eventId',
        populate: { path: 'creatorId', select: 'username email' }
      })
      .sort({ createdAt: -1 });

    res.json({
      created: createdEvents,
      joined: joinedEvents
    });
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ error: 'Failed to fetch user events' });
  }
});

// Get User's Notifications (Protected)
app.get('/api/notifications', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user._id })
      .populate('senderId', 'username')
      .populate('eventId', 'title')
      .sort({ createdAt: -1 });
    
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark Notification as Read (Protected)
app.put('/api/notifications/:notificationId/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    if (notification.recipientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this notification' });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
