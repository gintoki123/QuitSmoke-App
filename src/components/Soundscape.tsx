"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";

const Soundscape = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [selectedSound, setSelectedSound] = useState("rain");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const soundOptions = [
    { id: "rain", name: "Rain", icon: "🌧️" },
    { id: "ocean", name: "Ocean Waves", icon: "🌊" },
    { id: "forest", name: "Forest", icon: "🌲" },
    { id: "fire", name: "Crackling Fire", icon: "🔥" },
    { id: "night", name: "Night Sounds", icon: "🌙" },
  ];

  // In a real app, you would have actual audio files
  // For this demo, we'll simulate audio with a silent audio element
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control actual audio here
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-500" />
          Relaxing Soundscape
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground">
            Listen to calming sounds to reduce stress and cravings
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {soundOptions.map((sound) => (
            <Button
              key={sound.id}
              variant={selectedSound === sound.id ? "default" : "outline"}
              className="h-20 flex flex-col gap-2"
              onClick={() => setSelectedSound(sound.id)}
            >
              <span className="text-2xl">{sound.icon}</span>
              <span className="text-xs">{sound.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Volume</span>
            <span className="text-sm text-muted-foreground">{volume}%</span>
          </div>
          <Slider 
            value={[volume]} 
            onValueChange={(value) => setVolume(value[0])} 
            max={100} 
            step={1} 
          />
        </div>
        
        <Button onClick={togglePlay} className="w-full py-6" size="lg">
          {isPlaying ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause Soundscape
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Play {soundOptions.find(s => s.id === selectedSound)?.name}
            </>
          )}
        </Button>
        
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="font-medium mb-2">Benefits of Relaxing Sounds:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Reduces stress and anxiety</li>
            <li>• Helps manage cravings</li>
            <li>• Improves sleep quality</li>
            <li>• Promotes mindfulness</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Soundscape;