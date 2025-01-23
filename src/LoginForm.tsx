import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Check if the user is a nutritionist
      const nutritionistResponse = await axios.get(
        `http://localhost:2025/nutritionist/checknutrionistlogin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );
      if (nutritionistResponse.data) {
        localStorage.setItem('user', JSON.stringify(nutritionistResponse.data));
        navigate('/nutritionist');
        return;
      }
    } catch (err) {
      console.error('Nutritionist login failed:', err);
    }

    try {
      // Check if the user is an admin
      const adminResponse = await axios.get(`http://localhost:2025/admin/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
      if (adminResponse.data) {
        localStorage.setItem('user', JSON.stringify(adminResponse.data));
        navigate('/admin/admindashboard');
        return;
      }
    } catch (err) {
      console.error('Admin login failed:', err);
    }
    

    try {
      // Check if the user is a normal user
      const userResponse = await axios.get(
        `http://localhost:2025/user/checkuserlogin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );
    
      if (userResponse.data) {
        // Set the session information (cookies or token)
        // Assuming the backend sets a session cookie automatically or returns a token.
        // Example of saving a token (if the backend sends one):
        if (userResponse.data.token) {
          localStorage.setItem('userToken', userResponse.data.token); // Store token (if needed)
        }
    
        // You can also store user data in localStorage (or use sessionStorage if you want to clear on session end)
        localStorage.setItem('user', JSON.stringify(userResponse.data));
    
        // Ensure the session is created on the backend (if needed, based on the API design)
        // Redirect to dashboard with user info
        navigate('/dashboard', { state: { user: userResponse.data } });
        return;
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error during login:', err);
    }
  }
  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="backdrop-blur-lg bg-black/30 p-8 rounded-2xl shadow-2xl border border-red-500/20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-red-300">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-red-400" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-red-500/30 text-white rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         placeholder-gray-400 transition-all duration-300"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-red-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-red-500/30 text-white rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         placeholder-gray-400 transition-all duration-300"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300">
              <input type="checkbox" className="mr-2 rounded border-red-500/30 bg-black/50" />
              Remember me
            </label>
            <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg
                     hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                     focus:ring-offset-black transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign in
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/form" className="text-red-400 hover:text-red-300 transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
