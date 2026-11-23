"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Plus, AlertTriangle, TrendingUp } from "lucide-react";

const TriggerIdentifier = () => {
  const [triggers, setTriggers] = useState<{id: string, name: string, frequency: number}[]>([]);
  const [newTrigger, setNewTrigger] = useState("");
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    // Load triggers from localStorage
    const savedTriggers = localStorage.getItem("triggers");
    if (savedTriggers) {
      setTriggers(JSON.parse(savedTriggers));
    }
    
    // Load selected triggers
    const savedSelected = localStorage.getItem("selectedTriggers");
    if (savedSelected) {
      setSelectedTriggers(JSON.parse(savedSelected));
    }
  }, []);

  useEffect(() => {
    // Save triggers to localStorage
    localStorage.setItem("triggers", JSON.stringify(triggers));
  }, [triggers]);

  useEffect(() => {
    // Save selected triggers to localStorage
    localStorage.setItem("selectedTriggers", JSON.stringify(selectedTriggers));
    
    // Generate analysis when selected triggers change
    generateAnalysis();
  }, [selectedTriggers]);

  const addTrigger = () => {
    if (newTrigger.trim()) {
      const existingTrigger = triggers.find(t => t.name.toLowerCase() === newTrigger.trim().toLowerCase());
      
      if (existingTrigger) {
        // Increase frequency if trigger already exists
        setTriggers(triggers.map(t => 
          t.id === existingTrigger.id ? { ...t, frequency: t.frequency + 1 } : t
        ));
      } else {
        // Add new trigger
        const newTriggerObj = {
          id: Date.now().toString(),
          name: newTrigger.trim(),
          frequency: 1
        };
        setTriggers([...triggers, newTriggerObj]);
      }
      
      setNewTrigger("");
    }
  };

  const removeTrigger = (id: string) => {
    setTriggers(triggers.filter(trigger => trigger.id !== id));
    setSelectedTriggers(selectedTriggers.filter(triggerId => triggerId !== id));
  };

  const toggleTriggerSelection = (id: string) => {
    if (selectedTriggers.includes(id)) {
      setSelectedTriggers(selectedTriggers.filter(triggerId => triggerId !== id));
    } else {
      setSelectedTriggers([...selectedTriggers, id]);
    }
  };

  const generateAnalysis = () => {
    if (selectedTriggers.length === 0) {
      setAnalysis("Select your most common triggers to see personalized recommendations.");
      return;
    }
    
    const selectedTriggerNames = triggers
      .filter(t => selectedTriggers.includes(t.id))
      .map(t => t.name);
    
    setAnalysis(`Based on your selected triggers (${selectedTriggerNames.join(", ")}), here are some strategies:
    
1. Create specific plans for each trigger situation
2. Replace smoking with healthier alternatives
3. Practice mindfulness when triggers arise
4. Reach out to your support system during high-risk times
5. Modify your environment to reduce exposure to triggers`);
  };

  const getTriggerFrequencyColor = (frequency: number) => {
    if (frequency >= 5) return "bg-red-500";
    if (frequency >= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Trigger Identifier</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Triggers */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-500" />
                Identify Your Triggers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    What situations, emotions, or activities make you want to smoke?
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                      placeholder="e.g., Stress, Social situations, After meals..."
                      onKeyDown={(e) => e.key === 'Enter' && addTrigger()}
                    />
                    <Button onClick={addTrigger}>
                      Add Trigger
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Your Triggers
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {triggers.map((trigger) => (
                      <Badge 
                        key={trigger.id} 
                        className={`${selectedTriggers.includes(trigger.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"} cursor-pointer py-2 px-3 relative`}
                        onClick={() => toggleTriggerSelection(trigger.id)}
                      >
                        {trigger.name}
                        <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs ${getTriggerFrequencyColor(trigger.frequency)} text-white`}>
                          {trigger.frequency}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTrigger(trigger.id);
                          }}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Analysis */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Personalized Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Your Selected Triggers</h3>
                  <div className="flex flex-wrap gap-2">
                    {triggers
                      .filter(t => selectedTriggers.includes(t.id))
                      .map((trigger) => (
                        <Badge 
                          key={trigger.id} 
                          className="bg-blue-500 text-white py-1 px-2"
                        >
                          {trigger.name}
                        </Badge>
                      ))}
                    {selectedTriggers.length === 0 && (
                      <p className="text-sm text-muted-foreground">No triggers selected</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    {analysis}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Trigger Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Be Honest</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify all triggers, even uncomfortable ones
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Track Patterns</h3>
                  <p className="text-sm text-muted-foreground">
                    Note when triggers occur to identify patterns
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Plan Ahead</h3>
                  <p className="text-sm text-muted-foreground">
                    Create specific plans for dealing with each trigger
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Modify Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Change your environment to reduce trigger exposure
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Common Triggers */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Common Smoking Triggers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Stress", "Social situations", "After meals", "Drinking alcohol",
                  "Boredom", "Driving", "Work breaks", "Arguments",
                  "Coffee", "Watching TV", "Feeling lonely", "Celebrations"
                ].map((trigger, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-3 flex flex-col items-center justify-center text-center"
                    onClick={() => {
                      const existing = triggers.find(t => t.name === trigger);
                      if (existing) {
                        toggleTriggerSelection(existing.id);
                      } else {
                        setNewTrigger(trigger);
                      }
                    }}
                  >
                    {trigger}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TriggerIdentifier;