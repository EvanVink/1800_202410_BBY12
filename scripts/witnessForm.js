

let sleep = ms => {  
  return new Promise(resolve => setTimeout(resolve, ms));  
  };  


document.getElementById('witnessForm').addEventListener('submit', function(event) {
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