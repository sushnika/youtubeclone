// Hamburger menu functionality
let menu = document.querySelector('.hamburger-menu');
let sidebar = document.querySelector('.sidebar');
let mainContainer = document.querySelector('.main-container');
let card = document.querySelectorAll('.card');

menu.addEventListener('click', function() {
    sidebar.classList.toggle('smaller-sidebar');
    mainContainer.classList.toggle('expand-container');

    card.forEach(function(cards) {
        cards.classList.toggle('expand-card');
    });
});

// Function to load comments from localStorage
function loadComments() {
    let storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    
    updateCommentCount(storedComments.length);

    storedComments.forEach(comment => {
        let newCommentDiv = document.createElement('div');
        newCommentDiv.classList.add('previous-comments', 'mt-30', 'd-flex');

        newCommentDiv.innerHTML = `
            <img src="images/my-img.jpeg" alt="" class="channel-icon">
            <div class="name-comment">
                <p>@sushnikavlogs</p>
                <p class="comment">${comment}</p>
            </div>
        `;

        previousCommentsContainer.prepend(newCommentDiv);
    });
}

// Function to save comments to localStorage
function saveComment(comment) {
    let storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    storedComments.unshift(comment);  // Add the new comment at the beginning of the array
    localStorage.setItem('comments', JSON.stringify(storedComments));

    updateCommentCount(storedComments.length);  // Update the comment count
}

// Function to update the comment count in the DOM
function updateCommentCount(count) {
    document.getElementById('comment-count').textContent = count;
}

// Adding comments functionality
let commentInput = document.querySelector('.write-comment-container input');
let previousCommentsContainer = document.querySelector('.previous-comment-container');

commentInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && commentInput.value.trim() !== '') {
        let newCommentText = commentInput.value.trim();

        let newCommentDiv = document.createElement('div');
        newCommentDiv.classList.add('previous-comments', 'mt-30', 'd-flex');

        newCommentDiv.innerHTML = `
            <img src="images/my-img.jpeg" alt="" class="channel-icon">
            <div class="name-comment">
                <p>@sushnikavlogs</p>
                <p class="comment">${newCommentText}</p>
            </div>
        `;

        previousCommentsContainer.prepend(newCommentDiv);  // Prepend the new comment
        saveComment(newCommentText);  // Save the comment to localStorage

        commentInput.value = '';  // Clear the input field
    }
});

// Load comments from localStorage when the page loads
window.onload = loadComments;
