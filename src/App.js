import "./App.css";
import React from "react";
import newsData from "./news.json";

function App() {
  const { articles } = newsData;

  const getImageFilename = (imagePath) => imagePath.split("/").pop();

  return (
    <div className="App">
      <div className="news-grid">
        <div className="articles-group-1-1">
          <div className="text">
            <h1>{articles[0].head}</h1>
            <p>{articles[0].teaser}</p>
            <span>{articles[0].byline.text}</span>
          </div>
          <div className="image">
            <img
              src={`/images/${getImageFilename(articles[0].image)}`}
              alt={articles[0].head}
            />
          </div>
        </div>

        <div className="articles-group-1-2">
          <div className="image">
            <img
              src={`/images/${getImageFilename(articles[1].image)}`}
              alt={articles[1].head}
            />
          </div>
          <div className="text">
            <h2>{articles[1].head}</h2>
            <span>{articles[1].byline.text}</span>
          </div>
        </div>

        <div className="articles-group-2-1">
          <div className="image">
            <img
              src={`/images/${getImageFilename(articles[2].image)}`}
              alt={articles[2].head}
            />
          </div>
          <div className="text">
            <h2>{articles[2].head}</h2>
            <p>{articles[2].teaser}</p>
            <span>{articles[2].byline.text}</span>
          </div>
        </div>

        <div className="articles-group-2-2">
          {articles.slice(3, 5).map((article) => (
            <div key={article.id}>
              <h3>{article.head}</h3>
              <p>{article.teaser}</p>
              <span>{article.byline.text}</span>
            </div>
          ))}
        </div>

        <div className="articles-group-2-3">
          <div className="image">
            <img
              src={`/images/${getImageFilename(articles[5].image)}`}
              alt={articles[5].head}
            />
          </div>
          <div className="text">
            <h2>{articles[5].head}</h2>
            <p>{articles[5].teaser}</p>
            <span>{articles[5].byline.text}</span>
          </div>
        </div>

        <div className="articles-group-2-4">
          <ul>
            {articles.slice(6, 11).map((article) => (
              <li key={article.id}>
                <h4>{article.head}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
