import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HotTopics.css'
import CardsNews from './CardsNews';

interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface ApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

const NewsCard: React.FC = () => {
    const [selectedNews, setSelectedNews] = useState<Article | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = 'c377b6ef3ac44513b4b9f80c16626f74'; 
            const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

            try {
                const response = await axios.get<ApiResponse>(apiUrl);

                // Generate a random index to select a news article
                const randomIndex = Math.floor(Math.random() * response.data.articles.length);
                const randomArticle = response.data.articles[randomIndex];

                setSelectedNews(randomArticle);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        
        <div className="card-container">
            
            {selectedNews && (
                <div className="card">
                    <div className="card-overlay">
                        <h3>{selectedNews.title}</h3>
                        {/* <p>{selectedNews.description}</p>
                        <p>Author: {selectedNews.author}</p> */}
                        <p>Published At: {selectedNews.publishedAt}</p>
                        {/* <a href={selectedNews.url} target="_blank" rel="noopener noreferrer">
                            Read More
                        </a> */}
                    </div>
                    {selectedNews.urlToImage && <img src={selectedNews.urlToImage} alt={selectedNews.title} />}
                        {/* <CardsNews/> */}
                </div>
            )}
        </div>
       
    );
};

export default NewsCard;
