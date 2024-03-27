const staticNewsData = {
    'nearby': [
        {
            title: 'Local Park Renovation Begins Next Week',
            description: 'The city announced a new initiative to renovate Central Park...',
            url: '#',
            img: '<img src= https://vancouver.ca/images/cov/feature/renovation-restoration-landing.jpg>'
        },
        // Add more items as needed
    ],
    'country': [
        {
            title: 'National Education Reform Plans Revealed',
            description: 'In a recent press conference, the education minister outlined plans for...',
            url: '#',
            img: '<img src= https://i.cbc.ca/1.6813619.1681772594!/cumulusImage/httpImage/image.jpg_gen/derivatives/16x9_780/tdsb-school-open-blacksmith-public-school.jpg alt="Education Reform Image">'
        },
        // Add more items as needed
    ],
    'global': [
        {
            title: 'Global Climate Summit 2024 Concludes',
            description: 'The annual Global Climate Summit concluded yesterday with several key agreements...',
            url: '#',
            img: '<img src= https://thetourisminternational.com/wp-content/uploads/2024/01/7332fb26-attachment-image-1jpeg-12882-3gcw9o-1024x768-1-768x576.jpeg alt="Climate Summit Image">'
        },
        // Add more items as needed
    ]
};




// document.getElementById('map-button').addEventListener('click', function() {
//     window.location.href = "map.html";
// });

// document.getElementById('news-button').addEventListener('click', function() {
//     window.location.href = "news.html";
// });

// document.getElementById('social-button').addEventListener('click', function() {
//     window.location.href = "socials.html";
// });


async function fetchCrimeNews() {
    const apiKey = '7c951c50378b4a5bb0bc3697cfec39e5'; // Replace with your actual API key
    const topics = ['assault', 'robbery', 'homicide', 'theft', 'fraud']; // List of crime-related topics
    const newsContainer = document.querySelector('.cardcontent'); // Target your news container
    newsContainer.innerHTML = ''; // Clear existing content

    for (let topic of topics) {
        const apiUrl = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Limit the number of articles per topic to prevent one topic dominating the results
            const articles = data.articles.slice(0, 2); // Adjust number as needed

            // Loop through the articles and create a card for each news item
            articles.forEach((article) => {
                const newsCard = `
                    <div class="card" style="width: 25%; aspect-ratio: 3/4;">
                        <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description}</p>
                            <a href="${article.url}" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                `;
                newsContainer.innerHTML += newsCard; // Add the card to the container
            });
        } catch (error) {
            console.error('Error fetching crime news:', error);
        }
    }
}

// Call the function when the page loads or when needed
fetchCrimeNews();

function displayNewsByCategory(category) {
    const newsContainer = document.querySelector('.cardcontent');
    newsContainer.innerHTML = ''; // Clear existing content

    const newsItems = staticNewsData[category]; // Get news items by category

    newsItems.forEach((article) => {
        const imageUrl = new DOMParser().parseFromString(article.img, 'text/html').body.querySelector('img').src;
        const newsCard = `
            <div class="card" style="width: 25%; aspect-ratio: 3/4;">
                <img src="${imageUrl}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary">Read More</a>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard; // Add the card to the container
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').style.display = "none";
})

document.getElementById("addUser").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById("closeOverlayBtn").addEventListener('click', function() {
    document.getElementById('overlay').style.display = "none";
});




  