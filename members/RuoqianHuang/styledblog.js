let preArray = [
    {
        "title": "Post 1",
        "date": "2023-02-25",
        "summary": "This is the summary for today."
    },
    {
        "title": "Post 2",
        "date": "2023-02-26",
        "summary": "This is the summary for today."
    },
    {
        "title": "Post 3",
        "date": "2023-02-27",
        "summary": "This is the summary for today."
    }
]
  // Get the posts array from localStorage
  let posts = JSON.parse(localStorage.getItem('posts')) || preArray;

  // Save posts array to localStorage
  function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  // Display all posts
  function displayPosts() {
    let postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';
  
    posts.forEach((post, index) => {
      let postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.date}</p>
        <p>${post.summary}</p>
        <i class="fa fa-pencil icon edit-btn"  data-index="${index}" style="cursor: pointer;"></i>
        <i class="fa fa-trash icon delete-btn"  data-index="${index}" style="cursor: pointer;"></i>
      `;
      postsList.appendChild(postDiv);
    });
  }
  
  // Add a new post
  function addPost(e) {
    e.preventDefault();
  
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let summary = document.getElementById('summary').value;
  
    let post = {
      title,
      date,
      summary
    };
  
    posts.push(post);
    savePosts();
    displayPosts();

    // Clear the input fields
    document.getElementById('title-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('summary-input').value = '';
  }
  
 // Edit a post
function editPost(e) {
  if (e.target.classList.contains('edit-btn')) {
    let index = e.target.getAttribute('data-index');
    let post = posts[index];

    // Show custom modal dialog with input fields
    let modal = document.getElementById('edit-post');
    let form = modal.querySelector('form');
    let titleInput = modal.querySelector('#edit-title');
    let dateInput = modal.querySelector('#edit-date');
    let summaryInput = modal.querySelector('#edit-summary');
    let btnUpdate = modal.querySelector('#update-edit');
    let btnCancel = modal.querySelector('#cancel-edit');

    titleInput.value = post.title;
    dateInput.value = post.date;
    summaryInput.value = post.summary;

    modal.style.display = 'block';

    // If user clicks Update, save the edited post
    btnUpdate.addEventListener('click', function(e) {
      e.preventDefault();
      let editedPost = {
        title: titleInput.value,
        date: dateInput.value,
        summary: summaryInput.value,
      };

      posts[index] = editedPost;
      savePosts();
      displayPosts();
      modal.style.display = 'none';
    });

    // If user clicks Cancel, close dialog
    btnCancel.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'none';
    });
  }
}  

// Delete a post
function deletePost(e) {
  if (e.target.classList.contains('delete-btn')) {
    let index = e.target.getAttribute('data-index');
    
    // Show custom modal dialog
    let modal = document.getElementById('confirm-delete');
    let btnYes = document.getElementById('delete-ok');
    let btnNo = document.getElementById('delete-cancel');

    modal.style.display = 'block';

    // If user clicks Yes, delete post
    btnYes.onclick = function() {
      posts.splice(index, 1);

      savePosts();
      displayPosts();

      modal.style.display = 'none';
    }

    // If user clicks No, close dialog
    btnNo.onclick = function() {
      modal.style.display = 'none';
    }
  }
}

document.getElementById('add-btn').addEventListener('click', addPost);
document.getElementById('posts-list').addEventListener('click', editPost);
document.getElementById('posts-list').addEventListener('click', deletePost);

displayPosts();