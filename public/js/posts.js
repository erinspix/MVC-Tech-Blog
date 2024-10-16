// Function to toggle the new post form visibility
const showNewPostForm = () => {
    const newPostForm = document.querySelector('#new-post-form');
    if (newPostForm.style.display === 'none' || !newPostForm.style.display) {
      newPostForm.style.display = 'block';
    } else {
      newPostForm.style.display = 'none';
    }
  };
  document.querySelector('#new-post-btn').addEventListener('click', showNewPostForm);
  
  // Attach event listener to the 'New Post' button
  document.querySelector('#new-post-btn')?.addEventListener('click', showNewPostForm);
  
  // Function to handle new post submission
  const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create post.');
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Please fill out both the title and content fields.');
    }
  };
  document.querySelector('#post-form').addEventListener('submit', newPostHandler);

  