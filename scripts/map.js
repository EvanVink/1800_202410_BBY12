
// Initialize and add the map
let map;
let marker = [];
const firebaseConfig = {
  apiKey: "AIzaSyDL7dJYa3STvWHdN_9PRSPwed8W2r9OnHk",
  authDomain: "fir-8aefb.firebaseapp.com",
  projectId: "fir-8aefb",
  storageBucket: "fir-8aefb.appspot.com",
  messagingSenderId: "509307017348",
  appId: "1:509307017348:web:8f4f57d1c3b061738acad1",
  measurementId: "G-0FY8RSRVQQ"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();


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
    await addCrimeToFirestore(crimeData);
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

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: defaultLocation,
    title: "Uluru",
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
  let countBreak = true;

  
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
  
  Markers.forEach(m => {
    
    
    

 
    if(m.TYPE == "Break and Enter Commercial"){
      let markers1 = new google.maps.Marker({
        map: map,
        position: { lat: m.X, lng: m.Y },
        icon: breakAndEnter,
      });
      
    }
    marker.push(markers1);
    function setMapOn1(map) {
      for (let i = 0; i < marker.length; i++) {
        marker[i].setMap(map);
      }
    }

    document.getElementById("but1").addEventListener("click", function Break(){
      if(countBreak == false){
        setMapOn1(null);
      } else {
        setMapOn1(map);
      }

    })
  })
 

  Markers.forEach(m => {
    
    
    

 
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
    

    if(m.TYPE == "Mischief"){
      const markers2 = new google.maps.Marker({
        map: map,
        position: { lat: m.X, lng: m.Y },
        icon: Mischief,
      });
    }

    if(m.TYPE == "Other Theft"){
      const markers3 = new google.maps.Marker({
        map: map,
        position: { lat: m.X, lng: m.Y },
        icon: Theft,
      });
    }

    if(m.TYPE == "Vehicle Collision or Pedestrian Struck (with Injury)"){
      const markers4 = new google.maps.Marker({
        map: map,
        position: { lat: m.X, lng: m.Y },
        icon: Crash,
      });
    }


    
  })

  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const userMarker = new google.maps.Marker({
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

    }, function() {
      alert('Error: The Geolocation service failed.');
    });
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }

}

function updateMarkerRotation(position) {
  // Calculate the movement direction based on the change in coordinates
  if (position.coords.speed > 0) {
      console.log('You are moving!');
      const heading = position.coords.heading; // Get the direction of movement in degrees
      // Update marker icon with rotation
      marker.setIcon({
          url: 'path/to/your/marker.png', // Path to your marker icon
          scaledSize: new google.maps.Size(32, 32), // Set the size of the icon
          rotation: heading, // Set rotation angle to movement direction
      });
  }
}


































initMap();