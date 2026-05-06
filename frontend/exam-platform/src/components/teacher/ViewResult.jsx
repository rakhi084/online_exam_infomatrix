import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/viewresult.css";

function ViewResult() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/result/${id}/`)
      .then(res => setResult(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!result) return <p>Loading...</p>;

  const percentage = ((result.score / result.total) * 100).toFixed(2);

  return (
    <div className="result-page">
      <div className="result-box">
        <h2>Exam Result</h2>

        <h3>{result.exam_title}</h3>

        <p className="score">
          {result.score} / {result.total}
        </p>

        <p className="percentage">
          {percentage}%
        </p>

        <p className="status">
          {percentage >= 50 ? "✅ Passed" : "❌ Failed"}
        </p>
      </div>
    </div>
  );
}

export default ViewResult;