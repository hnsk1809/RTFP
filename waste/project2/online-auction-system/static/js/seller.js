// js/seller.js

document.addEventListener('DOMContentLoaded', function () {
    const addGadgetForm = document.getElementById('add-gadget-form');

    if (!addGadgetForm) return;

    addGadgetForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent default form submission

        const formData = new FormData();

        // Append images
        const imageFiles = document.getElementById('gadget-images').files;
        for (let i = 0; i < imageFiles.length; i++) {
            formData.append('gadget-images', imageFiles[i]);
        }

        // Append other fields
        formData.append('gadget-name', document.getElementById('gadget-name').value);
        formData.append('gadget-features', document.getElementById('gadget-features').value);
        formData.append('gadget-age', document.getElementById('gadget-age').value);
        formData.append('gadget-status', document.getElementById('gadget-status').value);
        formData.append('initial-bid', document.getElementById('initial-bid').value);
        formData.append('bidding-start', document.getElementById('bidding-start').value);
        formData.append('bidding-end', document.getElementById('bidding-end').value);

        fetch('/api/gadgets', {
            method: 'POST',
            body: formData,
        })
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Gadget added successfully!');
                addGadgetForm.reset();
            } else {
                alert(data.message || 'Error adding gadget.');
            }
        })
        .catch(error => {
            console.error('Error adding gadget:', error);
            alert('Error adding gadget.');
        });
    });
});
