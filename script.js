const API_KEY = d9cb6808172d43b69e4cf56a808d0637; // Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');

// Function to fetch news data
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news: ", error);
    }
}

// Function to display news articles
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear existing news
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const newsHTML = `
            <img src="${article.urlToImage || 'default-image.jpg'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsItem.innerHTML = newsHTML;
        newsContainer.appendChild(newsItem);
    });
}

// Fetch news when page loads
window.onload = function() {
    fetchNews();
    setInterval(fetchNews, 3600000); // Refresh news every 1 hour (3600000 ms)
};
