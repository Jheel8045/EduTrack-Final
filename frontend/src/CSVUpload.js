import React, { useState } from "react";
import "./App.css";

function CSVUpload({ backendUrl }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${backendUrl}/predict_csv`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setMessage(`❌ ${data.error}`);
        return;
      }

      setMessage(data.message || "✅ File processed successfully!");

      // Trigger download automatically
      if (data.download_url) {
        const link = document.createElement("a");
        link.href = data.download_url;
        link.setAttribute("download", "predicted_output.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading file.");
    }
  };

  return (
    <div className="csv-upload">
      <h2>📁 Upload Student Data (CSV)</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload & Predict</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CSVUpload;
