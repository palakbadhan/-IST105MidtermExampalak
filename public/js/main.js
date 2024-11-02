/*
  CCTB Website Development
  IST105
  Oct 2024
  Description: This is a simple login website where students are asked to 
  implement Social Network Login with Firebase
*/

/*
Function onAuthStateChanged(user)
Write a function to check if a user is logged
*/

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // ...
            location.href = 'culturalconnections.html';
        } else {
            // User is signed out
            // ...

        }
    });
    // [END auth_state_listener]
}

window.addEventListener('load', function () {


    //Listen for auth state changes
    authStateListener();

    document.getElementById('sign-in-button').addEventListener('click', function () {

        let provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Logging sucessfully', result.user);
                location.href = 'culturalconnections.html';
            })
        // .catch(function (error) {
        //     console.log('Logging fail', error);
        // });
    });

    document.getElementById('sign-in-2').addEventListener('click', function () {

        let emailTxt = document.getElementById('email').value;
        let passtxt = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                // ...
                console.log('Logging sucessfully');
                alert('Logging sucessfully');
                location.href = 'culturalconnections.html';
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert('Logging fail');
                console.log('Logging fail', errorMessage);
            });

    });

    //Listener for Phone Button

    document.getElementById('sign-in-phone').addEventListener('click', function () {

        // [START auth_phone_signin]
        recaptchaVerifierSimple()
        recaptchaRender()

        const phoneNumber = getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;

                window.confirmationResult.confirm("123456").then(() => {
                    alert('Logging sucessfully');
                    location.href = 'culturalconnections.html';
                })
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log('Logging fail', error);
            });
        // [END auth_phone_signin]



        function recaptchaVerifierSimple() {
            // [START auth_phone_recaptcha_verifier_simple]
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            // [END auth_phone_recaptcha_verifier_simple]
        }


        function recaptchaRender() {
            /** @type {firebase.auth.RecaptchaVerifier} */
            const recaptchaVerifier = window.recaptchaVerifier;

            // [START auth_phone_recaptcha_render]
            recaptchaVerifier.render().then((widgetId) => {
                window.recaptchaWidgetId = widgetId;
            });
            // [END auth_phone_recaptcha_render]
        }



        function getPhoneNumberFromUserInput() {
            return "+16505551234";
        }



    });





});









