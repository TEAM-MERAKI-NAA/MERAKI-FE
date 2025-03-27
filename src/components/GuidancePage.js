import { useEffect, useState } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Guidance = () => {
  const [guidanceItems, setGuidanceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuidance = async () => {
      try {
        const response = await fetch(
          "http://4.206.179.192:8000/guide/api/guides"
        ); // Replace with your actual API URL
        const text = await response.text(); // Get raw response
        console.log("Raw API Response:", text); // Debugging

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} - ${response.statusText}`
          );
        }

        const data = JSON.parse(text); // Parse response
        setGuidanceItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, []);

  if (loading) return <p>Loading guidance...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (guidanceItems.length === 0) return <p>No guidance available.</p>;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Guidance</h1>
        {guidanceItems.map((item) => (
          <div
            key={item.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "15px 0",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {item.image && (
              <img
                src={`http://4.206.179.192:8000${item.image}`} // Concatenate the base URL with the relative image path
                alt={item.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
            <div>
              <h2 style={{ margin: "0 0 5px", color: "#333" }}>{item.title}</h2>
              <p style={{ margin: "0", color: "#333" }}>
                {item.short_description}
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                <strong>Created:</strong>{" "}
                {new Date(item.created_at).toLocaleString()} |
                <strong> Updated:</strong>{" "}
                {new Date(item.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Guidance;
