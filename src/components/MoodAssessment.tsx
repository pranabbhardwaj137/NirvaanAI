import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface AssessmentResult {
  date: string;
  score: number;
  recommendation: string;
  recommendedTherapy: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How are you feeling today?",
    options: ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"]
  },
  {
    id: 2,
    text: "How would you rate your energy level?",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"]
  },
  {
    id: 3,
    text: "How well did you sleep last night?",
    options: ["Very Poorly", "Poorly", "Okay", "Well", "Very Well"]
  },
  {
    id: 4,
    text: "How is your stress level?",
    options: ["Very High", "High", "Moderate", "Low", "Very Low"]
  },
  {
    id: 5,
    text: "How would you rate your productivity today?",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"]
  }
];

const MoodAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      saveAssessmentResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    return Math.round((totalScore / (questions.length * 4)) * 100);
  };

  const getMoodRecommendation = (score: number) => {
    if (score >= 80) return "You're feeling great! Try some upbeat music to maintain your positive energy.";
    if (score >= 60) return "You're in a good mood. Some calming music might help you relax further.";
    if (score >= 40) return "You might be feeling a bit down. Try some uplifting music to boost your spirits.";
    if (score >= 20) return "You seem to be having a tough time. Some soothing music might help you feel better.";
    return "You're going through a difficult period. Some gentle, calming music might help you find peace.";
  };

  const getRecommendedTherapy = (score: number) => {
    if (score >= 80) return "Upbeat Pop";
    if (score >= 60) return "Calming Classical";
    if (score >= 40) return "Motivational Rock";
    if (score >= 20) return "Soothing Jazz";
    return "Meditation Music";
  };

  const saveAssessmentResult = () => {
    if (!user) return;

    const score = calculateScore();
    const recommendation = getMoodRecommendation(score);
    const recommendedTherapy = getRecommendedTherapy(score);

    const result: AssessmentResult = {
      date: new Date().toISOString(),
      score,
      recommendation,
      recommendedTherapy
    };

    const existingResults = localStorage.getItem(`sentiscope_history_${user.username}`);
    const results: AssessmentResult[] = existingResults ? JSON.parse(existingResults) : [];
    results.push(result);
    localStorage.setItem(`sentiscope_history_${user.username}`, JSON.stringify(results));
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getMoodRecommendation(score);
    const recommendedTherapy = getRecommendedTherapy(score);

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-500/10 backdrop-blur-3xl p-8 rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full">
          <h2 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">Your Mood Assessment Results</h2>
          
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-white text-lg mb-2">Your Score</p>
              <div className="text-6xl font-bold text-white mb-4 drop-shadow-lg">{score}%</div>
              <div className="w-full bg-white/20 rounded-full h-4">
                <div 
                  className="bg-white h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white text-lg mb-2">Current Mood</p>
              <p className="text-2xl font-semibold text-white drop-shadow-lg">{recommendation}</p>
            </div>

            <div className="text-center">
              <p className="text-white text-lg mb-2">Recommended Therapy</p>
              <p className="text-2xl font-semibold text-white drop-shadow-lg">{recommendedTherapy}</p>
            </div>

            {/* Venting Text Box */}
            <div className="mt-8">
              <p className="text-white text-lg mb-4 text-center">Need to vent? Share your feelings here...</p>
              <textarea
                className="w-full h-32 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
                placeholder="Write whatever's on your mind. This is a safe space to express yourself..."
                onChange={(e) => {
                  // Save to localStorage if needed
                  if (user) {
                    const ventingHistory = localStorage.getItem(`venting_history_${user.username}`) || '[]';
                    const history = JSON.parse(ventingHistory);
                    history.push({
                      date: new Date().toISOString(),
                      text: e.target.value,
                      moodScore: score
                    });
                    localStorage.setItem(`venting_history_${user.username}`, JSON.stringify(history));
                  }
                }}
              />
              <p className="text-white/60 text-sm mt-2 text-center">
                Your thoughts are private and will be saved only on your device.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                }}
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all font-semibold flex items-center space-x-2"
              >
                <span>Take Assessment Again</span>
              </button>
              <button
                onClick={() => navigate('/services/audio')}
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all font-semibold flex items-center space-x-2"
              >
                <span>Try Recommended Therapy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-500/10 backdrop-blur-3xl p-8 rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-lg">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="w-48 bg-white/20 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">{questions[currentQuestion].text}</h2>
        </div>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 transform hover:scale-[1.02] hover:rotate-1
                ${answers[currentQuestion] === index 
                  ? 'bg-white/20 text-white border-white shadow-lg' 
                  : 'bg-gray-500/5 text-white border-white/20 hover:border-white hover:bg-white/10'}`}
            >
              <span className="text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:scale-110">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">{option}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
              ${currentQuestion === 0 
                ? 'text-white/50 cursor-not-allowed' 
                : 'text-white hover:text-white/80'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodAssessment; 