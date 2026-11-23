"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, Heart, DollarSign, Award, Gamepad2, User, Settings, Play, Smile, Moon, Sun, Bell, Volume2, TrendingUp, Flame, Target, Trophy, Activity, Brain, Droplets, MoonIcon, Zap, Headphones, BookOpen, Users, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Motivational quotes
const motivationalQuotes = [
  "Every cigarette you don't smoke is a victory.",
  "Your future self will thank you for the choice you make today.",
  "Quitting smoking is easy. It's staying quit that's hard.",
  "The best time to quit smoking was yesterday. The second best time is now.",
  "You are stronger than your cravings.",
  "Each day smoke-free is a day reclaimed.",
  "Your health is your wealth.",
  "The craving will pass. Your commitment won't.",
  "You're not just quitting smoking, you're choosing life.",
  "Every breath you take smoke-free is a gift to yourself.",
  "The hardest part is behind you.",
  "You've got this. One day at a time.",
  "Freedom from smoking is freedom for life.",
  "Your lungs are healing with every smoke-free day.",
  "Don't let one cigarette take away all your progress.",
  "You're not just quitting a habit, you're building a better future.",
  "The best investment you can make is in yourself.",
  "Your family needs you healthy and happy.",
  "You're capable of more than you think.",
  "Each smoke-free day is a step toward a healthier you.",
  "The power to quit is within you.",
  "You're not alone in this journey.",
  "Every day you don't smoke is a win.",
  "Your commitment to quitting is inspiring.",
  "You're creating a smoke-free future for yourself.",
  "The cravings are temporary. Your commitment is permanent.",
  "You're building a healthier lifestyle one day at a time.",
  "Your determination is your greatest strength.",
  "You're making a positive change for your health.",
  "Each smoke-free day brings you closer to your goals.",
  "You're taking control of your health and happiness.",
  "Your decision to quit smoking is a gift to yourself.",
  "You're stronger than your addiction.",
  "Every smoke-free day is a celebration.",
  "You're creating a better life for yourself.",
  "Your commitment to quitting is admirable.",
  "You're making progress every single day.",
  "Your health is worth fighting for.",
  "You're building a smoke-free future.",
  "Your determination to quit is inspiring.",
  "You're taking steps toward a healthier you.",
  "Your decision to quit is life-changing.",
  "You're capable of overcoming any challenge.",
  "Your commitment to quitting is powerful.",
  "You're creating positive change in your life.",
  "Your health journey is worth every effort.",
  "You're making a difference in your life.",
  "Your strength to quit is remarkable.",
  "You're building a smoke-free lifestyle.",
  "Your dedication to quitting is impressive.",
  "You're taking charge of your health."
];

