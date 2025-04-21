import csv
import json
import requests

def csv_to_json_and_send(csv_file_path, api_endpoint):
    # Keep track of API responses
    responses = []
    success_count = 0
    failure_count = 0
    
    # Open the CSV file and read data
    with open(csv_file_path, 'r') as csv_file:
        # Create a CSV reader
        csv_reader = csv.DictReader(csv_file)
        csv_reader.fieldnames = [field.strip() for field in csv_reader.fieldnames]
        # Process each row
        row_count = 0
        for row in csv_reader:
            print("Row keys:", row.keys())
    # rest of your code...

            row_count += 1
            # Convert all values to appropriate types
            for key, value in row.items():
                try:
                    row[key] = float(value)
                except (ValueError, TypeError):
                    pass
            
            # Create and send 4 different prediction type objects for each row
            prediction_types = [
                {"type": "tire_anomaly", "include_extra": True},
                {"type": "oil_level_anomaly", "include_extra": False},
                {"type": "engine_temp_anomaly", "include_extra": True},
                {"type": "rul", "include_extra": False}
            ]
            
            for pred_info in prediction_types:
                # Create the features dictionary
                features = {
                    "Engine_Temperature": row["Engine_Temperature"],
                    "Engine_RPM": row["Engine_RPM"],
                    "Coolant_Temperature": row["Coolant_Temperature"],
                    "Oil_Level": row["Oil_Level"],
                    "Battery_Voltage": row["Battery_Voltage"],
                    "Mileage": row["Mileage"],
                    "Tire_Pressure": row["Tire_Pressure"],
                    "Fuel_Pressure": row["Fuel_Pressure"]
                }
                
                # Add extra fields for certain prediction types
                if pred_info["include_extra"]:
                    features["penalty"] = row["penalty"]
                    features["RUL_Hours"] = row["RUL_Hours"]
                
                # Create the payload
                payload = {
                    "features": features,
                    "prediction_type": pred_info["type"]
                }
                
                # Send the request
                try:
                    print(f"Sending {pred_info['type']} data for row {row_count}...")
                    response = requests.post(api_endpoint, json=payload)
                    
                    # Store response info
                    response_info = {
                        "row": row_count,
                        "prediction_type": pred_info["type"],
                        "status_code": response.status_code,
                        "response": response.json() if response.status_code == 200 else response.text
                    }
                    responses.append(response_info)
                    
                    if response.status_code == 200:
                        success_count += 1
                        print(f"Success! Response: {response.json()}")
                    else:
                        failure_count += 1
                        print(f"Failed with status code {response.status_code}. Response: {response.text}")
                        
                except Exception as e:
                    print(f"Error sending request: {str(e)}")
                    responses.append({
                        "row": row_count,
                        "prediction_type": pred_info["type"],
                        "error": str(e)
                    })
                    failure_count += 1
    
    # Save all responses to a file
    with open('api_responses.json', 'w') as f:
        json.dump(responses, f, indent=2)
    
    print(f"\nCompleted sending data to API.")
    print(f"Total requests: {success_count + failure_count}")
    print(f"Successful: {success_count}")
    print(f"Failed: {failure_count}")
    print(f"Responses saved to api_responses.json")

if __name__ == "__main__":
    csv_file_path = 'sample.csv'
    api_endpoint = 'http://127.0.0.1:5000/predict'
    csv_to_json_and_send(csv_file_path, api_endpoint)