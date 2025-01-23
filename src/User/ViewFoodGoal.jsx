import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Utensils, Search } from 'lucide-react';
import './ViewFoodGoal.css';

export default function ViewFoodGoal() {
  const [selectedDate, setSelectedDate] = useState('');
  const [foodGoal, setFoodGoal] = useState(null);
  const [error, setError] = useState('');
  const dateInputRef = useRef(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setFoodGoal(null);
    setError('');
  };

  const fetchFoodGoal = () => {
    if (selectedDate) {
      axios
        .get(`http://localhost:2025/user/foodgoals/${selectedDate}`)
        .then((response) => {
          setFoodGoal(response.data);
        })
        .catch((error) => {
          console.error('Error fetching the food goal:', error);
          setFoodGoal(null);
          setError('Food goal not found for the selected date.');
        });
    }
  };

  return (
    <div className="view-food-goal">
      <div className="header-container">
        <Utensils className="icon" />
        <h1 className="heading">Daily Food Goal Tracker</h1>
      </div>

      <div className="date-selector">
        <div className="date-input-container">
          <input
            type="date"
            id="date"
            ref={dateInputRef}
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>
        <button onClick={fetchFoodGoal} className="fetch-button">
          <Search className="button-icon" /> Fetch Food Goal
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {foodGoal && (
        <div className="food-goal-table">
          <h3>Food Goal for {foodGoal.date}</h3>
          <table>
            <tbody>
              {foodGoal.meals.map((meal, mealIndex) => (
                <React.Fragment key={mealIndex}>
                  <tr>
                    <td colSpan="3">
                      <table className="nested-table">
                        <thead>
                          <tr>
                            <th>Food Item</th>
                            <th>Quantity</th>
                            <th>Protein</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meal.foodItems.map((foodItem, foodItemIndex) => (
                            <tr key={foodItemIndex}>
                              <td>{foodItem.name}</td>
                              <td>{foodItem.quantity}</td>
                              <td>{foodItem.protein}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
