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