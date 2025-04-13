// js/auth.js

document.addEventListener('DOMContentLoaded', function () {
    // --- Registration Form ---
    const registerForm = document.getElementById('register-form');
        if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const userType = document.getElementById('user-type').value;
        const registerMessage = document.getElementById('register-message');

        if (password !== confirmPassword) {
            registerMessage.textContent = "Passwords do not match.";
            registerMessage.style.color = "red";
            return;
        }

        // ✅ This is the fetch you were asking about
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                userType: userType
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                registerMessage.textContent = data.message;
                registerMessage.style.color = "green";
                window.location.href = '/login';  // ✅ Redirect after success
            } else {
                registerMessage.textContent = "Something went wrong.";
                registerMessage.style.color = "red";
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            registerMessage.textContent = "Error during registration.";
            registerMessage.style.color = "red";
        });
    });
}


    // --- Login Form ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('login-message');

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(async response => {
                    const data = await response.json();
                    if (response.ok) {
                        loginMessage.textContent = data.message || "Login successful!";
                        loginMessage.style.color = "green";

                        // Redirect user based on their role
                        if (data.userType === 'seller') {
                            window.location.href = '/seller/dashboard';
                        } else if (data.userType === 'bidder') {
                            window.location.href = '/bidder/dashboard';
                        } else if (data.userType === 'admin') {
                            window.location.href = '/admin/dashboard';
                        }
                        
                    } else {
                        loginMessage.textContent = data.message;
                        loginMessage.style.color = "red";
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    loginMessage.textContent = "Error during login.";
                    loginMessage.style.color = "red";
                });
        });
    }
});
