import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

import "./css/examanalytics.css";

function ExamAnalytics() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/exam-analytics/") // ✅ NO ID
      .then(res => {
        setData(res.data.students);      // ✅ student data
        setSummary(res.data.summary);    // ✅ summary data
      })
      .catch(err => console.log(err));
  }, []);

  // ✅ Pass vs Fail data
  const pieData = [
    { name: "Pass", value: summary.pass_count || 0 },
    { name: "Fail", value: summary.fail_count || 0 }
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Exam Analytics Dashboard</h2>

      {/* ✅ Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Students</h4>
          <p>{summary.total_students || 0}</p>
        </div>

        <div className="card">
          <h4>Average %</h4>
          <p>{summary.average_percentage || 0}%</p>
        </div>

        <div className="card pass">
          <h4>Pass</h4>
          <p>{summary.pass_count || 0}</p>
        </div>

        <div className="card fail">
          <h4>Fail</h4>
          <p>{summary.fail_count || 0}</p>
        </div>
      </div>

      {/* ✅ Bar Chart */}
      <div className="chart-card">
        <h3>Student Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="student" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#4a90e2" /> {/* ✅ FIXED */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Pie Chart (Correct Pass/Fail) */}
      <div className="chart-card">
        <h3>Pass vs Fail</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExamAnalytics;