import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Loader2, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';

// Add TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

// Note: This was originally a class component, refactored to hooks
// Keeping some old code for reference
/*
class ChatWithNirvaan extends React.Component {
  state = {
    messages: [],
    input: '',
    // ... rest of the state
  }
  // ... rest of the implementation
}
*/

function ChatWithNirvaan() {
  // State management
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! I'm Nirvaan, your AI companion for mental wellness. How can I help you today?", 
      sender: "bot",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Initialize speech synthesis
  const speechSynthesis = window.speechSynthesis;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const [recognitionTimeout, setRecognitionTimeout] = useState<NodeJS.Timeout | null>(null);

  // TODO: Move this to a config file
  const OLLAMA_API_URL = "https://growing-shiner-enough.ngrok-free.app";

  // FIXME: These should probably be in a separate file
  const allSuggestions = [
    "Suggest a quick breathing exercise.",
    "I'm feeling overwhelmed. Can we talk?",
    "I don't know how I feel right now.",
    "Give me tips based on my current stress level.",
    "I just need someone to talk to.",
    "Can you help me deal with anxiety?",
    "What should I do if I feel low?"
  ];

  // Utility function to get random suggestions
  // Note: This could be optimized but keeping it simple for now
  const getRandomSuggestions = () => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Initialize suggestions
  useEffect(() => {
    setSuggestions(getRandomSuggestions());
  }, []);

  // Update suggestions when a message is sent
  useEffect(() => {
    if (messages.length > 1) {
      setSuggestions(getRandomSuggestions());
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Try to find preferred voices in order of preference
      const preferredVoices = [
        'Google US English Female',
        'Google UK English Female',
        'Microsoft Aria Online (Natural)',
        'Microsoft Jenny Online (Natural)',
        'Microsoft Guy Online (Natural)',
        'Samantha',
        'Daniel',
        'Moira'
      ];
      
      const preferredVoice = availableVoices.find(voice => 
        preferredVoices.includes(voice.name)
      ) || availableVoices.find(
        voice => voice.lang.includes('en') && voice.name.includes('Female')
      ) || availableVoices.find(
        voice => voice.lang.includes('en')
      ) || availableVoices[0];
      
      setSelectedVoice(preferredVoice);
    };

    // Load voices when they become available
    if (speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [speechSynthesis]);

  // Speech synthesis function
  // TODO: Consider adding rate and pitch controls
  const speak = (text: string) => {
    if (speechSynthesis && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.volume = 1.0;
      
      // Add slight pauses at punctuation for more natural speech
      const processedText = text.replace(/([.,!?])/g, '$1 ');
      utterance.text = processedText;
      
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Speech recognition setup
  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;  // Keep listening
      recognition.interimResults = true;  // Get interim results
      recognition.lang = 'en-US';

      recognition.onresult = (event: { results: { transcript: string }[][] }) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(transcript);
        
        // Reset timeout when we get results
        if (recognitionTimeout) {
          clearTimeout(recognitionTimeout);
        }
        
        // Set new timeout for 3 seconds of silence
        const timeout = setTimeout(() => {
          setIsListening(false);
          recognition.stop();
        }, 3000);
        
        setRecognitionTimeout(timeout);
      };

      recognition.onerror = (event: { error: string }) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (recognitionTimeout) {
          clearTimeout(recognitionTimeout);
          setRecognitionTimeout(null);
        }
      };

      recognition.onend = () => {
        if (isListening) {
          // Restart recognition if it ends while we're still listening
          recognition.start();
        }
      };
    }

    return () => {
      if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
      }
    };
  }, [recognition, isListening, recognitionTimeout]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
        setRecognitionTimeout(null);
      }
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Typewriter effect for bot messages
  // Note: This could be moved to a separate component
  const typewriterEffect = (text: string, onComplete: () => void) => {
    let index = 0;
    setIsTyping(true);
    setTypingMessage('');

    // Start speech synthesis immediately
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.volume = 1.0;
    
    // Add slight pauses at punctuation for more natural speech
    const processedText = text.replace(/([.,!?])/g, '$1 ');
    utterance.text = processedText;
    
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);

    const type = () => {
      if (index < text.length) {
        setTypingMessage(prev => prev + text[index]);
        index++;
        setTimeout(type, 30); // Adjust speed here (lower = faster)
      } else {
        setIsTyping(false);
        onComplete();
      }
    };

    type();
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const user_Message = { text: input, sender: 'user' as const, timestamp: new Date() };
    setMessages(prev => [...prev, user_Message]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await axios({
        method: 'post',
        url: `${OLLAMA_API_URL}/api/generate`,
        data: {
          model: "qwen2.5-coder",
          // prompt: `You are Nirvaan, a helpful AI assistant focused on mental wellness and stress management. Provide supportive, empathetic responses while maintaining a professional tone.
          prompt: `You are Nirvaan, an empathetic and professional AI assistant focused on mental wellness and stress management.

                  Keep responses short, calming, and supportive (1–3 sentences).

                  Maintain a gentle, understanding tone, like a compassionate guide.

                  Avoid medical diagnosis or complex advice—focus on emotional support, reassurance, and simple coping suggestions.

                  Use plain, non-technical language.

                  Example scenarios include:

                  Someone feeling overwhelmed, anxious, sad, or low on motivation

                  A person needing a quick grounding tip or mental reset

                  Requests for calming messages or check-ins
Previous conversation:
${messages.map(msg => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`).join('\n')}

User: ${input}

Assistant:`,
          stream: false
        },
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      console.log('API Response:', response.data);
      const botReply = response.data.response?.trim() || "I'm here to assist you!";
      
      // Start typewriter effect immediately
      setIsTyping(true);
      setTypingMessage('');
      typewriterEffect(botReply, () => {
        // Add the message to the chat history only   after typewriter effect is complete gagaggugu
        const botMessage = { text: botReply, sender: 'bot' as const, timestamp: new Date() };
        setMessages(prev => [...prev, botMessage]);
      });

    } catch (error: any) {
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });

      let error_Message = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";

      if (error.response) {
        console.error("API Error:", error.response.data);
        error_Message = error.response.data?.error || error_Message;
      } else if (error.code === 'ECONNABORTED') {
        error_Message = "The request took too long to complete. Please try again.";
      } else if (error.code === 'ERR_NETWORK') {
        error_Message = "Cannot connect to the AI server. Please check if the server is running and accessible.";
      }

      // Start typewriter effect for error message
      setIsTyping(true);
      setTypingMessage('');
      typewriterEffect(error_Message, () => {
        const errorBotMessage = { text: error_Message, sender: 'bot' as const, timestamp: new Date() };
        setMessages(prev => [...prev, errorBotMessage]);
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-stress-gray">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Chat with Nirvaan</h1>
              
              <div className="flex items-center space-x-4">
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    if (voice) setSelectedVoice(voice);
                  }}
                  className="px-3 py-1 rounded-full bg-black/40 border border-white/20 text-white focus:outline-none focus:border-stress-yellow"
                  aria-label="Select voice"
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
                <button
                  onClick={isSpeaking ? stopSpeaking : () => speak(messages[messages.length - 1].text)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                  title={isSpeaking ? "Stop speaking" : "Read last message"}
                >
                  {isSpeaking ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </button>
              </div>
            </div>
            <p className="text-gray-300 text-center mt-2">
              Your AI companion for mental wellness and stress management
            </p>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-stress-yellow text-stress-dark'
                      : 'bg-black/40 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-black/40 text-white rounded-2xl p-4">
                  {typingMessage}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-black/40 p-6 border-t border-white/10">
            {/* Suggestion Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    handleSend();
                  }}
                  className="px-4 py-2 rounded-full bg-stress-yellow/20 text-stress-yellow hover:bg-stress-yellow/30 transition-all text-sm whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || isListening}
                  className="w-full px-6 py-3 rounded-full bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-stress-yellow disabled:opacity-50"
                  placeholder={isListening ? "Listening... (speak now)" : "Type your message..."}
                />
                <button
                  onClick={toggleListening}
                  disabled={isLoading}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-black/40 hover:bg-black/60'
                  }`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || isListening}
                className="bg-stress-yellow text-stress-dark px-6 py-3 rounded-full hover:bg-opacity-90 transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWithNirvaan; 