'use client'

import React, { useState, useRef, useEffect } from "react";
import { BarChart3, TrendingUp, Settings } from "lucide-react";

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  analysis?: {
    action: 'BUY' | 'SELL' | 'HOLD';
    confidence: number;
    target?: number;
    stopLoss?: number;
    reasoning: string;
  };
}

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onSettingsClick: () => void;
  onTradingClick: () => void;
  onAIAssistantClick: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onSettingsClick, onTradingClick, onAIAssistantClick, onClose }) => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: "🤖 Hi! I'm your AI Trading Assistant. Ask me about market trends, NIFTY analysis, or trading strategies!",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('nifty') || lowerMessage.includes('market')) {
      return {
        id: Date.now(),
        type: 'ai',
        message: "📊 NIFTY Analysis:",
        timestamp: new Date().toLocaleTimeString(),
        analysis: {
          action: Math.random() > 0.5 ? 'BUY' : 'SELL',
          confidence: Math.round(75 + Math.random() * 20),
          target: 25950 + Math.round((Math.random() - 0.5) * 200),
          stopLoss: 25800 + Math.round((Math.random() - 0.5) * 100),
          reasoning: "Strong support at 25,800. RSI oversold. Bullish divergence detected."
        }
      };
    }

    if (lowerMessage.includes('vix')) {
      return {
        id: Date.now(),
        type: 'ai',
        message: "📈 VIX at 14.2 suggests moderate volatility. Good for option writing strategies.",
        timestamp: new Date().toLocaleTimeString()
      };
    }

    const responses = [
      "I can help with market analysis. Try asking about NIFTY or VIX trends!",
      "What trading strategy are you considering? I can provide insights.",
      "Current market shows mixed signals. Any specific stock you're tracking?"
    ];

    return {
      id: Date.now(),
      type: 'ai',
      message: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date().toLocaleTimeString()
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const menuItems = [
    { name: "Dashboard", icon: BarChart3, href: "/", action: null },
    { name: "Trades", icon: TrendingUp, href: null, action: onTradingClick },
  ];

  const handleMenuClick = (callback?: () => void) => {
    onClose(); // Close mobile menu
    callback?.(); // Execute additional callback if provided
  };

  return (
    <aside className={`
      fixed top-14 left-0 bottom-0 w-56 bg-white/95 border-r border-gray-200 z-40 transition-transform duration-300
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <nav className="h-full overflow-auto px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() => handleMenuClick()}
                    className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <button
                    onClick={() => handleMenuClick(item.action)}
                    className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                )}
              </li>
            );
          })}
          
          {/* Settings as sidebar item for mobile */}
          <li>
            <button
              onClick={() => handleMenuClick(onSettingsClick)}
              className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </li>

          {/* AI Assistant */}
          <li>
            <button
              onClick={() => setShowAIChat(!showAIChat)}
              className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              <span className="text-lg">🤖</span>
              <span>AI Assistant</span>
              <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full ml-auto">LIVE</span>
            </button>
          </li>

          {/* AI Chat Interface */}
          {showAIChat && (
            <li className="mt-2">
              <div className="bg-gray-900 rounded-lg border border-gray-700 mx-2">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto p-3 space-y-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block max-w-[90%] rounded-lg p-2 text-xs ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-800 text-gray-100'
                      }`}>
                        <div>{msg.message}</div>
                        
                        {/* AI Analysis Card */}
                        {msg.analysis && (
                          <div className="mt-2 bg-gray-950 rounded p-2 border border-gray-600">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`px-1 py-0.5 rounded text-xs font-bold ${
                                msg.analysis.action === 'BUY' ? 'bg-green-600' : 'bg-red-600'
                              }`}>
                                {msg.analysis.action}
                              </span>
                              <span className="text-xs text-gray-400">
                                {msg.analysis.confidence}%
                              </span>
                            </div>
                            
                            {msg.analysis.target && (
                              <div className="text-xs space-y-0.5">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Target:</span>
                                  <span className="text-green-400">₹{msg.analysis.target}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">SL:</span>
                                  <span className="text-red-400">₹{msg.analysis.stopLoss}</span>
                                </div>
                              </div>
                            )}
                            
                            <div className="mt-1 text-xs text-gray-300 leading-tight">
                              {msg.analysis.reasoning}
                            </div>
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-400 mt-1">
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="text-left">
                      <div className="inline-block bg-gray-800 text-gray-100 rounded-lg p-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                          <span className="text-gray-400 ml-2">AI thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-2 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about NIFTY, VIX..."
                      className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded text-xs transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>

        <style jsx>{`
          .typing-dot {
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: #9ca3af;
            animation: typing 1.4s infinite ease-in-out;
          }
          .typing-dot:nth-child(1) { animation-delay: -0.32s; }
          .typing-dot:nth-child(2) { animation-delay: -0.16s; }
          @keyframes typing {
            0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </nav>
    </aside>
  );
};

export default Sidebar;
