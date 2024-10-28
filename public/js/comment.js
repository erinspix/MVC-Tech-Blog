document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('#comment-form');
  
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const commentText = document.querySelector('#comment-text').value.trim();
        const postId = window.location.pathname.split('/').pop();  // Get the post ID from the URL
  
        if (commentText) {
          try {
            const response = await fetch('/api/comments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ comment_text: commentText, post_id: postId }),
            });
  
            if (response.ok) {
            document.location.reload();  // Reload to show the new comment
            } else {
              alert('Failed to add comment.');
            }
          } catch (err) {
            console.error('Error:', err);
          }
        } else {
          alert('Comment cannot be empty.');
        }
      });
    }
  });
  