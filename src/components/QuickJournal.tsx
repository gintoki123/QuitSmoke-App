"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, BookOpen } from "lucide-react";

const QuickJournal = () => {
  const [entries, setEntries] = useState<{id: string, date: string, content: string}[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    // Save entries to localStorage
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (newEntry.trim()) {
      const newJournalEntry = {
        id: Date.now().toString(),
        date: selectedDate,
        content: newEntry.trim()
      };
      
      setEntries([newJournalEntry, ...entries]);
      setNewEntry("");
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getEntriesForDate = () => {
    return entries.filter(entry => entry.date === selectedDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Quick Journal</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Entry */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-500" />
                New Journal Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    What's on your mind?
                  </label>
                  <Textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={6}
                    placeholder="Write about your feelings, cravings, triggers, or anything else..."
                  />
                </div>
                
                <Button onClick={addEntry} className="w-full">
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Journal Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Journaling Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Be Honest</h3>
                  <p className="text-sm text-muted-foreground">
                    Write exactly what you're feeling without judgment
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Identify Patterns</h3>
                  <p className="text-sm text-muted-foreground">
                    Look for triggers or situations that cause cravings
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Celebrate Wins</h3>
                  <p className="text-sm text-muted-foreground">
                    Acknowledge your progress and victories, no matter how small
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-1">Daily Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Try to write at least once a day for best results
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Journal Entries */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Your Journal Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getEntriesForDate().length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3" />
                  <p>No entries for this date</p>
                  <p className="text-sm">Write your first entry above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getEntriesForDate().map((entry) => (
                    <div key={entry.id} className="p-4 border rounded-lg dark:border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="whitespace-pre-wrap">{entry.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuickJournal;