import React, { useState } from 'react';
import axios from 'axios';
import './FoodGoal.css';

export default function FoodGoal() {
    const [date, setDate] = useState('');
    const [newItem, setNewItem] = useState({ name: '', quantity: '', protein: '' });
    const [meals, setMeals] = useState({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
    });
    const [showForm, setShowForm] = useState({
        breakfast: false,
        lunch: false,
        snacks: false,
        dinner: false,
    });
    const [searchResults, setSearchResults] = useState({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
    });
    const YOUR_APP_ID = "5ec8ef0e";
    const YOUR_APP_KEY = "ed2060d0f027edd2397fae290300980d";

    const toggleForm = (meal) => {
        setShowForm((prevShowForm) => ({
            ...prevShowForm,
            [meal]: !prevShowForm[meal],
        }));
        setNewItem({ name: '', quantity: '', protein: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const searchFood = async (query, meal) => {
        if (!query.trim()) return;

        try {
            const response = await axios.get(
                `https://api.edamam.com/api/recipes/v2`,
                {
                    params: {
                        type: 'public',
                        q: query,
                        app_id: YOUR_APP_ID,
                        app_key: YOUR_APP_KEY,
                        ingr: 20,
                    },
                }
            );
            setSearchResults((prevResults) => ({
                ...prevResults,
                [meal]: response.data.hits.map((hit) => ({
                    name: hit.recipe.label,
                    quantity: 100, // Default value (can be adjusted as needed)
                    protein: Math.round(hit.recipe.totalNutrients.PROCNT?.quantity || 0),
                })),
            }));
        } catch (error) {
            console.error(`Error fetching data for ${meal}:`, error);
        }
    };

    const selectFoodItem = (meal, item) => {
        setNewItem(item);
    };

    const addFoodItem = (meal) => {
        if (newItem.name.trim()) {
            setMeals((prevMeals) => ({
                ...prevMeals,
                [meal]: [...prevMeals[meal], newItem],
            }));
            toggleForm(meal); // Hide the form after adding
            setNewItem({ name: '', quantity: '', protein: '' });
        }
    };

    const saveDailyFoodGoal = async () => {
        const foodData = {
            date,
            meals: Object.keys(meals).map(meal => ({
                meal,
                foodItems: meals[meal].map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    protein: item.protein,
                })),
               
            }))
        };

        try {
            const response = await axios.post('http://localhost:2025/user/foodgoals', foodData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Food goal saved:", response.data);
            alert("Food goal saved successfully!");
        } catch (error) {
            console.error("Error saving food goal:", error);
            alert("Failed to save food goal.");
        }
    };

    return (
        <div className="food-goal-container">
            <div className="header">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h2>Weekly Meal Plan</h2>
                <br />
                <br />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            {['breakfast', 'lunch', 'snacks', 'dinner'].map((meal) => (
                <div key={meal} className="meal-card">
                    <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                    <button onClick={() => toggleForm(meal)}>
                        {showForm[meal] ? 'Cancel' : 'Add Food Item'}
                    </button>

                    <div className={`add-food-form ${showForm[meal] ? 'show' : 'hide'}`}>
                        <input
                            type="text"
                            placeholder="Search for food..."
                            onChange={(e) => searchFood(e.target.value, meal)}
                        />
                        {searchResults[meal]?.length > 0 && (
                            <ul className="search-results">
                                {searchResults[meal].map((item, index) => (
                                    <li key={index} onClick={() => selectFoodItem(meal, item)}>
                                        {item.name} - Protein: {item.protein}g
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            type="text"
                            name="name"
                            placeholder="Food Item"
                            value={newItem.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity (grams)"
                            value={newItem.quantity}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="protein"
                            placeholder="Protein (grams)"
                            value={newItem.protein}
                            onChange={handleInputChange}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => addFoodItem(meal)}>Add</button>
                    </div>

                    {meals[meal].length > 0 && (
                        <div className="meal-items">
                            <h4>
                                Items for {meal.charAt(0).toUpperCase() + meal.slice(1)}:
                            </h4>
                            <ul>
                                {meals[meal].map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.quantity}g, {item.protein}g protein
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

          <button className="save-button" onClick={saveDailyFoodGoal}>Save Daily Food Goal</button>
</div>
    );
}