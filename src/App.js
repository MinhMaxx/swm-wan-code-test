import "./App.css";
import React, { useEffect, useState } from "react";
import placeholderImage from "./assets/images/placeholder.webp";

function App() {
  const [articles, setArticles] = useState([]);

  // Fetch and validate news data
  useEffect(() => {
    fetch("/news.json")
      .then((response) =>
        response.ok ? response.json() : Promise.reject("Failed to fetch")
      )
      .then((data) =>
        setArticles(Array.isArray(data.articles) ? data.articles : [])
      )
      .catch((error) => {
        console.error("Error loading news.json:", error);
        setArticles([]);
      });
  }, []);

  // Extract filename or use a placeholder
  const getImageFilename = (imagePath = "") => {
    const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const filename = imagePath.split("/").pop();
    return validExtensions.includes(filename.split(".").pop().toLowerCase())
      ? filename
      : placeholderImage;
  };

  // Handle missing images
  const handleImageError = (event) => {
    event.target.src = placeholderImage;
  };

  // Handle no article data found
  if (!articles.length) {
    return (
      <div className="App">
        <h2>No News For Today</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="news-grid">
        {/* Main Article */}
        {articles[0] && (
          <div className="articles-group-1-1">
            <div className="text">
              <h1>{articles[0].head || "Title Coming Soon"}</h1>
              <p>{articles[0].teaser || ""}</p>
              <span>{articles[0].byline?.text || ""}</span>
            </div>
            <div className="image">
              <img
                src={`/images/${getImageFilename(articles[0].image)}`}
                alt={articles[0].head || "Title Coming Soon"}
                onError={handleImageError}
              />
            </div>
          </div>
        )}

        {/* Second Article */}
        {articles[1] && (
          <div className="articles-group-1-2">
            <div className="image">
              <img
                src={`/images/${getImageFilename(articles[1].image)}`}
                alt={articles[1].head || "Title Coming Soon"}
                onError={handleImageError}
              />
            </div>
            <div className="text">
              <h2>{articles[1].head || "Title Coming Soon"}</h2>
              <span>{articles[1].byline?.text || ""}</span>
            </div>
          </div>
        )}

        {/* Third Article  */}
        {articles[2] && (
          <div className="articles-group-2-1">
            <div className="image">
              <img
                src={`/images/${getImageFilename(articles[2].image)}`}
                alt={articles[2].head || "Title Coming Soon"}
                onError={handleImageError}
              />
            </div>
            <div className="text">
              <h2>{articles[2].head || "Title Coming Soon"}</h2>
              <p>{articles[2].teaser || ""}</p>
              <span>{articles[2].byline?.text || ""}</span>
            </div>
          </div>
        )}

        {/* Forth Article */}
        <div className="articles-group-2-2">
          {articles.slice(3, 5).map((article, index) => (
            <div key={article?.id || index}>
              <h3>{article?.head || "Title Coming Soon"}</h3>
              <p>{article?.teaser || ""}</p>
              <span>{article?.byline?.text || ""}</span>
            </div>
          ))}
        </div>

        {/* Firth Article */}
        {articles[5] && (
          <div className="articles-group-2-3">
            <div className="image">
              <img
                src={`/images/${getImageFilename(articles[5].image)}`}
                alt={articles[5].head || "Title Coming Soon"}
                onError={handleImageError}
              />
            </div>
            <div className="text">
              <h2>{articles[5].head || "Title Coming Soon"}</h2>
              <p>{articles[5].teaser || ""}</p>
              <span>{articles[5].byline?.text || ""}</span>
            </div>
          </div>
        )}

        {/* Sixth Article */}
        <div className="articles-group-2-4">
          <ul>
            {articles.slice(6, 11).map((article, index) => (
              <li key={article?.id || index}>
                <h4>{article?.head || "Title Coming Soon"}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
