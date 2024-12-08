const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient');
const problematicIngredients = require('../models/ingredients');
require('dotenv').config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Clear existing data
        await Ingredient.deleteMany({});
        
        // Insert all ingredients
        await Ingredient.insertMany(problematicIngredients);
        
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
    }
}

seedDatabase();