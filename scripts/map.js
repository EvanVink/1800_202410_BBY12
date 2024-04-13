
let map;

const firebaseConfig = {
  apiKey: "AIzaSyCnd9jkvWAGMEom5lrfV7LycdfNVL9uKeQ",
  authDomain: "crimewatch-fa960.firebaseapp.com",
  projectId: "crimewatch-fa960",
  storageBucket: "crimewatch-fa960.appspot.com",
  messagingSenderId: "71159774002",
  appId: "1:71159774002:web:8b2636e8c981a615b4752b",
  measurementId: "G-FH07RQT6FN"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.querySelectorAll('.desc').forEach(function(element) {
  element.addEventListener("click", function() {
    this.classList.toggle("clicked");
  });
});

async function uploadCsv() {
  const csvData = await fetch('./crimeData/crimedata.csv')
    .then(response => response.text());

  const rows = csvData.split('\n');
  const headers = rows[0].split(',');
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].split(',');
    const crimeData = {};
    for (let j = 0; j < headers.length; j++) {
      crimeData[headers[j]] = cells[j];
    }

    const crimeYear = parseInt(crimeData['YEAR']);
    if (crimeYear >= 2022 && crimeYear <= 2024) {
      await addCrimeToFirestore(crimeData);
    }
  }
  console.log('CSV data uploaded to Firestore.');
}

async function addCrimeToFirestore(crimeData) {
  const { YEAR } = crimeData;
  const crimedataRef = db.collection('crimedata');
  const yearDocRef = crimedataRef.doc(YEAR.toString());
  // Check if year document exists, if not, create it
  await yearDocRef.set({}, { merge: true });
  const yearCollectionRef = yearDocRef.collection('crimes');
  const querySnapshot = await yearCollectionRef.get();
  const crimeCount = querySnapshot.size; // Number of existing crimes
  await yearCollectionRef.doc(`crime${crimeCount + 1}`).set(crimeData);
  console.log(`Crime added for year ${YEAR} - crime${crimeCount + 1}`);
}



async function initMap() {

  
  let Markers = [
    
   
      
  
    {
      TYPE: "Vehicle Collision or Pedestrian Struck (with Injury)",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.242951,
      Y: -123.003331
    },
    
   
   
    
   
    {
      TYPE: "Vehicle Collision or Pedestrian Struck (with Injury)",
      YEAR: 2024,
      MONTH: 1,
      DAY: 15,
      HOUR: 23,
      MINUTE: 21,
      HUNDRED_BLOCK: "YUKON ST / W 16TH AVE",
      place: "Riley Park",
      X: 49.25681960822756,
      Y: -123.11318516438216
    }
  ]
  
  // The location of vancouver
  const defaultLocation = { lat: 49.2827, lng: -123.1207 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: defaultLocation,
    mapId: "DEMO_MAP_ID",
  });

 
//adding a photo and scaling the markers
  let breakAndEnter = {
    url: "/images/3395132-200.png",
    scaledSize: new google.maps.Size(35, 35)
  }

  const Mischief = {
    url: "/images/327670-200.png",
    scaledSize: new google.maps.Size(35, 35)
  }

  let Theft = {
    url: "/images/854355-200.png",
    scaledSize: new google.maps.Size(35, 35)
  }

  const Crash = {
    url: "/images/car-crash.png",
    scaledSize: new google.maps.Size(35, 35)
  }
  
  const Ctheft = {
    url: "/images/car theft.png",
    scaledSize: new google.maps.Size(35, 35)
  }
  

//method to toggle the breaking and entering markers
  let countBreak1 = 0; //counter
  let markerArray1 = []; //Array
  
  /**
 * Method for toggling the crash markers.
 * 
 * This method toggles the visibility of crash markers on a map. It listens for a click event on an element with id "desc1" and performs the toggling action. It utilizes the Google Maps API to create markers for vehicle collisions or pedestrian strikes with injury and adds them to the map. The markers are added or removed based on the state of a counter variable.
 * 
 * @param none
 * @return void
 */
  document.getElementById("desc1").addEventListener("click", function myFunction1() {
      // calling the function to clear the markers
      clearMarkers1();
  
      // add markers
      const crimeRef = db.collection("crime");
      crimeRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const m = doc.data();
            if (m.TYPE == "Break and Enter Commercial") {
                let markers1 = new google.maps.Marker({
                    map: map,
                    position: { lat: m.X, lng: m.Y },
                    icon: breakAndEnter
                });

                // Toggle visibility of marker based on countBreak
                if (countBreak1 % 2 == 0) {
                    markers1.setMap(null);
                } else {
                    markers1.setMap(map);
                }

                // Push the marker to the array
                markerArray1.push(markers1);
            }
        });
      });
      countBreak1++;
  });
  
  /**
 * Clears all markers from the map and resets the marker array.
 * 
 * This function iterates through all markers stored in the markerArray1 and sets their map property to null, effectively removing them from the map. After clearing the markers, it empties the markerArray1.
 * 
 * @param none
 * @return void
 */
  function clearMarkers1() {
      // Loop through all markers in Array and set their map property to null
      markerArray1.forEach(markers1 => {
          markers1.setMap(null);
      });
      // Empty the Array
      markerArray1 = [];
  }

