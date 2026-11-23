"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, Headphones } from "lucide-react";

const CalmingSounds = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [selectedSound, setSelectedSound] = useState("rain");
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(15);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const soundOptions = [
    { id: "rain", name: "Rain", icon: "🌧️", description: "Gentle rainfall for relaxation" },
    { id: "ocean", name: "Ocean Waves", icon: "🌊", description: "Soothing ocean sounds" },
    { id: "forest", name: "Forest", icon: "🌲", description: "Birds and nature sounds" },
    { id: "fire", name: "Crackling Fire", icon: "🔥", description: "Warm fireplace ambiance" },
    { id: "night", name: "Night Sounds", icon: "🌙", description: "Crickets and night ambiance" },
    { id: "wind", name: "Wind Chimes", icon: "🎐", description: "Gentle chimes in the breeze" }
  ];

  useEffect(() => {
    // Load settings from localStorage
    const savedVolume = localStorage.getItem("soundVolume");
    const savedSound = localStorage.getItem("selectedSound");
    
    if (savedVolume) setVolume(parseInt(savedVolume));
    if (savedSound) setSelectedSound(savedSound);
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("soundVolume", volume.toString());
    localStorage.setItem("selectedSound", selectedSound);
  }, [volume, selectedSound]);

  useEffect(() => {
    // Timer logic
    if (isTimerActive && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
      setIsPlaying(false);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer, isTimerActive]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    // In a real app, you would control actual audio here
    // For this demo, we'll just simulate with a timer
    if (!isPlaying) {
      // Start timer if set
      if (timerDuration > 0) {
        setTimer(timerDuration * 60);
        setIsTimerActive(true);
      }
    } else {
      // Pause timer
      setIsTimerActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const setTimerMinutes = (minutes: number) => {
    setTimerDuration(minutes);
    if (isPlaying) {
      setTimer(minutes * 60);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Calming Sounds</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-blue-500" />
                Relaxing Soundscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sound Selection */}
                <div>
                  <h3 className="font-medium mb-3">Select a Sound</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {soundOptions.map((sound) => (
                      <Button
                        key={sound.id}
                        variant={selectedSound === sound.id ? "default" : "outline"}
                        className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                        onClick={() => setSelectedSound(sound.id)}
                      >
                        <span className="text-2xl">{sound.icon}</span>
                        <span className="text-sm">{sound.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Player Controls */}
                <div className="text-center py-6">
                  <div className="mb-6">
                    <div className="text-2xl font-bold mb-2">
                      {soundOptions.find(s => s.id === selectedSound)?.name}
                    </div>
                    <p className="text-muted-foreground">
                      {soundOptions.find(s => s.id === selectedSound)?.description}
                    </p>
                  </div>
                  
                  {/* Visualizer */}
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <div className={`absolute inset-0 rounded-full ${
                      isPlaying ? "bg-blue-200 animate-pulse" : "bg-gray-200"
                    }`}></div>
                    <div className={`absolute inset-8 rounded-full ${
                      isPlaying ? "bg-blue-300 animate-pulse" : "bg-gray-300"
                    }`}></div>
                    <div className={`absolute inset-16 rounded-full ${
                      isPlaying ? "bg-blue-400 animate-pulse" : "bg-gray-400"
                    }`}></div>
                    <div className="absolute inset-24 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {isPlaying ? "NOW PLAYING" : "PAUSED"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  {timer > 0 && (
                    <div className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                      {formatTime(timer)}
                    </div>
                  )}
                  
                  {/* Play/Pause Button */}
                  <Button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full mx-auto"
                    size="lg"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Volume and Timer Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Volume Control */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Volume
                    </Label>
                    <span className="text-sm text-muted-foreground">{volume}%</span>
                  </div>
                  <Slider 
                    value={[volume]} 
                    onValueChange={(value) => setVolume(value[0])} 
                    max={100} 
                    step={1} 
                  />
                </div>
                
                {/* Timer Control */}
                <div>
                  <Label className="mb-3 block">Sleep Timer</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 15, 30, 45, 60, 90].map((minutes) => (
                      <Button
                        key={minutes}
                        variant={timerDuration === minutes ? "default" : "outline"}
                        onClick={() => setTimerMinutes(minutes)}
                        size="sm"
                      >
                        {minutes === 0 ? "Off" : `${minutes}m`}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Automatically stop playback after selected time
                  </p>
                </div>
                
                {/* Benefits */}
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Benefits of Relaxing Sounds:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Reduces stress and anxiety</li>
                    <li>• Helps manage cravings</li>
                    <li>• Improves sleep quality</li>
                    <li>• Promotes mindfulness</li>
                    <li>• Creates a calming environment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Sound Library */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Sound Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {soundOptions.map((sound) => (
                  <div 
                    key={sound.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedSound === sound.id 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedSound(sound.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sound.icon}</span>
                      <div>
                        <h3 className="font-medium">{sound.name}</h3>
                        <p className="text-sm text-muted-foreground">{sound.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalmingSounds;