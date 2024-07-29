const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint
app.post('/api/check-ingredients', async (req, res) => {
  const { ingredients } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM problematic_ingredients WHERE LOWER(name) IN (?)',
      [ingredients.map(ing => ing.toLowerCase())]
    );
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while checking ingredients' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});