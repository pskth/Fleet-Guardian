import random
import pandas as pd

num_samples = 500
data = []

for _ in range(num_samples):
    engine_temp = random.uniform(80, 100)
    engine_rpm = random.uniform(2000, 3000)
    coolant_temp = engine_temp - random.uniform(5, 15)
    oil_level = random.uniform(40, 85)  # Broader range for potential anomalies
    battery_voltage = random.uniform(12.0, 13.5)
    mileage = random.uniform(50000, 200000)
    tire_pressure = random.uniform(950, 1050)
    fuel_pressure = random.uniform(40, 55)
    oil_level_anomaly = 0  # Default: no anomaly

    # Introduce conditions for oil level anomaly
    if oil_level < 50 or oil_level > 80:
        oil_level_anomaly = 1
    elif engine_temp > 95 and oil_level < 60:
        oil_level_anomaly = 1
    elif mileage > 150000 and oil_level < 55:
        oil_level_anomaly = 1

    data.append([engine_temp, engine_rpm, coolant_temp, oil_level, battery_voltage, mileage, tire_pressure, fuel_pressure, oil_level_anomaly])

df = pd.DataFrame(data, columns=['Engine_Temperature', 'Engine_RPM', 'Coolant_Temperature', 'Oil_Level', 'Battery_Voltage', 'Mileage', 'Tire_Pressure', 'Fuel_Pressure', 'oil_level_anomaly'])
df.to_csv('oilLevel.csv', index=False)

print("Generated oilLevel.csv with 500 entries.")