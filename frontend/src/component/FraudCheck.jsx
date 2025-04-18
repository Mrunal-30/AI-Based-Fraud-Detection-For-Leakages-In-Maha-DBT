import React, { useState } from "react";
import { Input, Select } from "./FormComponents"; // Importing FormComponents

export const FraudCheck = () => {
  const [formData, setFormData] = useState({
    amount_requested: "",
    aadhaar_number: "",
    multiple_claims: "",
    suspicious_ip_activity: "",
    category: "",
    scheme_name: "",
    category_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [fraudResult, setFraudResult] = useState(null);
  const [fraudProbability, setFraudProbability] = useState(null);

  // Handle change in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate and send the request to predict fraud
  const predictFraud = async () => {
    const requiredFields = [
      "amount_requested",
      "aadhaar_number",
      "multiple_claims",
      "suspicious_ip_activity",
      "category",
      "scheme_name",
      "category_type",
    ];

    // Check if all fields are filled
    for (const field of requiredFields) {
      if (!formData[field] && formData[field] !== 0) {
        alert(`Please fill in all fields.`);
        return;
      }
    }

    setLoading(true);

    try {
      // Make the API request for fraud prediction
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.fraud_probability !== undefined) {
        const fraudResultText = data.fraud_probability > 50 ? "Fraud Detected" : "No Fraud";

        // Save result and probability to localStorage (for Dashboard/Statistics)
        localStorage.setItem("fraudResult", fraudResultText);
        localStorage.setItem("fraudProbability", data.fraud_probability);

        setFraudResult(fraudResultText);
        setFraudProbability(data.fraud_probability);

      } else {
        setFraudResult("Error: " + data.error);
      }
    } catch (error) {
      console.error("Request Error:", error);
      setFraudResult("Error predicting fraud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-900">Fraud Detection</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Amount Requested"
          id="amount_requested"
          value={formData.amount_requested}
          onChange={handleChange}
          placeholder="eg. 5000"
        />
        <Input
          label="Aadhaar Number"
          id="aadhaar_number"
          value={formData.aadhaar_number}
          onChange={handleChange}
          placeholder="12-digit Aadhaar number"
        />
        <Select
          label="Multiple Claims"
          id="multiple_claims"
          value={formData.multiple_claims}
          onChange={handleChange}
          options={["Yes", "No"]}
        />
        <Select
          label="Suspicious IP Activity"
          id="suspicious_ip_activity"
          value={formData.suspicious_ip_activity}
          onChange={handleChange}
          options={["Yes", "No"]}
        />
        <Select
          label="Category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          options={["General", "OBC", "SC", "ST", "VJNT"]}
        />
        <Select
          label="Scheme Name"
          id="scheme_name"
          value={formData.scheme_name}
          onChange={handleChange}
          options={["Post Matric Scholarship", "Pre Matric Scholarship", "Other Scheme"]}
        />
        <Select
          label="Category Type"
          id="category_type"
          value={formData.category_type}
          onChange={handleChange}
          options={["Student", "Farmer", "Worker", "Pensioner"]}
        />
      </div>

      <button
        onClick={predictFraud}
        disabled={loading}
        className="mt-6 w-full bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {loading ? "Checking..." : "Check Fraud"}
      </button>

      {fraudResult && (
        <div id="fraudResult" className="mt-4 text-center">
          <h3
            className={`text-xl font-semibold mt-4 ${fraudProbability > 50 ? 'text-red-600' : 'text-green-600'}`}
          >
          </h3>
          <p className="mt-2 text-lg text-gray-700">Fraud Probability: {fraudProbability}%</p>
        </div>
      )}
    </div>
  );
};
