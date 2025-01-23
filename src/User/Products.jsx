import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Product.css';

const Products = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleAddItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCalculateCalories = () => {
    navigate('/calorie-calculator', { state: { selectedItems } });
  };

  return (
    <div className="product-container">
      {data.map(item => (
        <div className={`card ${selectedItems.includes(item) ? 'selected' : ''}`} key={item.recipe.label}>
          <img className="card-img-top" src={item.recipe.image} alt="Recipe" />
          <div className="card-body">
            <h5 className="card-title">{item.recipe.label}</h5>
            <p className="card-text">Total Amount of Calories: {Math.round(item.recipe.calories)}</p>
            <div className="btn-container">
              <Link to={`/recipe/${encodeURIComponent(item.recipe.label)}`} className="btn-primary">
                Recipe
              </Link>
              <button className="btn-secondary" onClick={() => handleAddItem(item)}>
                Add to Calculator
              </button>
            </div>
          </div>
        </div>
      ))}
      {selectedItems.length > 0 && (
        <div className="fixed-footer">
          <button className="btn-success" onClick={handleCalculateCalories}>
            Calculate Total Calories
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
