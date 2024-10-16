// Select DOM elements related to login and signup
const loginForm = document.querySelector('#login-form');
const signUpForm = document.querySelector('#signup-form');

// Function to handle user login form submission
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

// Function to handle user signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && email && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
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
// Logout function to handle logging out
const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to homepage after logout
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  } catch (err) {
    console.error(err);
  }
};

// Attach event listener to the logout button
document.querySelector('#logout-btn')?.addEventListener('click', logout);



// Attach event listeners to login and signup forms
loginForm?.addEventListener('submit', loginFormHandler);
signUpForm?.addEventListener('submit', signupFormHandler);

