document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signup-form');

    const signupFormHandler = async (event) => {
        event.preventDefault();

        const username = document.querySelector('#signup-username').value.trim();
        const email = document.querySelector('#signup-email').value.trim();
        const password = document.querySelector('#signup-password').value.trim();

        if (username && email && password) {
            try {
                const response = await fetch('/api/users/signup', {
                    method: 'POST',
                    body: JSON.stringify({ username, email, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || response.statusText);
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    };

    signupForm.addEventListener('submit', signupFormHandler);
});
