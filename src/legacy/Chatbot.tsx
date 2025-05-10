import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { X, Send } from "lucide-react";

interface ChatbotProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ showChat, setShowChat }) => {
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: "Hi! I'm Nirvaan. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const OLLAMA_API_URL = "https://growing-shiner-enough.ngrok-free.app";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const user_Message = input.trim();
    setMessages(prev => [...prev, { text: user_Message, sender: "user" }]);
    setIsLoading(true);
    setInput("");

    try {
      console.log('Sending request to:', `${OLLAMA_API_URL}/api/generate`);
      const response = await axios({
        method: 'post',
        url: `${OLLAMA_API_URL}/api/generate`,
        data: {
          model: "qwen2.5-coder",
          prompt: `You are Nirvaan, a helpful AI assistant focused on mental wellness and stress management. Provide supportive, empathetic responses while maintaining a professional tone
          give short answers.

Previous conversation:
${messages.map(msg => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`).join('\n')}

User: ${user_Message}

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
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);

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

      setMessages(prev => [...prev, { text: error_Message, sender: "bot" }]);
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

  if (!showChat) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-stress-gray/95 backdrop-blur-sm rounded-lg shadow-xl flex flex-col border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-stress-gray/95">
        <h3 className="text-lg font-semibold">Chat with Nirvaan</h3>
        <button 
          onClick={() => setShowChat(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stress-gray/95">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-stress-yellow text-stress-dark"
                  : "bg-stress-dark/95 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stress-dark/95 text-white rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 bg-stress-gray/95">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-stress-dark/95 border border-gray-600 text-white focus:outline-none focus:border-stress-yellow disabled:opacity-50"
            placeholder={isLoading ? "Nirvaan is typing..." : "Type your message..."}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ""}
            className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
