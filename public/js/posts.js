// Function to toggle the new post form visibility
const showNewPostForm = () => {
  const newPostForm = document.querySelector('#new-post-form');
  if (newPostForm.style.display === 'none' || !newPostForm.style.display) {
    newPostForm.style.display = 'block';
  } else {
    newPostForm.style.display = 'none';
  }
};

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

// Function to handle editing a post
const editPostHandler = async (event) => {
  const postId = event.target.getAttribute('data-id'); // Get the post ID from the button's data attribute
  const newTitle = prompt("Enter new title:");
  const newContent = prompt("Enter new content:");

  if (newTitle && newContent) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Reload dashboard after edit
      } else {
        alert('Failed to update post.');
      }
    } catch (err) {
      console.error(err);
    }
  }
};

// Function to handle deleting a post
const deletePostHandler = async (event) => {
  const postId = event.target.getAttribute('data-id'); // Get the post ID from the button's data attribute
  const confirmation = confirm("Are you sure you want to delete this post?");

  if (confirmation) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Reload dashboard after delete
      } else {
        alert('Failed to delete post.');
      }
    } catch (err) {
      console.error(err);
    }
  }
};

// Ensure event listeners are added only after the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Attach event listener to the 'New Post' button
  const newPostBtn = document.querySelector('#new-post-btn');
  if (newPostBtn) {
    newPostBtn.addEventListener('click', () => {
      showNewPostForm();

      // Add the event listener to the form after the form is shown
      const postForm = document.querySelector('#post-form');
      if (postForm) {
        postForm.addEventListener('submit', newPostHandler);
      }
    });
  }

  // Adding event listeners for edit and delete buttons
  document.querySelectorAll('.edit-post-btn').forEach(button => {
    button.addEventListener('click', editPostHandler);
  });

  document.querySelectorAll('.delete-post-btn').forEach(button => {
    button.addEventListener('click', deletePostHandler);
  });
});
