const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginForm = document.querySelector('#login-form')
const signupUsername = document.querySelector('#signup-username')
const signupPassword = document.querySelector('#signup-password')
const signUpForm = document.querySelector('#signup-form')

const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
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
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim(); // Ensure email is captured
    const password = document.querySelector('#signup-password').value.trim();
  
    if (username && email && password) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }), // Include email in request
        });
  
        if (response.ok) {
          // Redirect to dashboard upon successful signup
          document.location.replace('/dashboard');
        } else {
          alert('Failed to sign up.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  
  document
    .querySelector('#login-form')
    ?.addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('#signup-form')
    ?.addEventListener('submit', signupFormHandler);
  