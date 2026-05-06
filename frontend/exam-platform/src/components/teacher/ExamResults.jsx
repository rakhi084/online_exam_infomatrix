import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "./css/examresultss.css";
function ExamResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/exam-results/${id}/`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="tr-container">
      <h2 className="tr-title">
        <FaChartBar className="tr-icon" />   Student Results
      </h2>

      {/* Summary */}
      <div className="tr-summary">
        <div className="tr-card">
          <h3>{results.length}</h3>
          <p>Total Students</p>
        </div>

        <div className="tr-card">
          <h3>
            {results.length
              ? (
                  results.reduce((sum, r) => sum + (r.percentage || 0), 0) /
                  results.length
                ).toFixed(2)
              : 0}
            %
          </h3>
          <p>Average Score</p>
        </div>
      </div>

      {/* Table */}
      <div className="tr-table-wrapper">
        <table className="tr-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r, i) => {
              const percent = r.percentage || 0;

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{r.student}</td>
                  <td>
                    {r.score} / {r.total}
                  </td>
                  <td>{percent.toFixed(2)}%</td>
                  <td>
                    <span className={percent >= 50 ? "tr-pass" : "tr-fail"}>
                      {percent >= 50 ? "Pass" : "Fail"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {results.length === 0 && (
          <p className="tr-empty">No students attempted yet.</p>
        )}
      </div>
    </div>
  );
}

export default ExamResults;
