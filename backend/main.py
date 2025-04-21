from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

# Load model from same directory
model_path = os.path.join(os.path.dirname(__file__), "rul_predictor_model.pkl")
model = joblib.load(model_path)

app = FastAPI()

# Define input schema
class VehicleData(BaseModel):
    Engine_Temperature: float
    Engine_RPM: float
    Coolant_Temperature: float
    Oil_Level: float
    Battery_Voltage: float
    Mileage: float
    Tire_Pressure: float
    Fuel_Pressure: float

@app.get("/")
def root():
    return {"message": "RUL Prediction API is up!"}

@app.post("/predict_rul")
def predict(data: VehicleData):
    input_data = np.array([[
        data.Engine_Temperature,
        data.Engine_RPM,
        data.Coolant_Temperature,
        data.Oil_Level,
        data.Battery_Voltage,
        data.Mileage,
        data.Tire_Pressure,
        data.Fuel_Pressure
    ]])
    
    prediction = model.predict(input_data)[0]
    return {"predicted_rul_hours": round(prediction, 2)}