//method for toggling the mischief markers
  let countBreak2 = 0; 
  let markerArray2 = []; 
  /**
 * Method for toggling the crash markers.
 * 
 * This method toggles the visibility of crash markers on a map. It listens for a click event on an element with id "desc2" and performs the toggling action. It utilizes the Google Maps API to create markers for vehicle collisions or pedestrian strikes with injury and adds them to the map. The markers are added or removed based on the state of a counter variable.
 * 
 * @param none
 * @return void
 */
  document.getElementById("desc2").addEventListener("click", function myFunction2() {
      // calling the function to clear the markers
      clearMarkers2();
  
      // add markers
      const crimeRef = db.collection("crime");
      crimeRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const m = doc.data();
        if(m.TYPE == "Mischief"){
          let markers2 = new google.maps.Marker({
            map: map,
            position: { lat: m.X, lng: m.Y },
            icon: Mischief,
          });
  
              // Toggle visibility of marker based on countBreak
              if (countBreak2 % 2 == 0) {
                  markers2.setMap(null);
              } else {
                  markers2.setMap(map);
              }
  
              // Push the marker to the array
              markerArray2.push(markers2);
          }
      });
    });
      countBreak2++;
  });
  /**
 * Clears all markers from the map and resets the marker array.
 * 
 * This function iterates through all markers stored in the markerArray2 and sets their map property to null, effectively removing them from the map. After clearing the markers, it empties the markerArray2.
 * 
 * @param none
 * @return void
 */
  function clearMarkers2() {
      // Loop through all markers in Array and set their map property to null
      markerArray2.forEach(marker2 => {
          marker2.setMap(null);
      });
      // Empty the Array
      markerArray2 = [];
  }

//method for toggling the crash markers
let countBreak3 = 0; 
let markerArray3 = []; 

/**
* Method for toggling the crash markers.
* 
* This method toggles the visibility of crash markers on a map. It listens for a click event on an element with id "desc5" and performs the toggling action. It utilizes the Google Maps API to create markers for vehicle collisions or pedestrian strikes with injury and adds them to the map. The markers are added or removed based on the state of a counter variable.
* 
* @param none
* @return void
*/
document.getElementById("desc3").addEventListener("click", function myFunction3() {
    // calling the function to clear the markers
    clearMarkers3();

    // add markers
    const crimeRef = db.collection("crime");
    crimeRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const m = doc.data();
      if(m.TYPE == "Theft from Vehicle"){
        const markers3 = new google.maps.Marker({
          map: map,
          position: { lat: m.X, lng: m.Y },
          icon: Ctheft,
      });
      
      

            // Toggle visibility of marker based on countBreak
            if (countBreak3 % 2 == 0) {
                markers3.setMap(null);
            } else {
                markers3.setMap(map);
            }

            // Push the marker to the array
            markerArray3.push(markers3);
        }
    });
  });
    countBreak3++;
});


  /**
 * Clears all markers from the map and resets the marker array.
 * 
 * This function iterates through all markers stored in the markerArray4 and sets their map property to null, effectively removing them from the map. After clearing the markers, it empties the markerArray4.
 * 
 * @param none
 * @return void
 */
  function clearMarkers3() {
    // Loop through all markers in Array and set their map property to null
    markerArray3.forEach(marker3 => {
        marker3.setMap(null);
    });
    // Empty the Array
    markerArray3 = [];
}

//method for toggling Other Theft markers
  let countBreak4 = 0; 
  let markerArray4 = []; 
  /**
 * Method for toggling the crash markers.
 * 
 * This method toggles the visibility of crash markers on a map. It listens for a click event on an element with id "desc4" and performs the toggling action. It utilizes the Google Maps API to create markers for vehicle collisions or pedestrian strikes with injury and adds them to the map. The markers are added or removed based on the state of a counter variable.
 * 
 * @param none
 * @return void
 */
  document.getElementById("desc4").addEventListener("click", function myFunction4() {
      // calling the function to clear the markers
      clearMarkers4();
  
      // add markers
      const crimeRef = db.collection("crime");
      crimeRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const m = doc.data();
        if(m.TYPE == "Other Theft"){
          let markers4 = new google.maps.Marker({
            map: map,
            position: { lat: m.X, lng: m.Y },
            icon: Theft,
        });
        
  
              // Toggle visibility of marker based on countBreak
              if (countBreak4 % 2 == 0) {
                  markers4.setMap(null);
              } else {
                  markers4.setMap(map);
              }
  
              // Push the marker to the array
              markerArray4.push(markers4);
          }
      });
    });
      countBreak4++;
  });
  /**
 * Clears all markers from the map and resets the marker array.
 * 
 * This function iterates through all markers stored in the markerArray4 and sets their map property to null, effectively removing them from the map. After clearing the markers, it empties the markerArray4.
 * 
 * @param none
 * @return void
 */
  function clearMarkers4() {
      // Loop through all markers in Array and set their map property to null
      markerArray4.forEach(marker4 => {
          marker4.setMap(null);
      });
      // Empty the Array
      markerArray4 = [];
  }





