"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GameState = "waiting" | "ready" | "go" | "clicked" | "result";

const ReactionGame = () => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Press Start to begin");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);
    setMessage("Get ready...");
    
    // Random delay before showing "GO!"
    const delay = 2000 + Math.random() * 3000;
    
    timerRef.current = setTimeout(() => {
      setGameState("go");
      setMessage("GO! Click now!");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "waiting" || gameState === "ready") {
      // Too early
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState("result");
      setMessage("Too early! Try again.");
      return;
    }
    
    if (gameState === "go") {
      // Successful click
      const endTime = Date.now();
      if (startTimeRef.current) {
        const time = endTime - startTimeRef.current;
        setReactionTime(time);
        setAttempts(prev => prev + 1);
        
        if (bestTime === null || time < bestTime) {
          setBestTime(time);
        }
      }
      
      setGameState("clicked");
      setMessage("Great! Press Next Round to continue.");
    }
  };

  const nextRound = () => {
    setGameState("waiting");
    setReactionTime(null);
    setMessage("Get ready...");
    
    // Random delay before showing "GO!"
    const delay = 2000 + Math.random() * 3000;
    
    timerRef.current = setTimeout(() => {
      setGameState("go");
      setMessage("GO! Click now!");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const resetGame = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGameState("waiting");
    setReactionTime(null);
    setBestTime(null);
    setAttempts(0);
    setMessage("Press Start to begin");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reaction Speed Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{message}</div>
          {reactionTime && (
            <div className="text-lg">
              Reaction Time: <span className="font-bold">{reactionTime}ms</span>
            </div>
          )}
          {bestTime && (
            <div className="text-lg">
              Best Time: <span className="font-bold">{bestTime}ms</span>
            </div>
          )}
          <div className="text-muted-foreground">
            Rounds: {attempts}
          </div>
        </div>
        
        <div 
          className={`w-full h-48 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            gameState === "waiting" ? "bg-yellow-100" : 
            gameState === "go" ? "bg-green-500 animate-pulse" : 
            "bg-gray-100"
          }`}
          onClick={handleClick}
        >
          <div className="text-2xl font-bold text-center px-4">
            {gameState === "waiting" && "WAIT FOR GREEN"}
            {gameState === "go" && "CLICK NOW!"}
            {gameState === "clicked" && "WELL DONE!"}
            {gameState === "result" && "TOO EARLY!"}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {(gameState === "waiting" || gameState === "result") && (
            <Button onClick={startGame} className="col-span-2">
              Start Game
            </Button>
          )}
          
          {gameState === "clicked" && (
            <Button onClick={nextRound} className="col-span-2">
              Next Round
            </Button>
          )}
          
          <Button 
            onClick={resetGame} 
            variant="outline"
            className={gameState === "clicked" ? "col-span-2" : ""}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReactionGame;