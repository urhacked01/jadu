'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Phone, Mail } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample support agent responses
  const supportResponses = [
    'Hello! How can I help you today?',
    'I understand your concern. Let me help you with that.',
    'Could you please provide more details?',
    "Thank you for your patience. I'm looking into this.",
    "Is there anything else you'd like to know?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response after 1-2 seconds
    setTimeout(
      () => {
        const randomResponse =
          supportResponses[Math.floor(Math.random() * supportResponses.length)];
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'support',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, supportMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[var(--primary)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--primary-dark)] transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl">
          {/* Chat Header */}
          <div className="bg-[var(--primary)] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">Chat Support</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-[var(--primary)] text-white p-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Contact Options */}
          <div className="border-t p-3 bg-gray-50">
            <div className="flex justify-center space-x-4">
              <a
                href="tel:+919876543210"
                className="flex items-center text-gray-600 hover:text-[var(--primary)]"
              >
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">Call</span>
              </a>
              <a
                href="mailto:support@dhanlaxmimotor.com"
                className="flex items-center text-gray-600 hover:text-[var(--primary)]"
              >
                <Mail className="h-4 w-4 mr-1" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
