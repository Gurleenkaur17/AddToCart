import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

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
let inputField = document.querySelector('#input-field')
let addBtn = document.querySelector('#add-button')
const appSettings = {
    databaseUrl: "https://fir-ad488-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app);

const dbRef = ref(db, 'cart');
let shoppingList = document.querySelector('.shopping-list');

onValue(dbRef, (snapshot)=>{
        if (snapshot.exists()) {
            shoppingList.innerHTML = ''
            let items = Object.entries(snapshot.val());
            items.forEach((item)=>{
                appendToList(item)
            })
        }
        else{
            shoppingList.innerHTML = 'no items here....yet'
        }    
})


addBtn.addEventListener('click', ()=>{
    let inputValue = inputField.value;
    if (inputValue) {
        push(dbRef, inputValue);
        inputField.value = ''
    }
    

    

})

let appendToList = (item) => {
    let itemKey = item[0]
    let itemValue = item[1]
    let list = document.createElement('li');
    list.innerText = itemValue;
    shoppingList.appendChild(list)

    list.addEventListener('dblclick', () => {
        // Get reference to the exact location of the item in the database
        let exactLocation = ref(db, `cart/${itemKey}`);
        // Remove the item from the database
        remove(exactLocation);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-button');

    logoutBtn.addEventListener('click', function() {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out');
                // Redirect the user to the login or home page
                window.location.href = 'index.html'; // Redirect to login.html or home page
            })
            .catch((error) => {
                // An error happened.
                console.error('Error:', error);
                // Handle error gracefully, e.g., display error message to the user
            });
    });
});
