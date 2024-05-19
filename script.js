import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyB4TO2CCQdtkP9wPtKomvUjrH4L_LmiibQ",
    authDomain: "fir-ad488.firebaseapp.com",
    databaseURL: "https://fir-ad488-default-rtdb.firebaseio.com",
    projectId: "fir-ad488",
    storageBucket: "fir-ad488.appspot.com",
    messagingSenderId: "726343758973",
    appId: "1:726343758973:web:dd2c4318862e9765446d14",
    measurementId: "G-YKLJ32S7TP"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    authForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (event.submitter.id === 'signup-btn') {
            // Sign up
            createUserWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                    // Signed up successfully
                    const user = userCredential.user;
                    console.log('User added:', user);
                    // Optionally, you can redirect the user to another page after signup
                    window.location.href = 'login.html'; // Redirect to index.html
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error('Error:', errorMessage);
                    alert('invalid password or email')
                    // Handle error gracefully, e.g., display error message to the user
                });
        } else if (event.submitter.id === 'login-btn') {
            // Log in
            signInWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                    // Logged in successfully
                    const user = userCredential.user;
                    console.log('User logged in:', user);
                    // Optionally, you can redirect the user to another page after login
                    window.location.href = 'login.html'; // Redirect to index.html
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error('Error:', errorMessage);
                    alert('invalid login creds')
                    // Handle error gracefully, e.g., display error message to the user
                });
        }
    });
});
