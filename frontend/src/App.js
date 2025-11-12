import React, { useState, useEffect } from "react";
import "./App.css";
import CSVUpload from "./CSVUpload";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Ethnicity: "",
    ParentalEducation: "",
    StudyTimeWeekly: "",
    Absences: "",
    Tutoring: "",
    ParentalSupport: "",
    Extracurricular: "",
    Sports: "",
    Music: "",
    Volunteering: "",
    GPA: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // 🌐 Switch automatically between local and deployed backend
  const API_BASE =
    process.env.NODE_ENV === "production"
      ? "https://edutrack-backend-pkbq.onrender.com"
      : "http://127.0.0.1:5000";

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const getGradeLabel = (grade) => {
    switch (parseInt(grade)) {
      case 1:
        return "Excellent 🎯";
      case 2:
        return "Good 👍";
      case 3:
        return "Average 🟡";
      case 4:
        return "Below Average ⚠️";
      default:
        return "Needs Attention ❗";
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.predicted_grade_class);
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong. Please try again!");
    }
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>🎓 EduTrack - Student Performance Predictor</h1>

      <div className="main-content">
        {/* ---- LEFT: Prediction Form ---- */}
        <div className="form-section">
          <form onSubmit={handleSubmit} className="grid-form">
            {Object.keys(formData).map((key) => (
              <div
                key={key}
                className={`input-group ${
                  key === "GPA" ? "full-width" : ""
                }`}
              >
                <label>{key.replace(/([A-Z])/g, " $1")}</label>
                {[
                  "Gender",
                  "Ethnicity",
                  "ParentalEducation",
                  "Tutoring",
                  "ParentalSupport",
                  "Extracurricular",
                  "Sports",
                  "Music",
                  "Volunteering",
                ].includes(key) ? (
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {key === "Gender" && (
                      <>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                      </>
                    )}
                    {key === "Ethnicity" &&
                      ["Group A", "Group B", "Group C", "Group D", "Group E"].map(
                        (grp, idx) => (
                          <option key={grp} value={idx}>
                            {grp}
                          </option>
                        )
                      )}
                    {key === "ParentalEducation" &&
                      ["None", "High School", "Bachelor", "Master", "Doctorate"].map(
                        (lvl, idx) => (
                          <option key={lvl} value={idx}>
                            {lvl}
                          </option>
                        )
                      )}
                    {key === "ParentalSupport" &&
                      ["None", "Low", "Moderate", "High", "Very High"].map(
                        (lvl, idx) => (
                          <option key={lvl} value={idx}>
                            {lvl}
                          </option>
                        )
                      )}
                    {[
                      "Tutoring",
                      "Extracurricular",
                      "Sports",
                      "Music",
                      "Volunteering",
                    ].includes(key) && (
                      <>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={key === "GPA" ? "number" : "number"}
                    step={key === "GPA" ? "0.01" : "1"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

            <div className="button-container full-width">
              <button type="submit">Predict Grade</button>
            </div>
          </form>

          {error && <p className="error">{error}</p>}

          {prediction && (
            <div className="result">
              <h3>
                Predicted Grade:{" "}
                <span style={{ color: "#007bff" }}>
                  {getGradeLabel(prediction)}
                </span>
              </h3>
            </div>
          )}
        </div>

        {/* ---- RIGHT: CSV Upload ---- */}
        <div className="csv-section">
          <CSVUpload backendUrl={API_BASE} />
        </div>
      </div>
    </div>
  );
}

export default App;
