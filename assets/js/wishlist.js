// wishlist.js

document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-items');
    const wishlistCount = document.getElementById('wishlist-count');

    // Retrieve wishlist from localStorage or initialize as empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Example product data (In real scenarios, fetch from a server or database)
    const products = [
        {
            id: "1",
            name: "Product 1",
            price: "$29.99",
            image: "./assets/images/product-1.jpg"
        },
        {
            id: "2",
            name: "Product 2",
            price: "$39.99",
            image: "./assets/images/product-2.jpg"
        },
        // Add more products as needed
    ];

    // Filter products that are in the wishlist
    const wishlistItems = products.filter(product => wishlist.includes(product.id));

    if (wishlistItems.length === 0) {
        document.querySelector('.empty-message').style.display = 'block';
    } else {
        document.querySelector('.empty-message').style.display = 'none';
    }

    // Dynamically create and insert wishlist items into the DOM
    wishlistItems.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('wishlist-item');
        item.setAttribute('data-id', product.id);

        item.innerHTML = `
            <div class="card-banner">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn added" aria-label="Remove from wishlist">
                    <ion-icon name="heart"></ion-icon>
                </button>
            </div>
            <div class="card-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        `;

        wishlistContainer.appendChild(item);
    });

    // Update wishlist count on page load
    wishlistCount.textContent = wishlist.length;

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.wishlist-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wishlistItem = button.closest('.wishlist-item');
            const productId = wishlistItem.getAttribute('data-id');

            // Remove product from wishlist array
            wishlist = wishlist.filter(id => id !== productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));

            // Remove the item from the DOM
            wishlistItem.remove();

            // Update wishlist count
            wishlistCount.textContent = wishlist.length;

            // Show empty message if wishlist is empty
            if (wishlist.length === 0) {
                document.querySelector('.empty-message').style.display = 'block';
            }
        });
    });
});
