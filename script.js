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
    return /^[^\s@]+@[^"\s]+\.[^\s@]+$/.test(email);
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