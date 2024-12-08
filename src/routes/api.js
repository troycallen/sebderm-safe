const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredients');

// GET all ingredients
router.get('/ingredients', async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching ingredients' });
    }
});

// GET single ingredient by name
router.get('/ingredients/:name', async (req, res) => {
    try {
        const ingredient = await Ingredient.findOne({ 
            name: new RegExp(req.params.name, 'i') 
        });
        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching ingredient' });
    }
});

// POST check multiple ingredients (your existing endpoint)
router.post('/ingredients/check', async (req, res) => {
    try {
        const { ingredients } = req.body;
        const problematicIngredients = await Ingredient.find({
            name: { $in: ingredients.map(ing => new RegExp(ing.trim(), 'i')) }
        });
        res.json(problematicIngredients);
    } catch (error) {
        res.status(500).json({ error: 'Error checking ingredients' });
    }
});

module.exports = router;