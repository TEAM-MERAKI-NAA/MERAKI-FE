import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import "../styles/Reminder.css";
import Sidebar from "./Sidebar";

export default function ReminderApp() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [customReminder, setCustomReminder] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [isCustomReminder, setIsCustomReminder] = useState(false); // Flag to toggle custom input visibility

  const API_URL = "http://4.206.179.192:8000/reminder/api/reminders/";

  // Fetch reminders from the API when the component mounts
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setReminders(response.data))
      .catch((error) =>
        console.error("There was an error fetching reminders!", error)
      );
  }, []);

  // Add a new reminder
  const addReminder = () => {
    const reminderText = newReminder || customReminder;

    if (reminderText.trim() && expiryDate) {
      const newReminderData = {
        text: reminderText,
        expiry: expiryDate,
        frequency,
      };

      // Send the new reminder data to the backend
      axios
        .post(API_URL, newReminderData)
        .then((response) => {
          // Update the reminders list with the newly added reminder
          setReminders((prevReminders) => [...prevReminders, response.data]);

          // Clear the input fields after adding the reminder
          setNewReminder("");
          setCustomReminder("");
          setExpiryDate("");
          setIsCustomReminder(false); // Reset to default (non-custom) reminder
        })
        .catch((error) =>
          console.error("There was an error adding the reminder!", error)
        );
    }
  };

  // Toggle completion status of a reminder
  const toggleComplete = (index) => {
    setReminders(
      reminders.map((reminder, i) =>
        i === index ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  // Delete a reminder via API
  const deleteReminder = (index) => {
    axios
      .delete(`${API_URL}${index}/`)
      .then(() => {
        setReminders(reminders.filter((_, i) => i !== index));
      })
      .catch((error) =>
        console.error("There was an error deleting the reminder!", error)
      );
  };

  // Handle Dropdown Change (to show custom input field)
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomReminder(true); // Show custom reminder input field
    } else {
      setIsCustomReminder(false); // Hide custom reminder input field
      setNewReminder(value); // Set selected value as reminder
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="reminder-card">
          <h1>Reminder App</h1>
          <div className="input-container">
            <select value={newReminder} onChange={handleDropdownChange}>
              <option value="">Select a reminder</option>
              <option value="SIN Number">SIN Number</option>
              <option value="Passport">Passport</option>
              <option value="Study Permit">Study Permit</option>
              <option value="Work Permit">Work Permit</option>
              <option value="Driver License">Driver License</option>
              <option value="custom">Custom Reminder</option>
            </select>

            {/* Show custom reminder input when "Custom Reminder" is selected */}
            {isCustomReminder && (
              <input
                type="text"
                placeholder="Enter custom reminder"
                value={customReminder}
                onChange={(e) => setCustomReminder(e.target.value)}
              />
            )}

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
      </div>
    </div>
  );
}
