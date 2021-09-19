const email = document.getElementById('email')
const password = document.getElementById('password')
const message = document.getElementById('message')

let auth = firebase.auth();

function signUp(){
 auth.createUserWithEmailAndPassword(email.value, password.value)
.then((user) => {
    console.log(user)
    message.innerText = 'Register Successfully'
    message.style.color= 'green'
})
.catch((error) => {
    message.innerText = error.message
})
}

function login(){
    auth.signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            console.log(userCredential); 
            window.location = 'game.html' 
        })
        .catch((error) => {
                        console.error(error);
                        errorMsg.innerHTML = error.message
                    })
}





