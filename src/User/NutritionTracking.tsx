import React, { useState } from 'react';
import { PieChart, Apple, Plus, Trash2, Search } from 'lucide-react';

const NutritionTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const meals = [
    { id: 1, name: 'Breakfast', time: '08:00', foods: [
      { name: 'Oatmeal', calories: 150, protein: 6, carbs: 27, fat: 3 },
      { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0 },
    ]},
    { id: 2, name: 'Lunch', time: '13:00', foods: [
      { name: 'Grilled Chicken Salad', calories: 350, protein: 35, carbs: 12, fat: 18 },
      { name: 'Olive Oil Dressing', calories: 120, protein: 0, carbs: 0, fat: 14 },
    ]},
    { id: 3, name: 'Dinner', time: '19:00', foods: [
      { name: 'Salmon', calories: 280, protein: 30, carbs: 0, fat: 18 },
      { name: 'Brown Rice', calories: 220, protein: 5, carbs: 45, fat: 2 },
    ]},
  ];

  const commonFoods = [
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice', calories: 220, protein: 5, carbs: 45, fat: 2 },
    { name: 'Eggs', calories: 70, protein: 6, carbs: 0, fat: 5 },
  ];

  const filteredFoods = commonFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-red-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-500 rounded-full">
            <PieChart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Nutrition Tracking</h1>
            <p className="text-gray-400">Monitor your daily nutrition intake</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Daily Summary</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Calories', value: '1,840', target: '2,000', color: 'bg-orange-500' },
                  { label: 'Protein', value: '92g', target: '120g', color: 'bg-blue-500' },
                  { label: 'Carbs', value: '220g', target: '250g', color: 'bg-green-500' },
                  { label: 'Fat', value: '65g', target: '70g', color: 'bg-yellow-500' }
                ].map((stat, index) => (
                  <div key={index} className="bg-black/30 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                    <div className="text-white text-xl font-bold mb-2">{stat.value}</div>
                    <div className="w-full bg-black/50 rounded-full h-2">
                      <div className={`${stat.color} h-2 rounded-full`} style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">Target: {stat.target}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Entries */}
            {meals.map((meal) => (
              <div key={meal.id} className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
                    <p className="text-gray-400 text-sm">{meal.time}</p>
                  </div>
                  <button className="text-red-400 hover:text-red-300">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {meal.foods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                      <div>
                        <div className="text-white">{food.name}</div>
                        <div className="text-sm text-gray-400">
                          P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-red-400">{food.calories} kcal</div>
                        <button className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Food Search */}
          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50 h-fit sticky top-8">
            <h2 className="text-xl font-semibold text-white mb-4">Add Food</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/30 border border-red-900/50 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <div className="space-y-3">
              {filteredFoods.map((food, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between bg-black/30 p-3 rounded-lg hover:bg-black/40 transition-colors"
                >
                  <div>
                    <div className="text-white text-left">{food.name}</div>
                    <div className="text-sm text-gray-400">
                      P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                    </div>
                  </div>
                  <div className="text-red-400">{food.calories} kcal</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracking;