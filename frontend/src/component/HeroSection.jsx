import React from "react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="bg-blue-900 text-white text-center py-24 md:py-32">
      <h1 className="text-5xl font-extrabold leading-tight md:text-6xl text-shadow-sm">
        AI-powered Fraud Detection
      </h1>
      <p className="mt-4 text-xl md:text-2xl">
        Protecting your welfare claims with advanced technology.
      </p>
      <button
        onClick={handleGetStarted}
        className="mt-8 px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-full hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
};
