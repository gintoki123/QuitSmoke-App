import Soundscape from "@/components/Soundscape";

const SoundscapePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700">Relaxing Soundscape</h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-green-600 hover:text-green-800"
          >
            Back to Dashboard
          </button>
        </div>
        <Soundscape />
      </div>
    </div>
  );
};

export default SoundscapePage;