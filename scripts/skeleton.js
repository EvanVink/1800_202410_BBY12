function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('./nav-after-login.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./nav-before-login.html'));
        }
    });
}
loadSkeleton(); //