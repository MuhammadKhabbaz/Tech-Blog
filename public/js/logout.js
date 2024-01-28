document.addEventListener('DOMContentLoaded', (event) => {
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            fetch('/api/users/logout', { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Logout link not found');
    }
});
