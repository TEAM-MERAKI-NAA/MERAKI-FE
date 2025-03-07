import React, { useState, useEffect } from "react";
import "../styles/News.css";

// Dummy data for testing
const dummyNews = [
  {
    title: "Canada's New Immigration Policies: What You Need to Know",
    description:
      "Canada has introduced new immigration policies aimed at welcoming skilled workers and refugees from around the world.",
    url: "https://www.cic.gc.ca",
    source: { name: "Immigration Canada" },
    publishedAt: "2025-02-22T10:00:00Z",
  },
  {
    title: "How Canada is Tackling Immigration Backlogs",
    description:
      "The Canadian government has announced measures to clear the backlog of immigration applications, aiming to improve processing times.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-21T15:00:00Z",
  },
  {
    title: "Express Entry: Canada's Fast-Track Immigration Program",
    description:
      "Canada's Express Entry system continues to be the most popular immigration program for skilled workers from around the world.",
    url: "https://www.cic.gc.ca",
    source: { name: "CIC News" },
    publishedAt: "2025-02-20T08:30:00Z",
  },
  {
    title:
      "New Pathway to Canadian Permanent Residency for International Students",
    description:
      "International students in Canada now have more pathways to permanent residency under the new pilot program announced by the Canadian government.",
    url: "https://www.globalnews.ca",
    source: { name: "Global News" },
    publishedAt: "2025-02-19T12:45:00Z",
  },
  {
    title: "Canada's Immigration Growth Expected to Continue in 2025",
    description:
      "Canada's immigration numbers are expected to increase further in 2025 as the country works to meet its labor market needs.",
    url: "https://www.ctvnews.ca",
    source: { name: "CTV News" },
    publishedAt: "2025-02-18T09:00:00Z",
  },
  {
    title: "Canada’s Immigration Policies in 2025: What’s Changing?",
    description:
      "The Canadian government has announced significant changes to immigration policies in 2025 to address labor shortages and increase skilled worker numbers.",
    url: "https://www.ctvnews.ca",
    source: { name: "CTV News" },
    publishedAt: "2025-02-17T14:00:00Z",
  },
  {
    title: "How Express Entry is Shaping Canada’s Immigration Future",
    description:
      "Canada's Express Entry system is evolving to ensure more skilled workers can enter the country as part of a broader immigration strategy.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-16T08:00:00Z",
  },
  {
    title: "Family Sponsorship Program to Expand in Canada",
    description:
      "Canada plans to expand its family sponsorship program in 2025, allowing more citizens to bring their loved ones into the country.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-15T13:00:00Z",
  },
  {
    title: "Canada to Introduce New Visa for Digital Nomads",
    description:
      "The Canadian government is introducing a new visa aimed at attracting remote workers and digital nomads to live and work in the country.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-14T11:30:00Z",
  },
  {
    title: "Canada’s Provincial Nominee Program: Key Updates for 2025",
    description:
      "Canada’s Provincial Nominee Program continues to evolve, with new changes aimed at helping provinces meet their specific labor market needs.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-13T09:15:00Z",
  },
  {
    title: "New Immigration Pathway for Refugees in Canada",
    description:
      "The Canadian government has introduced a new immigration pathway to allow refugees fleeing conflict zones to seek protection and permanent residency.",
    url: "https://www.globalnews.ca",
    source: { name: "Global News" },
    publishedAt: "2025-02-12T10:45:00Z",
  },
  {
    title: "Canada to Fast-Track Immigration for Health Workers",
    description:
      "In response to a healthcare labor shortage, Canada is accelerating the immigration process for health workers and professionals.",
    url: "https://www.globalnews.ca",
    source: { name: "Global News" },
    publishedAt: "2025-02-11T14:15:00Z",
  },
  {
    title: "Canada's New Refugee Resettlement Plan for 2025",
    description:
      "Canada has announced a new refugee resettlement plan aimed at providing safety and support for more refugees from war-torn regions.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-10T13:00:00Z",
  },
  {
    title: "How the Atlantic Immigration Program is Helping Canada’s Economy",
    description:
      "The Atlantic Immigration Pilot Program is making it easier for skilled workers to move to Canada's Atlantic provinces, boosting the local economy.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-09T08:45:00Z",
  },
  {
    title:
      "International Students: A Key Driver of Canada's Immigration Growth",
    description:
      "International students continue to be a key driver of Canada’s immigration growth, with more opportunities for students to stay and work after graduation.",
    url: "https://www.ctvnews.ca",
    source: { name: "CTV News" },
    publishedAt: "2025-02-08T10:00:00Z",
  },
  {
    title: "Canada to Launch New Immigration Portal in 2025",
    description:
      "The Canadian government will launch a new online portal in 2025 to make it easier for potential immigrants to apply and track their applications.",
    url: "https://www.ctvnews.ca",
    source: { name: "CTV News" },
    publishedAt: "2025-02-07T12:30:00Z",
  },
  {
    title: "Canada Increases Immigration Targets for 2025",
    description:
      "Canada has raised its immigration targets for 2025 as part of a broader plan to address labor shortages and support economic growth.",
    url: "https://www.globalnews.ca",
    source: { name: "Global News" },
    publishedAt: "2025-02-06T14:30:00Z",
  },
  {
    title: "Canada Announces New Temporary Visa Options for Workers",
    description:
      "The Canadian government is introducing new temporary visa options to help employers address labor shortages in key industries.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-05T11:00:00Z",
  },
  {
    title: "Canada’s Immigration System: What's Next in 2025",
    description:
      "Experts weigh in on what’s next for Canada’s immigration system, with a focus on adapting to the changing needs of the labor market.",
    url: "https://www.globalnews.ca",
    source: { name: "Global News" },
    publishedAt: "2025-02-04T09:45:00Z",
  },
  {
    title: "Canada to Expand its Economic Class Immigration Pathways",
    description:
      "The Canadian government is expanding economic class immigration pathways to attract more skilled workers in high-demand sectors.",
    url: "https://www.cbc.ca",
    source: { name: "CBC News" },
    publishedAt: "2025-02-03T13:00:00Z",
  },
];

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

  useEffect(() => {
    setLoading(true);
    // Simulate an API call with dummy data
    setTimeout(() => {
      setNews(dummyNews);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading news: {error}</div>;
  }

  return (
    <div className="news-page">
      <div className="news-list">
        {news && news.length > 0 ? (
          news.map((article, index) => (
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
