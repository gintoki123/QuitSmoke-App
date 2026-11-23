"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BreathingExercise = () => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const phaseDurations = {
    inhale: 4000,
    hold: 4000,
    exhale: 6000,
    rest: 2000
  };

  const startExercise = () => {
    setIsActive(true);
    setPhase("inhale");
    setProgress(0);
    
    // Overall timer (5 minutes)
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Phase timer
    const runPhase = (currentPhase: typeof phase) => {
      setProgress(0);
      const duration = phaseDurations[currentPhase];
      
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
      phaseIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Move to next phase
            const phases: typeof phase[] = ["inhale", "hold", "exhale", "rest"];
            const currentIndex = phases.indexOf(currentPhase);
            const nextPhase = phases[(currentIndex + 1) % phases.length];
            setPhase(nextPhase);
            runPhase(nextPhase);
            return 0;
          }
          return prev + (100 / (duration / 100));
        });
      }, 100);
    };
    
    runPhase("inhale");
  };

  const stopExercise = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case "inhale": return "Breathe in slowly...";
      case "hold": return "Hold your breath...";
      case "exhale": return "Breathe out slowly...";
      case "rest": return "Rest...";
      default: return "";
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale": return "bg-blue-500";
      case "hold": return "bg-yellow-500";
      case "exhale": return "bg-green-500";
      case "rest": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Breathing Exercise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
          <p className="text-muted-foreground">5-minute breathing exercise</p>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <div 
              className={`absolute inset-0 rounded-full ${getPhaseColor()} opacity-20`}
            ></div>
            <div 
              className={`absolute inset-4 rounded-full ${getPhaseColor()} flex items-center justify-center transition-all duration-300`}
              style={{ 
                transform: `scale(${
                  phase === "inhale" ? 0.6 + (progress / 100) * 0.4 : 
                  phase === "hold" ? 1 : 
                  phase === "exhale" ? 1 - (progress / 100) * 0.4 : 
                  0.6
                })` 
              }}
            >
              <span className="text-white text-xl font-bold text-center px-4">
                {getPhaseInstruction()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Inhale</span>
            <span>Hold</span>
            <span>Exhale</span>
            <span>Rest</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex gap-3">
          {!isActive ? (
            <Button onClick={startExercise} className="w-full">
              Start Breathing Exercise
            </Button>
          ) : (
            <Button onClick={stopExercise} variant="destructive" className="w-full">
              Stop Exercise
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;