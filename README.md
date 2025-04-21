# Smart Fleet Guardian

**Smart Fleet Guardian** is a predictive maintenance system designed to enhance fleet management by forecasting potential failures before they happen.
Using machine learning and real-time data monitoring, it helps fleet operators improve vehicle reliability, reduce downtime, and optimize maintenance schedules.

---

## 🚀 Features
- Predictive maintenance alerts using a Random Forest Machine Learning model
- Dashboard to monitor real-time fleet health and performance
- Historical data visualization for better decision-making
- Automated maintenance scheduling recommendations
- Scalable system architecture built for growing fleets

---

## 🛠️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL
- **Machine Learning**: Random Forest Algorithm
- **APIs**: RESTful APIs for frontend-backend communication

---

## 📦 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-fleet-guardian.git
   cd smart-fleet-guardian
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Database Setup**
   - Install PostgreSQL
   - Create the necessary tables and seed initial data (scripts available in `/backend/db`)

5. **Environment Variables**
   Create a `.env` file in both frontend and backend with necessary environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_url
   PORT=backend_server_port
   FRONTEND_URL=http://localhost:3000
   ```

---

## 📊 Machine Learning Model
- The Random Forest model is trained using historical fleet data (mileage, usage patterns, sensor readings, etc.)
- Predictions are made server-side and results are sent to the dashboard in real-time.

---

## ✨ Future Enhancements
- Live vehicle telematics integration
- Driver behavior analysis
- Mobile app version
- AI-driven maintenance cost optimization

---

## 👥 Team
- **Shaldon Barnes**
-**Parimi Saketh Kumar**
-**Anish Bhat**

---

## 📄 License
This project is licensed under the **MIT License** — see the LICENSE file for details.

---

# 🚚💨 *Smart Fleet Guardian: Keep your fleet moving smarter, not harder.*
