"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, Calendar, Target } from "lucide-react";

const HabitsTracker = () => {
  const [habits, setHabits] = useState<{id: string, name: string, completed: boolean}[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [streak, setStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    
    // Calculate streak and progress
    calculateStats();
  }, []);

  useEffect(() => {
    // Save habits to localStorage
    localStorage.setItem("habits", JSON.stringify(habits));
    
    // Recalculate stats when habits change
    calculateStats();
  }, [habits]);

  const calculateStats = () => {
    // In a real app, you would calculate streak based on consecutive days
    // For now, we'll simulate it
    const completedHabits = habits.filter(habit => habit.completed).length;
    setStreak(Math.min(365, completedHabits * 2)); // Simulated streak
    
    // Calculate weekly progress (percentage of habits completed this week)
    const totalHabits = habits.length;
    const completedThisWeek = habits.filter(habit => habit.completed).length;
    const progress = totalHabits > 0 ? Math.round((completedThisWeek / totalHabits) * 100) : 0;
    setWeeklyProgress(progress);
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const newHabitObj = {
        id: Date.now().toString(),
        name: newHabit.trim(),
        completed: false
      };
      
      setHabits([...habits, newHabitObj]);
      setNewHabit("");
    }
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Habits Tracker</h1>
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
                <Target className="h-5 w-5 text-blue-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {streak}
                </div>
                <p className="text-muted-foreground">days in a row</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {weeklyProgress}%
                </div>
                <p className="text-muted-foreground">of habits completed</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Active Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {habits.length}
                </div>
                <p className="text-muted-foreground">habits tracked</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Add New Habit */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-500" />
                Add New Habit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="e.g., Drink 8 glasses of water, Take a 10-minute walk..."
                  onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                />
                <Button onClick={addHabit}>
                  Add Habit
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Habits List */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Your Daily Habits</CardTitle>
            </CardHeader>
            <CardContent>
              {habits.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No habits added yet</p>
                  <p className="text-sm">Add your first habit above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {habits.map((habit) => (
                    <div 
                      key={habit.id} 
                      className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={habit.id}
                          checked={habit.completed}
                          onCheckedChange={() => toggleHabit(habit.id)}
                        />
                        <Label 
                          htmlFor={habit.id}
                          className={habit.completed ? "line-through text-muted-foreground" : ""}
                        >
                          {habit.name}
                        </Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteHabit(habit.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Habit Tips */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Building Healthy Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Start Small</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus on one habit at a time to avoid overwhelm
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Be Consistent</h3>
                  <p className="text-sm text-muted-foreground">
                    Try to perform your habits at the same time each day
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Use this tracker to monitor your consistency
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Celebrate Wins</h3>
                  <p className="text-sm text-muted-foreground">
                    Acknowledge your progress to stay motivated
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

export default HabitsTracker;