// Function to check ingredients against a list of problematic ones
async function checkIngredients() {
    // Get the input value and split it into an array of ingredients
    const input = document.getElementById('ingredientInput').value;
    let ingredientList = input.split(',').map(item => item.trim().toLowerCase());
    
    // Remove duplicate ingredients
    ingredientList = [...new Set(ingredientList)];

    try {
        // Send a POST request to the server with the ingredient list
        const response = await fetch('/api/check-ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientList }),
        });
        // Parse the JSON response from the server
        const data = await response.json();
        // Display the results, passing both problematic and all ingredients
        displayResults(data, ingredientList);
    } catch (error) {
        // Log any errors and display an empty result
        console.error('Error:', error);
        displayResults([], ingredientList);
    }
}

// Function to display the results of ingredient checking
function displayResults(problematicIngredients, allIngredients) {
    // Get the results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Create divs for safe and problematic ingredients
    const safeIngredientsDiv = document.createElement('div');
    safeIngredientsDiv.id = 'safeIngredients';
    const problematicIngredientsDiv = document.createElement('div');
    problematicIngredientsDiv.id = 'problematicIngredients';

    // Set the headers for each section
    safeIngredientsDiv.innerHTML = "<h3>Safe Ingredients:</h3>";
    problematicIngredientsDiv.innerHTML = "<h3>Potentially Problematic Ingredients:</h3>";

    // Iterate through all ingredients
    allIngredients.forEach(ingredient => {
        // Check if the ingredient is in the problematic list
        const problematic = problematicIngredients.find(item => ingredient.includes(item.name.toLowerCase()));
        // Create a new div element for the ingredient
        const ingredientElement = document.createElement('div');
        ingredientElement.className = 'ingredient';
        ingredientElement.textContent = ingredient;

        if (problematic) {
            // If problematic, add to the problematic ingredients list
            ingredientElement.classList.add('problematic');
            ingredientElement.title = problematic.reason;
            problematicIngredientsDiv.appendChild(ingredientElement);
        } else {
            // If safe, add to the safe ingredients list
            ingredientElement.classList.add('safe');
            safeIngredientsDiv.appendChild(ingredientElement);
        }
    });

    // Display a message if no safe ingredients are found
    if (safeIngredientsDiv.childElementCount === 1) {
        safeIngredientsDiv.innerHTML += "<p>No safe ingredients found.</p>";
    }
    // Display a message if no problematic ingredients are found
    if (problematicIngredientsDiv.childElementCount === 1) {
        problematicIngredientsDiv.innerHTML += "<p>No problematic ingredients found.</p>";
    }

    // Append the result divs to the results container
    resultsContainer.appendChild(safeIngredientsDiv);
    resultsContainer.appendChild(problematicIngredientsDiv);

    // Make the results visible
    resultsContainer.style.display = 'block';
}

// Function to handle image upload and processing
async function uploadImage() {
    // Get the file input element and the selected file
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image to upload');
        return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Send a POST request to the server with the image file
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        // Parse the JSON response from the server
        const data = await response.json();
        // Display the results from the image processing
        displayResults(data.problematicIngredients, data.ingredients);
    } catch (error) {
        // Log any errors and display an alert
        console.error('Upload error:', error);
        alert('Error uploading image');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'none'; // Hide results initially
});