import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import joblib  # for saving the model
import os

# Load dataset
df = pd.read_csv("truckData_with_anomaly.csv")

# Features and target
X = df.drop(columns=['tire_pressure_anomaly'])  # Features
y = df['tire_pressure_anomaly'].astype(int)     # Binary target

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling (optional but helps many models)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train_scaled, y_train)

# Evaluate
y_pred = clf.predict(X_test_scaled)
print(classification_report(y_test, y_pred))

# Save model and scaler
joblib.dump(clf, 'tire_anomaly_model.pkl')
joblib.dump(scaler, 'scaler.pkl')