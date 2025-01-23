// CalorieCalculator.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './CalorieCalculator.css'; // Import CSS file

const CalorieCalculator = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];

  // Calculate the total calories
  const totalCalories = selectedItems.reduce((sum, item) => sum + item.recipe.calories, 0);

  return (
    <div className="calorie-calculator-container">
      <br/><br/><br/><br/>
      <h2>Calorie Calculator</h2>
      {selectedItems.length > 0 ? (
        <div className="calorie-table">
          <table>
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.recipe.label}</td>
                  <td>{Math.round(item.recipe.calories)} kcal</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total Calories</td>
                <td>{Math.round(totalCalories)} kcal</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No items selected.</p>
      )}
      <Link to="/dashboard" className="btn btn-primary">Back to Products</Link>
    </div>
  );
};

export default CalorieCalculator;