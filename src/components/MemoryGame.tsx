"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardItem {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const symbols = ["🍎", "🍊", "🍇", "🍓", "🫐", "🥝", "🥑", "🥦"];

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...symbols, ...symbols];
    const shuffled = [...cardPairs]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameCompleted(false);
    setTimer(0);
    setIsTimerRunning(true);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Check for game completion
  useEffect(() => {
    if (matches === symbols.length && matches > 0) {
      setIsTimerRunning(false);
      setGameCompleted(true);
    }
  }, [matches, symbols.length]);

  // Handle card flip
  const flipCard = (id: number) => {
    // Don't flip if:
    // - Card is already flipped
    // - Card is already matched
    // - Two cards are already flipped
    // - Game is completed
    if (
      flippedCards.length >= 2 || 
      cards.find(card => card.id === id)?.isFlipped ||
      cards.find(card => card.id === id)?.isMatched ||
      gameCompleted
    ) {
      return;
    }

    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    
    setCards(updatedCards);
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlipped;
      const firstCard = updatedCards.find(card => card.id === firstId);
      const secondCard = updatedCards.find(card => card.id === secondId);
      
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              card.id === firstId || card.id === secondId 
                ? { ...card, isMatched: true } 
                : card
            )
          );
          setFlippedCards([]);
          setMatches(prev => prev + 1);
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              newFlipped.includes(card.id) && !card.isMatched
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Memory Match Game</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Moves: {moves}</div>
          <div className="text-lg font-bold">Time: {formatTime(timer)}</div>
          <div className="text-lg font-bold">Matches: {matches}/{symbols.length}</div>
        </div>
        
        {gameCompleted && (
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Congratulations!</h3>
            <p className="text-green-700">
              You completed the game in {moves} moves and {formatTime(timer)}!
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-3">
          {cards.map(card => (
            <div
              key={card.id}
              className={`aspect-square rounded-lg flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? "bg-white border-2 border-blue-300"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => flipCard(card.id)}
            >
              {card.isFlipped || card.isMatched ? card.value : "?"}
            </div>
          ))}
        </div>
        
        <Button onClick={initializeGame} className="w-full">
          {gameCompleted ? "Play Again" : "Restart Game"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemoryGame;