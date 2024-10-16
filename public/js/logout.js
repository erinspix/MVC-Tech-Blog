// Function to handle logging out
const logout = async () => {
    try {
      // Send a POST request to the logout API route
      const response = await fetch('/api/userRoutes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the response is OK, redirect to the homepage
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };
  
  // Attach an event listener to the logout button
  document.querySelector('#logout-btn')?.addEventListener('click', logout);
  