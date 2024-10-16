const loginForm = document.querySelector('#login-form');

// Function to handle user login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to dashboard upon successful login
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    } catch (err) {
      console.error(err);
    }
  }
};

loginForm?.addEventListener('submit', loginFormHandler);
