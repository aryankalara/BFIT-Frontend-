import React, { useState } from 'react';
import Products from './Products';
import './FoodRecipy.css';

const FoodRecipy = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const YOUR_APP_ID = "5ec8ef0e";
    const YOUR_APP_KEY = "ed2060d0f027edd2397fae290300980d";

    const submitHandler = (e) => {
        e.preventDefault();

        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=20`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data.hits);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className="recipe-container">
            <br/>
            <h3>Food Recipes</h3>
            <form onSubmit={submitHandler} className="search-form">
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search recipes..." 
                /><br/>
                <input type="submit" className="btn btn-primary" value="Search" />
            </form>
            {data.length >= 1 && (
                <div className="results-container">
                    <Products data={data} />
                </div>
            )}
        </div>
    );
};

export default FoodRecipy;
