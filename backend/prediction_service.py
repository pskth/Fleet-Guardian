import json
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler  # Make sure this is imported

def predict_from_json(json_data, prediction_type):
    """
    Predicts RUL, tire anomaly, oil level anomaly, or engine temp anomaly
    based on the provided JSON data and prediction type.

    Args:
        json_data (str): A JSON string containing the input features.
        prediction_type (str): The type of prediction to perform ('rul', 'tire_anomaly',
                                  'oil_level_anomaly', 'engine_temp_anomaly').

    Returns:
        str: A JSON string containing the prediction result.
    """
    
    try:
        data = json.loads(json_data)
        input_df = pd.DataFrame([data])  # Create a DataFrame from the JSON data
    except json.JSONDecodeError:
        return json.dumps({"error": "Invalid JSON format"})
    except Exception as e:
        return json.dumps({"error": f"Error creating DataFrame: {e}"})

    prediction_result = {}
    print("Input columns:", input_df.columns.tolist())
    


    try:
        if prediction_type == 'rul':
            print("Loaded RUL model")
            model_path = 'rul_predictor_model.pkl'
            model = joblib.load(model_path)

            print("Input DataFrame:")
            print(input_df)

            prediction = model.predict(input_df)[0]
            print(f"Prediction: {prediction}")
            
            prediction_result['RUL_prediction'] = f"{prediction:.2f} hours"

        elif prediction_type == 'tire_anomaly':
            model_path = 'tire_anomaly_model.pkl'
            model = joblib.load(model_path)
            prediction = model.predict(input_df)[0]  # Predict directly on the input DataFrame
            prediction_result['tire_pressure_anomaly_prediction'] = int(prediction)

        elif prediction_type == 'oil_level_anomaly':
            model_path = 'oil_level_anomaly_model.pkl'
            model = joblib.load(model_path)
            prediction = model.predict(input_df)[0]  # Predict directly on the input DataFrame
            prediction_result['oil_level_anomaly_prediction'] = int(prediction)

        elif prediction_type == 'engine_temp_anomaly':
            model_path = 'engineTempAnamoly.pkl'
            model = joblib.load(model_path)
            prediction = model.predict(input_df)[0]
            prediction_result['engine_temp_anomaly_prediction'] = int(prediction)  # Assuming binary output

        else:
            return json.dumps({"error": f"Invalid prediction type: {prediction_type}"})

        print("Final prediction result:", prediction_result)
        return json.dumps(prediction_result)

    except FileNotFoundError:
        return json.dumps({"error": f"Model or scaler file not found for {prediction_type}"})
    except Exception as e:
        return json.dumps({"error": f"Error during prediction for {prediction_type}: {e}"})

# Example usage (assuming you receive a JSON string in 'input_json' and the desired prediction type in 'predict_for'):
# input_json = '{"Engine_Temperature": 95, "Engine_RPM": 3200, "Coolant_Temperature": 85, "Oil_Level": 68, "Battery_Voltage": 12.2, "Mileage": 140000, "Tire_Pressure": 1030, "Fuel_Pressure": 50}'
# predict_for = 'rul'
# output_json = predict_from_json(input_json, predict_for)
# print(output_json)

# Another example for tire anomaly
# input_json_tire = '{"Engine_Temperature": 92, "Engine_RPM": 2500, "Coolant_Temperature": 80, "Oil_Level": 75, "Battery_Voltage": 12.8, "Mileage": 120000, "Tire_Pressure": 900, "Fuel_Pressure": 45}'
# predict_for_tire = 'tire_anomaly'
# output_json_tire = predict_from_json(input_json_tire, predict_for_tire)
# print(output_json_tire)