


const contactForm = document.querySelector("#witnessForm");
const fullName = document.querySelector("#fullName");
const Email = document.querySelector("#email");
const Phone = document.querySelector("#Phone");
const Locations = document.querySelector("#Loc");
const Details = document.querySelector("#message");
const Submit = document.querySelector("#sub");

    /**
     * Handles the form submission event.
     * @param e The event object
     */
Submit.addEventListener("click", (e) => {
  e.preventDefault();
        // Accessing the Firebase Firestore database
        // and storing form data in the "witness" collection
  db.collection("witness")
    .doc()
    .set({
      fullName: fullName.value,
      email: Email.value,
      phone: Phone.value,
      location: Locations.value,
      details: Details.value
    })
    
    
});
    /**
     * Delays the execution by a specified time.
     * @param ms The time to delay in milliseconds
     * @return A Promise that resolves after the specified delay
     */
let sleep = ms => {  
  return new Promise(resolve => setTimeout(resolve, ms));  
  };  



    /**
     * Handles the click event on the submit button.
     * Displays a success message and redirects to the main page after a delay.
     * @param event The click event object
     */
document.getElementById('sub').addEventListener('click', function(event) {
    event.preventDefault(); 
    // Displaying a success message using SweetAlert2
    Swal.fire({
      title: "Form Submitted!",
      text: "Thank You!",
      icon: "success"
    }).then(function(){
      // Redirecting to the main page after a short delay
      sleep(500).then(() => {
        window.location = "./main.html";
      });
      
    });

    
    
  });


