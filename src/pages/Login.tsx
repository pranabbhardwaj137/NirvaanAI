import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Access the login function from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state before attempting login

    try {
      await login(email, password); // Attempt to log in
      navigate('/'); // Redirect to home page on successful login
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-stress-gray p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome <span className="text-stress-yellow">Back</span>
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
        <form className="space-y-6" onSubmit={handleSubmit}> {/* Bind handleSubmit to form */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email} // Bind email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Enter your email"
              required // Make this field required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password} // Bind password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Enter your password"
              required // Make this field required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-stress-yellow text-stress-dark py-2 rounded-full hover:bg-opacity-90 transition-all font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-stress-yellow hover:text-stress-yellow/80">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
