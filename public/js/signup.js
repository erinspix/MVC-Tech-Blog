const signupFormHandler = async (event) => {
    event.preventDefault();

    // Get the form fields
    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    // Log the form inputs for debugging
    console.log('Username:', username, 'Email:', email, 'Password:', password);

    // Ensure all fields are filled
    if (username && email && password) {
        try {
            // Send the signup request to the server
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            // Check if the response is successful
            if (response.ok) {
                document.location.replace('/dashboard'); // Redirect to the dashboard
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to sign up'); // Display error message
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    } else {
        alert('Please fill out all fields.'); // Alert if any field is missing
    }
};

// Add event listener to the signup form
document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);
