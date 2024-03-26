
// Initialize and add the map
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
  const Markers = [
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

 

  Markers.forEach(m => {
    const markers = new AdvancedMarkerElement({
      map: map,
      position: { lat: m.X, lng: m.Y },
    });
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