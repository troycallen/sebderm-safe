const app = require('./app');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Ingredient = require('./models/ingredient');