const Markers = [
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 2,
      "DAY": 11,
      "HOUR": 22,
      "MINUTE": 5,
      "HUNDRED_BLOCK": "10XX BEACH AVE",
      "": "Central Business District",
      "X": 490249.2307,
      "Y": 5458166.833
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 1,
      "DAY": 8,
      "HOUR": 0,
      "MINUTE": 0,
      "HUNDRED_BLOCK": "10XX BROUGHTON ST",
      "": "West End",
      "X": 490247.1512,
      "Y": 5459171.042
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 1,
      "DAY": 18,
      "HOUR": 12,
      "MINUTE": 5,
      "HUNDRED_BLOCK": "10XX BROUGHTON ST",
      "": "West End",
      "X": 490247.1512,
      "Y": 5459171.042
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 1,
      "DAY": 16,
      "HOUR": 1,
      "MINUTE": 40,
      "HUNDRED_BLOCK": "10XX CANADA PL",
      "": "Central Business District",
      "X": 491434.1768,
      "Y": 5459565.047
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 2,
      "DAY": 11,
      "HOUR": 16,
      "MINUTE": 56,
      "HUNDRED_BLOCK": "10XX HAMILTON ST",
      "": "Central Business District",
      "X": 491198.2577,
      "Y": 5458147.996
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 1,
      "DAY": 4,
      "HOUR": 15,
      "MINUTE": 7,
      "HUNDRED_BLOCK": "10XX HORNBY ST",
      "": "Central Business District",
      "X": 490833.289,
      "Y": 5458565.054
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 2,
      "DAY": 14,
      "HOUR": 8,
      "MINUTE": 14,
      "HUNDRED_BLOCK": "10XX HOWE ST",
      "": "Central Business District",
      "X": 490889.5958,
      "Y": 5458482.858
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 1,
      "DAY": 24,
      "HOUR": 4,
      "MINUTE": 57,
      "HUNDRED_BLOCK": "10XX MARINASIDE CRES",
      "": "Central Business District",
      "X": 491414.5679,
      "Y": 5457873.024
    },
    {
      "TYPE": "Break and Enter Commercial",
      "YEAR": 2024,
      "MONTH": 1,
      "DAY": 26,
      "HOUR": 16,
      "MINUTE": 22,
      "HUNDRED_BLOCK": "10XX MARINASIDE CRES",
      "": "Central Business District",
      "X": 491545.474,
      "Y": 5457835.82
    }
  ]
  
  
  const markX = [];
  const markY = [];
  for (var i = 0; i < Markers.length; i++) {
    const coordinates = Markers.map(entry => {
      markX[i] = entry.X;
      markY[i] = entry.Y;
    })
  };
  
  for (var i = 0; i < markX.length; i++){
    
  }
  

  document.getElementById("demo").innerHTML = markX;
  document.getElementById("demo2").innerHTML = markY;