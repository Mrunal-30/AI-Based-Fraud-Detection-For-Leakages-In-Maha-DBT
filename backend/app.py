# -------------- ✅ BACKEND (app.py) ------------------
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import json

app = Flask(__name__)
CORS(app)

# Load model and encoders
with open("D:\Web Development\AI-Based-Fraud-Detection-For-Leakages-In-Maha-DBT/model/fraud_detection_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("D:\Web Development\AI-Based-Fraud-Detection-For-Leakages-In-Maha-DBT/model/label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

# Load Aadhaar JSON database (handle encoding safely)
with open("D:\Web Development\AI-Based-Fraud-Detection-For-Leakages-In-Maha-DBT/model/aadhaar_verification_data.json", "r", encoding="utf-8") as f:
    aadhaar_info = json.load(f)

@app.route("/")
def home():
    return "✅ Fraud Detection API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        required_fields = [
            "amount_requested", "aadhaar_number", "multiple_claims",
            "suspicious_ip_activity", "category", "scheme_name", "category_type"
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        aadhaar_number = str(data["aadhaar_number"])
        if aadhaar_number not in aadhaar_info:
            return jsonify({"error": "Aadhaar number not found in database"}), 404

        # Get Aadhaar data
        aadhaar_data = aadhaar_info[aadhaar_number]
        data["aadhaar_link_verified"] = aadhaar_data["aadhaar_link_verified"]
        data["income"] = aadhaar_data["income"]

        def safe_encode(value, encoder):
            return encoder.transform([value])[0] if value in encoder.classes_ else -1

        features = np.array([[
            float(data["amount_requested"]),
            int(data["aadhaar_link_verified"]),
            int(data["multiple_claims"]),
            int(data["suspicious_ip_activity"]),
            safe_encode(data["category"], label_encoders["category"]),
            safe_encode(data["scheme_name"], label_encoders["scheme_name"]),
            safe_encode(data["category_type"], label_encoders["category_type"]),
            float(aadhaar_number),
            float(data["income"])
        ]])

        fraud_probability = model.predict_proba(features)[0][1] * 100

        # Adjust fraud probability based on rules
        if data["aadhaar_link_verified"] == 1 and data["multiple_claims"] == 0 and data["suspicious_ip_activity"] == 0:
            fraud_probability *= 0.5

        if data["scheme_name"] == "Post Matric Scholarship":
            if (data["category"] == "OBC" and 3200 <= float(data["amount_requested"]) <= 4000) or \
               (data["category"] == "General" and float(data["amount_requested"]) <= 1000) or \
               (data["category"] in ["SC", "ST"] and 6000 <= float(data["amount_requested"]) <= 10000):
                fraud_probability *= 0.4

        if data["scheme_name"] == "Pre Matric Scholarship":
            if (data["category"] in ["SC", "ST"] and float(data["amount_requested"]) <= 1000) or \
               (data["category"] == "OBC" and float(data["amount_requested"]) <= 200) or \
               (data["category"] == "General" and float(data["amount_requested"]) == 0):
                fraud_probability *= 0.3

        fraud_probability = max(0, min(100, fraud_probability))

        return jsonify({
            "fraud_probability": round(fraud_probability, 2),
            "aadhaar_link_verified": data["aadhaar_link_verified"],
            "income": data["income"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
