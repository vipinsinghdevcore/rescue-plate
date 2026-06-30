let isLogin = true;

const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const nameGroup = document.getElementById('nameGroup');
const roleGroup = document.getElementById('roleGroup');
const submitBtn = document.getElementById('submitBtn');
const toggleText = document.getElementById('toggleText');
const toggleBtn = document.getElementById('toggleBtn');

// Toggle between Login and Signup
toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
        formTitle.innerText = "Login";
        formSubtitle.innerText = "Welcome back! Please login to your account.";
        nameGroup.style.display = 'none';
        roleGroup.style.display = 'none';
        submitBtn.innerText = "Login";
        toggleText.innerText = "Don't have an account? ";
        toggleBtn.innerText = "Sign up here";
    } else {
        formTitle.innerText = "Sign Up";
        formSubtitle.innerText = "Create an account to start rescuing food.";
        nameGroup.style.display = 'block';
        roleGroup.style.display = 'block';
        submitBtn.innerText = "Sign Up";
        toggleText.innerText = "Already have an account? ";
        toggleBtn.innerText = "Login here";
    }
});

// Handle Form Submit
document.getElementById('authForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('authMessage');

    let url, bodyData;

    if (isLogin) {
        url = 'https://rescue-plate-api-v2.onrender.com/api/auth/login';
        bodyData = { email, password };
    } else {
        url = 'https://rescue-plate-api-v2.onrender.com/api/auth/signup';
        const name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        bodyData = { name, email, password, role };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if (response.ok) {
            messageBox.style.display = 'block';
            messageBox.style.background = '#e8f8f5';
            messageBox.style.color = 'var(--primary-dark)';

            if (isLogin) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                messageBox.innerText = "✅ Login Successful! Redirecting...";
                setTimeout(() => window.location.href = 'index.html', 2000);
            } else {
                messageBox.innerText = "✅ Account created! Please login now.";
                // Switch to login view
                toggleBtn.click();
            }
        } else {
            messageBox.style.display = 'block';
            messageBox.style.background = '#fdecea';
            messageBox.style.color = '#c0392b';
            messageBox.innerText = "❌ " + (data.error || "Something went wrong");
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
