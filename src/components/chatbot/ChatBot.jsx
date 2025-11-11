import { useState } from "react";
import FAQs from "./faqs";
import findBestFAQ from "./findBestFAQ";
import { X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your Expense Assistant. Ask me anything about saving, budgeting, or tracking expenses.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text) => {
    const userInput = text || input;
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    const matchedFAQ = findBestFAQ(userInput, FAQs);

    const botReply = matchedFAQ
      ? matchedFAQ.answer
      : "Sorry, I don’t have an answer for that yet. Try asking about saving, budgeting, or tracking expenses!";

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-3 rounded-full shadow-xl z-50"
        >
          💬 Any problem? Ask me!
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-slate-800 text-slate-200 rounded-xl p-4 shadow-xl flex flex-col z-50">
          {/* Header with Lucide Close */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-slate-100">Expense Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat history */}
          <div className="overflow-y-auto h-48 mb-2 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-700"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Quick FAQs */}
          <div className="mb-2">
            <p className="text-xs text-slate-400 mb-1">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {FAQs.slice(0, 4).map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(faq.question)}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-100 px-2 py-1 rounded-full transition"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 focus:outline-none"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              className="bg-indigo-500 px-4 py-2 rounded-lg text-white hover:bg-indigo-400"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
