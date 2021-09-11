const email = document.getElementById('email')
const password = document.getElementById('password')
const message = document.getElementById('message')
const memberName = document.getElementById('text')
const memberemail = document.getElementById('memberemail')
var db = firebase.firestore();
var uid;
let select = document.getElementById('select')


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
            window.location = 'teamdashboard.html' 
        })
        .catch((error) => {
                        console.error(error);
                        errorMsg.innerHTML = error.message
                    })
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;
      console.log(user)
      console.log(uid)
      console.log(select.options[select.selectedIndex].text)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });


function createTeam(){

    db.collection("team").doc(uid).set({
        memberName : memberName.value,
        memberemail : memberemail.value,
        select: select.options[select.selectedIndex].text
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
// const memberName = document.getElementById('text')
// const memberemail = document.getElementById('memberemail')
// let select = document.getElementById('team')
    // let obj = {
    //     memberName : memberName.value,
    //     memberemail : memberemail.value,
    //     select: select.options[select.selectedIndex].text
    // }
    // console.log(obj)
    // db.collection('team').doc().set(obj)
  }