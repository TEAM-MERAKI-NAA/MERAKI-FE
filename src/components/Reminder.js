import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheck, FaBell } from "react-icons/fa";
import "../styles/Reminder.css";

export default function ReminderApp() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [customReminder, setCustomReminder] = useState("");
  const [frequency, setFrequency] = useState("daily");

  useEffect(() => {
    const checkReminders = () => {
      const today = new Date().toISOString().split("T")[0];
      reminders.forEach((reminder) => {
        if (reminder.expiry === today) {
          new Notification("Reminder Alert", {
            body: `Time to renew: ${reminder.text}`,
          });
        }
      });
    };

    if (Notification.permission === "granted") {
      checkReminders();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          checkReminders();
        }
      });
    }
  }, [reminders]);

  const addReminder = () => {
    const reminderText = newReminder || customReminder;
    if (reminderText.trim() !== "" && expiryDate !== "") {
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
    const updatedReminders = reminders.map((reminder, i) =>
      i === index ? { ...reminder, completed: !reminder.completed } : reminder
    );
    setReminders(updatedReminders);
  };

  const deleteReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Upcoming Renewals</h2>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index} className="sidebar-item">
              {reminder.text} - {reminder.expiry} ({reminder.frequency})
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
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
    </div>
  );
}
