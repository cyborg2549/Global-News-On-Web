document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = d9cb6808172d43b69e4cf56a808d0637; // Replace with your actual API key
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2024-08-22&sortBy=publishedAt?country=us&apiKey=${d9cb6808172d43b69e4cf56a808d0637}`;
    const newsContainer = document.getElementById('news-container');

    // Fetch news articles from the NewsAPI
    fetch(NEWS_API_URL)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            if (articles && articles.length > 0) {
                articles.forEach(article => {
                    // Create a news card for each article
                    const newsCard = document.createElement('div');
                    newsCard.classList.add('news-card');
                    const articleImage = article.urlToImage || 'https://via.placeholder.com/300'; // Placeholder for missing images
                    const articleTitle = article.title;
                    const articleDescription = article.description || 'No description available.';
                    const articleUrl = article.url;
                    const articleSource = article.source.name;

                    newsCard.innerHTML = `
                        <img src="${articleImage}" alt="${articleTitle}">
                        <h3>${articleTitle}</h3>
                        <p>${articleDescription}</p>
                        <a href="${articleUrl}" target="_blank">Read More</a>
                        <p><small>Source: ${articleSource}</small></p>
                    `;
                    newsContainer.appendChild(newsCard);
                });
            } else {
                newsContainer.innerHTML = '<p>No news available at the moment.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Unable to load news at this time.</p>';
        });
});
