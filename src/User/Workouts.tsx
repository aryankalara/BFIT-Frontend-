import React, { useEffect, useState } from 'react';
import { Activity, Calendar, Clock, Dumbbell, Plus, BarChart, Trash2 } from 'lucide-react';

type Workout = {
  id: number;
  date: string;
  duration_minutes: number;
  exerciseName: string | null;
  reps: number;
  sets: number;
  weight_kg: number;
  workout_type: string | null;
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [workoutData, setWorkoutData] = useState({
    date: '',
    workoutType: 'Strength Training',
    durationMinutes: '',
    sets: '',
    reps: '',
    weightKg: '',
    exerciseName: '',
  });

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:2025/user/workouts');
      if (!response.ok) throw new Error('Failed to fetch workouts');
      const data: Workout[] = await response.json();
      setWorkouts(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleInputChange = (key: string, value: string) => {
    setWorkoutData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveWorkout = async () => {
    try {
      const response = await fetch('http://localhost:2025/user/addworkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });
      if (response.ok) {
        console.log('Workout saved successfully');
        fetchWorkouts(); // Refresh the workout list
        setShowForm(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to save workout:', errorData.message);
      }
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-red-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* View Workouts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Workouts</h2>
            </div>
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : workouts.length === 0 ? (
              <p className="text-gray-400">No workouts found. Add your first workout!</p>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="p-4 bg-black/30 rounded-lg">
                    <h3 className="text-white font-medium">
                      {workout.exerciseName?.trim() || 'Unnamed Workout'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {workout.workout_type?.trim() || 'General Workout'} |{' '}
                      {workout.duration_minutes} min
                    </p>
                    <p className="text-sm text-gray-400">
                      {workout.sets} sets × {workout.reps} reps @ {workout.weight_kg} kg
                    </p>
                    <p className="text-sm text-gray-500">{workout.date || 'Unknown Date'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Workout */}
        <div className="space-y-6">
          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Add Workout</h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full flex items-center justify-between bg-black/30 p-4 rounded-lg hover:bg-black/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-red-400" />
                  <span className="text-white">Strength Training</span>
                </div>
                <Plus className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {showForm && (
              <form className="bg-black/30 mt-4 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="Enter date (e.g., 2024-03-15)"
                    value={workoutData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Exercise Name</label>
                  <input
                    type="text"
                    placeholder="Enter exercise name"
                    value={workoutData.exerciseName}
                    onChange={(e) => handleInputChange('exerciseName', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    placeholder="Enter duration"
                    value={workoutData.durationMinutes}
                    onChange={(e) => handleInputChange('durationMinutes', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Number of Sets</label>
                  <input
                    type="number"
                    placeholder="Enter number of sets"
                    value={workoutData.sets}
                    onChange={(e) => handleInputChange('sets', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Number of Reps</label>
                  <input
                    type="number"
                    placeholder="Enter number of reps"
                    value={workoutData.reps}
                    onChange={(e) => handleInputChange('reps', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="Enter weight in kg"
                    value={workoutData.weightKg}
                    onChange={(e) => handleInputChange('weightKg', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveWorkout}
                  className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
                >
                  Save Workout
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
