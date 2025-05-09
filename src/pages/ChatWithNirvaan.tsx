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

function ChatWithNirvaan() {
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const speechSynthesis = window.speechSynthesis;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const [recognitionTimeout, setRecognitionTimeout] = useState<NodeJS.Timeout | null>(null);

  const OLLAMA_API_URL = "https://growing-shiner-enough.ngrok-free.app";

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
        'Google US English',
        'Google UK English Female',
        'Microsoft Aria Online (Natural)',
        'Microsoft Jenny Online (Natural)',
        'Samantha',
        'Daniel',
        'Moira',
        'Microsoft Zira Desktop',
        'Google UK English Male'
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

    const userMessage = { text: input, sender: 'user' as const, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      // Prepare the conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));

      // Try llama3 first, fall back to llama2 if not available
      let model = "llama3";
      try {
        // Test if llama3 is available
        await axios.post(OLLAMA_API_URL, {
          model: "llama3",
          prompt: "test",
          stream: false
        });
      } catch {
        model = "llama2";
      }

      const response = await axios.post(
        OLLAMA_API_URL,
        {
          model: model,
          prompt: `You are Nirvaan, a compassionate AI assistant focused on mental wellness and stress management. Provide supportive, empathetic responses while maintaining a professional tone. Help users with stress management, anxiety, depression, and general mental health concerns.

Previous conversation:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${input}

Assistant:`,
          stream: false
        }
      );

      const botReply = response.data.response || "I'm here to assist you!";
      
      // Start typewriter effect with simultaneous speech
      typewriterEffect(botReply, () => {
        setMessages(prev => [...prev, { 
          text: botReply, 
          sender: "bot",
          timestamp: new Date()
        }]);
      });

    } catch (error: any) {
      console.error("Error fetching AI response:", error);
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";

      if (error.response) {
        console.error("API Error:", error.response.data);
        errorMessage = error.response.data?.error?.message || errorMessage;
      }

      typewriterEffect(errorMessage, () => {
        setMessages(prev => [...prev, { 
          text: errorMessage, 
          sender: "bot",
          timestamp: new Date()
        }]);
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
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80')`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-black/40 p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">
                Chat with <span className="text-stress-yellow">Nirvaan AI</span>
              </h1>
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
          <div className="h-[calc(100vh-300px)] overflow-y-auto p-6 space-y-6 bg-black/20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-stress-yellow text-stress-dark'
                      : 'bg-black/40 text-white backdrop-blur-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black/40 text-white rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Nirvaan is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            {isTyping && !isLoading && (
              <div className="flex justify-start">
                <div className="bg-black/40 text-white rounded-2xl p-4 backdrop-blur-sm">
                  <p className="whitespace-pre-wrap">{typingMessage}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-black/40 p-6 border-t border-white/10">
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