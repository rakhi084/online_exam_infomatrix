import React, { useEffect, useState } from "react";
import axios from "axios";

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/exams/")
      .then(res => setExams(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Available Exams</h2>
      <div className="grid">
        {exams.map(exam => (
          <div className="card" key={exam.id}>
            <h3>{exam.title}</h3>
            <p>{exam.subject}</p>
            <p>{exam.duration} min</p>
            <button onClick={() => window.location=`/exam/${exam.id}`}>
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;