// Security Check: If user is not logged in, kick them to the login page!
const token = localStorage.getItem('token');
if (!token) {
    alert("You must be logged in to donate food.");
    window.location.href = 'login.html'; // Redirect them
}
document.getElementById('donateForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevents the page from reloading

    // 1. Get the data from the form
    const donationData = {
        restaurantName: document.getElementById('restaurantName').value,
        foodType: document.getElementById('foodType').value,
        quantity: document.getElementById('quantity').value,
        address: document.getElementById('address').value,
        pickupTime: document.getElementById('pickupTime').value
    };

    try {
        // 2. Send the data to your Backend API
        const response = await fetch('http://localhost:5000/api/food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donationData)
        });

        if (response.ok) {
            // 3. Show success message and clear the form
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('donateForm').reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to connect to the server. Make sure your backend is running!");
    }
});