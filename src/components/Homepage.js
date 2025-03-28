import React, { useState, useEffect } from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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
    link: "/Signup", // Updated link for Reminder
  },
  {
    title: "Budget Tracking",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaChalkboardTeacher className="icon yellow" />,
    link: "/Signup", // Updated link for Budget Tracking
  },
  {
    title: "New News",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaNewspaper className="icon light-blue" />,
    link: "/Signup", // Updated link for New News
  },
  {
    title: "Community",
    description:
      "Explore new ways to learn, track budgets, and connect with a community.",
    icon: <FaUsers className="icon red" />,
    link: "/Signup", // Updated link for Community
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
          <a href="/Homepage">Home</a>
        </li>
        <li>
          <a href="/AboutUs">About</a>
        </li>
        <li>
          <a href="/Signup">Sign up</a>
        </li>

        <li>
          <a href="/Login">Log in</a>
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
            <a href={feature.link} className="learn-more">
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
      link: "/Signup",
    },
    {
      id: 2,
      title: "Visa Processing Times Reduced",
      description:
        "Processing times for work visas have been significantly reduced.",
      image:
        "https://www.tripsavvy.com/thmb/yD2KRuls7CiXYcIkXGKCD87jS9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rue-saint-louis-in-the-upper-town-area-of-historic-old-quebec-quebec-city-quebec-canada-554993579-574d08b83df78ccee110df3b.jpg",
      link: "/Signup",
    },
    {
      id: 3,
      title: "Canada Welcomes More Skilled Workers",
      description:
        "Canada aims to welcome more skilled professionals under Express Entry.",
      image:
        "https://www.state.gov/wp-content/uploads/2023/07/shutterstock_1171990615v2.jpg",
      link: "/Signup",
    },
    {
      id: 4,
      title: "Work Permit Renewals Made Easy",
      description:
        "New rules make it simpler for foreign workers to renew their permits.",
      image:
        "https://www.carbonbrief.org/wp-content/uploads/2019/10/canada-hero-01.jpg",
      link: "/Signup",
    },
    {
      id: 5,
      title: "Student Visa Approvals Increase",
      description:
        "More students are being approved for study permits in Canada.",
      image:
        "https://cdn.pixabay.com/photo/2022/04/18/02/24/architecture-7139263_1280.jpg",
      link: "News",
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

// Footer Component with Embedded Map
function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-overlay"></div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@immigrationhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Immigration St, Toronto, Canada</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/Homepage">Home</a>
            </li>
            <li>
              <a href="/AboutUs">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Stay Connected</h3>
          <p>Follow us on social media for updates.</p>
          <div className="social-icons">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="footer-section map-container">
          <h3>Find Us Here</h3>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.883366256811!2d-79.35346270944989!3d43.796033168663065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d30025d174a9%3A0x672b651841539a31!2sSeneca%20Newnham%20Campus!5e0!3m2!1sen!2sca!4v1740111432556!5m2!1sen!2sca"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Team Meraki. All rights reserved.</p>
      </div>
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
