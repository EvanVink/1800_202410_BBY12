
  

function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#navbarPlaceholder').load('./nav-after-login.html', function() {
                // Content loaded successfully, now call client.js
                loadClient();
            });
        } else {
            $('#navbarPlaceholder').load('./nav-before-login.html');
        }
    });
}

function loadClient() {
    // Call client.js after the navbar content is fully loaded
    var script = document.createElement('script');
    script.src = './scripts/client.js';
    document.head.appendChild(script);
}

loadSkeleton();
