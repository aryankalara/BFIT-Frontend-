import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NutritionistLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(
          `http://localhost:2025/nutritionist/checknutrionistlogin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.email) { // Assuming successful login returns user data
            navigate('/nutritionist'); // Redirect to the home page
          } else {
            alert('Invalid credentials'); // Handle invalid login
          }
        } else {
          alert('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please provide both email and password'); // Validation error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nutritionist Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Mail className="w-5 h-5" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Lock className="w-5 h-5" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default NutritionistLogin;
