const staticNewsData = {
    'nearby': [
        {
            title: 'Local Park Renovation Begins Next Week',
            description: 'The city announced a new initiative to renovate Central Park...',
            url: 'https://www.vancouver.ca/parks-recreation-culture/central-park-renovation.aspx',
            img: '<img src="https://vancouver.ca/images/cov/feature/renovation-restoration-landing.jpg" alt="Park Renovation">'
        },
        {
            title: 'New Bicycle Lanes to be Introduced',
            description: 'The city council has approved the construction of new bicycle lanes...',
            url: 'https://vancouver.ca/streets-transportation/improving-our-cycling-network.aspx',
            img: '<img src="https://vancouver.ca/images/cov/feature/cycling-landing-image.jpg" alt="Bicycle Lanes">'
        },
        {
            title: 'Community Garden Project Launched',
            description: 'A new community garden project aims to bring residents together...',
            url: 'https://www.communitygardenbuilders.com',
            img: '<img src="https://images.squarespace-cdn.com/content/v1/59b2cbfe2278e7557eae5485/1619799736045-KWGERB9GCHYIF3TONQHR/Comm-garden-truck-comp.jpg?format=2500w" alt="Community Garden">'
        },
    ],
    'country': [
        {
            title: 'First Nation Education Reforms',
            description: 'In a recent press conference, the education minister outlined plans for...',
            url: 'https://www.cbc.ca/news/politics/first-nations-education-reform-proposals-revealed-1.2159792',
            img: '<img src="https://i.cbc.ca/1.2158809.1382453084!/cpImage/httpImage/image.jpg_gen/derivatives/16x9_780/native-education-protest-on-parliament-hill.jpg" alt="Education Reform">'
        },
        {
            title: 'Healthcare System Overhaul Announced',
            description: 'A major overhaul of the national healthcare system was announced today...',
            url: 'https://www.vancouverisawesome.com/opinion/baldrey-will-bcs-new-patient-ratio-system-help-ease-health-care-pressures-8392584',
            img: '<img src="https://www.vmcdn.ca/f/files/kamloopsthisweek/images/health/nurse-getty-images.jpg;w=960" alt="Healthcare Overhaul">'
        },
        {
            title: 'Infrastructure Investment Plan Unveiled',
            description: 'The government unveils a massive investment plan for infrastructure...',
            url: 'https://www.infrastructure.gov/investment-plan',
            img: '<img src="https://www.bctechnology.com/tmp/news/F82333B1BC845FFFE7171CF024038184339B546852A23CEDA81A9194A7BFFC5C.jpg">'
        },
    ],
    'global': [
        {
            title: 'Global Climate Summit 2024 Concludes',
            description: 'The annual Global Climate Summit concluded yesterday with several key agreements...',
            url: 'https://globalnews.ca/news/8338907/trudeau-g20-climate-change-action/',
            img: '<img src="https://thetourisminternational.com/wp-content/uploads/2024/01/7332fb26-attachment-image-1jpeg-12882-3gcw9o-1024x768-1-768x576.jpeg" alt="Climate Summit">'
        },
        {
            title: 'National Cyber Security Action Plan',
            description: 'Countries around the world have come together to sign a new cybersecurity agreement...',
            url: 'https://www.publicsafety.gc.ca/cnt/rsrcs/pblctns/ntnl-cbr-scrt-strtg-2019/index-en.aspx',
            img: '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJSo0w3S1Z_JpddM4SIM5_fxjQe7ui9buRn2Ixlqw7Ag&s" alt="Cybersecurity Agreement">'
        },
        {
            title: 'World Leaders Commit to Renewable Energy Targets',
            description: 'At the recent summit, world leaders committed to ambitious renewable energy targets...',
            url: 'https://www.irena.org/News/pressreleases/2023/Dec/IRENA-Call-to-Triple-Renewables-by-2030-Becomes-a-Key-Commitment-at-COP28',
            img: '<img src="https://mc-cd8320d4-36a1-40ac-83cc-3389-cdn-endpoint.azureedge.net/-/media/Images/IRENA/Agency/Press-Release/2023/Dec/Francesco-La-Camera-at-COP28.jpg?rev=088853cc00c448b0b9bccaf5adee739b&w=605&h=316&as=1&bc=ffffff&cc=1&hash=AF86D81D15276B0C5D083A2F676DA050" alt="Renewable Energy Targets">'
        },
    ]
};


