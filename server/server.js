const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./database');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.json());

app.post('/api/check-ingredients', async (req, res) => {
    const { ingredients } = req.body;
    try {
        const [rows] = await db.query(
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