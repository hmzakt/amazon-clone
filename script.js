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

// Signup event
if (signupBtn) {
    signupBtn.addEventListener('click', function() {
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        clearError(signupEmail);
        clearError(signupPassword);
        let hasError = false;
        if (!email) {
            showError(signupEmail, 'Email is required.');
            hasError = true;
        } else if (!isValidEmail(email)) {
            showError(signupEmail, 'Enter a valid email address.');
            hasError = true;
        }
        if (!password) {
            showError(signupPassword, 'Password is required.');
            hasError = true;
        } else if (password.length < 6) {
            showError(signupPassword, 'Password must be at least 6 characters.');
            hasError = true;
        }
        if (hasError) return;
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up
                showError(signupEmail, '');
                showError(signupPassword, '');
                signupEmail.value = '';
                signupPassword.value = '';
                alert('Signup successful!');
            })
            .catch((error) => {
                showError(signupEmail, error.message);
            });
    });
} else {
    console.warn('Signup button not found');
}

// Login event
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        clearError(loginEmail);
        clearError(loginPassword);
        let hasError = false;
        if (!email) {
            showError(loginEmail, 'Email is required.');
            hasError = true;
        } else if (!isValidEmail(email)) {
            showError(loginEmail, 'Enter a valid email address.');
            hasError = true;
        }
        if (!password) {
            showError(loginPassword, 'Password is required.');
            hasError = true;
        }
        if (hasError) return;
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Logged in
                showError(loginEmail, '');
                showError(loginPassword, '');
                loginEmail.value = '';
                loginPassword.value = '';
                alert('Login successful!');
            })
            .catch((error) => {
                showError(loginEmail, error.message);
            });
    });
} else {
    console.warn('Login button not found');
}

// Auth state change
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        signupForm.style.display = 'none';
        loginForm.style.display = 'none';
        logoutSection.style.display = 'block';
        userEmailSpan.textContent = user.email;
    } else {
        // No user is signed in
        signupForm.style.display = 'block';
        loginForm.style.display = 'block';
        logoutSection.style.display = 'none';
        userEmailSpan.textContent = '';
    }
});

// Modal and navbar logic
const navSignin = document.querySelector('.nav-signin');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');

if (navSignin && authPage && showSignupLink && showLoginLink && loginForm && signupForm) {
    // Helper to show/hide auth page
    function showAuthPage(form) {
        if (form === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
        authPage.style.display = 'flex';
    }
    function hideAuthPage() {
        authPage.style.display = 'none';
        clearError(loginEmail);
        clearError(loginPassword);
        clearError(signupEmail);
        clearError(signupPassword);
    }

    // Navbar click logic
    let isLoggedIn = false;
    navSignin.addEventListener('click', function(e) {
        e.preventDefault();
        if (isLoggedIn) {
            auth.signOut()
                .then(() => {
                    // UI will update via onAuthStateChanged
                })
                .catch((error) => {
                    alert(error.message);
                });
        } else {
            showAuthPage('login');
        }
    });

    // Switch between login/signup
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthPage('signup');
    });
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthPage('login');
    });

    // Update navbar text on auth state change
    function updateNavSignin(user) {
        const span = navSignin.querySelector('span');
        const p2 = navSignin.querySelector('.nav-second');
        if (user) {
            isLoggedIn = true;
            span.textContent = 'Log out';
            p2.style.display = 'none';
        } else {
            isLoggedIn = false;
            span.textContent = 'Hello, sign in';
            p2.style.display = '';
        }
    }

    // Update on auth state
    auth.onAuthStateChanged((user) => {
        updateNavSignin(user);
        if (user) {
            hideAuthPage();
        }
    });
} else {
    console.warn('One or more auth page/navbar elements not found');
}