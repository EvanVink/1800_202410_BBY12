




document.getElementById('map-button').addEventListener('click', function() {
    window.location.href = "map.html";
});

document.getElementById('news-button').addEventListener('click', function() {
    window.location.href = "news.html";
});

document.getElementById('social-button').addEventListener('click', function() {
    window.location.href = "socials.html";
});




document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').style.display = "none";
})

document.getElementById("addUser").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById("closeOverlayBtn").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "none";
});




  