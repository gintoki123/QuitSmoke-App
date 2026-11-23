import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BreathingExercise from "./components/BreathingExercise";
import CigaretteTapGame from "./components/CigaretteTapGame";
import StressBall from "./components/StressBall";
import ReactionGame from "./components/ReactionGame";
import MemoryGame from "./components/MemoryGame";
import PuzzleGame from "./components/PuzzleGame";
import MoodTrackerPage from "./pages/MoodTracker";
import SoundscapePage from "./pages/Soundscape";
import CravingPredictor from "./components/CravingPredictor";
import QuitPlanGenerator from "./components/QuitPlanGenerator";
import WaterTracker from "./components/WaterTracker";
import StressMeter from "./components/StressMeter";
import QuickJournal from "./components/QuickJournal";
import HabitsTracker from "./components/HabitsTracker";
import SleepTracker from "./components/SleepTracker";
import TriggerIdentifier from "./components/TriggerIdentifier";
import VirtualCoach from "./components/VirtualCoach";
import CalmingSounds from "./components/CalmingSounds";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/breathing-exercise" element={<BreathingExercise />} />
            <Route path="/cigarette-tap" element={<CigaretteTapGame />} />
            <Route path="/stress-ball" element={<StressBall />} />
            <Route path="/reaction-game" element={<ReactionGame />} />
            <Route path="/memory-game" element={<MemoryGame />} />
            <Route path="/puzzle-game" element={<PuzzleGame />} />
            <Route path="/mood-tracker" element={<MoodTrackerPage />} />
            <Route path="/soundscape" element={<SoundscapePage />} />
            <Route path="/craving-predictor" element={<CravingPredictor />} />
            <Route path="/quit-plan" element={<QuitPlanGenerator />} />
            <Route path="/water-tracker" element={<WaterTracker />} />
            <Route path="/stress-meter" element={<StressMeter />} />
            <Route path="/quick-journal" element={<QuickJournal />} />
            <Route path="/habits-tracker" element={<HabitsTracker />} />
            <Route path="/sleep-tracker" element={<SleepTracker />} />
            <Route path="/trigger-identifier" element={<TriggerIdentifier />} />
            <Route path="/virtual-coach" element={<VirtualCoach />} />
            <Route path="/calming-sounds" element={<CalmingSounds />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}