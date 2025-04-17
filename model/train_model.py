import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Load dataset
df = pd.read_csv("mahadbt_fraud_1000_with_aadhaar_income.csv")

# Ensure correct data types
df["amount_requested"] = pd.to_numeric(df["amount_requested"], errors="coerce")
df["income"] = pd.to_numeric(df["income"], errors="coerce")
df["aadhaar_number"] = pd.to_numeric(df["aadhaar_number"], errors="coerce")

# Label encoding for categorical columns
categorical_columns = ["category", "scheme_name", "category_type"]
label_encoders = {}

for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    label_encoders[col] = le

# Features & Labels
features = [
    "amount_requested", "aadhaar_link_verified", "multiple_claims",
    "suspicious_ip_activity", "category", "scheme_name", "category_type",
    "aadhaar_number", "income"
]
X = df[features]
y = df["is_fraud"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoders
os.makedirs("model", exist_ok=True)
with open("model/fraud_detection_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("model/label_encoders.pkl", "wb") as f:
    pickle.dump(label_encoders, f)

print("✅ Model and label encoders saved successfully.")
