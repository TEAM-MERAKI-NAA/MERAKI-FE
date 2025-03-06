import { useState, useEffect } from "react";
import "../styles/AboutUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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
          <a href="/Homepage">Features</a>
        </li>
        <li>
          <a href="/Homepage">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

// About Us Component
function AboutUsContent() {
  return (
    <section className="about-us">
      <div className="about-content">
        <h2>About Us</h2>
        <h3>Your Trusted Partner in Immigration Services</h3>
        <p>
          Immigration Hub is a premier consultancy firm dedicated to helping
          individuals and families navigate the complex immigration process with
          ease. Since our establishment in 2012, we have assisted thousands of
          clients in achieving their dreams of living and working abroad.
        </p>
      </div>
      <div className="about-image">
        <img src="/about.jpg" />
      </div>
    </section>
  );
}

// Team Section Component
const teamMembers = [
  {
    name: "Swagat Koirala",
    role: "Backend Developer",
    image: "/3.jpg",
    description:
      "Swagat specializes in backend development with expertise in databases and server-side logic.",
  },
  {
    name: "Abi Chitrakar",
    role: "Backend Developer",
    image: "/4.jpg",
    description:
      "Abi focuses on API development and optimizing backend performance.",
  },
  {
    name: "Arjoo Khattri",
    role: "Frontend Developer",
    image: "/1.jpg",
    description:
      "Arjoo builds interactive UI components and ensures a seamless user experience.",
  },
  {
    name: "Yash Gujral",
    role: "Frontend Developer",
    image: "/2.jpg",
    description:
      "Yash specializes in modern frontend frameworks and responsive design.",
  },
  {
    name: "Sandesh Dhakal",
    role: "SRE DevOps Engineer",
    image: "/5.jpg",
    description:
      "Sandesh ensures system reliability, CI/CD pipelines, and cloud infrastructure optimization.",
  },
];

function Team() {
  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
// Our Values Section Component
const values = [
  {
    title: "Innovation",
    description:
      "We specialize in new thoughts to represent your brand in an innovative and advanced way.",
    icon: "🔍",
  },
  {
    title: "Creativity",
    description:
      "We convert your theories into practice to get the best outcomes available in today's business world.",
    icon: "📊",
  },
  {
    title: "Technology Driven",
    description:
      "Using technically advanced ways, developing, adapting, and promoting website content to maximize traffic and leads.",
    icon: "☁️",
  },
  {
    title: "Teamwork",
    description:
      "Our organized team uses digital services to get you the most of your website traffic and online attention.",
    icon: "📈",
  },
  {
    title: "Dedication",
    description:
      "We are sincerely devoted to our vision of delivering excellent digital content.",
    icon: "📊",
  },
  {
    title: "Trust",
    description:
      "With over 330+ partners and 4800+ projects done, we are a truly trustworthy partner in the field.",
    icon: "🌍",
  },
  {
    title: "Teamwork",
    description:
      "Our organized team uses digital services to get you the most of your website traffic and online attention.",
    icon: "📈",
  },
  {
    title: "Dedication",
    description:
      "We are sincerely devoted to our vision of delivering excellent digital content.",
    icon: "📊",
  },
];

function OurValues() {
  return (
    <section className="values-section">
      <h2>Our Values</h2>
      <div className="values-container">
        {values.map((value, index) => (
          <div key={index} className="value-card">
            <span className="value-icon">{value.icon}</span>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
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

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <AboutUsContent />
      <OurValues />
      <Team />
      <Footer />
    </div>
  );
}
