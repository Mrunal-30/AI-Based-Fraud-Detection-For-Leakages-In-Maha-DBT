// import { useState } from "react";
// import "./App.css";
// import Footer from "./component/Footer";

// function App() {
//   const [formData, setFormData] = useState({
//     amount_requested: "",
//     aadhaar_number: "",
//     multiple_claims: "",
//     suspicious_ip_activity: "",
//     category: "",
//     scheme_name: "",
//     category_type: "",
//   });

//   const [fraudResult, setFraudResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const predictFraud = async () => {
//     const requiredFields = [
//       "amount_requested",
//       "aadhaar_number",
//       "multiple_claims",
//       "suspicious_ip_activity",
//       "category",
//       "scheme_name",
//       "category_type",
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field] && formData[field] !== 0) {
//         alert(`Please fill in all fields.`);
//         return;
//       }
//     }

//     setLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       setFraudResult(
//         data.fraud_probability !== undefined
//           ? `Fraud Probability: ${data.fraud_probability}%`
//           : `Error: ${data.error}`
//       );
//     } catch (error) {
//       console.error("Request Error:", error);
//       setFraudResult("Error predicting fraud.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="container">
//         <h1>MahaDBT Fraud Detection</h1>

//         <label>Amount Requested:</label>
//         <input
//           type="number"
//           id="amount_requested"
//           value={formData.amount_requested}
//           onChange={handleChange}
//           placeholder="Enter requested amount"
//         />

//         <label>Aadhaar Number:</label>
//         <input
//           type="number"
//           id="aadhaar_number"
//           value={formData.aadhaar_number}
//           onChange={handleChange}
//           placeholder="Enter 12-digit Aadhaar number"
//         />

//         <label>Multiple Claims:</label>
//         <select
//           id="multiple_claims"
//           value={formData.multiple_claims}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="1">Yes</option>
//           <option value="0">No</option>
//         </select>

//         <label>Suspicious IP Activity:</label>
//         <select
//           id="suspicious_ip_activity"
//           value={formData.suspicious_ip_activity}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="1">Yes</option>
//           <option value="0">No</option>
//         </select>

//         <label>Category:</label>
//         <select id="category" value={formData.category} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="General">General</option>
//           <option value="OBC">OBC</option>
//           <option value="SC">SC</option>
//           <option value="ST">ST</option>
//           <option value="VJNT">VJNT</option>
//         </select>

//         <label>Scheme Name:</label>
//         <select
//           id="scheme_name"
//           value={formData.scheme_name}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="Post Matric Scholarship">Post Matric Scholarship</option>
//           <option value="Pre Matric Scholarship">Pre Matric Scholarship</option>
//           <option value="Other Scheme">Other Scheme</option>
//         </select>

//         <label>Category Type:</label>
//         <select
//           id="category_type"
//           value={formData.category_type}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="Student">Student</option>
//           <option value="Farmer">Farmer</option>
//           <option value="Worker">Worker</option>
//           <option value="Pensioner">Pensioner</option>
//         </select>

//         <button onClick={predictFraud} disabled={loading}>
//           {loading ? "Checking..." : "Check Fraud"}
//         </button>

//         {fraudResult && (
//           <div id="fraudResult">
//             <h3>{fraudResult}</h3>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import Footer from "./component/Footer";

function App() {
  const [formData, setFormData] = useState({
    amount_requested: "",
    aadhaar_number: "",
    multiple_claims: "",
    suspicious_ip_activity: "",
    category: "",
    scheme_name: "",
    category_type: "",
  });

  const [fraudResult, setFraudResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const predictFraud = async () => {
    const requiredFields = Object.keys(formData);
    for (const field of requiredFields) {
      if (!formData[field] && formData[field] !== 0) {
        alert(`Please fill in all fields.`);
        return;
      }
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      setFraudResult(
        data.fraud_probability !== undefined
          ? `Fraud Probability: ${data.fraud_probability}%`
          : `Error: ${data.error}`
      );
    } catch (error) {
      console.error("Request Error:", error);
      setFraudResult("Error predicting fraud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          MahaDBT Smart Fraud Detection Portal
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
          <label className="block">Amount Requested:</label>
          <input
            type="number"
            id="amount_requested"
            value={formData.amount_requested}
            onChange={handleChange}
            placeholder="Enter requested amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          />

          <label className="block">Aadhaar Number:</label>
          <input
            type="number"
            id="aadhaar_number"
            value={formData.aadhaar_number}
            onChange={handleChange}
            placeholder="Enter 12-digit Aadhaar number"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          />

          <label className="block">Multiple Claims:</label>
          <select
            id="multiple_claims"
            value={formData.multiple_claims}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <label className="block">Suspicious IP Activity:</label>
          <select
            id="suspicious_ip_activity"
            value={formData.suspicious_ip_activity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <label className="block">Category:</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="VJNT">VJNT</option>
          </select>

          <label className="block">Scheme Name:</label>
          <select
            id="scheme_name"
            value={formData.scheme_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">Select</option>
            <option value="Post Matric Scholarship">Post Matric Scholarship</option>
            <option value="Pre Matric Scholarship">Pre Matric Scholarship</option>
            <option value="Other Scheme">Other Scheme</option>
          </select>

          <label className="block">Category Type:</label>
          <select
            id="category_type"
            value={formData.category_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Farmer">Farmer</option>
            <option value="Worker">Worker</option>
            <option value="Pensioner">Pensioner</option>
          </select>

          <button
            onClick={predictFraud}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Checking..." : "Check Fraud"}
          </button>

          {fraudResult && (
            <div className="mt-6 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-xl">
              <h3 className="text-lg font-medium">{fraudResult}</h3>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
