"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Cigarette {
  id: number;
  x: number;
  y: number;
  speed: number;
}

const CigaretteTapGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [cigarettes, setCigarettes] = useState<Cigarette[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cigaretteIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setCigarettes([]);
    
    // Game timer
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cigarette spawner
    if (cigaretteIntervalRef.current) clearInterval(cigaretteIntervalRef.current);
    cigaretteIntervalRef.current = setInterval(() => {
      if (gameAreaRef.current) {
        const gameArea = gameAreaRef.current;
        const newCigarette: Cigarette = {
          id: Date.now(),
          x: Math.random() * (gameArea.clientWidth - 50),
          y: -50,
          speed: 2 + Math.random() * 3
        };
        setCigarettes(prev => [...prev, newCigarette]);
      }
    }, 800);
  };

  const endGame = () => {
    setGameActive(false);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    if (cigaretteIntervalRef.current) clearInterval(cigaretteIntervalRef.current);
  };

  const tapCigarette = (id: number) => {
    setScore(prev => prev + 1);
    setCigarettes(prev => prev.filter(cig => cig.id !== id));
  };

  // Move cigarettes down
  useEffect(() => {
    if (!gameActive) return;
    
    const moveCigarettes = () => {
      setCigarettes(prev => 
        prev
          .map(cig => ({ ...cig, y: cig.y + cig.speed }))
          .filter(cig => cig.y < (gameAreaRef.current?.clientHeight || 600))
      );
    };
    
    const moveInterval = setInterval(moveCigarettes, 50);
    return () => clearInterval(moveInterval);
  }, [gameActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      if (cigaretteIntervalRef.current) clearInterval(cigaretteIntervalRef.current);
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tap the Cigarettes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Score: {score}</div>
          <div className="text-lg font-bold">Time: {timeLeft}s</div>
        </div>
        
        <div 
          ref={gameAreaRef}
          className="relative w-full h-96 bg-gradient-to-b from-sky-100 to-sky-200 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
        >
          {cigarettes.map(cigarette => (
            <div
              key={cigarette.id}
              className="absolute cursor-pointer transform transition-transform hover:scale-110"
              style={{
                left: `${cigarette.x}px`,
                top: `${cigarette.y}px`,
              }}
              onClick={() => tapCigarette(cigarette.id)}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-24 bg-gradient-to-b from-yellow-700 to-yellow-800 rounded-t-lg relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-800 rounded"></div>
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-800 rounded"></div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gray-800 rounded"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-gray-900 rounded"></div>
                </div>
                <div className="w-2 h-4 bg-gray-700"></div>
              </div>
            </div>
          ))}
          
          {!gameActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-center p-4">
                <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                <p className="text-xl mb-4">Final Score: {score}</p>
                <Button onClick={startGame} className="text-lg px-6 py-3">
                  {timeLeft === 60 ? "Start Game" : "Play Again"}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          {!gameActive ? (
            <Button onClick={startGame} className="w-full">
              {timeLeft === 60 ? "Start Game" : "Play Again"}
            </Button>
          ) : (
            <Button onClick={endGame} variant="destructive" className="w-full">
              End Game
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CigaretteTapGame;