// Function to toggle the new post form visibility
const showNewPostForm = () => {
    const newPostForm = document.querySelector('#new-post-form');
    
    // Toggle the form visibility. If it's hidden, show it; if shown, hide it.
    if (newPostForm.style.display === 'none' || !newPostForm.style.display) {
      newPostForm.style.display = 'block';
    } else {
      newPostForm.style.display = 'none';
    }
  };
  
  // Attach event listener to the 'New Post' button
  document.querySelector('#new-post-btn')?.addEventListener('click', showNewPostForm);
  
  // Function to handle new post submission
  const newPostHandler = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }), // Send title and content as JSON
        });
  
        if (response.ok) {
          // Redirect to dashboard to show the new post
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create post.');
        }
      } catch (err) {
        console.error('Error creating post:', err);
      }
    } else {
      alert('Please fill out both the title and content fields.');
    }
  };
  
  // Attach event listener to the post form submission
  document.querySelector('#post-form')?.addEventListener('submit', newPostHandler);
  