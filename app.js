const express = require('express');
const path = require('path');
const ingredientsRouter = require('./routes/api');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api', ingredientsRouter);

module.exports = app;