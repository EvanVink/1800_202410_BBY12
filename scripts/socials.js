document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').style.display = "none";
    loadFriends(); 
});

document.getElementById("addUser").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "block";
    listenForFriends();
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
                db.collection("users")
                .where("name", "==", clickedName)
                .get()
                .then(function(querySnapshot) {
                    if (!querySnapshot.empty) {
                        // Get the document ID (which is essentially the user ID)
                        var userId = querySnapshot.docs[0].id;

                        // Update the current user's friend array in Firestore
                        var currentUserUid = firebase.auth().currentUser.uid;
                        var userRef = db.collection("users").doc(currentUserUid);

                        userRef.update({
                            friends: firebase.firestore.FieldValue.arrayUnion(userId)
                        }).then(function() {
                            console.log("Friend added successfully");
                        }).catch(function(error) {
                            console.error("Error adding friend: ", error);
                        });
                    } else {
                        console.log("User not found");
                    }
                    loadFriends();
                })
                .catch(function(error) {
                    console.error("Error getting user: ", error);
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
});




function loadFriends() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const currentUserUid = user.uid;
            const currentUserRef = db.collection("users").doc(currentUserUid);

            currentUserRef.get()
                .then(snapshot => {
                    const currentUserData = snapshot.data();
                    const friends = currentUserData.friends || []; // Assuming friends is an array
                    
                    const promises = friends.map(friendUid => {
                        return db.collection("users").doc(friendUid).get()
                            .then(friendSnapshot => {
                                return friendSnapshot.data().name;
                            });
                    });

                    Promise.all(promises)
                        .then(names => {
                            const listItems = names.map(name => {
                                return `<li class='friendDisplay'>${name}<div class="locbutton">See Location</div></li>`;
                            }).join('');
                            document.querySelector(".list-group").innerHTML = listItems;
                        })
                        .catch(error => {
                            console.error("Error fetching friends: ", error);
                        });
                })
                .catch(error => {
                    console.error("Error fetching current user data: ", error);
                });
        }
    });
}

