import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import joblib

# Load dataset
file_path = "oilLevel.csv"
try:
    df = pd.read_csv(file_path)
except FileNotFoundError:
    print(f"Error: File not found at {file_path}")
    exit()

# Features and target
X = df.drop(columns=['oil_level_anomaly'])  # Features
y = df['oil_level_anomaly'].astype(int)    # Binary target (assuming 0 for normal, 1 for anomaly)
print(X.columns.tolist())

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train_scaled, y_train)

# Evaluate
y_pred = clf.predict(X_test_scaled)
print("Oil Level Anomaly Classification Report:")
print(classification_report(y_test, y_pred))

# Save model and scaler
joblib.dump(clf, 'oil_level_anomaly_model.pkl')
joblib.dump(scaler, 'oil_level_scaler.pkl')

print("Oil level anomaly model saved to oil_level_anomaly_model.pkl")
print("Scaler saved to oil_level_scaler.pkl")


# Example of how to predict for a new sample (assuming you have new_data)
# loaded_clf = joblib.load('oil_level_anomaly_model.pkl')
# loaded_scaler = joblib.load('oil_level_scaler.pkl')
# new_data_scaled = loaded_scaler.transform(new_data)
# new_prediction = loaded_clf.predict(new_data_scaled)
# print(f"Predicted oil level anomaly for new data: {new_prediction}")
try:
    loaded_clf = joblib.load('oil_level_anomaly_model.pkl')
except FileNotFoundError:
    print("Error: 'oil_level_anomaly_model.pkl' not found. Make sure the model is saved in the correct directory.")
    exit()

# Load the fitted scaler
try:
    loaded_scaler = joblib.load('oil_level_scaler.pkl')
except FileNotFoundError:
    print("Error: 'oil_level_scaler.pkl' not found. Make sure the scaler is saved in the correct directory.")
    exit()
try:
    loaded_scaler = joblib.load('oil_level_scaler.pkl')
except FileNotFoundError:
    print("Error: 'oil_level_scaler.pkl' not found. Make sure the scaler is saved in the correct directory.")
    exit()

# Prepare new sample data as a Pandas DataFrame
new_data = pd.DataFrame([{
    'Engine_Temperature': 92.5,
    'Engine_RPM': 2600,
    'Coolant_Temperature': 81,
    'Oil_Level': 48,
    'Battery_Voltage': 12.8,
    'Mileage': 160000,
    'Tire_Pressure': 1010,
    'Fuel_Pressure': 45
}])

# Ensure the new data has the same columns as the training data (excluding the target)
expected_columns = ['Engine_Temperature', 'Engine_RPM', 'Coolant_Temperature', 'Oil_Level', 'Battery_Voltage', 'Mileage', 'Tire_Pressure', 'Fuel_Pressure']
for col in expected_columns:
    if col not in new_data.columns:
        print(f"Warning: Column '{col}' missing in new data. Prediction might be unreliable.")
        # You might want to handle missing columns more robustly, e.g., by filling with a default value

# Scale the new data using the loaded scaler
new_data_scaled = loaded_scaler.transform(new_data)

# Make the prediction
new_prediction = loaded_clf.predict(new_data_scaled)

# Interpret the prediction
if new_prediction[0] == 1:
    print("Predicted oil level anomaly: Yes")
elif new_prediction[0] == 0:
    print("Predicted oil level anomaly: No")
else:
    print("Predicted oil level anomaly: Unknown")