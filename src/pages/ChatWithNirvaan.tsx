import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2 } from 'lucide-react';

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
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    if (!API_KEY) {
      console.error("API Key is missing! Check your .env file.");
      setMessages(prev => [...prev, { 
        text: "Configuration error: API key is missing.", 
        sender: "bot",
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage = { text: input, sender: 'user' as const, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are Nirvaan, a compassionate AI assistant focused on mental wellness and stress management. Provide supportive, empathetic responses while maintaining a professional tone. Help users with stress management, anxiety, depression, and general mental health concerns."
            },
            ...messages.map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            })),
            { role: "user", content: input }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const botReply = response.data.choices?.[0]?.message?.content || "I'm here to assist you!";
      setMessages(prev => [...prev, { 
        text: botReply, 
        sender: "bot",
        timestamp: new Date()
      }]);

    } catch (error: any) {
      console.error("Error fetching AI response:", error);
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";

      if (error.response) {
        console.error("API Error:", error.response.data);
        errorMessage = error.response.data?.error?.message || errorMessage;
      }

      setMessages(prev => [...prev, { 
        text: errorMessage, 
        sender: "bot",
        timestamp: new Date()
      }]);
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
    <div className="min-h-screen bg-gradient-to-b from-stress-dark to-stress-gray">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-stress-dark/50 p-6 border-b border-white/10">
            <h1 className="text-3xl font-bold text-center">
              Chat with <span className="text-stress-yellow">Nirvaan AI</span>
            </h1>
            <p className="text-gray-400 text-center mt-2">
              Your AI companion for mental wellness and stress management
            </p>
          </div>

          {/* Chat Messages */}
          <div className="h-[calc(100vh-300px)] overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-stress-yellow text-stress-dark'
                      : 'bg-stress-dark/80 text-white'
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
                <div className="bg-stress-dark/80 text-white rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Nirvaan is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-stress-dark/50 p-6 border-t border-white/10">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-6 py-3 rounded-full bg-stress-dark/80 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-stress-yellow disabled:opacity-50"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
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