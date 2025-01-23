import React, { useState } from "react";
import axios from "axios";

const AddDietPlan = () => {
  const [dietPlan, setDietPlan] = useState({
    name: "",
    description: "",
    calories: "",
    items: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setDietPlan({ ...dietPlan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const calories = Number(dietPlan.calories);
    if (isNaN(calories) || calories <= 0) {
      setMessage("Calories must be a positive number.");
      return;
    }

    const formattedDietPlan = {
      ...dietPlan,
      calories,
      items: dietPlan.items.split(",").map((item) => item.trim()),
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:2025/diet-plans/add",
        formattedDietPlan
      );

      if (response.status === 201) {
        setMessage("Diet plan added successfully!");
        setDietPlan({ name: "", description: "", calories: "", items: "" });
      } else {
        setMessage(`Failed to add diet plan. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error occurred while adding diet plan:", error);
      setMessage(
        `Error occurred while adding diet plan: ${
          error.message || "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-diet-plan-container">
      <form onSubmit={handleSubmit} className="diet-form space-y-7">
        {/* Diet Plan Name */}
        <div>
          <label htmlFor="name" className="block text-white font-semibold">
            Diet Plan Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={dietPlan.name}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Diet Plan Description */}
        <div>
          <label htmlFor="description" className="block text-white font-semibold">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={dietPlan.description}
            onChange={handleChange}
            required
            rows="4"
            className="input-field"
          />
        </div>

        {/* Calories */}
        <div>
          <label htmlFor="calories" className="block text-white font-semibold">
            Calories *
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={dietPlan.calories}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Items (comma-separated) */}
        <div>
          <label htmlFor="items" className="block text-white font-semibold">
            Items (comma-separated) *
          </label>
          <input
            type="text"
            id="items"
            name="items"
            value={dietPlan.items}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`submit-button ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Adding..." : "Add Diet Plan"}
          </button>
        </div>
        {message && (
          <p className={`message ${message.includes("Error") ? "error-message" : ""}`}>
            {message}
          </p>
        )}
      </form>

      {/* Internal CSS */}
      <style jsx>{`
        /* Page Container */
        .add-diet-plan-container {
          background: linear-gradient(135deg, #000000, #b91c1c);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          margin: 2rem auto;
          color: white;
        }

        /* Input Field Styles */
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          margin-top: 0.5rem;
          font-size: 1rem;
          outline: none;
          color: black;
          background: #ffffff;
          transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .input-field:focus {
          border-color: #b91c1c;
          box-shadow: 0 0 5px rgba(185, 28, 28, 0.5);
        }

        /* Button Styles */
        .submit-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #b91c1c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out, transform 0.2s ease;
        }

        .submit-button:hover {
          background-color: #7f1d1d;
          transform: scale(1.05);
        }

        .submit-button:disabled {
          background-color: #6b7280;
          cursor: not-allowed;
        }

        /* Label Styles */
        .diet-form label {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        /* Form Spacing */
        .diet-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Message Styles */
        .message {
          margin-top: 1rem;
          font-size: 1rem;
          text-align: center;
          color: #22c55e;
        }

        .error-message {
          color: #f87171;
        }
      `}</style>
    </div>
  );
};

export default AddDietPlan;