async function fetchCrimeNews() {
    const apiKey = '7c951c50378b4a5bb0bc3697cfec39e5'; // Replace with your actual API key
    const region = 'Vancouver'; // Define the region to focus on
    const topics = ['break-in', 'assault', 'theft']; // More specific list of crime-related topics
    const newsContainer = document.querySelector('.cardcontent'); // Target your news container
    newsContainer.innerHTML = ''; // Clear existing content

    for (let topic of topics) {
        // Add the region to the query to attempt to narrow down the results geographically
        const apiUrl = `https://newsapi.org/v2/everything?q=${topic}+${region}&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // You might want to add more sophisticated filtering here, based on your app's logic
            // to ensure that the articles are indeed related to the desired topics and region
            const articles = data.articles.slice(0, 2); // Adjust number as needed

            // Loop through the articles and create a card for each news item
            articles.forEach((article) => {
                const newsCard = `
                    <div class="card";">
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

// function displayNewsByCategory(category) {
//     const newsContainer = document.querySelector('.cardcontent');
//     newsContainer.innerHTML = ''; // Clear existing content

//     const newsItems = staticNewsData[category]; // Get news items by category

//     newsItems.forEach((article) => {
//         const imageUrl = new DOMParser().parseFromString(article.img, 'text/html').body.querySelector('img').src;
//         const newsCard = `
//             <div class="card" style="width: 25%; aspect-ratio: 3/4;">
//                 <img src="${imageUrl}" class="card-img-top" alt="${article.title}">
//                 <div class="card-body">
//                     <h5 class="card-title">${article.title}</h5>
//                     <p class="card-text">${article.description}</p>
//                     <a href="${article.url}" class="btn btn-primary">Read More</a>
//                 </div>
//             </div>
//         `;
//         newsContainer.innerHTML += newsCard; // Add the card to the container
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners for news category buttons
    document.getElementById('nearbyNewsBtn').addEventListener('click', function() {
        displayNewsByCategory('nearby');
    });

    document.getElementById('countryNewsBtn').addEventListener('click', function() {
        displayNewsByCategory('country');
    });

    document.getElementById('globalNewsBtn').addEventListener('click', function() {
        displayNewsByCategory('global');
    });
});

function displayNewsByCategory(category) {
    const newsContainer = document.querySelector('.cardcontent');
    newsContainer.innerHTML = ''; // Clear existing content

    const newsItems = staticNewsData[category]; // Get news items by category

    newsItems.forEach((article) => {
        // Since your img tags are already strings, you directly use them instead of parsing
        const newsCard = `
            <div class="card";">
                ${article.img} <!-- Directly use the img string -->
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary">Read More</a>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard; // Add the card to the container
        
        
})


function getDateRange(period) {
    const now = new Date();
    let startDate;

    switch (period) {
        case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
        case 'week':
            const firstDayOfWeek = now.getDate() - now.getDay();
            startDate = new Date(now.setDate(firstDayOfWeek));
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        default:
            startDate = new Date();
    }

    return { startDate: startDate.toISOString().split('T')[0], endDate: now.toISOString().split('T')[0] };
}



document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const period = this.getAttribute('data-period');
        
        const category = mapPeriodToCategory(period);
        displayNewsByCategory(category);
    });
});

function mapPeriodToCategory(period) {
    
    const mapping = {
        today: 'nearby',
        week: 'country',
        month: 'global'
    };
    return mapping[period] || 'nearby';
}
}



function addWit()

