// Get product price from the h2 element
function getProductPrice() {
    const priceElement = document.querySelector('.details-box h2');
    if (!priceElement) return 0;
    const priceText = priceElement.textContent;
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
}

// Format price in Rupees
function formatPrice(price) {
    return '₹ ' + price.toFixed(2);
}

// Update bargain button state based on quantity
function updateBargainButton() {
    const quantity = parseInt(document.getElementById('first').value);
    const bargainButton = document.querySelector('.Bargain');
    
    if (quantity >= 10) {
        bargainButton.style.pointerEvents = 'auto';
        bargainButton.style.opacity = '1';
    } else {
        bargainButton.style.pointerEvents = 'none';
        bargainButton.style.opacity = '0.7';
    }
}

// Initialize quantity input
function initializeQuantityInput() {
    const quantityInput = document.getElementById('first');
    const totalInput = document.getElementById('second');
    
    // Set initial values
    quantityInput.value = 1;
    quantityInput.min = 0;
    quantityInput.step = 1;
    totalInput.readOnly = true;
    
    // Calculate initial total and update bargain button
    updateTotal();
    updateBargainButton();
    
    // Add event listeners for quantity changes
    quantityInput.addEventListener('input', function() {
        if (this.value === '') {
            this.value = 0;
        }
        updateTotal();
        updateBargainButton();
    });
    
    quantityInput.addEventListener('change', function() {
        if (this.value < 0) {
            this.value = 0;
        }
        updateTotal();
        updateBargainButton();
    });
}

// Update total
function updateTotal() {
    const quantity = document.getElementById('first').value;
    const pricePerUnit = getProductPrice();
    
    // Validate quantity
    if (quantity < 0) {
        document.getElementById('first').value = 0;
        document.getElementById('second').value = formatPrice(0);
        updateBargainButton();
        return;
    }
    
    const total = quantity * pricePerUnit;
    document.getElementById('second').value = formatPrice(total);
}

// Increment quantity
function incrementQuantity() {
    const quantityInput = document.getElementById('first');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotal();
    updateBargainButton();
}

// Decrement quantity
function decrementQuantity() {
    const quantityInput = document.getElementById('first');
    const newValue = Math.max(0, parseInt(quantityInput.value) - 1);
    quantityInput.value = newValue;
    updateTotal();
    updateBargainButton();
}

// Initialize bargain modal
function initializeBargainModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <form class="bargain-form">
                <h3>Negotiate Price</h3>
                <div class="price-info">
                    <span>Current Price:</span>
                    <span id="current-price"></span>
                </div>
                <div class="price-info">
                    <span>Quantity:</span>
                    <span id="bargain-quantity"></span>
                </div>
                <div class="price-info">
                    <span>Total Price:</span>
                    <span id="total-price"></span>
                </div>
                <input type="number" id="bargain-price" placeholder="Enter your desired price per unit" step="0.01">
                <div class="error-message" id="price-error"></div>
                <button type="submit">Submit Offer</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Add event listeners for modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Handle bargain button click
    const bargainBtn = document.querySelector('.Bargain');
    bargainBtn.onclick = (e) => {
        e.preventDefault();
        const currentPrice = getProductPrice();
        const quantity = parseInt(document.getElementById('first').value);
        const total = currentPrice * quantity;

        // Update the modal with current values
        modal.querySelector('#current-price').textContent = formatPrice(currentPrice);
        modal.querySelector('#bargain-quantity').textContent = quantity;
        modal.querySelector('#total-price').textContent = formatPrice(total);

        modal.style.display = 'block';
    };

    // Handle bargain form submission
    const bargainForm = modal.querySelector('.bargain-form');
    bargainForm.onsubmit = (e) => {
        e.preventDefault();
        const currentPrice = getProductPrice();
        const offeredPrice = parseFloat(document.getElementById('bargain-price').value);
        const errorElement = document.getElementById('price-error');

        // Validate the offered price
        if (isNaN(offeredPrice) || offeredPrice <= 0) {
            errorElement.textContent = 'Please enter a valid price';
            errorElement.style.display = 'block';
            return;
        }

        // Check if the offered price is too low (e.g., less than 70% of current price)
        const minAcceptablePrice = currentPrice * 0.7;
        if (offeredPrice < minAcceptablePrice) {
            errorElement.textContent = `Minimum acceptable price is ${formatPrice(minAcceptablePrice)}`;
            errorElement.style.display = 'block';
            return;
        }

        // If everything is valid, process the offer
        errorElement.style.display = 'none';
        alert('Your offer has been submitted successfully! We will contact you soon.');
        modal.style.display = 'none';
        document.getElementById('bargain-price').value = '';
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeQuantityInput();
    initializeBargainModal();
});