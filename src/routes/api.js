const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredients');

router.post('/check-ingredients', async (req, res) => {
    try {
        const { ingredients } = req.body;
        const problematicIngredients = await Ingredient.find({
            name: { $in: ingredients.map(ing => new RegExp(ing.trim(), 'i')) }
        });
        res.json(problematicIngredients);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error checking ingredients' });
    }
});

module.exports = router;