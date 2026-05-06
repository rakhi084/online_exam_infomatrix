import { useNavigate } from "react-router-dom";
import "./css/TeacherDashboard.css";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaChartBar,
  FaUserGraduate,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  // ✅ Fetch exams
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/exams/")
      .then((res) => setExams(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="teacher-dashboard">
      {/* Sidebar */}
      <div className="teacher-sidebar">
        <h2 className="teacher-logo">Online Exams</h2>
        <ul className="teacher-menu">
          <li className="teacher-menu-item">
            <FaHome className="icon" /> Home
          </li>

          <li
            className="teacher-menu-item"
            onClick={() => navigate(`/analytics`)}
          >
            <FaChartBar className="icon" /> Analytics
          </li>

          <li
            className="teacher-menu-item"
            onClick={() => navigate(`/students`)}
          >
            <FaUserGraduate className="icon" /> Students
          </li>

          <li className="teacher-menu-item">
            <FaClipboardList className="icon" /> Exams
          </li>

          <li className="teacher-menu-item">
            <FaCog className="icon" /> Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="teacher-main">
        {/* Header */}
        <div className="teacher-header">
          <h2>Teacher Panel</h2>
          <div className="teacher-profile"></div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Banner */}
        <div className="teacher-banner">
          <div className="teacher-banner-text">
            <h2>Create & Manage Exams Easily</h2>
            <p>Design tests, track performance and manage students.</p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="teacher"
            className="teacher-banner-img"
          />
        </div>

        {/* Top Cards */}
        <div className="teacher-card-container">
          <div
            className="teacher-card teacher-card-create"
            onClick={() => navigate("/create-exam")}
          >
            <FaPlusCircle size={40} />
            <h3>Create Exam</h3>
            <p>Design new tests</p>
          </div>

          <div
            className="teacher-card teacher-card-exams"
            onClick={() => navigate("/my-exams")}
          >
            <FaClipboardList size={40} />
            <h3>My Exams</h3>
            <p>Manage exams</p>
          </div>
        </div>

        {/* ✅ Exams List with View Results */}
        <h3 style={{ marginTop: "20px" }}>Your Exams</h3>

        <div className="teacher-exam-list">
          {exams.length === 0 ? (
            <p>No exams available</p>
          ) : (
            exams.map((exam) => (
              <div className="teacher-exam-card" key={exam.id}>
                <h4>{exam.title}</h4>
                <p>{exam.subject}</p>

                <button
                  className="view-result-btn"
                  onClick={() => navigate(`/teacher/results/${exam.id}`)}
                >
                  View Results
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
