"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Zap, TrendingUp, AlertTriangle } from "lucide-react";

const CravingPredictor = () => {
  const [riskLevel, setRiskLevel] = useState(0);
  const [highRiskTimes, setHighRiskTimes] = useState<string[]>([]);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [prediction, setPrediction] = useState("");
  const [nextHighRisk, setNextHighRisk] = useState("");

  useEffect(() => {
    // Simulate AI prediction based on user data
    // In a real app, this would connect to an AI service
    const simulatedRisk = Math.floor(Math.random() * 40) + 30; // 30-70%
    setRiskLevel(simulatedRisk);
    
    setHighRiskTimes(["3:00 PM", "8:00 PM", "11:00 PM"]);
    setTriggers(["Stress", "Social situations", "After meals"]);
    
    if (simulatedRisk > 60) {
      setPrediction("High risk of cravings in the next 2 hours");
    } else if (simulatedRisk > 40) {
      setPrediction("Moderate risk of cravings today");
    } else {
      setPrediction("Low risk of cravings today");
    }
    
    const now = new Date();
    const nextRiskHour = now.getHours() + 2;
    setNextHighRisk(`${nextRiskHour % 24}:00`);
  }, []);

  const getRiskColor = (level: number) => {
    if (level > 60) return "bg-red-500";
    if (level > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getRiskText = (level: number) => {
    if (level > 60) return "High";
    if (level > 40) return "Moderate";
    return "Low";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Craving Predictor</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Prediction Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                AI Craving Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  <h2 className="text-2xl font-bold mb-2">Today's Risk Level</h2>
                  <div className="text-5xl font-bold mb-2">{riskLevel}%</div>
                  <Badge className={`${getRiskColor(riskLevel)} text-white px-4 py-1 text-lg`}>
                    {getRiskText(riskLevel)} Risk
                  </Badge>
                  <p className="mt-4 text-lg">{prediction}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Risk Progression
                  </h3>
                  <Progress value={riskLevel} className="h-4" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Next High Risk Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Next High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <Clock className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{nextHighRisk}</div>
                <p className="text-muted-foreground mt-2">Prepare coping strategies</p>
              </div>
            </CardContent>
          </Card>
          
          {/* High Risk Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                High Risk Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {highRiskTimes.map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="font-medium">{time}</span>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Identified Triggers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Your Triggers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {triggers.map((trigger, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                    {trigger}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Coping Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Coping Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  5-Minute Breathing Exercise
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Drink Water
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Take a Walk
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Call a Supportive Friend
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Morning Routine</h3>
                <p className="text-sm text-muted-foreground">
                  Start your day with 10 minutes of meditation to reduce stress levels
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Afternoon Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Replace your 3 PM craving with a healthy snack and short walk
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Evening Support</h3>
                <p className="text-sm text-muted-foreground">
                  Join the community chat at 8 PM for group support during high-risk time
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Stress Management</h3>
                <p className="text-sm text-muted-foreground">
                  Practice deep breathing exercises when you feel stressed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CravingPredictor;