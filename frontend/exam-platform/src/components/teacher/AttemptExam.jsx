import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./css/attemptexam.css";

function AttemptExam() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/exams/${id}/`)
      .then(res => setExam(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleSelect = (qId, option) => {
    setAnswers({
      ...answers,
      [qId]: option
    });
  };

 const submitExam = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  axios.post(`http://127.0.0.1:8000/api/submit-exam/${id}/`, {
    answers: answers,
    user_id: user.user_id
  })
  .then(res => {
    navigate(`/result/${res.data.result_id}`); // ✅ redirect
  })
  .catch(err => console.log(err));
};

  if (!exam) return <p>Loading...</p>;

  return (
  <div className="attempt-exam-container">
    <h2 className="attempt-title">{exam.title}</h2>

    <div className="attempt-questions">
      {exam.questions.map((q, index) => (
        <div className="attempt-question-card" key={q.id}>
          <p className="attempt-question">
            {index + 1}. {q.question_text}
          </p>

          <div className="attempt-options">
            {[q.option1, q.option2, q.option3, q.option4].map(opt => (
              <label className="attempt-option" key={opt}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  onChange={() => handleSelect(q.id, opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>

    <button className="attempt-submit-btn" onClick={submitExam}>
      Submit Exam
    </button>
  </div>
);
}

export default AttemptExam;