// Success stories
const successStories = [
  {
    id: 1,
    title: "From 2 Packs a Day to Marathon Runner",
    name: "Sarah M.",
    experience: "After 15 years of smoking, I decided to quit for my kids. The first month was tough, but I replaced cigarettes with running. Now I've completed 3 marathons!",
    advice: "Find a healthy replacement activity that you enjoy. It makes all the difference."
  },
  {
    id: 2,
    title: "Quitting for My Unborn Child",
    name: "Michael T.",
    experience: "When my wife got pregnant, I knew I had to quit. It was the hardest thing I've ever done, but seeing my daughter's face made it all worth it.",
    advice: "Think about who you're doing this for. That motivation will carry you through the tough times."
  },
  {
    id: 3,
    title: "Breaking Free at 50",
    name: "Anonymous",
    experience: "I thought it was too late to quit at 50, but my doctor's warning scared me straight. Two years later, I feel 10 years younger.",
    advice: "It's never too late to make a positive change for your health."
  },
  {
    id: 4,
    title: "From Ashtray to Yoga Mat",
    name: "Jennifer L.",
    experience: "I replaced my smoking breaks with yoga sessions. Not only did I quit smoking, but I also found inner peace and lost 20 pounds.",
    advice: "Use this opportunity to discover new healthy habits."
  },
  {
    id: 5,
    title: "Quitting Cold Turkey",
    name: "David R.",
    experience: "I quit cold turkey after 20 years of smoking. The first week was hell, but the clarity I gained was incredible. Best decision ever.",
    advice: "Prepare mentally for the first week. It gets easier after that."
  },
  {
    id: 6,
    title: "For My Family",
    name: "Lisa K.",
    experience: "I quit because I didn't want my kids to lose their mom early. It's been 3 years, and I'm healthier than I've been in decades.",
    advice: "Focus on the positive impact quitting will have on your loved ones."
  },
  {
    id: 7,
    title: "Breaking the Stress Habit",
    name: "Robert H.",
    experience: "I thought I needed cigarettes to cope with stress. I learned meditation instead. Now I handle stress better than ever.",
    advice: "Smoking doesn't actually reduce stress - it creates more. Find real stress relief methods."
  },
  {
    id: 8,
    title: "A New Lease on Life",
    name: "Anonymous",
    experience: "At 65, I was told I had early signs of COPD. Quitting smoking stopped the progression and improved my breathing significantly.",
    advice: "Your body has an amazing ability to heal when you give it the chance."
  },
  {
    id: 9,
    title: "From Smoker to Chef",
    name: "Maria S.",
    experience: "I couldn't taste my own cooking because of smoking. After quitting, food tasted amazing again, and I became a chef!",
    advice: "Quitting smoking enhances your senses. You'll enjoy life more."
  },
  {
    id: 10,
    title: "Breaking Free from Addiction",
    name: "James P.",
    experience: "I smoked because all my friends did. I had to find new friends who supported my quit journey. Best decision ever.",
    advice: "Sometimes you need to change your environment to change your habits."
  },
  {
    id: 11,
    title: "For My Wedding Day",
    name: "Emma W.",
    experience: "I quit 6 months before my wedding so I could dance all night. I looked and felt amazing on my special day.",
    advice: "Set a meaningful quit date for extra motivation."
  },
  {
    id: 12,
    title: "Saving for a Dream Vacation",
    name: "Anonymous",
    experience: "I calculated how much I spent on cigarettes and realized I could afford a trip to Europe. Now I'm smoke-free and exploring the world.",
    advice: "Calculate how much money you'll save. It's a powerful motivator."
  },
  {
    id: 13,
    title: "After Heart Surgery",
    name: "Thomas G.",
    experience: "I had bypass surgery at 55. Quitting smoking was non-negotiable. I'm now 70 and feeling great.",
    advice: "Use health scares as motivation for positive change."
  },
  {
    id: 14,
    title: "Breaking Free from Addiction",
    name: "Patricia N.",
    experience: "I was addicted to nicotine for 30 years. Quitting was the hardest but most rewarding thing I've done.",
    advice: "Remember that addiction is a disease, and you have the power to overcome it."
  },
  {
    id: 15,
    title: "For Better Athletic Performance",
    name: "Kevin B.",
    experience: "As a weekend athlete, I noticed my performance was declining. Quitting smoking improved my stamina dramatically.",
    advice: "Think about how smoking affects your physical abilities."
  },
  {
    id: 16,
    title: "A Fresh Start",
    name: "Anonymous",
    experience: "I quit on New Year's Day as my resolution. It's now been 5 years, and I've never looked back.",
    advice: "Choose a symbolic date to quit for extra motivation."
  },
  {
    id: 17,
    title: "Protecting My Family",
    name: "Angela M.",
    experience: "I quit because I didn't want my kids to start smoking because of me. Now I'm a positive role model.",
    advice: "Think about how your smoking affects those around you."
  },
  {
    id: 18,
    title: "Breaking the Morning Habit",
    name: "Richard D.",
    experience: "I smoked first thing in the morning for 25 years. Quitting gave me back my mornings and my health.",
    advice: "Identify your strongest smoking triggers and prepare strategies for them."
  },
  {
    id: 19,
    title: "After a Cancer Scare",
    name: "Anonymous",
    experience: "A routine checkup revealed pre-cancerous cells. Quitting smoking eliminated the risk and improved my health markers.",
    advice: "Use health warnings as motivation for positive change."
  },
  {
    id: 20,
    title: "Finding New Hobbies",
    name: "Susan J.",
    experience: "I replaced smoking with gardening. Not only did I quit, but I also grew the most beautiful flowers in my neighborhood.",
    advice: "Replace smoking with positive activities you enjoy."
  },
  {
    id: 21,
    title: "For Better Skin",
    name: "Anonymous",
    experience: "I quit because I wanted to look better. My skin improved dramatically, and I felt more confident.",
    advice: "Consider the cosmetic benefits of quitting smoking."
  },
  {
    id: 22,
    title: "Breaking the Work Break Habit",
    name: "Mark F.",
    experience: "I smoked during every work break for 15 years. I replaced it with walking, which improved my fitness and productivity.",
    advice: "Use work breaks for healthy activities instead of smoking."
  },
  {
    id: 23,
    title: "For My Pets",
    name: "Linda C.",
    experience: "I quit because I didn't want my pets to suffer from secondhand smoke. They're healthier, and so am I.",
    advice: "Think about how smoking affects your pets' health."
  },
  {
    id: 24,
    title: "After a Stroke Warning",
    name: "Anonymous",
    experience: "A mini-stroke was my wake-up call. Quitting smoking significantly reduced my risk of another stroke.",
    advice: "Take health warnings seriously and use them as motivation."
  },
  {
    id: 25,
    title: "Breaking Free from Social Smoking",
    name: "Daniel K.",
    experience: "I only smoked socially, but it became a daily habit. Quitting improved my social life because I was present and engaged.",
    advice: "Even social smoking has serious health consequences."
  },
  {
    id: 26,
    title: "For Better Sleep",
    name: "Anonymous",
    experience: "I quit because smoking was affecting my sleep. Now I sleep better and wake up refreshed.",
    advice: "Consider how smoking affects your sleep quality."
  },
  {
    id: 27,
    title: "Breaking the After-Meal Habit",
    name: "Carol A.",
    experience: "I smoked after every meal for 20 years. I replaced it with a short walk, which improved my digestion and fitness.",
    advice: "Replace smoking habits with healthy alternatives."
  },
  {
    id: 28,
    title: "For Better Breathing",
    name: "Anonymous",
    experience: "I quit because I was getting winded climbing stairs. My breathing improved dramatically within months.",
    advice: "Notice how much better you breathe without cigarettes."
  },
  {
    id: 29,
    title: "Breaking Free from Stress Smoking",
    name: "Paul M.",
    experience: "I smoked when stressed, but it only created more stress. I learned meditation and now handle stress better.",
    advice: "Find real stress relief methods instead of smoking."
  },
  {
    id: 30,
    title: "For Better Taste",
    name: "Anonymous",
    experience: "I quit because food didn't taste good anymore. My sense of taste returned within weeks, and meals became enjoyable again.",
    advice: "Quitting smoking enhances your senses, especially taste and smell."
  },
  {
    id: 31,
    title: "Breaking the Evening Habit",
    name: "Nancy O.",
    experience: "I smoked while watching TV every evening for 15 years. I replaced it with knitting, which is now my relaxing hobby.",
    advice: "Replace evening smoking with relaxing activities."
  },
  {
    id: 32,
    title: "For Better Exercise Performance",
    name: "Anonymous",
    experience: "I quit because smoking was limiting my exercise ability. My stamina improved dramatically within months.",
    advice: "Notice how much better you perform physically without cigarettes."
  },
  {
    id: 33,
    title: "Breaking Free from Morning Smoking",
    name: "George R.",
    experience: "I smoked first thing every morning for 30 years. Quitting gave me back my mornings and improved my health significantly.",
    advice: "Break the association between waking up and smoking."
  },
  {
    id: 34,
    title: "For Better Mental Clarity",
    name: "Anonymous",
    experience: "I quit because smoking was making me feel foggy. My mental clarity improved dramatically within weeks.",
    advice: "Notice how much clearer your thinking becomes without cigarettes."
  },
  {
    id: 35,
    title: "Breaking the Coffee Habit",
    name: "Helen S.",
    experience: "I smoked with my morning coffee for 25 years. I replaced it with reading, which is now my favorite morning ritual.",
    advice: "Replace smoking with enjoyable activities."
  },
  {
    id: 36,
    title: "For Better Relationships",
    name: "Anonymous",
    experience: "I quit because smoking was affecting my relationships. Now I'm more present and engaged with my loved ones.",
    advice: "Consider how smoking affects your relationships."
  },
  {
    id: 37,
    title: "Breaking Free from Social Smoking",
    name: "Frank T.",
    experience: "I only smoked with friends, but it became a daily habit. Quitting improved my social life because I was present and engaged.",
    advice: "Even social smoking can become a serious habit."
  },
  {
    id: 38,
    title: "For Better Financial Health",
    name: "Anonymous",
    experience: "I calculated how much I spent on cigarettes and realized I could afford a house deposit. Now I'm a homeowner!",
    advice: "Calculate how much money you'll save by quitting."
  },
  {
    id: 39,
    title: "Breaking the After-Work Habit",
    name: "Betty U.",
    experience: "I smoked after work every day for 15 years. I replaced it with cooking classes, which improved my diet and social life.",
    advice: "Replace after-work smoking with positive activities."
  },
  {
    id: 40,
    title: "For Better Overall Health",
    name: "Anonymous",
    experience: "I quit because I wanted to be healthier overall. My energy levels improved dramatically within months.",
    advice: "Consider all the health benefits of quitting smoking."
  },
  {
    id: 41,
    title: "Breaking Free from Stress Smoking",
    name: "Charles V.",
    experience: "I smoked when stressed, but it only created more stress. I learned yoga and now handle stress better.",
    advice: "Find real stress relief methods instead of smoking."
  },
  {
    id: 42,
    title: "For Better Immune System",
    name: "Anonymous",
    experience: "I quit because I was getting sick frequently. My immune system improved dramatically within months.",
    advice: "Notice how much healthier you feel without cigarettes."
  },
  {
    id: 43,
    title: "Breaking the Weekend Habit",
    name: "Dorothy W.",
    experience: "I only smoked on weekends, but it became a daily habit. Quitting improved my weekends because I was present and engaged.",
    advice: "Even weekend smoking can become a serious habit."
  },
  {
    id: 44,
    title: "For Better Energy Levels",
    name: "Anonymous",
    experience: "I quit because I was always tired. My energy levels improved dramatically within weeks.",
    advice: "Notice how much more energy you have without cigarettes."
  },
  {
    id: 45,
    title: "Breaking Free from Social Smoking",
    name: "Anthony X.",
    experience: "I smoked with colleagues, but it became a daily habit. Quitting improved my work relationships because I was present and engaged.",
    advice: "Even workplace smoking can become a serious habit."
  },
  {
    id: 46,
    title: "For Better Mental Health",
    name: "Anonymous",
    experience: "I quit because smoking was affecting my mental health. My mood improved dramatically within months.",
    advice: "Consider how smoking affects your mental health."
  },
  {
    id: 47,
    title: "Breaking the Evening Habit",
    name: "Barbara Y.",
    experience: "I smoked while watching TV every evening. I replaced it with painting, which is now my relaxing hobby.",
    advice: "Replace evening smoking with relaxing activities."
  },
  {
    id: 48,
    title: "For Better Physical Fitness",
    name: "Anonymous",
    experience: "I quit because smoking was limiting my physical fitness. My stamina improved dramatically within months.",
    advice: "Notice how much better you perform physically without cigarettes."
  },
  {
    id: 49,
    title: "Breaking Free from Morning Smoking",
    name: "Christopher Z.",
    experience: "I smoked first thing every morning for 20 years. Quitting gave me back my mornings and improved my health significantly.",
    advice: "Break the association between waking up and smoking."
  },
  {
    id: 50,
    title: "For Better Quality of Life",
    name: "Anonymous",
    experience: "I quit because I wanted to improve my quality of life. I feel better in every way imaginable.",
    advice: "Consider all the ways quitting smoking improves your life."
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userProfile, setUserProfile] = useState({
    name: "",
    age: "",
    gender: "",
    cigarettesPerDay: "",
    costPerPack: "",
    startDate: "",
    reasons: [] as string[],
  });
  const [showProfileSetup, setShowProfileSetup] = useState(true);
  const [streak, setStreak] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [cravingsAvoided, setCravingsAvoided] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [currentQuote, setCurrentQuote] = useState("");
  const [healthLevel, setHealthLevel] = useState(0);
  const [nextMilestone, setNextMilestone] = useState(0);
  const [breathingExercises, setBreathingExercises] = useState(0);
  const [dailyWater, setDailyWater] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [stressLevel, setStressLevel] = useState(50);
  const [habitSuggestions] = useState([
    "Drink a glass of water",
    "Take a 5-minute walk",
    "Chew sugar-free gum",
    "Practice deep breathing",
    "Call a friend",
    "Listen to calming music"
  ]);

  // Sample data for charts
  const weeklyProgressData = [
    { day: "Mon", progress: 75 },
    { day: "Tue", progress: 80 },
    { day: "Wed", progress: 85 },
    { day: "Thu", progress: 82 },
    { day: "Fri", progress: 90 },
    { day: "Sat", progress: 88 },
    { day: "Sun", progress: 92 }
  ];

  const cravingsHeatmapData = [
    { time: "6AM", count: 2 },
    { time: "9AM", count: 5 },
    { time: "12PM", count: 3 },
    { time: "3PM", count: 7 },
    { time: "6PM", count: 8 },
    { time: "9PM", count: 4 },
    { time: "12AM", count: 1 }
  ];

  const leaderboardData = [
    { name: "You", cigarettes: 0 },
    { name: "Alex", cigarettes: 2 },
    { name: "Sam", cigarettes: 5 },
    { name: "Jordan", cigarettes: 8 },
    { name: "Taylor", cigarettes: 12 }
  ];

  // Check if user has completed profile setup
  useEffect(() => {
    const profile = localStorage.getItem("smokingProfile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      setShowProfileSetup(false);
      
      // Calculate initial stats
      if (parsedProfile.startDate) {
        const startDate = new Date(parsedProfile.startDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setStreak(diffDays);
        
        // Calculate money saved
        const packsPerDay = parseInt(parsedProfile.cigarettesPerDay) / 20;
        const dailyCost = packsPerDay * parseFloat(parsedProfile.costPerPack);
        setMoneySaved(parseFloat((dailyCost * diffDays).toFixed(2)));
        
        // Calculate health level (0-100)
        const health = Math.min(100, diffDays * 2);
        setHealthLevel(health);
        
        // Calculate next milestone
        const milestones = [7, 14, 30, 60, 90, 180, 365];
        const next = milestones.find(m => m > diffDays) || milestones[milestones.length - 1] + 365;
        setNextMilestone(next - diffDays);
      }
    }
    
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
    
    // Get a random motivational quote
    const usedQuotes = JSON.parse(localStorage.getItem("usedQuotes") || "[]");
    let availableQuotes = motivationalQuotes.filter(q => !usedQuotes.includes(q));
    
    // If all quotes have been used, reset
    if (availableQuotes.length === 0) {
      availableQuotes = [...motivationalQuotes];
      localStorage.setItem("usedQuotes", JSON.stringify([]));
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    setCurrentQuote(selectedQuote);
    
    // Add to used quotes
    const newUsedQuotes = [...usedQuotes, selectedQuote];
    localStorage.setItem("usedQuotes", JSON.stringify(newUsedQuotes));
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("smokingProfile", JSON.stringify(userProfile));
    setShowProfileSetup(false);
    
    // Initialize stats
    if (userProfile.startDate) {
      const startDate = new Date(userProfile.startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setStreak(diffDays);
      
      // Calculate money saved
      const packsPerDay = parseInt(userProfile.cigarettesPerDay) / 20;
      const dailyCost = packsPerDay * parseFloat(userProfile.costPerPack);
      setMoneySaved(parseFloat((dailyCost * diffDays).toFixed(2)));
      
      // Calculate health level (0-100)
      const health = Math.min(100, diffDays * 2);
      setHealthLevel(health);
      
      // Calculate next milestone
      const milestones = [7, 14, 30, 60, 90, 180, 365];
      const next = milestones.find(m => m > diffDays) || milestones[milestones.length - 1] + 365;
      setNextMilestone(next - diffDays);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const addReason = (reason: string) => {
    if (reason.trim() && !userProfile.reasons.includes(reason)) {
      setUserProfile(prev => ({
        ...prev,
        reasons: [...prev.reasons, reason.trim()]
      }));
    }
  };

  const removeReason = (reason: string) => {
    setUserProfile(prev => ({
      ...prev,
      reasons: prev.reasons.filter(r => r !== reason)
    }));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const logCraving = () => {
    setCravingsAvoided(prev => prev + 1);
    // In a real app, you would save this to localStorage or a database
  };

  const increaseBreathingExercises = () => {
    setBreathingExercises(prev => prev + 1);
  };

  const increaseWater = () => {
    setDailyWater(prev => prev + 1);
  };

  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto py-8">
          <Card className="shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6" />
                Create Your Profile
              </CardTitle>
              <p className="text-muted-foreground dark:text-gray-300">
                Tell us about yourself and your smoking habits to get started
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                      name="name"
                      value={userProfile.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Age</label>
                    <input
                      name="age"
                      type="number"
                      value={userProfile.age}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your age"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <select
                      name="gender"
                      value={userProfile.gender}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cigarettes per day</label>
                    <input
                      name="cigarettesPerDay"
                      type="number"
                      value={userProfile.cigarettesPerDay}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Number of cigarettes"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cost per pack ($)</label>
                    <input
                      name="costPerPack"
                      type="number"
                      step="0.01"
                      value={userProfile.costPerPack}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Cost of one pack"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Quit start date</label>
                    <input
                      name="startDate"
                      type="date"
                      value={userProfile.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Reasons for quitting</label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Add a reason"
                      className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addReason((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                        addReason(input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfile.reasons.map((reason, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer dark:bg-gray-700"
                        onClick={() => removeReason(reason)}
                      >
                        {reason} ×
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Start My Quit Journey
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">QuitSmoke</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1 dark:bg-gray-700">
              <Calendar className="h-4 w-4" />
              {streak} days
            </Badge>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setActiveTab("settings")}
              className="dark:hover:bg-gray-700"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="stories">Quitter Stories</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            {/* Motivational Quote */}
            <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg italic">"{currentQuote}"</p>
                    <p className="text-sm mt-2 opacity-90">- Daily Motivation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Time Since Last Cigarette */}
              <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Smoke-Free Time</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{streak} days</div>
                  <p className="text-xs text-muted-foreground">Since your quit date</p>
                </CardContent>
              </Card>

              {/* Money Saved */}
              <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${moneySaved}</div>
                  <p className="text-xs text-muted-foreground">Based on your habits</p>
                </CardContent>
              </Card>

              {/* Health Improvements */}
              <Card className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Level</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthLevel}%</div>
                  <Progress value={healthLevel} className="mt-2" />
                </CardContent>
              </Card>

              {/* Cravings Avoided */}
              <Card className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cravings Avoided</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cravingsAvoided}</div>
                  <p className="text-xs text-muted-foreground">Today: 3</p>
                </CardContent>
              </Card>
            </div>

            {/* New Dashboard Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Daily Mood Check-in */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smile className="h-5 w-5 text-yellow-500" />
                    Daily Mood
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span>How are you feeling today?</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Button 
                          key={level} 
                          size="sm" 
                          variant="outline"
                          className="w-8 h-8 p-0"
                          onClick={() => {
                            // In a real app, save mood to localStorage
                          }}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress Graph */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="progress" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Cravings Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-500" />
                    Cravings Heatmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cravingsHeatmapData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Next Milestone Countdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Next Milestone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{nextMilestone}</div>
                    <p className="text-sm text-muted-foreground">days to next milestone</p>
                  </div>
                </CardContent>
              </Card>

              {/* Breathing Exercises */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    Breathing Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span>{breathingExercises} sessions today</span>
                    <Button size="sm" onClick={increaseBreathingExercises}>
                      +1
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Habit Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    Habit Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {habitSuggestions.slice(0, 3).map((suggestion, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard and Health Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Cigarettes Avoided Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Cigarettes Avoided Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboardData.map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? "bg-yellow-500 text-white" : 
                            index === 1 ? "bg-gray-400 text-white" : 
                            index === 2 ? "bg-amber-800 text-white" : "bg-gray-200"
                          }`}>
                            {index + 1}
                          </div>
                          <span>{person.name}</span>
                        </div>
                        <span className="font-medium">{person.cigarettes} avoided</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Health Level Meter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Health Level Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Level: {healthLevel}%</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                    <Progress value={healthLevel} className="h-3" />
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>0%</div>
                      <div className="text-center">25%</div>
                      <div className="text-center">50%</div>
                      <div className="text-right">100%</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your health is improving with each smoke-free day!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Motivational Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-bounce">
                <CardHeader>
                  <CardTitle>Today's Motivation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg italic">
                    "Every day you don't smoke is a victory. You're stronger than you think!"
                  </p>
                  <Button className="mt-4 w-full" onClick={logCraving}>Log Craving</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Reasons to Quit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userProfile.reasons.slice(0, 3).map((reason, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>{reason}</span>
                      </div>
                    ))}
                    {userProfile.reasons.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        + {userProfile.reasons.length - 3} more reasons
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Health Benefits Timeline</CardTitle>
                <p className="text-sm text-muted-foreground">
                  See the amazing changes happening to your body
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { time: "20 minutes", benefit: "Heart rate and blood pressure drop", completed: true },
                    { time: "12 hours", benefit: "Carbon monoxide level in blood normalizes", completed: true },
                    { time: "2 days", benefit: "Sense of smell and taste improve", completed: true },
                    { time: "3 days", benefit: "Breathing becomes easier", completed: streak >= 3 },
                    { time: "2 weeks", benefit: "Circulation improves, walking easier", completed: streak >= 14 },
                    { time: "3 months", benefit: "Lung function significantly improves", completed: streak >= 90 },
                    { time: "1 year", benefit: "Risk of heart disease is half that of a smoker", completed: streak >= 365 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110",
                        item.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                      )}>
                        {item.completed ? "✓" : index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.time}</h3>
                        <p className={cn(item.completed ? "" : "text-muted-foreground")}>
                          {item.benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* AI-based craving predictor */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Craving Predictor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered predictions based on your patterns
                  </p>
                  <Link to="/craving-predictor">
                    <Button className="w-full">
                      Check My Risk
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Custom quit plan generator */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Quit Plan Generator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Personalized plan based on your habits
                  </p>
                  <Link to="/quit-plan">
                    <Button className="w-full">
                      Generate Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Trigger identification tool */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    Trigger Identifier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Identify your smoking triggers
                  </p>
                  <Link to="/trigger-identifier">
                    <Button className="w-full">
                      Analyze Triggers
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Water drinking tracker */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Water Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <span>{dailyWater} glasses</span>
                    <span className="text-sm text-muted-foreground">Goal: 8</span>
                  </div>
                  <Link to="/water-tracker">
                    <Button className="w-full">
                      Track Water
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Sleep quality tracker */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MoonIcon className="h-5 w-5 text-indigo-500" />
                    Sleep Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your sleep quality
                  </p>
                  <Link to="/sleep-tracker">
                    <Button className="w-full">
                      Log Sleep
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Stress level meter */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-500" />
                    Stress Meter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span>Stress Level</span>
                    <span>{stressLevel}%</span>
                  </div>
                  <Progress value={stressLevel} className="mb-4" />
                  <Link to="/stress-meter">
                    <Button className="w-full">
                      Track Stress
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Panic-relief audio player */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-purple-500" />
                    Calming Sounds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Soothing sounds for stress relief
                  </p>
                  <Link to="/calming-sounds">
                    <Button className="w-full">
                      Play Sounds
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Positive habits tracker */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Habits Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track healthy habits
                  </p>
                  <Link to="/habits-tracker">
                    <Button className="w-full">
                      View Habits
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Emergency chat with virtual coach */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    Virtual Coach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with your quit coach
                  </p>
                  <Link to="/virtual-coach">
                    <Button className="w-full">
                      Chat Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick journaling tool */}
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-yellow-500" />
                    Quick Journal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Write about your cravings
                  </p>
                  <Link to="/quick-journal">
                    <Button className="w-full">
                      Journal Entry
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="mt-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5" />
                  Distraction Games
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Play these games when you feel a craving coming on
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Tap-to-Destroy Cigarettes", path: "/cigarette-tap", description: "Tap falling cigarettes to destroy them" },
                    { name: "Breathing Relaxation", path: "/breathing-exercise", description: "Follow the breathing animation" },
                    { name: "Puzzle Blocks", path: "/puzzle-game", description: "Match healthy items to score points" },
                    { name: "Memory Game", path: "/memory-game", description: "Flip cards and match items" },
                    { name: "Reaction Speed", path: "/reaction-game", description: "Tap when the circle turns green" },
                    { name: "Stress Ball", path: "/stress-ball", description: "Squish the virtual stress ball" },
                  ].map((game, index) => (
                    <Link key={index} to={game.path} className="block">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full hover:scale-105 transform transition duration-300">
                        <CardContent className="p-4">
                          <h3 className="font-medium">{game.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
                          <Button className="w-full mt-3" variant="secondary">
                            <Play className="h-4 w-4 mr-2" />
                            Play Now
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quitter Stories Tab */}
          <TabsContent value="stories" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Quitter Success Stories
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Read inspiring stories from people who quit smoking
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {successStories.map((story) => (
                    <Card key={story.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">By {story.name}</p>
                        <p className="text-sm mb-3">{story.experience}</p>
                        <div className="bg-green-50 dark:bg-green-900 p-3 rounded">
                          <p className="text-sm font-medium">Advice:</p>
                          <p className="text-sm">{story.advice}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Name</h3>
                        <p className="text-sm text-muted-foreground">{userProfile.name || "Not set"}</p>
                      </div>
                      <Button variant="outline" onClick={() => setShowProfileSetup(true)}>Edit</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Age</h3>
                        <p className="text-sm text-muted-foreground">{userProfile.age || "Not set"}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Gender</h3>
                        <p className="text-sm text-muted-foreground">{userProfile.gender || "Not set"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <div>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5" />
                      <div>
                        <Label htmlFor="notifications">Notifications</Label>
                        <p className="text-sm text-muted-foreground">Enable or disable notifications</p>
                      </div>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5" />
                      <div>
                        <Label htmlFor="sound">Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">Enable or disable app sounds</p>
                      </div>
                    </div>
                    <Switch
                      id="sound"
                      checked={sound}
                      onCheckedChange={setSound}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Quit Journey Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{streak}</div>
                      <div className="text-sm text-muted-foreground">Days Smoke-Free</div>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-300">${moneySaved}</div>
                      <div className="text-sm text-muted-foreground">Money Saved</div>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">{healthLevel}%</div>
                      <div className="text-sm text-muted-foreground">Health Improvement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;