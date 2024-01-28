const postFormHandler = async (event) => {
    event.preventDefault();

    // Get the values from the form
    const title = document.querySelector('#postTitle').value.trim();
    const blog = document.querySelector('#postContent').value.trim();

    if (title && blog) {
        // Send a POST request to the server
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, blog }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If the post is successfully created, redirect to the homepage
            window.location.href = '/';
        } else {
            // Display an error message
            console.error('Failed to create post:', await response.json());
        }
    }
};

document.querySelector('#newPostForm').addEventListener('submit', postFormHandler);

