const commentFormHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#postId').value;
    const comment = document.querySelector('#comment').value.trim();

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, postId }), // Send both comment and postId
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Refresh the page to show the new comment
            window.location.reload();
        } else {
            // Display an error message
            console.error('Failed to post comment:', await response.json());
        }
    }
};

document.querySelector('#commentForm').addEventListener('submit', commentFormHandler);
