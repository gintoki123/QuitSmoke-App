"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Moon, Calendar, TrendingUp, Plus } from "lucide-react";

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState<{date: string, hours: number, quality: number}[]>([]);
  const [sleepHours, setSleepHours] = useState("");
  const [sleepQuality, setSleepQuality] = useState(5);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load sleep data from localStorage
    const savedSleepData = localStorage.getItem("sleepData");
    if (savedSleepData) {
      setSleepData(JSON.parse(savedSleepData));
    }
  }, []);

  useEffect(() => {
    // Save sleep data to localStorage
    localStorage.setItem("sleepData", JSON.stringify(sleepData));
  }, [sleepData]);

  const logSleep = () => {
    if (sleepHours && sleepQuality > 0) {
      const newSleepEntry = {
        date: selectedDate,
        hours: parseFloat(sleepHours),
        quality: sleepQuality
      };
      
      // Check if entry for this date already exists
      const existingIndex = sleepData.findIndex(entry => entry.date === selectedDate);
      
      if (existingIndex >= 0) {
        // Update existing entry
        const updatedData = [...sleepData];
        updatedData[existingIndex] = newSleepEntry;
        setSleepData(updatedData);
      } else {
        // Add new entry
        setSleepData([...sleepData, newSleepEntry]);
      }
      
      // Reset form
      setSleepHours("");
      setSleepQuality(5);
    }
  };

  const getAverageSleep = () => {
    if (sleepData.length === 0) return 0;
    const totalHours = sleepData.reduce((sum, entry) => sum + entry.hours, 0);
    return (totalHours / sleepData.length).toFixed(1);
  };

  const getAverageQuality = () => {
    if (sleepData.length === 0) return 0;
    const totalQuality = sleepData.reduce((sum, entry) => sum + entry.quality, 0);
    return Math.round(totalQuality / sleepData.length);
  };

  const getSleepForDate = (date: string) => {
    return sleepData.find(entry => entry.date === date);
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return "bg-green-500";
    if (quality >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getQualityText = (quality: number) => {
    if (quality >= 8) return "Excellent";
    if (quality >= 6) return "Good";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Sleep Tracker</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-blue-500" />
                Average Sleep
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {getAverageSleep()}h
                </div>
                <p className="text-muted-foreground">per night</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Sleep Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {getAverageQuality()}/10
                </div>
                <Badge className={`${getQualityColor(getAverageQuality())} text-white px-3 py-1`}>
                  {getQualityText(getAverageQuality())}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Nights Tracked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {sleepData.length}
                </div>
                <p className="text-muted-foreground">nights logged</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Log Sleep */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-500" />
                Log Your Sleep
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Hours Slept
                  </Label>
                  <Input
                    type="number"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    placeholder="e.g., 7.5"
                    step="0.5"
                    min="0"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Sleep Quality (1-10)
                  </Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={sleepQuality}
                      onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-8 text-center">{sleepQuality}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={logSleep} className="w-full mt-6">
                Log Sleep
              </Button>
            </CardContent>
          </Card>
          
          {/* Sleep History */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Sleep History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - date.getDay() + index);
                  const dateString = date.toISOString().split('T')[0];
                  const entry = getSleepForDate(dateString);
                  
                  return (
                    <div key={day} className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">{day}</div>
                      <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center mx-auto text-xs ${
                        entry 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                      }`}>
                        <span>{entry ? entry.hours : "-"}</span>
                        <span>{entry ? entry.quality : ""}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Sleep Tips */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Improving Your Sleep</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Consistent Schedule</h3>
                  <p className="text-sm text-muted-foreground">
                    Go to bed and wake up at the same time every day
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Create a Routine</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop a relaxing bedtime routine to signal sleep time
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Optimize Your Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep your bedroom cool, dark, and quiet for better sleep
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Limit Screen Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Avoid screens at least 1 hour before bedtime
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;