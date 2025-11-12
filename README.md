# 🎓 EduTrack - Student Performance Predictor

[![Frontend Live](https://img.shields.io/badge/Frontend-Live-brightgreen)](https://edutrack-frontend-9fo6.onrender.com)  
[![Backend API](https://img.shields.io/badge/API-Live-blue)](https://edutrack-backend-pkbq.onrender.com)  

EduTrack is a **web application** that predicts student performance using personal, academic, and extracurricular data.  
It supports **single student prediction** as well as **bulk CSV uploads**.

---

## ⚡ Features

- 🎯 **Predict Grades** for a single student via form  
- 📁 **CSV Upload** for bulk predictions  
- 🌙 **Dark/Light Mode Toggle**  
- ✅ Automatic download of predicted results  
- 🔗 **REST API** for backend predictions  

---

## 🗂️ Project Structure
EduTrack/
├── backend/ # Flask API + ML model
│ ├── app.py
│ ├── student_performance_model.pkl
│ ├── scaler.pkl
│ ├── requirements.txt
│ ├── uploads/ # temporary CSV uploads
│ └── outputs/ # predicted CSV files
├── frontend/ # React app
│ ├── public/
│ ├── src/
│ │ ├── App.js
│ │ ├── CSVUpload.js
│ │ └── App.css
│ ├── package.json
│ └── build/ # after npm run build
└── README.md


---

## 🚀 Tech Stack

- **Frontend:** React, CSS  
- **Backend:** Flask, Python  
- **ML Model:** scikit-learn  
- **Deployment:** Render  

---

## 📋 CSV Format
Your CSV file should contain the following columns:
Age, Gender, Ethnicity, ParentalEducation, StudyTimeWeekly, Absences,
Tutoring, ParentalSupport, Extracurricular, Sports, Music, Volunteering, GPA


---

## ⚙️ Getting Started

### Backend
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate
pip install -r requirements.txt
python app.py
```
API Endpoints:
/predict → Single student prediction (POST JSON)
/predict_csv → Bulk CSV prediction (POST CSV file)
/download/<filename> → Download predicted CSV
### Frontend
cd frontend
npm install
npm start
Open http://localhost:3000 in your browser.
Make sure API_BASE in App.js points to your backend URL.

### 📄 License
This project is licensed under the MIT License.
See the LICENSE file for more details.

### 👩‍💻 Author
Jheel
GitHub: @Jheel8045
