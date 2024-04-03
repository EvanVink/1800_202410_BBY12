document.getElementById('witnessForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    // Here you can add JavaScript code to handle form submission, like sending data to a server
    alert('Form submitted!'); // For demonstration purpose only
    window.location = "./main.html";
  });