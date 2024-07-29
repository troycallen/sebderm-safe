async function checkIngredients() {
    const input = document.getElementById('ingredientInput').value;
    const ingredientList = input.split(',').map(item => item.trim());
    
    try {
        const response = await fetch('/api/check-ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientList }),
        });
        const data = await response.json();
        displayResults(data, ingredientList);
    } catch (error) {
        console.error('Error:', error);
        displayResults([], ingredientList);
    }
}

function displayResults(problematicIngredients, allIngredients) {
    const safeIngredientsDiv = document.getElementById('safeIngredients');
    const problematicIngredientsDiv = document.getElementById('problematicIngredients');
    
    safeIngredientsDiv.innerHTML = "<h3>Safe Ingredients:</h3>";
    problematicIngredientsDiv.innerHTML = "<h3>Potentially Problematic Ingredients:</h3>";

    allIngredients.forEach(ingredient => {
        const problematic = problematicIngredients.find(item => ingredient.toLowerCase().includes(item.name.toLowerCase()));
        const ingredientElement = document.createElement('div');
        ingredientElement.className = 'ingredient';
        ingredientElement.textContent = ingredient;

        if (problematic) {
            ingredientElement.classList.add('problematic');
            ingredientElement.title = problematic.reason;
            problematicIngredientsDiv.appendChild(ingredientElement);
        } else {
            ingredientElement.classList.add('safe');
            safeIngredientsDiv.appendChild(ingredientElement);
        }
    });

    if (safeIngredientsDiv.childElementCount === 1) {
        safeIngredientsDiv.innerHTML += "<p>No safe ingredients found.</p>";
    }
    if (problematicIngredientsDiv.childElementCount === 1) {
        problematicIngredientsDiv.innerHTML += "<p>No problematic ingredients found.</p>";
    }
}