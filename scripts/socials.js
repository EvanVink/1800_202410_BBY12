document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').style.display = "none";
})

document.getElementById("addUser").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById("closeOverlayBtn").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "none";
});
