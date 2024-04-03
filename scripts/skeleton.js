
  

function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#navbarPlaceholder').load('./nav-after-login.html', function() {
                
                var currentUserRef = db.collection("users").doc(user.uid);

                currentUserRef.get().then(function(doc) {
                    if (doc.exists) {
                        var currentUserName = doc.data().name; // Retrieve the name field from the document data
                        var firstName = currentUserName.split(" ")[0];
                        document.getElementById('profile').innerHTML = firstName;
                    }
                });

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
