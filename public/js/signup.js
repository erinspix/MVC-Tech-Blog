const signupFormHandler = async (event) => {
    event.preventDefault();

    // Get the form fields with updated IDs
    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    console.log('Username:', username, 'Email:', email, 'Password:', password);

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

document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);
