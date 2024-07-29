const express = require('express');
const router = express.Router();
const problematicIngredients = require('../models/ingredients');

router.post('/check-ingredients', (req, res) => {
    const { ingredients } = req.body;
    const problematic = problematicIngredients.filter(item => 
        ingredients.some(ing => ing.toLowerCase().includes(item.name.toLowerCase()))
    );
    res.json(problematic);
});

module.exports = router;