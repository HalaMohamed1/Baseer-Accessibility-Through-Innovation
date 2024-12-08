// Load cart data from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}

// Display cart summary in checkout form
function renderCheckoutCart() {
    const cart = loadCartFromLocalStorage();
    const cartSummaryElem = document.getElementById("cart-summary");

    let cartSummaryHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        cartSummaryHTML += `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
        totalPrice += item.price * item.quantity;
    });

    cartSummaryHTML += `<p><strong>Total: $${totalPrice.toFixed(2)}</strong></p>`;
    cartSummaryElem.innerHTML = cartSummaryHTML;
}

// Show/hide card details based on payment method
document.querySelectorAll('input[name="payment-method"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
        const cardDetails = document.getElementById("card-details");
        if (event.target.value === "card") {
            cardDetails.classList.remove("hidden");
        } else {
            cardDetails.classList.add("hidden");
        }
    });
});

// Handle checkout form submission
document.getElementById("checkout-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect user and payment details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    const cart = loadCartFromLocalStorage();

    const orderDetails = {
        name,
        email,
        address,
        paymentMethod,
        cart,
    };

    // Include card details if "Pay by Card" is selected
    if (paymentMethod === "card") {
        orderDetails.payment = {
            cardNumber: document.getElementById("card-number").value,
            expiryDate: document.getElementById("expiry-date").value,
            cvv: document.getElementById("cvv").value,
        };
    }

    console.log("Order Details:", orderDetails);

    // Simulate backend API call
    try {
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderDetails),
        });

        if (response.ok) {
            alert("Order placed successfully!");
            window.location.href = "thankyou.html"; // Redirect to Thank You page
        } else {
            alert("Failed to place the order.");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Something went wrong. Please try again.");
    }
});

// Render cart summary on page load
renderCheckoutCart();