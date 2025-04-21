import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

# Load the data from the CSV file
file_path = "engineTemp.csv"
try:
    data = pd.read_csv(file_path)
except FileNotFoundError:
    print(f"Error: File not found at {file_path}")
    exit()

data.columns = data.columns.str.strip()
print(f"Current working directory: {os.getcwd()}")
print(f"Columns in the loaded data: {data.columns.tolist()}")

# Define features and target. 'temp_anomaly' is the categorical target.
features = [
    'Engine_Temperature',
    'Engine_RPM',
    'Coolant_Temperature',
    'Oil_Level',
    'Battery_Voltage',
    'Mileage',
    'Tire_Pressure',
    'Fuel_Pressure',
    'penalty',
    'RUL_Hours' # Including RUL_Hours as a potential predictor
]
target = 'temp_anomaly'

# Check if the target column exists
if target not in data.columns:
    print(f"Error: Target column '{target}' not found in the data.")
    exit()

# Prepare the data, ensuring all specified features exist
available_features = [f for f in features if f in data.columns]
if not available_features:
    print("Error: No features available in the data.")
    exit()

X = data[available_features]
y = data[target]

# Split into training and testing sets with stratification
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Check class distribution
print("Class distribution in original data:\n", y.value_counts())
print("\nClass distribution in training data:\n", y_train.value_counts())
print("\nClass distribution in testing data:\n", y_test.value_counts())

# Train the Random Forest Classifier model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on test data
predictions = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy on test data: {accuracy:.2f}")

print("\nClassification Report:")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, predictions))

# Save the trained model
model_filename = 'engine_temp_anomaly_classifier.pkl'
joblib.dump(model, model_filename)
print(f"Model saved to {model_filename}")

# Predict anomaly for a new sample vehicle
sample_vehicle_data = {
    'Engine_Temperature': 85,
    'Engine_RPM': 3200,
    'Coolant_Temperature': 85,
    'Oil_Level': 68,
    'Battery_Voltage': 12.2,
    'Mileage': 140000,
    'Tire_Pressure': 1030,
    'Fuel_Pressure': 50,
    'penalty': 3,
    'RUL_Hours': 500
}
sample_vehicle = pd.DataFrame([sample_vehicle_data])

# Ensure the sample vehicle DataFrame has the same columns as the training data
for feature in X_train.columns:
    if feature not in sample_vehicle.columns:
        sample_vehicle[feature] = sample_vehicle_data.get(feature, 0)

feature_importances = model.feature_importances_
feature_names = X_train.columns
sorted_importance = sorted(zip(feature_names, feature_importances), key=lambda x: x[1], reverse=True)

print("\nFeature Importances:")
for name, importance in sorted_importance:
    print(f"{name}: {importance:.4f}")
    
# Load the trained model
loaded_model = joblib.load(model_filename)
predicted_anomaly = loaded_model.predict(sample_vehicle)
print(f"Predicted engine temperature anomaly for sample vehicle: {predicted_anomaly}")