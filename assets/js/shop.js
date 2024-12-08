// shop.js

document.addEventListener('DOMContentLoaded', () => {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const wishlistCount = document.getElementById('wishlist-count');

    // Retrieve wishlist from localStorage or initialize as empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Update wishlist count on page load
    wishlistCount.textContent = wishlist.length;

    wishlistButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        const productId = productCard.getAttribute('data-id');

        // If product is already in wishlist, update the button state
        if (wishlist.includes(productId)) {
            button.classList.add('added');
            button.innerHTML = '<ion-icon name="heart"></ion-icon>';
        }

        // Add click event listener to toggle wishlist status
        button.addEventListener('click', () => {
            if (wishlist.includes(productId)) {
                // Remove from wishlist
                wishlist = wishlist.filter(id => id !== productId);
                button.classList.remove('added');
                button.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
            } else {
                // Add to wishlist
                wishlist.push(productId);
                button.classList.add('added');
                button.innerHTML = '<ion-icon name="heart"></ion-icon>';
            }
            // Update localStorage
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            // Update wishlist count
            wishlistCount.textContent = wishlist.length;
        });
    });
});
