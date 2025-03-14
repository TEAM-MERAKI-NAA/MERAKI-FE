import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheck, FaBell } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBeer } from "react-icons/fa";

import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Reminder.css";

export default function ReminderApp() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [customReminder, setCustomReminder] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const features = [
    {
      title: "Track Renewals",
      description: "Never miss an important document renewal again.",
      icon: <FaCheck />,
    },
    {
      title: "Get Notifications",
      description: "Receive timely alerts before expiry dates.",
      icon: <FaBell />,
    },
    {
      title: "Manage Tasks",
      description: "Organize reminders and track completion.",
      icon: <FaPlus />,
    },
  ];

  function Navbar() {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => setSticky(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
        <div className="navbar-logo">Immigration Hub</div>
        <ul className="navbar-links">
          <li>
            <a href="/Homepage">Home</a>
          </li>
          <li>
            <a href="/AboutUs">About</a>
          </li>
          <li>
            <a href="/Features">Features</a>
          </li>
          <li>
            <a href="/Contact">Contact</a>
          </li>
        </ul>
      </nav>
    );
  }

  function FeatureSection() {
    return (
      <section id="feature-section">
        <h2>Get Started!</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon-container">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const addReminder = () => {
    const reminderText = newReminder || customReminder;
    if (reminderText.trim() && expiryDate) {
      setReminders([
        ...reminders,
        { text: reminderText, expiry: expiryDate, frequency, completed: false },
      ]);
      setNewReminder("");
      setCustomReminder("");
      setExpiryDate("");
    }
  };

  const toggleComplete = (index) => {
    setReminders(
      reminders.map((reminder, i) =>
        i === index ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const deleteReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <Navbar />
      <FeatureSection />
      <div className="reminder-card">
        <h1>Reminder App</h1>
        <div className="input-container">
          <select
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
          >
            <option value="">Select a reminder</option>
            <option value="SIN Number">SIN Number</option>
            <option value="Passport">Passport</option>
            <option value="Study Permit">Study Permit</option>
            <option value="Work Permit">Work Permit</option>
            <option value="Driver License">Driver License</option>
          </select>
          <input
            type="text"
            placeholder="Or enter a custom reminder"
            value={customReminder}
            onChange={(e) => setCustomReminder(e.target.value)}
          />
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={addReminder}>
            <FaPlus />
          </button>
        </div>
        <ul className="reminder-list">
          {reminders.map((reminder, index) => (
            <li
              key={index}
              className={`reminder-item ${
                reminder.completed ? "completed" : "pending"
              }`}
            >
              <span>
                {reminder.text} - {reminder.expiry} ({reminder.frequency})
              </span>
              <div className="action-buttons">
                <button onClick={() => toggleComplete(index)}>
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteReminder(index)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

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
