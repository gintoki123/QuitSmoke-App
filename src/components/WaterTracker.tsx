"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets, Plus, Minus } from "lucide-react";

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [history, setHistory] = useState<{date: string, glasses: number}[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedGlasses = localStorage.getItem("waterGlasses");
    const savedGoal = localStorage.getItem("waterGoal");
    const savedHistory = localStorage.getItem("waterHistory");
    
    if (savedGlasses) setGlasses(parseInt(savedGlasses));
    if (savedGoal) setGoal(parseInt(savedGoal));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem("waterGlasses", glasses.toString());
    localStorage.setItem("waterGoal", goal.toString());
    localStorage.setItem("waterHistory", JSON.stringify(history));
  }, [glasses, goal, history]);

  const addGlass = () => {
    const newGlasses = glasses + 1;
    setGlasses(newGlasses);
    
    // Update today's history
    const today = new Date().toISOString().split('T')[0];
    const existingEntryIndex = history.findIndex(entry => entry.date === today);
    
    if (existingEntryIndex >= 0) {
      const updatedHistory = [...history];
      updatedHistory[existingEntryIndex] = { ...updatedHistory[existingEntryIndex], glasses: newGlasses };
      setHistory(updatedHistory);
    } else {
      setHistory([...history, { date: today, glasses: newGlasses }]);
    }
  };

  const removeGlass = () => {
    if (glasses > 0) {
      setGlasses(glasses - 1);
      
      // Update today's history
      const today = new Date().toISOString().split('T')[0];
      const existingEntryIndex = history.findIndex(entry => entry.date === today);
      
      if (existingEntryIndex >= 0) {
        const updatedHistory = [...history];
        updatedHistory[existingEntryIndex] = { ...updatedHistory[existingEntryIndex], glasses: glasses - 1 };
        setHistory(updatedHistory);
      }
    }
  };

  const setCustomGoal = (newGoal: number) => {
    if (newGoal > 0) {
      setGoal(newGoal);
    }
  };

  const progress = Math.min(100, (glasses / goal) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Water Tracker</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tracker */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Daily Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {glasses}
                </div>
                <p className="text-xl mb-6">glasses of water</p>
                
                <div className="max-w-md mx-auto">
                  <Progress value={progress} className="h-4 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0</span>
                    <span>Goal: {goal} glasses</span>
                    <span>{goal}</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={removeGlass}
                    disabled={glasses === 0}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={addGlass}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Glass
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Goal Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Set your daily goal</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={goal}
                      onChange={(e) => setCustomGoal(parseInt(e.target.value) || 0)}
                      className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      min="1"
                    />
                    <span className="flex items-center">glasses</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[6, 8, 10].map((preset) => (
                    <Button
                      key={preset}
                      variant={goal === preset ? "default" : "outline"}
                      onClick={() => setGoal(preset)}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Benefits of Staying Hydrated</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Reduces cravings</li>
                    <li>• Improves energy levels</li>
                    <li>• Supports kidney function</li>
                    <li>• Aids in weight management</li>
                    <li>• Keeps skin healthy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Weekly History */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Weekly History</CardTitle>
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
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                        entry 
                          ? entry.glasses >= goal 
                            ? "bg-green-500 text-white" 
                            : "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                      }`}>
                        {entry ? entry.glasses : 0}
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

export default WaterTracker;