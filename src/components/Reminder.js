import { useState } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

export default function ReminderApp() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (newReminder.trim() !== "") {
      setReminders([...reminders, { text: newReminder, completed: false }]);
      setNewReminder("");
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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Reminder App
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a reminder..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addReminder}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {reminders.map((reminder, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 border rounded-lg ${
                reminder.completed ? "bg-green-200" : "bg-gray-50"
              }`}
            >
              <span
                className={`flex-grow ${
                  reminder.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {reminder.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(index)}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteReminder(index)}
                  className="text-red-500 hover:text-red-700"
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
