"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { User, Bot, Send, Heart, Trophy, Target } from "lucide-react";

const VirtualCoach = () => {
  const [messages, setMessages] = useState<{id: string, text: string, sender: 'user' | 'coach', timestamp: Date}[]>([]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("coachMessages");
    const savedUserName = localStorage.getItem("userName");
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    }
    
    if (savedUserName) {
      setUserName(savedUserName);
    } else {
      // Set default name if not found
      setUserName("User");
    }
    
    // Add initial coach message if no messages exist
    if (!savedMessages || JSON.parse(savedMessages).length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        text: "Hello! I'm your virtual quit coach. How are you feeling today?",
        sender: 'coach' as const,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem("coachMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Save user name to localStorage
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate coach response after a delay
      setTimeout(() => {
        const responses = [
          "That's a common feeling during the quitting process. Remember, each craving lasts only a few minutes.",
          "I understand how challenging this can be. What strategies have worked for you in the past?",
          "It's completely normal to feel this way. Let's focus on your progress so far.",
          "You're doing better than you think. Remember your reasons for quitting.",
          "Take a deep breath. This feeling will pass, and you'll be stronger for overcoming it.",
          "I'm proud of you for reaching out. What can I help you with today?",
          "Every day you don't smoke is a victory. Let's celebrate your progress.",
          "It's okay to have difficult moments. What positive activities can you engage in right now?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const coachMessage = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'coach' as const,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, coachMessage]);
      }, 1000);
      
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Virtual Coach</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                Your Quit Coach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[500px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'coach' ? (
                            <Bot className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          ) : (
                            <User className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p>{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <div className="flex gap-2">
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1"
                    rows={2}
                  />
                  <Button 
                    onClick={sendMessage}
                    className="self-end h-12"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start h-auto py-3"
                  variant="outline"
                  onClick={() => {
                    const message = "I'm having a strong craving right now. What should I do?";
                    setInputText(message);
                  }}
                >
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  <div className="text-left">
                    <div className="font-medium">Craving Support</div>
                    <div className="text-xs text-muted-foreground">Get help during cravings</div>
                  </div>
                </Button>
                
                <Button 
                  className="w-full justify-start h-auto py-3"
                  variant="outline"
                  onClick={() => {
                    const message = "How can I stay motivated to quit smoking?";
                    setInputText(message);
                  }}
                >
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  <div className="text-left">
                    <div className="font-medium">Motivation Boost</div>
                    <div className="text-xs text-muted-foreground">Get encouragement</div>
                  </div>
                </Button>
                
                <Button 
                  className="w-full justify-start h-auto py-3"
                  variant="outline"
                  onClick={() => {
                    const message = "I'm feeling stressed and want to smoke. What can I do instead?";
                    setInputText(message);
                  }}
                >
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  <div className="text-left">
                    <div className="font-medium">Stress Relief</div>
                    <div className="text-xs text-muted-foreground">Find alternatives to smoking</div>
                  </div>
                </Button>
                
                <div className="pt-4">
                  <Label className="text-sm font-medium mb-2 block">
                    Your Name
                  </Label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Coach Tips */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Coach's Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Be Honest</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your true feelings for the most helpful advice
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Ask Specific Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    The more specific you are, the better I can help
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Regular Check-ins</h3>
                  <p className="text-sm text-muted-foreground">
                    Come back often to track your progress and get support
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualCoach;