document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').style.display = "none";
    document.getElementById('location-overlay').style.display = "none";
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
                                const friendData = friendSnapshot.data();
                                const friendName = friendData.name;
                                const sos = friendData.sos || false; // Assuming sos is a boolean, defaulting to false if not present
                                const sosClass = sos ? 'sos-border' : ''; // If sos is true, add the class 'sos-border', otherwise, empty string

                                return { name: friendName, sosClass: sosClass };
                            });
                    });

                    Promise.all(promises)
                        .then(friendsWithClasses => {
                            const listItems = friendsWithClasses.map(friend => {
                                let listItem = `<li class='friendDisplay'>${friend.name}`;
                                if (friend.sosClass === 'sos-border') {
                                    // If the sosClass is 'sos-border', include the sosnoti div
                                    listItem += `<div class="sosnoti">SOS</div>`;
                                }
                                listItem += `<div class="locbutton">See Location</div></li>`;
                                return listItem;
                            }).join('');
                            document.querySelector(".list-group").innerHTML = listItems;
                            locationOverlay();
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


document.getElementById('searchInput').addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    
    var usernames = document.querySelectorAll('.name');

    usernames.forEach(user => {
        const userName = user.textContent.toLowerCase();
        const isVisible = userName.includes(value);
        user.classList.toggle("hide", !isVisible);
    });
});

function locationOverlay() {
    document.querySelector('.locbutton').addEventListener('click', function() {
        document.getElementById('location-overlay').style.display = "block";
        initMap();
    });
    document.getElementById("closeLocationOverlayBtn").addEventListener('click', function() {
        document.getElementById('location-overlay').style.display = "none";
    });
}

async function initMap() {
      // The location of vancouver
  const defaultLocation = { lat: 49.2827, lng: -123.1207 };
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  //@ts-ignore
  const { Marker } = await google.maps.importLibrary("marker");

  const userPosition = {
    lat: 49.24854943525746,
    lng: -123.0043539762469
  };

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: userPosition,
    mapId: "DEMO_MAP_ID",
  });

  new Marker({
    position: userPosition,
    map: map,
    title: "Emma's Position",
    icon: {
        url: './images/pointer.png',
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(25, 25)
      }
  });

  const Mischief = {
    url: "/images/327670-200.png",
    scaledSize: new google.maps.Size(35, 35)
  }

  let markers2 = new google.maps.Marker({
    map: map,
    position: { lat: 49.248691, lng: -123.004286 },
    icon: Mischief,
  });


  map.setCenter(userPosition);

}
initMap();