/* admin.js */

// Function to handle deleting a listing
function deleteListing(listingId) {
    if (confirm("Are you sure you want to delete listing with ID: " + listingId + "?")) {
        // Send a DELETE request to the server
        fetch(`/api/listings/${listingId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Optionally, remove the listing's row from the table
            const row = document.querySelector(`[data-listing-id="${listingId}"]`);
            if (row) {
                row.remove();
            }
            // Provide user feedback (e.g., a success message)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors (e.g., display an error message to the user)
        });
    }
}

// Function to handle blocking a user
function blockUser(userId) {
    if (confirm("Are you sure you want to block user with ID: " + userId + "?")) {
        // Send a PUT or PATCH request to update the user's status
        fetch(`/api/users/${userId}/block`, {
            method: 'PATCH', // Or PUT, depending on your API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isBlocked: true })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Optionally, update the UI (e.g., disable buttons, change user status display)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Example: Add listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-listing-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const listingId = button.getAttribute('data-listing-id');
            deleteListing(listingId);
        });
    });

    // Example: Add listeners to block user buttons
    const blockButtons = document.querySelectorAll('.block-user-btn');
    blockButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.getAttribute('data-user-id');
            blockUser(userId);
        });
    });

    // Add any other initialization code here
});