document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  } else {
    console.log('Login form not found');
  }
});

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  console.log('Username:', username, 'Password:', password); // Debugging

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to log in');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
};
