// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Animated Number Counters
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the faster

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight / 1.2;

    counters.forEach(counter => {
        const counterTop = counter.getBoundingClientRect().top;

        if (counterTop < triggerBottom && !counter.classList.contains('counted')) {
            counter.classList.add('counted'); // Prevents it from running multiple times

            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Calculate increment
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            updateCount();
        }
    });
}); // ==========================================
// AUTHENTICATION UI LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (token) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        // User is logged out
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }

    // Handle Logout Click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token'); // Destroy the token
            alert("You have been logged out successfully.");
            window.location.href = 'login.html'; // Send them to login page
        });
    }
});