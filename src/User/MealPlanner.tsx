import { Calendar as CalendarIcon, ChefHat, Clock, Plus, Search, ShoppingBag } from 'lucide-react';

const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const weeklyPlan = [
    {
      day: 'Monday',
      meals: [
        { type: 'Breakfast', name: 'Greek Yogurt Bowl', time: '08:00', calories: 350, prepTime: '5 min' },
        { type: 'Lunch', name: 'Quinoa Salad', time: '13:00', calories: 450, prepTime: '15 min' },
        { type: 'Dinner', name: 'Grilled Salmon', time: '19:00', calories: 550, prepTime: '25 min' },
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Breakfast', name: 'Overnight Oats', time: '08:00', calories: 380, prepTime: '5 min' },
        { type: 'Lunch', name: 'Turkey Wrap', time: '13:00', calories: 420, prepTime: '10 min' },
        { type: 'Dinner', name: 'Chicken Stir-Fry', time: '19:00', calories: 580, prepTime: '30 min' },
      ]
    },
  ];

  const recipes = [
    { name: 'Greek Yogurt Bowl', calories: 350, prepTime: '5 min', difficulty: 'Easy' },
    { name: 'Quinoa Salad', calories: 450, prepTime: '15 min', difficulty: 'Medium' },
    { name: 'Grilled Salmon', calories: 550, prepTime: '25 min', difficulty: 'Medium' },
    { name: 'Overnight Oats', calories: 380, prepTime: '5 min', difficulty: 'Easy' },
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-red-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-500 rounded-full">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Meal Planner</h1>
            <p className="text-gray-400">Plan your weekly meals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Meal Plan */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Weekly Meal Plan</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-6">
                {weeklyPlan.map((day, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-white mb-4">{day.day}</h3>
                    <div className="space-y-3">
                      {day.meals.map((meal, idx) => (
                        <div key={idx} className="bg-black/30 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-red-400">{meal.type}</span>
                              <span className="text-gray-400">•</span>
                              <div className="flex items-center gap-1 text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>{meal.time}</span>
                              </div>
                            </div>
                            <span className="text-gray-400">{meal.calories} kcal</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">{meal.name}</span>
                            <div className="flex items-center gap-2 text-gray-400">
                              <ChefHat className="w-4 h-4" />
                              <span>{meal.prepTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="w-full bg-black/30 p-3 rounded-lg text-gray-400 hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Add Meal</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recipe Search and Shopping List */}
          <div className="space-y-6">
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <h2 className="text-xl font-semibold text-white mb-4">Recipe Library</h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/30 border border-red-900/50 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="space-y-3">
                {filteredRecipes.map((recipe, index) => (
                  <button
                    key={index}
                    className="w-full flex flex-col bg-black/30 p-4 rounded-lg hover:bg-black/40 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">{recipe.name}</span>
                      <span className="text-red-400">{recipe.calories} kcal</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prepTime}</span>
                      </div>
                      <span className="text-gray-400">{recipe.difficulty}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Shopping List</h2>
                <ShoppingBag className="w-5 h-5 text-red-400" />
              </div>
              <div className="space-y-3">
                {['Chicken breast', 'Quinoa', 'Greek yogurt', 'Mixed berries', 'Salmon fillet'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-red-900/50 text-red-500 focus:ring-red-500 bg-black/30"
                    />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
                <button className="w-full bg-black/30 p-3 rounded-lg text-gray-400 hover:bg-black/40 transition-colors flex items-center justify-center gap-2 mt-4">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;







