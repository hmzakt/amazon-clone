document.getElementById('signup-btn').addEventListener('click', function() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const errorDiv = document.getElementById('signup-error');
    errorDiv.textContent = '';
    if (!name) {
        errorDiv.textContent = 'Name is required.';
        return;
    }
    if (!email) {
        errorDiv.textContent = 'Email is required.';
        return;
    }
    if (!password) {
        errorDiv.textContent = 'Password is required.';
        return;
    }
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters.';
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user.updateProfile({ displayName: name });
        })
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            errorDiv.textContent = error.message;
        });
}); 