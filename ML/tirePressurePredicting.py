import numpy as np
import joblib

# Load model and scaler
clf = joblib.load('tire_anomaly_model.pkl')
scaler = joblib.load('scaler.pkl')

# New input data (example)
new_input = np.array([[90, 2000, 85, 3.5, 12.6, 100000, 32, 45, 0, 5]])  # shape (1, 10)

# Scale input
new_input_scaled = scaler.transform(new_input)

# Predict
prediction = clf.predict(new_input_scaled)
print("Tire Pressure Anomaly:", bool(prediction[0]))
