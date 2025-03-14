import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  // Fetching categories using Axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://4.206.179.192:8000/api/categories/news-releases/"
        );
        // console.log("Fetched Categories:", response.data); // Log categories to check the response
        setCategories(response.data); // Set categories to state
      } catch (error) {
        setError("Error loading categories.");
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetching news using Axios
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://4.206.179.192:8000/api/fetch-from-db/"
        );
        console.log("Fetched News:", response.data); // Log the fetched news data
        setNews(response.data.data); // Set the news to state
        setLoading(false);
      } catch (error) {
        setError("Error loading news.");
        console.error("News fetch error:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    console.log("Category changed to:", newCategory); // Log the selected category
    setCategory(newCategory);
  };

  // Filter news based on selected category
  const filteredNews =
    category === "all"
      ? news
      : news.filter((article) => article.category === category);

  // Loading and error handling
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
        {categories.length > 0 &&
          categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(cat.category)}
            >
              {/* {cat.category} */}
            </button>
          ))}
      </div>

      <div className="news-list">
        {filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <div key={index} className="news-item">
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
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

// Main App Component
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
