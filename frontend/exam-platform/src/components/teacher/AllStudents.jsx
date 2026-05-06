import { useEffect, useState } from "react";
import axios from "axios";
import "./css/students.css";

function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students/")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="students-container">
      <h2 className="students-title">All Students</h2>

      {students.length === 0 ? (
        <p className="no-data">No students found</p>
      ) : (
        <div className="students-list">
          {students.map((s) => (
            <div key={s.id} className="student-card">
              <h3>{s.username}</h3>
              <p>Total Exams: {s.total_exams}</p>
              <p>Total Score: {s.total_score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllStudents;