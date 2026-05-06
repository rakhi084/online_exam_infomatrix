import { useEffect, useState } from "react";
import axios from "axios";

function ViewAttempts({ examId }) {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/attempts/${examId}/`)
      .then(res => setAttempts(res.data));
  }, []);

  return (
    <div>
      <h2>Student Attempts</h2>

      {attempts.map(a => (
        <div key={a.id}>
          <p>User ID: {a.user}</p>
          <p>Score: {a.score}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewAttempts;