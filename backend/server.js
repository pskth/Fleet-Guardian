require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // INSECURE - for development only!
  }
});

pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ PostgreSQL connection failed:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Store plain password (for development only)
    await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
      [firstName, lastName, email, password]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT first_name, last_name, email FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    res.json({ 
      message: 'Login successful',
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful',
      user: result.rows[0] 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

