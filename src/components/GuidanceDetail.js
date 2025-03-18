import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/GuidancePage.css";

const GuidanceDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific guidance data based on ID when the component mounts
  useEffect(() => {
    axios
      .get(`https://your-backend-api.com/guidances/${id}`)
      .then((response) => {
        setGuidance(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load guidance details");
        setLoading(false);
      });
  }, [id]); // Re-run the effect when the ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!guidance) {
    return <div>Guidance not found!</div>;
  }

  return (
    <div className="guidance-detail">
      <h1>{guidance.title}</h1>
      <p>{guidance.description}</p>
    </div>
  );
};

export default GuidanceDetail;
