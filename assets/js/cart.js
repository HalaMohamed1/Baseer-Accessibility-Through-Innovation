// Sample Cart Data
let cart = [
    { id: 1, name: "Baseer Basic", price: 199, quantity: 1 },
    { id: 2, name: "Baseer Pro", price: 599, quantity: 1 }
];

// Update cart items in the DOM
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");
    cartItems.innerHTML = ""; // Clear existing items
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        saveCartToLocalStorage(); // Save updated cart to localStorage
        renderCart(); // Re-render the cart
    }
}

// Proceed to checkout
document.getElementById("proceed-to-checkout").addEventListener("click", () => {
    saveCartToLocalStorage(); // Save the cart to localStorage before navigation
    window.location.href = "checkout.html"; // Redirect to checkout page
});

// Initialize cart on page load
cart = loadCartFromLocalStorage(); // Load the cart from localStorage if available
renderCart();


// Save cart details to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart details from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}