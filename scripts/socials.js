document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').style.display = "none";
});

document.getElementById("addUser").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById("closeOverlayBtn").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "none";
});



function listenForFriends() {
        // Select all <p> elements with class 'name'
        var nameElements = document.querySelectorAll('.name');

        // Add click event listener to each <p> element
        nameElements.forEach(function(element) {
            element.addEventListener('click', function() {
                console.log("clicked!");
                // Get the name from the clicked <p> element
                var clickedName = element.textContent.trim();
    
                // Update the current user's friend array in Firestore
                var currentUserUid = firebase.auth().currentUser.uid;
                var userRef = db.collection("users").doc(currentUserUid);
    
                userRef.update({
                    friends: firebase.firestore.FieldValue.arrayUnion(clickedName)
                }).then(function() {
                    console.log("Friend added successfully");
                }).catch(function(error) {
                    console.error("Error adding friend: ", error);
                });
            });
        });
}

document.addEventListener('DOMContentLoaded', function() {
    
    db.collection("users").get().then(allUsers => {

        allUsers.forEach(doc => {
            document.getElementById('searchResults').insertAdjacentHTML('beforeend', `<p class='name'>${doc.data().name} </p>`);
        });
    });

    listenForFriends();

});
