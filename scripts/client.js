document.getElementById('map-button').addEventListener('click', function() {
    window.location.href = "map.html";
});

document.getElementById('news-button').addEventListener('click', function() {
    window.location.href = "news.html";
});

document.getElementById('social-button').addEventListener('click', function() {
    window.location.href = "socials.html";
});

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

  