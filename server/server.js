const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// In-memory storage for problematic ingredients
const problematicIngredients = [
  { name: 'oleic acid', reason: 'May increase skin cell turnover, potentially exacerbating flaking' },
  { name: 'olive oil', reason: 'Contains oleic acid, which may worsen symptoms' },
  { name: 'avocado oil', reason: 'High in oleic acid, potentially irritating' },
  { name: 'lanolin', reason: 'Can cause allergic reactions in some individuals' },
  { name: 'mineral oil', reason: 'May trap heat and moisture, creating an environment for yeast growth' }
];

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.post('/api/check-ingredients', (req, res) => {
    const { ingredients } = req.body;
    const problematic = problematicIngredients.filter(item => 
        ingredients.some(ing => ing.toLowerCase().includes(item.name.toLowerCase()))
    );
    res.json(problematic);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});