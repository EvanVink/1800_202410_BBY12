



// Initialize and add the map
let map;


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
  
  // The location of Uluru
  const position1 = { lat: 49.2827, lng: -123.1207 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: position1,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position1,
    title: "Uluru",
  });

  // Markers.forEach(m => {
  //   const markers = new AdvancedMarkerElement({
  //     position: { lat: m.X, lgn: m.Y },
  //     map: map
  //   })
  // })
  for (i = 0; i < Markers.length; i++) {  
    const markers = new AdvancedMarkerElement({
      position: { lat: Markers[i][9], lgn: Markers[i][10]},
      map: map
    });
  }
}


































initMap();