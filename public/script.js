async function checkIngredients() {
    const input = document.getElementById('ingredientInput').value;
    let ingredientList = input.split(',').map(item => item.trim().toLowerCase());
    
    ingredientList = [...new Set(ingredientList)];

    try {
        const response = await fetch('/api/ingredients/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientList }),
        });
        const data = await response.json();
        // Extract the array from the response
        displayResults(data.problematicIngredients || [], ingredientList);
    } catch (error) {
        console.error('Error:', error);
        displayResults([], ingredientList);
    }
}

function displayResults(problematicIngredients, allIngredients) {
    const resultsDiv = document.getElementById('results');
    const summaryP = document.getElementById('summary');
    const tableBody = document.querySelector('#ingredientsTable tbody');
    
    resultsDiv.style.display = 'block';
    summaryP.textContent = `We found ${problematicIngredients.length} ingredient(s) that could be problematic.`;
    
    tableBody.innerHTML = '';
    
    allIngredients.forEach(ingredient => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const statusCell = row.insertCell(1);
        const reasonCell = row.insertCell(2);
        
        nameCell.textContent = ingredient;
        
        // Ensure problematicIngredients is an array and do case-insensitive comparison
        const problematic = Array.isArray(problematicIngredients) ? 
            problematicIngredients.find(item => 
                ingredient.toLowerCase().includes(item.name.toLowerCase())
            ) : null;
        
        if (problematic) {
            row.classList.add('problematic');
            statusCell.textContent = 'Problematic';
            reasonCell.textContent = problematic.reason;
        } else {
            row.classList.add('safe');
            statusCell.textContent = 'Safe';
            reasonCell.textContent = 'No known issues for seborrheic dermatitis';
        }
    });
}