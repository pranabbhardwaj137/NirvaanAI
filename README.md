# Nirvaan AI
### Stress hits hard, but personal, simple relief is hard to find.

Nirvaan Stress Reliever is a web application designed to provide personalized mental health support. It offers tailored recommendations for stress-relieving songs, movies, and books, an AI chatbot for instant relief, a community forum to connect users, and a profile with a happiness meter to track well-being—all built to make stress relief accessible and engaging.

### Features
Personalized Recommendations: Curated songs, movies, and books based on your mood or preferences.

Happiness Meter: A quick quiz to calculate and display your happiness score on your profile.

AI Chatbot: Real-time chat support for stress relief (pending full integration).

Community Forum: Share and explore stress-busting tips with others.

User Profile: View your details, happiness score, and preferences.

### Tech Stack
Frontend: React.js

Backend: Node.js with Express.js

Database: MongoDB with Mongoose

Dependencies: Open AI API (chatbot)


### Installation

#### Prerequisites
Node.js (v16+ recommended)

MongoDB (running locally or via cloud)

#### Clone the Repository
```
git clone https://github.com/pranabbhardwaj137/NirvaanAI.git
cd NirvaanAI
```

Install Dependencies
bash
```
npm i // Installs node_modules for the project
```

Set Up Environment Variables

Create a .env file in the root directory:
```
YOUR_API_KEY=your-openai-api-key
```

Replace your-openai-api-key with your Open AI API key (required for chatbot).


Run the Application

Start MongoDB locally:
```
cd server
nodemon server.js
```

Frontend:

```
npm run dev
```

Open http://localhost:5173 (or the port Vite/React assigns) in your browser.


### Usage
Sign Up/Login: Register or log in with a username and password.

Profile: Check your happiness score and update preferences.

Happiness Meter: Take the 5-question test to see your score.

Recommendations: Browse tailored stress-relief content.

Community: Post or read tips in the forum.

Chatbot: Chat for support.
