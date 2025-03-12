import React, { useState, useEffect } from "react";
import "../styles/News.css";

// Hero Section Component
const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content"></div>
      <div className="hero-media">
        <div className="hero-images">
          <img
            src="https://www.collegesinstitutes.ca/wp-content/uploads/2022/10/header-img-whatwedo.jpg"
            alt="Immigration News"
          />
          <img
            src="https://www.collegesinstitutes.ca/wp-content/uploads/2022/09/header-img-media-resources.jpg"
            alt="Immigration News"
          />
          <img
            src="https://www.collegesinstitutes.ca/wp-content/uploads/2022/10/header-img-boardofdirectors.jpg"
            alt="Immigration News"
          />
          <img
            src="https://www.collegesinstitutes.ca/wp-content/uploads/2023/06/header-img-intl-programs.jpg"
            alt="Immigration News"
          />
          <img
            src="https://www.collegesinstitutes.ca/wp-content/uploads/2022/10/header-img-advocacy-1.jpg"
            alt="Immigration News"
          />
        </div>
      </div>
    </div>
  );
};

// Sticky Navbar Component
function Navbar() {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="main-navbar" className={isSticky ? "sticky" : ""}>
      <div id="navbar-logo">Immigration Hub</div>
      <ul id="navbar-links">
        <li>
          <a href="/Homepage">Home</a>
        </li>
        <li>
          <a href="/Homepage">About</a>
        </li>
        <li>
          <a href="/Homepage">Features</a>
        </li>
        <li>
          <a href="/Homepage">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

// News Component
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.example.com/news");
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        setError("Error loading news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const filteredNews =
    category === "all"
      ? news
      : news.filter((article) => article.category === category);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="news-page">
      <div className="category-filters">
        <button onClick={() => handleCategoryChange("all")}>All</button>
        <button onClick={() => handleCategoryChange("immigration")}>
          Immigration
        </button>
        <button onClick={() => handleCategoryChange("policy")}>Policy</button>
        {/* Add more categories as needed */}
      </div>

      <div className="news-list">
        {filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <div key={index} className="news-item">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <div>No news articles available.</div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Hero />
      <Navbar />
      <News />
    </div>
  );
};

export default App;
