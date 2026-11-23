"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StressBall = () => {
  const [squeezed, setSqueezed] = useState(false);
  const [squeezeCount, setSqueezeCount] = useState(0);
  const [pressure, setPressure] = useState(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    setSqueezed(true);
    setPressure(100);
    
    // For long press effect
    longPressTimer.current = setTimeout(() => {
      setPressure(150);
    }, 500);
  };

  const handleMouseUp = () => {
    setSqueezed(false);
    setSqueezeCount(prev => prev + 1);
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    
    // Reset pressure after a delay
    setTimeout(() => {
      setPressure(0);
    }, 200);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseDown();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseUp();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Stress Ball Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold">Squeezes: {squeezeCount}</div>
          <p className="text-muted-foreground">Release stress with each squeeze</p>
        </div>
        
        <div className="flex justify-center">
          <div 
            className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-200 ${
              squeezed 
                ? "bg-red-500 scale-90" 
                : pressure > 100 
                  ? "bg-red-600 scale-85" 
                  : "bg-red-400"
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-4 rounded-full bg-red-300 flex items-center justify-center">
              <div className="text-white text-xl font-bold text-center px-4">
                {squeezed || pressure > 100 ? "SQUEEZE!" : "TAP & HOLD"}
              </div>
            </div>
            
            {/* Pressure effect */}
            {pressure > 0 && (
              <div 
                className="absolute inset-0 rounded-full bg-white opacity-20"
                style={{ 
                  transform: `scale(${1 + (pressure / 1000)})`,
                  opacity: pressure / 200
                }}
              ></div>
            )}
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Press and hold to simulate a long squeeze</p>
          <p className="mt-1">Release to complete the squeeze</p>
        </div>
        
        <Button 
          onClick={() => {
            setSqueezeCount(0);
            setPressure(0);
            setSqueezed(false);
          }}
          variant="outline"
          className="w-full"
        >
          Reset Counter
        </Button>
      </CardContent>
    </Card>
  );
};

export default StressBall;