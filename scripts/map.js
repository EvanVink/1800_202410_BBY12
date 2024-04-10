
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
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.27618057,
      Y: -123.1340547
    },
    {
      TYPE: "Mischief",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.248691,
      Y: -123.004286
    },
    {
      TYPE: "Mischief",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.245882,
      Y: -123.003327
    },
    {
      TYPE: "Other Theft",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.248236,
      Y: -122.996193
    },
    {
      TYPE: "Mischief",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.255759,
      Y: -123.001790
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.255798,
      Y: -123.008214
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.251393,
      Y: -123.014854
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.243724,
      Y: -123.010855
    },
    {
      TYPE: "Other Theft",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.251504,
      Y: -122.992445
    },
    {
      TYPE: "Mischief",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.256323,
      Y: -123.006823
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.252979,
      Y: -123.015172
    },
    {
      TYPE: "Other Theft",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.240152,
      Y: -123.004531
    },
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
      TYPE: "Mischief",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.238320,
      Y: -122.993915
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.244617,
      Y: -122.988914
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 22,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BEACH AVE",
      place: "Central Business District",
      X: 49.250880,
      Y: -122.981973
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 1,
      DAY: 8,
      HOUR: 0,
      MINUTE: 0,
      HUNDRED_BLOCK: "10XX BROUGHTON ST",
      place: "West End",
      X: 49.28521355,
      Y: -123.1341078
    },
    {
      TYPE: "Break and Enter Commercial", 
      YEAR: 2024,
      MONTH: 1,
      DAY: 18,
      HOUR: 12,
      MINUTE: 5,
      HUNDRED_BLOCK: "10XX BROUGHTON ST",
      place: "West End",
      X: 49.28521355,
      Y: -123.1341078
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 1,
      DAY: 16,
      HOUR: 1,
      MINUTE: 40,
      HUNDRED_BLOCK: "10XX CANADA PL",
      place: "Central Business District",
      X: 49.28877547,
      Y: -123.1177939
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 11,
      HOUR: 16,
      MINUTE: 56,
      HUNDRED_BLOCK: "10XX HAMILTON ST",
      place: "Central Business District",
      X: 49.27602552,
      Y: -123.121007
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 1,
      DAY: 4,
      HOUR: 15,
      MINUTE: 7,
      HUNDRED_BLOCK: "10XX HORNBY ST",
      place: "Central Business District",
      X: 49.27977166,
      Y: -123.1260341
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 2,
      DAY: 14,
      HOUR: 8,
      MINUTE: 14,
      HUNDRED_BLOCK: "10XX HOWE ST",
      place: "Central Business District",
      X: 49.27903314,
      Y: -123.1252581
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 1,
      DAY: 24,
      HOUR: 4,
      MINUTE: 57,
      HUNDRED_BLOCK: "10XX MARINASIDE CRES",
      place: "Central Business District",
      X: 49.27355518,
      Y: -123.1180272
    },
    {
      TYPE: "Break and Enter Commercial",
      YEAR: 2024,
      MONTH: 1,
      DAY: 26,
      HOUR: 16,
      MINUTE: 22,
      HUNDRED_BLOCK: "10XX MARINASIDE CRES",
      place: "Central Business District",
      X: 49.27322235,
      Y: -123.1162268
    },
    {
      TYPE: "Mischief",
      YEAR: 2024,
      MONTH: 1,
      DAY: 23,
      HOUR: 4,
      MINUTE: 28,
      HUNDRED_BLOCK: "16XX NAPIER ST",
      place: "Grandview-Woodland",
      X: 49.274906644241355,
      Y: -123.0697940868212
    },
    {
      TYPE: "Other Theft",
      YEAR: 2024,
      MONTH: 1,
      DAY: 1,
      HOUR: 19,
      MINUTE: 6,
      HUNDRED_BLOCK: "6XX W BROADWAY AVE",
      place: "Fairview",
      X: 49.26329274189404,
      Y: -123.1175903250156
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
    url: "/images/png-transparent-auto-beauty-specialists-car-traffic-collision-computer-icons-car-angle-car-accident-thumbnail.png",
    scaledSize: new google.maps.Size(35, 35)
  }
  

  
  // document.getElementById("but1").addEventListener("click", function Break(){

  //   if ((countBreak % 2) == 0) {
  //     Markers.forEach(m => {
  //         if (m.TYPE == "Break and Enter Commercial") {
  //             markers1 = new google.maps.Marker({
  //                 map: map,
  //                 position: { lat: m.X, lng: m.Y },
  //                 icon: breakAndEnter,
  //             });
  //         }
  //     });
  // } else {
  //     Markers.forEach(marker => {
  //         marker.setMap(null); // Remove the marker from the map
  //     });
  // }
    // if ((countBreak % 2) == 0){
    //   Markers.forEach(m => {


    //     if(m.TYPE == "Break and Enter Commercial"){
    //       let markers1 = new google.maps.Marker({
    //         map: map,
    //         position: { lat: m.X, lng: m.Y },
    //         icon: breakAndEnter,
    //       });
          
    //     }
  
        
    //   })
    // } else {
    //   Markers.forEach(marker => {
    //     marker.setMap(null); // Remove the marker from the map
    // });
        
        // Markers.setVisible(false); // Remove the marker from the map
    
    
    
  //   countBreak++;
  //   console.log(countBreak);


      
  // });

  let countBreak1 = 0; //counter
  let markerArray1 = []; //Array
  
  document.getElementById("desc1").addEventListener("click", function myFunction1() {
      // calling the function to clear the markers
      clearMarkers1();
  
      // add markers
      Markers.forEach(m => {
          if (m.TYPE == "Break and Enter Commercial") {
              let markers1 = new google.maps.Marker({
                  map: map,
                  position: { lat: m.X, lng: m.Y },
                  icon: breakAndEnter
              });
  
              // Toggle visibility of marker based on countBreak
              if (countBreak1 % 2 != 0) {
                  markers1.setMap(null);
              } else {
                  markers1.setMap(map);
              }
  
              // Push the marker to the array
              markerArray1.push(markers1);
          }
      });
      countBreak1++;
      console.log(countBreak1);
  });
  
  function clearMarkers1() {
      // Loop through all markers in Array and set their map property to null
      markerArray1.forEach(markers1 => {
          markers1.setMap(null);
      });
      // Empty the Array
      markerArray1 = [];
  }


  let countBreak2 = 0; 
  let markerArray2 = []; 
  
  document.getElementById("desc2").addEventListener("click", function myFunction2() {
      // calling the function to clear the markers
      clearMarkers2();
  
      // add markers
      Markers.forEach(m => {
        if(m.TYPE == "Mischief"){
          let markers2 = new google.maps.Marker({
            map: map,
            position: { lat: m.X, lng: m.Y },
            icon: Mischief,
          });
  
              // Toggle visibility of marker based on countBreak
              if (countBreak2 % 2 != 0) {
                  markers2.setMap(null);
              } else {
                  markers2.setMap(map);
              }
  
              // Push the marker to the array
              markerArray2.push(markers2);
          }
      });
      countBreak2++;
      console.log(countBreak2);
  });
  
  function clearMarkers2() {
      // Loop through all markers in Array and set their map property to null
      markerArray2.forEach(marker2 => {
          marker2.setMap(null);
      });
      // Empty the Array
      markerArray2 = [];
  }





  let countBreak4 = 0; 
  let markerArray4 = []; 
  
  document.getElementById("desc4").addEventListener("click", function myFunction4() {
      // calling the function to clear the markers
      clearMarkers4();
  
      // add markers
      Markers.forEach(m => {
        if(m.TYPE == "Other Theft"){
          let markers4 = new google.maps.Marker({
            map: map,
            position: { lat: m.X, lng: m.Y },
            icon: Theft,
        });
        
  
              // Toggle visibility of marker based on countBreak
              if (countBreak4 % 2 != 0) {
                  markers4.setMap(null);
              } else {
                  markers4.setMap(map);
              }
  
              // Push the marker to the array
              markerArray4.push(markers4);
          }
      });
      countBreak4++;
      console.log(countBreak4);
  });
  
  function clearMarkers4() {
      // Loop through all markers in Array and set their map property to null
      markerArray4.forEach(marker4 => {
          marker4.setMap(null);
      });
      // Empty the Array
      markerArray4 = [];
  }






  let countBreak5 = 0; 
  let markerArray5 = []; 
  
  document.getElementById("desc5").addEventListener("click", function myFunction5() {
      // calling the function to clear the markers
      clearMarkers5();
  
      // add markers
      Markers.forEach(m => {
        if(m.TYPE == "Vehicle Collision or Pedestrian Struck (with Injury)"){
          const markers5 = new google.maps.Marker({
            map: map,
            position: { lat: m.X, lng: m.Y },
            icon: Crash,
        });
        
        
  
              // Toggle visibility of marker based on countBreak
              if (countBreak5 % 2 != 0) {
                  markers5.setMap(null);
              } else {
                  markers5.setMap(map);
              }
  
              // Push the marker to the array
              markerArray5.push(markers5);
          }
      });
      countBreak5++;
      console.log(countBreak5);
  });
  
  function clearMarkers5() {
      // Loop through all markers in Array and set their map property to null
      markerArray5.forEach(marker5 => {
          marker5.setMap(null);
      });
      // Empty the Array
      markerArray5 = [];
  }

  
  // close one
  // document.getElementById("but1").addEventListener("click", function myfuction(){

  //   Markers.forEach(m => {
    
    
    

 
  //     if(m.TYPE == "Break and Enter Commercial"){
  //       let markers1 = new google.maps.Marker({
  //         map: map,
  //         position: { lat: m.X, lng: m.Y },
  //         icon: breakAndEnter,
        
  //       });
  //       markers1.setMap(map);
  //       function Break(){
  //         if(countBreak % 2 == 0){
  //           markers1.setMap(null);
  //         } else {
  //           markers1.setMap(map);
  //         }
  //       }
  //     }
  //   })
  //     countBreak++;
  //     console.log(countBreak);
  // })
    
    // function setMapOn1(map) {
    //   for (let i = 0; i < Markers.length; i++) {
    //     Markers[i].setMap(map);
    //   }
    // }
  
    
  


  // Markers.forEach(m => {
    
    
    

 
    // if(m.TYPE == "Break and Enter Commercial"){
    //   let markers1 = new google.maps.Marker({
    //     map: map,
    //     position: { lat: m.X, lng: m.Y },
    //     icon: breakAndEnter,
    //   });
    //   marker.push(markers1);
    // }
    // function setMapOn1(map) {
    //   for (let i = 0; i < marker.length; i++) {
    //     marker[i].setMap(map);
    //   }
    // }

    // document.getElementById("but1").addEventListener("click", function Break(){
    //   if(countBreak == false){
    //     setMapOn1(null);
    //   } else {
    //     setMapOn1(map);
    //   }

    // })
    

    // if(m.TYPE == "Mischief"){
    //   const markers2 = new google.maps.Marker({
    //     map: map,
    //     position: { lat: m.X, lng: m.Y },
    //     icon: Mischief,
    //   });
    // }

    // if(m.TYPE == "Other Theft"){
    //   const markers3 = new google.maps.Marker({
    //     map: map,
    //     position: { lat: m.X, lng: m.Y },
    //     icon: Theft,
    //   });
    // }

    // if(m.TYPE == "Vehicle Collision or Pedestrian Struck (with Injury)"){
    //   const markers4 = new google.maps.Marker({
    //     map: map,
    //     position: { lat: m.X, lng: m.Y },
    //     icon: Crash,
    //   });
    // }


    
  // })

  
  
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


// const bcitMarker = new google.maps.Marker({
//   position: { lat: 49.247940, lng: -123.002280 },
//   map: map, // Assuming 'map' is your Google Maps object
//   title: '1712 midterm', // Optional: Title for the marker
//   icon: Theft,
  
  
// });


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

