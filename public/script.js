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
        
        nameCell.textContent = ingredient;
        const problematic = problematicIngredients.find(item => 
            ingredient.toLowerCase().includes(item.name.toLowerCase())
        );
        
        if (problematic) {
            row.classList.add('problematic');
            statusCell.textContent = 'Problematic';
        } else {
            row.classList.add('safe');
            statusCell.textContent = 'Safe';
        }
    });
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});