import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/studentdashboard.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import {
  FaHome,
  FaChartBar,
  FaUserGraduate,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate(); // ✅ FIX (you forgot this)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/exams/")
      .then((res) => setExams(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="student-sidebar">
        <h2 className="student-logo">Online Exam</h2>

        <ul className="student-menu">
          <li className="student-menu-item" onClick={() => navigate(`/`)}>
            <FaHome /> Home
          </li>

          <li
            className="student-menu-item"
            onClick={() => navigate(`/analytics`)}
          >
            <FaChartBar /> Analytics
          </li>

          <li
            className="student-menu-item"
            onClick={() => navigate(`/students`)}
          >
            <FaUserGraduate /> Students
          </li>

          <li className="student-menu-item">
            <FaClipboardList /> Exams
          </li>

          <li
            className="student-menu-item"
            onClick={() => {
              navigate("/contactus");
            }}
          >
            <FaCog /> Contact us
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="student-main">
        {/* Header */}
        <div className="student-header">
          <input
            className="student-search"
            type="text"
            placeholder="Search exams..."
          />

          <div className="student-profile-box">
            <div className="student-avatar">
              <FaUserCircle size={30} />
            </div>

            <button
              className="student-logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="student-profile-card">
          <h2>Your Profile</h2>
          <p>Hi Student, you are doing great! 🚀</p>
          <button className="student-goal-btn">Set Goals</button>
        </div>

        {/* Exams */}
        <h2 className="student-section-title">Available Exams</h2>

        <div className="student-exam-grid">
          {exams.map((exam) => (
            <div className="student-exam-card" key={exam.id}>
              {/* Badge */}
              <span className="student-badge">{exam.subject}</span>

              {/* Title */}
              <h3 className="student-exam-title">{exam.title}</h3>

              {/* Info */}
              <div className="student-exam-info">
                <span>📝 {exam.questions_count || 5} Questions</span>
                <span>⏱ {exam.duration} min</span>
              </div>

              {/* Button */}
              <button
                className="student-attempt-btn"
                onClick={() => navigate(`/attempt/${exam.id}`)}
              >
                Attempt
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
