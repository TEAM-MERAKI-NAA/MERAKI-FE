import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar
import "../styles/Reminder.css";

const API_BASE_URL = "http://4.206.179.192:8000/reminder/api/reminders/";
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMTE4NDc4LCJpYXQiOjE3NDMxMTgxNzgsImp0aSI6ImQzOWMyYWFkNzEyMzRlOWRhODVhMGFlYjAwZTFjNzgzIiwidXNlcl9pZCI6Nn0.QQQ_jjZiPFarWnKEXgX5D3J9ne9UxfYoaKfsmk_1yls";
const ReminderForm = () => {
  const [title, setTitle] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [documentExpiryDate, setDocumentExpiryDate] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [isActive, setIsActive] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReminder = {
      title: title === "custom" ? customTitle : title,
      document_expiry_date: documentExpiryDate,
      frequency,
      is_active: isActive,
    };

    try {
      console.log("Request Payload:", newReminder);

      const response = await axios.post(API_BASE_URL, newReminder, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });

      console.log("Reminder Created:", response.data);

      await axios.post(
        `${API_BASE_URL}${response.data.id}/send_immediate_reminder/`,
        newReminder,
        {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
      );

      setReminders([...reminders, response.data]);

      setTitle("");
      setCustomTitle("");
      setDocumentExpiryDate("");
      setFrequency("daily");
      setIsActive(true);
    } catch (err) {
      if (err.response) {
        console.error("Error creating reminder:", err.response);
        setError(
          `Error: ${
            err.response.data.detail ||
            err.response.data.message ||
            "Something went wrong"
          }`
        );
      } else if (err.request) {
        console.error("Request error:", err.request);
        setError("Network error. Please check your connection.");
      } else {
        console.error("Error:", err.message);
        setError("Unexpected error occurred.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to remove the reminder from the backend
      const response = await axios.delete(`${API_BASE_URL}${id}/`, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });

      console.log("Reminder Deleted:", response.data);

      // Update the reminders state by filtering out the deleted reminder
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
      setError("Failed to delete the reminder.");
    }
  };

  return (
    <div className="reminder-container">
      <Sidebar /> {/* Include Sidebar component */}
      <div className="reminder-form">
        <h2>Create Reminder</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            >
              <option value="">Select a title</option>
              <option value="SIN Number">SIN Number</option>
              <option value="Passport">Passport</option>
              <option value="Study Permit">Study Permit</option>
              <option value="Work Permit">Work Permit</option>
              <option value="Drivers License">Drivers License</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {title === "custom" && (
            <div className="form-group">
              <label>Custom Title:</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Document Expiry Date:</label>
            <input
              type="date"
              value={documentExpiryDate}
              onChange={(e) => setDocumentExpiryDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Frequency:</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Active:</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>

          <button type="submit">Create Reminder</button>
        </form>

        <h3>Your Reminders</h3>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id}>
              {reminder.title} - {reminder.document_expiry_date} -{" "}
              {reminder.frequency} -{" "}
              {reminder.is_active ? "Active" : "Inactive"}
              <button
                onClick={() => handleDelete(reminder.id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  marginLeft: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReminderForm;
