// Toggle language dropdown
const langSelector = document.getElementById('language-selector');
const langDropdown = document.getElementById('lang-dropdown');

if (langSelector && langDropdown) {
    langSelector.addEventListener('click', function(event) {
        event.stopPropagation();
        if (langDropdown.style.display === 'none' || langDropdown.style.display === '') {
            langDropdown.style.display = 'block';
        } else {
            langDropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (langDropdown.style.display === 'block') {
            langDropdown.style.display = 'none';
        }
    });
} else {
    console.warn('Language selector or dropdown not found');
}

// Search prefix suggestions
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const suggestionsBox = document.getElementById('search-suggestions');

const categorySuggestions = [
    'BestSellers',
    'Electronics',
    'Fashion',
    'Makeup',
    'Home & Kitchen',
    'Books',
    'Mobiles',
    'Toys',
    'Sports',
    'Grocery'
];

if (searchIcon && suggestionsBox) {
    searchIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        let suggestionsHtml = '<ul>';
        categorySuggestions.forEach(category => {
            suggestionsHtml += `<li>${category}</li>`;
        });
        suggestionsHtml += '</ul>';
        suggestionsBox.innerHTML = suggestionsHtml;
        suggestionsBox.style.display = 'block';
    });

    suggestionsBox.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            searchInput.value = event.target.textContent;
            suggestionsBox.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (suggestionsBox.style.display === 'block') {
            suggestionsBox.style.display = 'none';
        }
    });
} else {
    console.warn('Search icon or suggestions box not found');
}

// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 1247
    },
    {
        id: 2,
        name: "Smartphone Case - Premium Protection",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 892
    },
    {
        id: 3,
        name: "Portable Bluetooth Speaker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 2156
    },
    {
        id: 4,
        name: "Wireless Charging Pad",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 567
    },
    {
        id: 5,
        name: "USB-C Cable Pack (3 Pack)",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 1234
    },
    {
        id: 6,
        name: "Laptop Stand - Adjustable",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 789
    },
    {
        id: 7,
        name: "Gaming Mouse - RGB",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 1567
    },
    {
        id: 8,
        name: "Mechanical Keyboard",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 2341
    },
    {
        id: 9,
        name: "Webcam HD 1080p",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 945
    },
    {
        id: 10,
        name: "External Hard Drive 1TB",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 1876
    },
    {
        id: 11,
        name: "Tablet Stand - Foldable",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.1,
        reviews: 432
    }
];

// Cart functionality
let cart = [];

// Initialize cart from localStorage
function initializeCart() {
    const savedCart = localStorage.getItem('amazonCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('amazonCart', JSON.stringify(cart));
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showAddedToCartMessage();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        renderCart();
    }
}

// Calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Show "Added to Cart" message
function showAddedToCartMessage() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #232f3e;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1001;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = 'Added to Cart!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">
                <div class="stars">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    cartTotal.textContent = calculateTotal().toFixed(2);
}

// Cart modal functionality
function openCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'block';
        renderCart();
    }
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Firebase config and initialization
const firebaseConfig = window.FIREBASE_CONFIG;
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();

// Get UI elements
const signupForm = document.getElementById('signup-form');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

const logoutSection = document.getElementById('logout-section');
const userEmailSpan = document.getElementById('user-email');

const authPage = document.getElementById('auth-page');

// Helper function to validate email
function isValidEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper function to show error messages
function showError(element, message) {
    let errorElem = element.parentElement.querySelector('.error-message');
    if (!errorElem) {
        errorElem = document.createElement('div');
        errorElem.className = 'error-message';
        errorElem.style.color = 'red';
        errorElem.style.fontSize = '0.9em';
        element.parentElement.appendChild(errorElem);
    }
    errorElem.textContent = message;
}

function clearError(element) {
    let errorElem = element.parentElement.querySelector('.error-message');
    if (errorElem) {
        errorElem.textContent = '';
    }
}

// Keep only Firebase config, initialization, and helper functions here for reuse in login.html and signup.html

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initializeCart();
    
    // Render products
    renderProducts();
    
    // Cart event listeners
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Checkout functionality will be implemented in the future!');
        });
    }
    
    // Close cart when clicking outside
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCart();
            }
        });
    }

    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');
    const userGreeting = document.getElementById('user-greeting');
    if (loginLink && logoutBtn && userGreeting) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is logged in
                loginLink.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
                userGreeting.textContent = user.displayName ? `Hello, ${user.displayName}` : `Hello, ${user.email}`;
            } else {
                // User is not logged in
                loginLink.style.display = 'inline-block';
                logoutBtn.style.display = 'none';
                userGreeting.textContent = '';
            }
        });
        logoutBtn.addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                window.location.reload();
            });
        });
    }
});