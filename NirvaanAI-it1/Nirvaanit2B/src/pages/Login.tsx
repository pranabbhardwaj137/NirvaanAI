import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-stress-gray p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome <span className="text-stress-yellow">Back</span>
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-stress-dark border border-gray-600 text-white focus:outline-none focus:border-stress-yellow"
              placeholder="Enter your password"
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