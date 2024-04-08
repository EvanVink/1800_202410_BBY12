    var mapButton = document.getElementById('map-button');
    var newsButton = document.getElementById('news-button');
    var socialButton = document.getElementById('social-button');

    if (mapButton) {
        mapButton.addEventListener('click', function() {
            window.location.href = 'map.html';
        });
    } else {
        console.error('map-button not found');
    }

    if (newsButton) {
        newsButton.addEventListener('click', function() {
            window.location.href = 'news.html';
        });
    } else {
        console.error('news-button not found');
    }

    if (socialButton) {
        socialButton.addEventListener('click', function() {
            window.location.href = 'socials.html';
        });
    } else {
        console.error('social-button not found');
    }


const icons = document.querySelectorAll('.icon');

// Add click event listeners to each icon
icons.forEach(icon => {
  icon.addEventListener('click', function() {
    // Remove 'active' class from all icons
    icons.forEach(icon => {
      icon.classList.remove('active');
    });

    // Add 'active' class to the clicked icon
    this.classList.add('active');
  });
});