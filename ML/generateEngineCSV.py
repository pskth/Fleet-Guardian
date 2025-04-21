import random
import pandas as pd

data = []
for i in range(500):
    engine_temp = random.uniform(78, 106)
    engine_rpm = random.uniform(1900, 3300)
    coolant_temp = engine_temp - random.uniform(5, 15)
    oil_level = random.uniform(55, 88)
    battery_voltage = random.uniform(11.5, 13.7)
    mileage = random.uniform(60000, 250000)
    tire_pressure = random.uniform(900, 1100)
    fuel_pressure = random.uniform(30, 60)
    penalty = 0
    rul_hours = random.uniform(100, 1300)
    temp_anomaly = 0

    # Introduce a higher probability of anomaly at higher engine temps
    if engine_temp > 95:
        temp_anomaly = 1
        penalty = random.uniform(3, 10)
    elif engine_temp < 85:
        penalty = random.uniform(0, 2)

    data.append([engine_temp, engine_rpm, coolant_temp, oil_level, battery_voltage, mileage, tire_pressure, fuel_pressure, penalty, rul_hours, temp_anomaly])

df = pd.DataFrame(data, columns=['Engine_Temperature', 'Engine_RPM', 'Coolant_Temperature', 'Oil_Level', 'Battery_Voltage', 'Mileage', 'Tire_Pressure', 'Fuel_Pressure', 'penalty', 'RUL_Hours', 'temp_anomaly'])
df.to_csv('engineTemp.csv', index=False)

print("Generated truckData_with_temp_anomaly_large.csv with 500 entries.")