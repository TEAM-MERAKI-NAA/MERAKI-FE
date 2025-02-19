import React, { useState, useEffect } from "react";
import "../styles/Homepage.css";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaNewspaper,
  FaUsers,
} from "react-icons/fa";

// Feature Section Data
const features = [
  {
    title: "Reminder",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaBookOpen className="icon blue" />,
  },
  {
    title: "Budget Tracking",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaChalkboardTeacher className="icon yellow" />,
  },
  {
    title: "New News",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaNewspaper className="icon light-blue" />,
  },
  {
    title: "Community",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaUsers className="icon red" />,
  },
];

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
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Features</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="hero-section">
      <Navbar />
      <div id="hero-content">
        <h1>Welcome to Our Platform</h1>
        <p>
          Explore new ways to learn, track budgets, and connect with a
          community.
        </p>
      </div>
    </section>
  );
}

// Feature Section Component
function FeatureSection() {
  return (
    <section id="feature-section">
      <h2 id="feature-title">
        Get Started! <span className="underline"></span>
      </h2>
      <div id="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon-container">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <a href="#" className="learn-more">
              Learn more
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// News Section Component
function NewsSection() {
  const newsArticles = [
    {
      id: 1,
      title: "New Immigration Policies Announced",
      description:
        "The government has introduced new policies to streamline applications.",
      image:
        "https://cdn.pixabay.com/photo/2022/04/18/02/24/architecture-7139263_1280.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Visa Processing Times Reduced",
      description:
        "Processing times for work visas have been significantly reduced.",
      image:
        "https://www.tripsavvy.com/thmb/yD2KRuls7CiXYcIkXGKCD87jS9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rue-saint-louis-in-the-upper-town-area-of-historic-old-quebec-quebec-city-quebec-canada-554993579-574d08b83df78ccee110df3b.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Canada Welcomes More Skilled Workers",
      description:
        "Canada aims to welcome more skilled professionals under Express Entry.",
      image:
        "https://www.state.gov/wp-content/uploads/2023/07/shutterstock_1171990615v2.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Work Permit Renewals Made Easy",
      description:
        "New rules make it simpler for foreign workers to renew their permits.",
      image:
        "https://www.carbonbrief.org/wp-content/uploads/2019/10/canada-hero-01.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Student Visa Approvals Increase",
      description:
        "More students are being approved for study permits in Canada.",
      image:
        "https://cdn.pixabay.com/photo/2022/04/18/02/24/architecture-7139263_1280.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "New Refugee Policies in Effect",
      description:
        "The government introduces new measures to support refugees.",
      image:
        "https://www.torontosom.ca/wp-content/uploads/2022/04/top-cities-in-canada-for-international-travellers.jpg",
      link: "#",
    },
    {
      id: 7,
      title: "Express Entry Draw Results",
      description:
        "Latest Express Entry draw invites thousands of new applicants.",
      image:
        "https://theimmigrationoffice.com/wp-content/uploads/2015/08/Canadian-cities.jpg",
      link: "#",
    },
    {
      id: 8,
      title: "Job Market Opens for Immigrants",
      description:
        "More job opportunities are now available for new immigrants.",
      image:
        "https://images.pexels.com/photos/2916826/pexels-photo-2916826.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-2916826.jpg&fm=jpg",
      link: "#",
    },
    {
      id: 9,
      title: "Permanent Residency Updates",
      description:
        "New updates on the PR process for international applicants.",
      image:
        "https://media.istockphoto.com/id/1368242984/photo/canada-flag-waving-in-ottawa.jpg?s=612x612&w=0&k=20&c=6xztoco_fpx0MD6kntgO5KaN5PLhOqtW4pI1MbG9kXw=",
      link: "#",
    },
  ];

  return (
    <section id="news-section">
      <h2 className="section-title">Latest News</h2>
      <div className="news-grid">
        {newsArticles.map((article) => (
          <div key={article.id} className="news-card">
            <img
              src={article.image}
              alt={article.title}
              className="news-image"
            />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.link} className="read-more">
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer id="main-footer">
      <p>&copy; 2025 Team Meraki. All rights reserved.</p>
    </footer>
  );
}

// HomePage Component
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
