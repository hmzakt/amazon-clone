document.getElementById('login-btn').addEventListener('click', function() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = '';
    if (!email) {
        errorDiv.textContent = 'Email is required.';
        return;
    }
    if (!password) {
        errorDiv.textContent = 'Password is required.';
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            errorDiv.textContent = error.message;
        });
}); 