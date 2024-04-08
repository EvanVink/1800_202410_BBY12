


const contactForm = document.querySelector("#witnessForm");
const fullName = document.querySelector("#fullName");
const Email = document.querySelector("#email");
const Phone = document.querySelector("#Phone");
const Locations = document.querySelector("#Loc");
const Details = document.querySelector("#message");
const Submit = document.querySelector("#sub");

Submit.addEventListener("click", (e) => {
  e.preventDefault();
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

let sleep = ms => {  
  return new Promise(resolve => setTimeout(resolve, ms));  
  };  


document.getElementById('sub').addEventListener('click', function(event) {
    event.preventDefault(); 
    Swal.fire({
      title: "Form Submitted!",
      text: "Thank You!",
      icon: "success"
    }).then(function(){
      sleep(500).then(() => {
        window.location = "./main.html";
      });
      
    });

    
    
  });


