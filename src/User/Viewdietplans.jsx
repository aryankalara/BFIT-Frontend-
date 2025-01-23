import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation

export default function ViewDietPlans() {
  const [dietPlans, setDietPlans] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Fetch all diet plans from the backend
  const fetchDietPlans = async () => {
    try {
      const response = await axios.get("http://localhost:2025/diet-plans/view");
      if (response.status === 200) {
        setDietPlans(response.data);
      } else {
        setError("Failed to fetch diet plans. Please try again.");
      }
    } catch (error) {
      setError("Error fetching diet plans. Please try again.");
      console.error("Error fetching diet plans:", error.message);
    }
  };

  useEffect(() => {
    fetchDietPlans();
  }, []);

  return (
    <div className="view-diet-plans-container">
      <h3 className="header">View All Diet Plans</h3>

      {/* Show error message if there's an issue */}
      {error && <p className="error-message">{error}</p>}

      {/* Diet Plan Table */}
      <table className="diet-plan-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dietPlans.length === 0 ? (
            <tr>
              <td colSpan="6">No diet plans available.</td>
            </tr>
          ) : (
            dietPlans.map((dietPlan) => (
              <tr key={dietPlan.id}>
                <td>{dietPlan.id}</td>
                <td>{dietPlan.name}</td>
                <td>{dietPlan.description}</td>
                <td>{dietPlan.calories}</td>
                <td>
                  {Array.isArray(dietPlan.items)
                    ? dietPlan.items.join(", ")
                    : dietPlan.items}
                </td>
                <td>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* CSS Styling */}
      <style jsx>{`
        /* Container */
        .view-diet-plans-container {
          background: linear-gradient(135deg, #000000, #b91c1c);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 800px;
          margin: 2rem auto;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        /* Header */
        .header {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #f3f4f6;
        }

        /* Error Message */
        .error-message {
          color: #f87171;
          font-size: 1rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        /* Table */
        .diet-plan-table {
          width: 100%;
          border-collapse: collapse;
          background-color: black;
          color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .diet-plan-table thead {
          background-color: red;
          color: white;
        }

        .diet-plan-table th,
        .diet-plan-table td {
          padding: 12px 16px;
          text-align: center;
          border: 1px solid #e5e7eb;
        }

        .diet-plan-table th {
          font-weight: bold;
          font-size: 1rem;
        }

        .diet-plan-table tbody tr:nth-child(even) {
          background-color: #3a3a3a;
        }

        .diet-plan-table tbody tr:hover {
          background-color: #b91c1c;
        }

        .diet-plan-table td {
          font-size: 0.9rem;
        }

        .delete-button {
          background-color: #e11d48;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .delete-button:hover {
          background-color: #991b1b;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .diet-plan-table {
            font-size: 0.8rem;
          }

          .diet-plan-table th,
          .diet-plan-table td {
            padding: 8px;
          }

          .header {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
