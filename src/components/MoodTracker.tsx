"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Smile, Frown, Meh, Heart } from "lucide-react";

const MoodTracker = () => {
  const [mood, setMood] = useState<"happy" | "sad" | "neutral" | "anxious" | "excited" | null>(null);
  const [notes, setNotes] = useState("");
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const moodOptions = [
    { id: "happy", label: "Happy", icon: Smile, color: "text-yellow-500" },
    { id: "sad", label: "Sad", icon: Frown, color: "text-blue-500" },
    { id: "neutral", label: "Neutral", icon: Meh, color: "text-gray-500" },
    { id: "anxious", label: "Anxious", icon: Frown, color: "text-red-500" },
    { id: "excited", label: "Excited", icon: Heart, color: "text-pink-500" },
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem("moodHistory");
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveMood = () => {
    if (!mood) return;
    
    const newEntry = {
      id: Date.now(),
      mood,
      notes,
      date: new Date().toISOString(),
    };
    
    const updatedHistory = [newEntry, ...moodHistory].slice(0, 20); // Keep last 20 entries
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
    
    setMood(null);
    setNotes("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMoodIcon = (mood: string) => {
    const moodOption = moodOptions.find(option => option.id === mood);
    if (moodOption) {
      const Icon = moodOption.icon;
      return <Icon className={`w-5 h-5 ${moodOption.color}`} />;
    }
    return null;
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Daily Mood Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground">
            How are you feeling right now?
          </p>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant={mood === option.id ? "default" : "outline"}
                className="flex flex-col h-20 gap-1"
                onClick={() => setMood(option.id as any)}
              >
                <Icon className={`w-6 h-6 ${option.color}`} />
                <span className="text-xs">{option.label}</span>
              </Button>
            );
          })}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (optional)</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's contributing to your mood today?"
            rows={3}
          />
        </div>
        
        <Button onClick={saveMood} className="w-full" disabled={!mood}>
          Save Mood
        </Button>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Recent Entries</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? "Hide" : "Show"}
          </Button>
        </div>
        
        {showHistory && (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {moodHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No mood entries yet. Start tracking your daily feelings!
              </p>
            ) : (
              moodHistory.map((entry) => (
                <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getMoodIcon(entry.mood)}
                      <span className="font-medium capitalize">{entry.mood}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm mt-2 text-muted-foreground">
                      {entry.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;