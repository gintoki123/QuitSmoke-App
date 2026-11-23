"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, BookOpen, CheckCircle, Download } from "lucide-react";

const QuitPlanGenerator = () => {
  const [step, setStep] = useState(1);
  const [quitDate, setQuitDate] = useState("");
  const [motivations, setMotivations] = useState<string[]>([]);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [copingStrategies, setCopingStrategies] = useState<string[]>([]);
  const [supportSystem, setSupportSystem] = useState<string[]>([]);
  const [newMotivation, setNewMotivation] = useState("");
  const [newTrigger, setNewTrigger] = useState("");
  const [newStrategy, setNewStrategy] = useState("");
  const [newSupport, setNewSupport] = useState("");

  const addMotivation = () => {
    if (newMotivation.trim()) {
      setMotivations([...motivations, newMotivation.trim()]);
      setNewMotivation("");
    }
  };

  const removeMotivation = (index: number) => {
    setMotivations(motivations.filter((_, i) => i !== index));
  };

  const addTrigger = () => {
    if (newTrigger.trim()) {
      setTriggers([...triggers, newTrigger.trim()]);
      setNewTrigger("");
    }
  };

  const removeTrigger = (index: number) => {
    setTriggers(triggers.filter((_, i) => i !== index));
  };

  const addStrategy = () => {
    if (newStrategy.trim()) {
      setCopingStrategies([...copingStrategies, newStrategy.trim()]);
      setNewStrategy("");
    }
  };

  const removeStrategy = (index: number) => {
    setCopingStrategies(copingStrategies.filter((_, i) => i !== index));
  };

  const addSupport = () => {
    if (newSupport.trim()) {
      setSupportSystem([...supportSystem, newSupport.trim()]);
      setNewSupport("");
    }
  };

  const removeSupport = (index: number) => {
    setSupportSystem(supportSystem.filter((_, i) => i !== index));
  };

  const generatePlan = () => {
    // In a real app, this would generate a PDF or save to localStorage
    alert("Your personalized quit plan has been generated! In a full implementation, this would be downloadable as a PDF.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Quit Plan Generator</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Create Your Personalized Quit Plan</CardTitle>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <div 
                    key={num} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === num 
                        ? "bg-green-500 text-white" 
                        : step > num 
                          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200" 
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Set Your Quit Date</Label>
                  <p className="text-muted-foreground mb-4">
                    Choose a date that gives you enough time to prepare but isn't too far in the future.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        type="date"
                        value={quitDate}
                        onChange={(e) => setQuitDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button onClick={() => setStep(2)} disabled={!quitDate}>
                      Next
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Quit Date Tips
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• Choose a date within 2 weeks for best results</li>
                    <li>• Avoid highly stressful periods</li>
                    <li>• Pick a date that's meaningful to you</li>
                    <li>• Make sure you can commit to this date</li>
                  </ul>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Your Motivations</Label>
                  <p className="text-muted-foreground mb-4">
                    What are your main reasons for quitting? These will help keep you motivated.
                  </p>
                  
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newMotivation}
                      onChange={(e) => setNewMotivation(e.target.value)}
                      placeholder="e.g., Health, Family, Money..."
                      onKeyDown={(e) => e.key === 'Enter' && addMotivation()}
                    />
                    <Button onClick={addMotivation}>Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {motivations.map((motivation, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer py-2 px-3"
                        onClick={() => removeMotivation(index)}
                      >
                        {motivation} ×
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={motivations.length === 0}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Identify Your Triggers</Label>
                  <p className="text-muted-foreground mb-4">
                    What situations, emotions, or activities make you want to smoke?
                  </p>
                  
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                      placeholder="e.g., Stress, Social situations, After meals..."
                      onKeyDown={(e) => e.key === 'Enter' && addTrigger()}
                    />
                    <Button onClick={addTrigger}>Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {triggers.map((trigger, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer py-2 px-3"
                        onClick={() => removeTrigger(index)}
                      >
                        {trigger} ×
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(4)} disabled={triggers.length === 0}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Create Your Action Plan</Label>
                  <p className="text-muted-foreground mb-4">
                    Plan how you'll handle cravings and build your support system.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="font-medium mb-2 block">Coping Strategies</Label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          value={newStrategy}
                          onChange={(e) => setNewStrategy(e.target.value)}
                          placeholder="e.g., Deep breathing, Walking, Calling a friend..."
                          onKeyDown={(e) => e.key === 'Enter' && addStrategy()}
                        />
                        <Button onClick={addStrategy}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {copingStrategies.map((strategy, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="cursor-pointer py-2 px-3"
                            onClick={() => removeStrategy(index)}
                          >
                            {strategy} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-medium mb-2 block">Support System</Label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          value={newSupport}
                          onChange={(e) => setNewSupport(e.target.value)}
                          placeholder="e.g., Family member, Friend, Support group..."
                          onKeyDown={(e) => e.key === 'Enter' && addSupport()}
                        />
                        <Button onClick={addSupport}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {supportSystem.map((support, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="cursor-pointer py-2 px-3"
                            onClick={() => removeSupport(index)}
                          >
                            {support} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button onClick={generatePlan} disabled={copingStrategies.length === 0 || supportSystem.length === 0}>
                      <Download className="h-4 w-4 mr-2" />
                      Generate My Plan
                    </Button>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Your Quit Plan Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Quit Date:</p>
                      <p>{quitDate || "Not set"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Motivations:</p>
                      <p>{motivations.join(", ") || "None added"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Triggers:</p>
                      <p>{triggers.join(", ") || "None added"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Support System:</p>
                      <p>{supportSystem.join(", ") || "None added"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuitPlanGenerator;