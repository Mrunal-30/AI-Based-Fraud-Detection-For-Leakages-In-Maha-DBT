import React from 'react';

// Reusable Input component
export const Input = ({ label, id, type = "text", value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
      placeholder={placeholder}
    />
  </div>
);

// Reusable Select component
export const Select = ({ label, id, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt === "Yes" ? 1 : opt === "No" ? 0 : opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
