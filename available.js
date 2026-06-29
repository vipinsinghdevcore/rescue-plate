// Fetch all food donations from the backend
async function fetchFood() {
    try {
        const response = await fetch('http://localhost:5000/api/food');
        const foods = await response.json();

        const foodList = document.getElementById('foodList');

        // Clear the "Loading..." text
        foodList.innerHTML = '';

        // If no food is available
        if (foods.length === 0) {
            foodList.innerHTML = '<p style="text-align: center;">No food available right now. Check back later!</p>';
            return;
        }

        // Loop through the array of foods and create HTML cards for each
        foods.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <h3>${food.restaurantName}</h3>
                <p><span class="label">Food Type:</span> ${food.foodType}</p>
                <p><span class="label">Quantity:</span> ${food.quantity}</p>
                <p><span class="label">Pickup Address:</span> ${food.address}</p>
                <p><span class="label">Best Time:</span> ${food.pickupTime}</p>
            `;
            foodList.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching food:', error);
        document.getElementById('foodList').innerHTML = '<p style="text-align: center; color: red;">Failed to load food. Is the backend running?</p>';
    }
}

// Call the function when the page loads
fetchFood();