const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const contents = document.querySelector('#blog-desc').value.trim();
 
  //console.log("Sending Data: ", title, content);
  if (title && contents) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, contents }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
 // console.log("clicked on :", this)
 // console.log("clicked on :", event.target)
 // console.log("clicked on :", event.target.getAttribute('data-id'))
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

  /*
document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);
*/

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);
