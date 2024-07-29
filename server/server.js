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
  { name: 'mineral oil', reason: 'May trap heat and moisture, creating an environment for yeast growth' },
  { name: 'coconut oil', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'soybean oil', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'sesame oil', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'peanut oil', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'wheat germ oil', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'corn oil', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'linoleic acid', reason: 'Can be metabolized by Malassezia, potentially worsening symptoms' },
  { name: 'polysorbates (e.g., polysorbate 20, 60, 80)', reason: 'Can feed Malassezia yeast' },
  { name: 'esters (e.g., isopropyl myristate, isopropyl palmitate)', reason: 'Can feed Malassezia yeast' },
  { name: 'fatty alcohols (e.g., cetyl alcohol, stearyl alcohol)', reason: 'Can feed Malassezia yeast' },
  { name: 'sorbitan oleate', reason: 'Can feed Malassezia yeast' },
  { name: 'glyceryl stearate', reason: 'Can feed Malassezia yeast' },
  { name: 'oleyl alcohol', reason: 'Can feed Malassezia yeast' },
  { name: 'butylene glycol', reason: 'Can feed Malassezia yeast' },
  { name: 'sorbitol', reason: 'Can feed Malassezia yeast' },
  { name: 'beeswax', reason: 'Can create a barrier that traps moisture and heat, promoting yeast growth' },
  { name: 'cholesterol', reason: 'Can be used by Malassezia yeast' },
  { name: 'ethoxylated ingredients (e.g., PEGs)', reason: 'Can feed Malassezia yeast' },
  { name: 'lauric acid', reason: 'Can be metabolized by Malassezia, potentially worsening symptoms' },
  { name: 'palmitic acid', reason: 'Can be metabolized by Malassezia, potentially worsening symptoms' },
  { name: 'myristic acid', reason: 'Can be metabolized by Malassezia, potentially worsening symptoms' },
  { name: 'stearic acid', reason: 'Can be metabolized by Malassezia, potentially worsening symptoms' },
  { name: 'caprylic/capric triglyceride', reason: 'Can feed Malassezia yeast' },
  { name: 'triolein', reason: 'Can feed Malassezia yeast' },
  { name: 'shea butter', reason: 'Contains fatty acids that can feed Malassezia yeast' },
  { name: 'squalane', reason: 'Can feed Malassezia yeast' },
  { name: 'castor oil', reason: 'Can feed Malassezia yeast' },
  { name: 'jojoba oil', reason: 'Can feed Malassezia yeast' },
  { name: 'grape seed oil', reason: 'Can feed Malassezia yeast' },
  { name: 'rice bran oil', reason: 'Can feed Malassezia yeast' },
  { name: 'sweet almond oil', reason: 'Can feed Malassezia yeast' },
  { name: 'evening primrose oil', reason: 'Can feed Malassezia yeast' },
  { name: 'borage oil', reason: 'Can feed Malassezia yeast' },
  { name: 'sunflower oil', reason: 'Can feed Malassezia yeast' },
  { name: 'macadamia oil', reason: 'Can feed Malassezia yeast' }
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