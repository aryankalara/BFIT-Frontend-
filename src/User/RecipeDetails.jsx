// RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { label } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const YOUR_APP_ID = "5ec8ef0e";
  const YOUR_APP_KEY = "ed2060d0f027edd2397fae290300980d";

  useEffect(() => {
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${label}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
      .then(response => response.json())
      .then(data => {
        const foundRecipe = data.hits.find(hit => hit.recipe.label === label);
        setRecipe(foundRecipe?.recipe);
      })
      .catch(error => console.error('Error fetching recipe details:', error));
  }, [label]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button> {/* Back button */}
      <h2>{recipe.label}</h2>
      <img src={recipe.image} alt={recipe.label} />
      <p className="calories">Total Calories: {Math.round(recipe.calories)}</p>
      <p>Ingredients:</p>
      <ul>
        {recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;