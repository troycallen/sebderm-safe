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
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
        displayResults([]);
    }
}

function displayResults(problematicIngredients) {
    const resultsDiv = document.getElementById('results');
    if (problematicIngredients.length > 0) {
        resultsDiv.innerHTML = "<h2>Potentially problematic ingredients:</h2>" + 
            problematicIngredients.map(ing => `<p><strong>${ing.name}</strong>: ${ing.reason}</p>`).join('');
    } else {
        resultsDiv.innerHTML = "<p>No known problematic ingredients found.</p>";
    }
}