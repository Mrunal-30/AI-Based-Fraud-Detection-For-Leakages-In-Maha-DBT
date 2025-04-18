import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrorMessage("Both username and password are required.");
      return;
    }

    if (username === "admin" && password === "password123") {
      setErrorMessage(""); 
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};
