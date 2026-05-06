import React, { useEffect, useState } from "react";
import axios from "axios";

const ExamPage = ({ match }) => {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/exam/${match.params.id}/`)
      .then(res => setExam(res.data));
  }, []);

  const handleChange = (qid, value) => {
    setAnswers({...answers, [qid]: value});
  };

  const submitExam = () => {
    axios.post(`http://localhost:8000/api/submit/${exam.id}/`, {
      answers
    }).then(res => {
      alert("Score: " + res.data.score);
    });
  };

  if (!exam) return <p>Loading...</p>;

  return (
    <div>
      <h2>{exam.title}</h2>

      {exam.questions.map(q => (
        <div key={q.id}>
          <p>{q.question_text}</p>
          {[q.option1, q.option2, q.option3, q.option4].map(opt => (
            <div key={opt}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={() => handleChange(q.id, opt)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button onClick={submitExam}>Submit</button>
    </div>
  );
};

export default ExamPage;