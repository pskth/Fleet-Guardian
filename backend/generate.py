import csv
import random

header = ["Engine_Temperature", "Engine_RPM", "Coolant_Temperature", "Oil_Level", "Battery_Voltage",
          "Mileage", "Tire_Pressure", "Fuel_Pressure", "RUL_Hours", "temp_anomaly",
          "tire_pressure_anomaly", "oil_level_anomaly", "penalty"]

def generate_row():
    engine_temp = random.uniform(70, 110)
    engine_rpm = random.uniform(500, 3500)
    coolant_temp = engine_temp - random.uniform(0, 10)
    oil_level = random.uniform(30, 100)
    battery_voltage = random.uniform(11.5, 14.5)
    mileage = random.uniform(0, 500000)
    tire_pressure = random.uniform(80, 150)
    fuel_pressure = random.uniform(30, 60)
    rul_hours = random.uniform(0, 1000)

    # Introduce anomalies based on thresholds
    temp_anomaly = 1 if engine_temp > 105 else 0
    tire_pressure_anomaly = 1 if tire_pressure < 920 else 0
    oil_level_anomaly = 1 if oil_level < 40 else 0

    penalty = 0
    if temp_anomaly or tire_pressure_anomaly or oil_level_anomaly:
        penalty = random.uniform(1, 10)

    return [round(engine_temp, 2), round(engine_rpm, 2), round(coolant_temp, 2), round(oil_level, 2),
            round(battery_voltage, 2), round(mileage, 2), round(tire_pressure, 2), round(fuel_pressure, 2),
            round(rul_hours, 2), temp_anomaly, tire_pressure_anomaly, oil_level_anomaly, round(penalty, 2)]

with open('sample2.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for _ in range(15):  # Generate 100 rows
        writer.writerow(generate_row())

print("sample_realistic.csv generated with realistic and diverse data.")
