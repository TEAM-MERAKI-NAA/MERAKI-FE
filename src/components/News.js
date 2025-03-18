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
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [totalNews, setTotalNews] = useState(0); // Total number of news articles

  const pageSize = 10; // Number of news items per page

  // // Fetching categories
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://4.206.179.192:8000/api/categories/news-releases/"
  //       );
  //       setCategories(response.data);
  //     } catch (error) {
  //       setError("Error loading categories.");
  //       console.error("Category fetch error:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // Fetching news based on category and current page
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://4.206.179.192:8000/rssparser/fetch-from-db/",
          {
            params: {
              page: currentPage, // Current page
              page_size: pageSize, // Number of articles per page
              category: category === "all" ? "" : category, // Filter by category
            },
          }
        );

        // Debugging: Log the response data
        console.log("Fetched News:", response.data);

        setNews(response.data.data); // Set the paginated news articles
        setTotalNews(response.data.total); // Set the total number of articles (for pagination)
        setTotalPages(Math.ceil(response.data.total / pageSize)); // Calculate the total pages
        setLoading(false);
      } catch (error) {
        setError("Error loading news.");
        console.error("News fetch error:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, category]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  // Change page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="news-page">
      {/* Categories Section */}
      <div className="category-filters">
        <button onClick={() => handleCategoryChange("all")}>All</button>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(cat.category)}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="news-list">
        {news.length > 0 ? (
          news.map((article, index) => (
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

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <News />
    </div>
  );
};

export default App;
