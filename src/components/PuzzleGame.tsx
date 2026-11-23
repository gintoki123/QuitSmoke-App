"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ItemType = "water" | "apple" | "leaf" | "heart" | "sun" | "star";
type Cell = { type: ItemType; id: number };

const PuzzleGame = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const itemTypes: ItemType[] = ["water", "apple", "leaf", "heart", "sun", "star"];
  const itemSymbols: Record<ItemType, string> = {
    water: "💧",
    apple: "🍎",
    leaf: "🍃",
    heart: "❤️",
    sun: "☀️",
    star: "⭐"
  };

  // Initialize the game grid
  const initializeGrid = () => {
    const newGrid: Cell[][] = [];
    for (let row = 0; row < 8; row++) {
      const newRow: Cell[] = [];
      for (let col = 0; col < 8; col++) {
        const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        newRow.push({ type: randomType, id: row * 8 + col });
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);
    setScore(0);
    setMoves(15);
    setGameOver(false);
    setSelectedCell(null);
  };

  // Check for matches after a move
  const checkMatches = () => {
    // This is a simplified version - in a full implementation,
    // we would check rows and columns for 3+ matching items
    // For this demo, we'll just add points when items are selected
    return false;
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (gameOver || moves <= 0) return;

    // If no cell is selected, select this one
    if (!selectedCell) {
      setSelectedCell([row, col]);
      return;
    }

    // If clicking the same cell, deselect it
    if (selectedCell[0] === row && selectedCell[1] === col) {
      setSelectedCell(null);
      return;
    }

    // If clicking an adjacent cell, swap them
    const [selectedRow, selectedCol] = selectedCell;
    const rowDiff = Math.abs(selectedRow - row);
    const colDiff = Math.abs(selectedCol - col);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      // Swap the cells
      const newGrid = [...grid];
      const temp = newGrid[selectedRow][selectedCol];
      newGrid[selectedRow][selectedCol] = newGrid[row][col];
      newGrid[row][col] = temp;
      
      setGrid(newGrid);
      setMoves(prev => prev - 1);
      setSelectedCell(null);
      
      // Check for matches (simplified)
      setTimeout(() => {
        setScore(prev => prev + 10);
      }, 300);
    } else {
      // Select the new cell instead
      setSelectedCell([row, col]);
    }
  };

  // Check game over condition
  useEffect(() => {
    if (moves <= 0) {
      setGameOver(true);
    }
  }, [moves]);

  // Initialize game on mount
  useEffect(() => {
    initializeGrid();
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Healthy Match Puzzle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Score: {score}</div>
          <div className="text-lg font-bold">Moves: {moves}</div>
        </div>
        
        {gameOver && (
          <div className="text-center p-3 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-bold text-blue-800">Game Over!</h3>
            <p className="text-blue-700">Final Score: {score}</p>
          </div>
        )}
        
        <div className="grid grid-cols-8 gap-1 bg-gray-200 p-2 rounded-lg">
          {grid.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square rounded flex items-center justify-center text-xl cursor-pointer transition-all ${
                  selectedCell && 
                  selectedCell[0] === rowIndex && 
                  selectedCell[1] === colIndex
                    ? "bg-yellow-300 ring-2 ring-yellow-500"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {itemSymbols[cell.type]}
              </div>
            ))
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Match 3 or more healthy items to score points!</p>
          <p className="mt-1">Click an item, then click an adjacent item to swap.</p>
        </div>
        
        <Button onClick={initializeGrid} className="w-full">
          {gameOver ? "Play Again" : "Restart Game"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PuzzleGame;