//method for toggling the crash markers
  let countBreak5 = 0; 
  let markerArray5 = []; 
  
  /**
 * Method for toggling the crash markers.
 * 
 * This method toggles the visibility of crash markers on a map. It listens for a click event on an element with id "desc5" and performs the toggling action. It utilizes the Google Maps API to create markers for vehicle collisions or pedestrian strikes with injury and adds them to the map. The markers are added or removed based on the state of a counter variable.
 * 
 * @param none
 * @return void
 */
  document.getElementById("desc5").addEventListener("click", function myFunction5() {
      // calling the function to clear the markers
      clearMarkers5();
  
      // add markers
      const crimeRef = db.collection("crime");
      crimeRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const m = doc.data();
        if(m.TYPE == "Vehicle Collision or Pedestrian Struck (with Injury)"){
          const markers5 = new google.maps.Marker({
            map: map,
            position: { lat: m.X, lng: m.Y },
            icon: Crash,
        });
        
        
  
              // Toggle visibility of marker based on countBreak
              if (countBreak5 % 2 == 0) {
                  markers5.setMap(null);
              } else {
                  markers5.setMap(map);
              }
  
              // Push the marker to the array
              markerArray5.push(markers5);
          }
      });
    });
      countBreak5++;
  });
  

  /**
 * Clears all markers from the map and resets the marker array.
 * 
 * This function iterates through all markers stored in the markerArray5 and sets their map property to null, effectively removing them from the map. After clearing the markers, it empties the markerArray5.
 * 
 * @param none
 * @return void
 */
  function clearMarkers5() {
      // Loop through all markers in Array and set their map property to null
      markerArray5.forEach(marker5 => {
          marker5.setMap(null);
      });
      // Empty the Array
      markerArray5 = [];
  }


  
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const userMarker = new google.maps.Marker({
        enableHighAccuracy: true,
        position: userPosition,
        map: map,
        title: 'Your Location',
        icon: {
          url: './images/pointer.png',
          size: new google.maps.Size(50, 50),
          scaledSize: new google.maps.Size(50, 50),
          anchor: new google.maps.Point(25, 25)
        }
      });

      map.setCenter(userPosition);
      navigator.geolocation.watchPosition(updateMarkerRotation);

      document.querySelector('.centerbutton').addEventListener('click', function() {
        map.setCenter(userPosition);
        map.setZoom(18);
      })

    }, function() {
      alert('Error: The Geolocation service failed.');
    });
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }

}

function updateMarkerRotation(position) {
  if (position.coords.speed > 0) {
    console.log('You are moving!');
    const heading = position.coords.heading; // Get the direction of movement in degrees
    const userMarker = map.getMarkers().find(marker => marker.getTitle() === 'Your Location'); // Find the user marker
    if (userMarker) {
      userMarker.setRotation(heading); // Set rotation angle to movement direction
    } 
  }
}




initMap();

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('overlay').style.display = "none";
});

document.querySelector(".sosbutton").addEventListener('click', function() {
  document.getElementById('overlay').style.display = "block";
});

document.getElementById("closeOverlayBtn").addEventListener('click', function() {
  document.getElementById('overlay').style.display = "none";
});

document.getElementById("cancelbutton").addEventListener('click', function() {
  document.getElementById('overlay').style.display = "none";
});

function sosButton() {
  firebase.auth().onAuthStateChanged(user => {

    currentUser = db.collection("users").doc(user.uid);

    document.getElementById('sosconfirm').addEventListener('click', function() {
      currentUser.update({ sos: true }).then(function() {
        console.log("sos confirmed!");

        // Store SOS confirmation timestamp in session storage
        sessionStorage.setItem('sosConfirmationTime', new Date().getTime());

        setTimeout(function() {
            // Check if SOS confirmation timestamp is within 10 minutes
            const sosConfirmationTime = sessionStorage.getItem('sosConfirmationTime');
            if (sosConfirmationTime && (new Date().getTime() - parseInt(sosConfirmationTime, 10)) < 10 * 60 * 1000) {
              currentUser.update({ sos: false }).then(function() {
                console.log("sos reverted!");
              }).catch(function(error) {
                console.error("Error updating document: ", error);
              });
            }
        }, 10 * 60 * 1000); 
      }).catch(function(error) {
        console.error("Error updating document: ", error);
      });
    });

  });
}

sosButton();

