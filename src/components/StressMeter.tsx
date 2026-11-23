"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, TrendingUp, Calendar, Plus, Minus } from "lucide-react";

const StressMeter = () => {
  const [stressLevel, setStressLevel] = useState(50);
  const [history, setHistory] = useState<{date: string, level: number}[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Load data from localStorage
    const savedHistory = localStorage.getItem("stressHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem("stressHistory", JSON.stringify(history));
  }, [history]);

  const updateStressLevel = (newLevel: number) => {
    const clampedLevel = Math.max(0, Math.min(100, newLevel));
    setStressLevel(clampedLevel);
    
    // Save to history
    const today = new Date().toISOString().split('T')[0];
    const existingEntryIndex = history.findIndex(entry => entry.date === today);
    
    if (existingEntryIndex >= 0) {
      const updatedHistory = [...history];
      updatedHistory[existingEntryIndex] = { ...updatedHistory[existingEntryIndex], level: clampedLevel };
      setHistory(updatedHistory);
    } else {
      setHistory([...history, { date: today, level: clampedLevel }]);
    }
  };

  const getStressColor = (level: number) => {
    if (level > 70) return "bg-red-500";
    if (level > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStressText = (level: number) => {
    if (level > 70) return "High";
    if (level > 40) return "Moderate";
    return "Low";
  };

  const saveEntry = () => {
    if (notes.trim()) {
      // In a real app, you would save this to a database
      alert("Entry saved! In a full implementation, this would be saved to your journal.");
      setNotes("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Stress Meter</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stress Meter */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-500" />
                Current Stress Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl font-bold mb-4">
                  <span className={stressLevel > 70 ? "text-red-500" : stressLevel > 40 ? "text-yellow-500" : "text-green-500"}>
                    {stressLevel}%
                  </span>
                </div>
                <p className="text-xl mb-2">Stress Level</p>
                <Badge className={`${getStressColor(stressLevel)} text-white px-4 py-1 text-lg mb-6`}>
                  {getStressText(stressLevel)} Stress
                </Badge>
                
                <div className="max-w-md mx-auto">
                  <Progress value={stressLevel} className="h-4 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => updateStressLevel(stressLevel - 10)}
                    disabled={stressLevel <= 0}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => updateStressLevel(stressLevel + 10)}
                    disabled={stressLevel >= 100}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stress Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Stress Management Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Deep Breathing</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice 4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Physical Activity</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a 10-minute walk to reduce stress hormones
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Mindfulness</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus on the present moment without judgment
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Social Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Talk to a friend or family member about your stress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Journal */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Quick Journal Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    What's contributing to your stress today?
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                    placeholder="Write about what's causing your stress..."
                  />
                </div>
                <Button onClick={saveEntry} className="w-full">
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Stress History */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Stress Level History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - date.getDay() + index);
                  const dateString = date.toISOString().split('T')[0];
                  const entry = history.find(e => e.date === dateString);
                  
                  return (
                    <div key={day} className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">{day}</div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-sm font-medium ${
                        entry 
                          ? entry.level > 70 
                            ? "bg-red-500 text-white" 
                            : entry.level > 40 
                              ? "bg-yellow-500 text-white" 
                              : "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                      }`}>
                        {entry ? entry.level : "-"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StressMeter;