import { useEffect, useState } from "react";
import axios from "axios";
import "./css/myexamst.css";

function MyExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/exams/")
      .then(res => setExams(res.data));
  }, []);

  const deleteExam = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete-exam/${id}/`)
      .then(() => {
        setExams(exams.filter(e => e.id !== id));
      });
  };

  return (
    <div className="myexams-container">
      <h2 className="myexams-title">My Exams</h2>

      <div className="exam-list">
        {exams.length === 0 ? (
          <p className="no-exams">No exams created yet</p>
        ) : (
          exams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-info">
                <h3>{exam.title}</h3>
                <p>ID: {exam.id}</p>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteExam(exam.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyExams;