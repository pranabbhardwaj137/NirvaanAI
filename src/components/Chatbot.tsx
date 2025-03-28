// import React, { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";

// interface ChatbotProps {
//   showChat: boolean;
//   setShowChat: (show: boolean) => void;
// }

// const Chatbot: React.FC<ChatbotProps> = ({ showChat, setShowChat }) => {
//   const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
//     { text: "Hi! I'm Nirvaan. How can I help you?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
//   const API_URL = "https://api.openai.com/v1/chat/completions";

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     // Add user's message
//     setMessages([...messages, { text: input, sender: "user" }]);
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         API_URL,
//         {
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content: "You are Nirvaan, a helpful AI assistant focused on mental wellness and stress management. Provide supportive, empathetic responses while maintaining a professional tone."
//             },
//             ...messages.map(msg => ({
//               role: msg.sender === "user" ? "user" : "assistant",
//               content: msg.text
//             })),
//             { role: "user", content: input }
//           ],
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${API_KEY}`,
//           },
//         }
//       );

//       const botReply = response.data.choices[0].message.content;
//       setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);

//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setMessages((prev) => [...prev, { 
//         text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.", 
//         sender: "bot" 
//       }]);
//     } finally {
//       setIsLoading(false);
//       setInput("");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!showChat) return null;

//   return (
//     <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-stress-gray/95 backdrop-blur-sm rounded-lg shadow-xl flex flex-col border border-gray-700">
//       <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-stress-gray/95">
//         <h3 className="text-lg font-semibold">Chat with Nirvaan</h3>
//         <button 
//           onClick={() => setShowChat(false)}
//           className="text-gray-400 hover:text-white transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stress-gray/95">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[80%] rounded-lg p-3 ${
//                 msg.sender === "user"
//                   ? "bg-stress-yellow text-stress-dark"
//                   : "bg-stress-dark/95 text-white"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-stress-dark/95 text-white rounded-lg p-3">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
//                 <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t border-gray-700 bg-stress-gray/95">
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             disabled={isLoading}
//             className="flex-1 px-4 py-2 rounded-lg bg-stress-dark/95 border border-gray-600 text-white focus:outline-none focus:border-stress-yellow disabled:opacity-50"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSend}
//             disabled={isLoading}
//             className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;



import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

interface ChatbotProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ showChat, setShowChat }) => {
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: "Hi! I'm Nirvaan. How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const handleSend = async () => {
    if (input.trim() === "") return;

    if (!API_KEY) {
      console.error("API Key is missing! Check your .env file.");
      setMessages((prev) => [...prev, { text: "Configuration error: API key is missing.", sender: "bot" }]);
      return;
    }

    setMessages([...messages, { text: input, sender: "user" }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are Nirvaan, a helpful AI assistant focused on mental wellness and stress management. Provide supportive, empathetic responses while maintaining a professional tone."
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
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);

    } catch (error: any) {
      console.error("Error fetching AI response:", error);
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";

      if (error.response) {
        console.error("API Error:", error.response.data);
        errorMessage = error.response.data?.error?.message || errorMessage;
      }

      setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
    } finally {
      setIsLoading(false);
      setInput("");
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
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-stress-yellow text-stress-dark px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
