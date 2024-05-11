const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const blog_id = document.querySelector('.new-comment-form').data-id;
    const comment = document.querySelector('#comment-text').value.trim();
    // console.log("Sending Data: ", comment);
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ blog_id, comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
