import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
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

const categoryAPIs = {
  all: "http://4.206.179.192:8000/rssparser/fetch-from-db/",
  backgrounders:
    "http://4.206.179.192:8000/rssparser/categories/backgrounders/",
  "media-advisories":
    "http://4.206.179.192:8000/rssparser/categories/media-advisories/",
  "news-release":
    "http://4.206.179.192:8000/rssparser/categories/news-releases/",
  speeches: "http://4.206.179.192:8000/rssparser/categories/speeches/",
  statements: "http://4.206.179.192:8000/rssparser/categories/statements/",
};

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 15; // Set to 15 items per page

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(categoryAPIs[category], {
          params: {
            page: currentPage,
            page_size: pageSize,
          },
        });

        // Check the API response structure
        console.log("Fetched News:", response.data);

        if (response.data && response.data.length > 0) {
          setNews(response.data); // Assuming data is an array of news items
          setTotalPages(Math.ceil(response.data.length / pageSize)); // Update total pages
        } else {
          setNews([]); // Set empty news if no articles
          setTotalPages(1); // Set total pages to 1 if no articles
        }

        setLoading(false);
      } catch (error) {
        setError("Error loading news.");
        console.error("News fetch error:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <button onClick={() => handleCategoryChange("backgrounders")}>
          Backgrounders
        </button>
        <button onClick={() => handleCategoryChange("news-release")}>
          News Releases
        </button>
        <button onClick={() => handleCategoryChange("speeches")}>
          Speeches
        </button>
        <button onClick={() => handleCategoryChange("statements")}>
          Statements
        </button>
        <button onClick={() => handleCategoryChange("media-advisories")}>
          Media Advisories
        </button>
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
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={(data) => handlePageChange(data.selected + 1)}
          containerClassName={"pagination-container"}
          activeClassName={"active"}
        />
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
