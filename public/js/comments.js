const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const blog_id = document.querySelector('[data-id]').dataset.id;
    const comment = document.querySelector('#comment-text').value.trim();
    console.log("Sending Data: ", comment, blog_id );
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
