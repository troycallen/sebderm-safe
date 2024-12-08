const express = require('express');
const path = require('path');
const ingredientsRouter = require('./routes/api');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// API routes
app.use('/api', ingredientsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;