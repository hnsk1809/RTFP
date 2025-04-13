// js/bidder.js

document.addEventListener('DOMContentLoaded', function() {
    const gadgetListDiv = document.getElementById('gadget-list');
    const gadgetDetailsDiv = document.getElementById('gadget-details');
    const placeBidBtn = document.getElementById('place-bid-btn');
    const bidAmountInput = document.getElementById('bid-amount');
    const bidMessage = document.getElementById('bid-message');

    // --- Helper Functions ---

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function createGadgetItem(gadget) {
        const gadgetDiv = document.createElement('div');
        gadgetDiv.classList.add('gadget-item');

        const image = document.createElement('img');
        image.src = gadget.image;
        image.alt = gadget.name;

        const name = document.createElement('h2');
        name.textContent = gadget.name;

        const bid = document.createElement('p');
        bid.textContent = `Current Bid: $${gadget.currentBid}`;

        const time = document.createElement('p');
        time.textContent = `Time Left: ${gadget.timeLeft}`;

        const detailsLink = document.createElement('a');
        detailsLink.href = `gadget-details.html?id=${gadget.id}`;
        detailsLink.textContent = 'View Details';

        gadgetDiv.appendChild(image);
        gadgetDiv.appendChild(name);
        gadgetDiv.appendChild(bid);
        gadgetDiv.appendChild(time);
        gadgetDiv.appendChild(detailsLink);

        return gadgetDiv;
    }

    function displayGadgetDetails(gadget) {
        if (!gadget || !gadgetDetailsDiv) {
            console.error("Gadget or gadget details container not found.");
            return;
        }

        const gadgetImage = gadgetDetailsDiv.querySelector('.gadget-image img');
        const gadgetName = document.getElementById('gadget-name');
        const gadgetDescription = document.getElementById('gadget-description');
        const currentBid = document.getElementById('current-bid');
        const timeLeft = document.getElementById('time-left');
        const gadgetAge = document.getElementById('gadget-age');
        const gadgetStatus = document.getElementById('gadget-status');

        if (gadgetImage) {
            gadgetImage.src = gadget.image;
            gadgetImage.alt = gadget.name;
        }
        if (gadgetName) {
            gadgetName.textContent = gadget.name;
        }
        if (gadgetDescription) {
            gadgetDescription.textContent = gadget.description;
        }
        if (currentBid) {
            currentBid.textContent = `$${gadget.currentBid}`;
        }
        if (timeLeft) {
            timeLeft.textContent = gadget.timeLeft;
        }
        if (gadgetAge) {
            gadgetAge.textContent = `Age: ${gadget.age} months`;
        }
        if (gadgetStatus) {
            gadgetStatus.textContent = `Status: ${gadget.status}`;
        }
    }

    function handleBid(gadget) {
        if (!gadget || !bidAmountInput || !bidMessage) {
            console.error("Gadget, bid input, or message element not found.");
            return;
        }

        const bidAmount = parseFloat(bidAmountInput.value);

        if (isNaN(bidAmount) || bidAmount <= 0) {
            bidMessage.textContent = "Please enter a valid bid amount.";
            bidMessage.style.color = "red";
            return;
        }

        fetch(`/api/gadgets/${gadget.id}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bidAmount: bidAmount })
        })
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                bidMessage.textContent = data.message;
                bidMessage.style.color = "green";
                if (document.getElementById('current-bid')) {
                    document.getElementById('current-bid').textContent = `$${bidAmount}`;
                }
            } else {
                bidMessage.textContent = data.message;
                bidMessage.style.color = "red";
            }
        })
        .catch(error => {
            console.error('Error placing bid:', error);
            bidMessage.textContent = "Error placing bid.";
            bidMessage.style.color = "red";
        });

        bidAmountInput.value = '';
    }

    // --- Main Execution ---

    const gadgetId = getQueryParam('id');
    if (gadgetId && gadgetDetailsDiv) {
        fetch(`/api/gadgets/${gadgetId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(gadget => {
                displayGadgetDetails(gadget);
                if (placeBidBtn) {
                    placeBidBtn.addEventListener('click', function () {
                        handleBid(gadget);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching gadget details:', error);
                gadgetDetailsDiv.innerHTML = '<p>Error loading gadget details.</p>';
            });
    }

    if (gadgetListDiv) {
        fetch('/api/gadgets')
            .then(response => response.json())
            .then(gadgets => {
                if (!gadgets) return;
                gadgets.forEach(gadget => {
                    const gadgetItem = createGadgetItem(gadget);
                    gadgetListDiv.appendChild(gadgetItem);
                });
            })
            .catch(error => {
                console.error('Error fetching gadgets:', error);
                gadgetListDiv.innerHTML = '<p>Error loading gadgets.</p>';
            });
    }
});
