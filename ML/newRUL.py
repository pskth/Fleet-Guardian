import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib
import os

# Load the data
file_path = "truckData.csv"
data = pd.read_csv(file_path)
data.columns = data.columns.str.strip()
print(os.getcwd())

# Define features and target
features = [
    'Engine_Temperature',
    'Engine_RPM',
    'Coolant_Temperature',
    'Oil_Level',
    'Battery_Voltage',
    'Mileage',
    'Tire_Pressure',
    'Fuel_Pressure'
]
target = 'RUL_Hours'

X = data[features]
y = data[target]

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on test data
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print(f"Mean Absolute Error: {mae:.2f} hours")

# Save the trained model to a .pkl file
joblib.dump(model, 'rul_predictor_model.pkl')
print("Model saved to rul_predictor_model.pkl")

sample_vehicle = pd.DataFrame([{
    'Engine_Temperature': 95,
    'Engine_RPM': 3200,
    'Coolant_Temperature': 85,
    'Oil_Level': 68,
    'Battery_Voltage': 12.2,
    'Mileage': 140000,
    'Tire_Pressure': 1030,
    'Fuel_Pressure': 50
}])

# Load the model
loaded_model = joblib.load('rul_predictor_model.pkl')
predicted_rul = loaded_model.predict(sample_vehicle)
print(f"Predicted RUL for sample vehicle: {predicted_rul[0]:.2f} hours")
