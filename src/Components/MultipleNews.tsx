// src/components/NewsList.tsx

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './MultipleNews.css';

const NewsList: React.FC = () => {
    const [news, setNews] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastNewsElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `https://newsapi.org/v2/everything?domains=wsj.com&page=${page}&apiKey=c377b6ef3ac44513b4b9f80c16626f74`
                );

                setNews((prevNews) => [...prevNews, ...response.data.articles]);
            } catch (error) {
                console.error('Error fetching news data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        if (loading) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        if (lastNewsElementRef.current) {
            observer.current.observe(lastNewsElementRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading]);

    return (
        <h1 className='Latest'>Latest News
            <div>

                {news.map((article, index) => {
                    if (index === news.length - 1) {
                        return (
                            <div key={article.title} ref={lastNewsElementRef} className="news-card">
                                <img src={article.urlToImage} alt={article.title} />
                                <div className="news-details">
                                    {/* <h2>{article.title}</h2> */}
                                    {/* <p>{new Date(article.publishedAt).toLocaleString()}</p> */}
                                </div>
                                <p>{article.name}</p>
                                <p>{new Date(article.publishedAt).toLocaleString()}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div key={article.title} className="news-card">
                                <img src={article.urlToImage} alt={article.title} />
                                <div className="news-details">
                                    {/* <h2>{article.title}</h2> */}

                                </div>
                                <p>{article.name}</p>
                                <p>{new Date(article.publishedAt).toLocaleString()}</p>
                            </div>
                        );
                    }
                })}
                {loading && <p>Loading...</p>}
            </div>
        </h1>
    );
};

export default NewsList;
