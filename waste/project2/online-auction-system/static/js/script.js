/* script.js */

//  General utility functions (if any)

//  Example: Function to fetch data (you'll need to adapt this)
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;  // Re-throw the error to be handled elsewhere
    }
}

//  Example: Function to format dates (if needed)
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
}

//  Event listeners or DOM manipulation that are common across pages
document.addEventListener("DOMContentLoaded", function() {
    //  Code to run when the DOM is fully loaded
    //  Example: Initialize common components, etc.

    // Example: Add a click listener to a navigation link
    const homeLink = document.querySelector('a[href="/"]');
    if (homeLink) {
        homeLink.addEventListener('click', (event) => {
            console.log('Home link clicked');
            // You can add logic here to prevent default behavior or perform actions
        });
    }
});