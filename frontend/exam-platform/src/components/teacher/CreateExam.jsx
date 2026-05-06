import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/createexam.css";

function CreateExam() {
  const navigate = useNavigate();

  const [exam, setExam] = useState({
    title: "",
    subject: "",
    duration: "",
    questions: []
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Add Question
  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [
        ...exam.questions,
        {
          question_text: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correct_answer: ""
        }
      ]
    });
  };

  // Handle Change
  const handleChange = (index, field, value) => {
    const updated = [...exam.questions];
    updated[index][field] = value;
    setExam({ ...exam, questions: updated });
  };

  // Submit Exam
  const submitExam = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/create-exam/", {
        ...exam,
        user_id: user.user_id
      })
      .then(() => {
        setSuccess(true);   // ✅ show success UI
        setLoading(false);

        // ✅ Redirect after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="create-exam-container">
      <h2>Create Exam</h2>

      {/* ✅ Success Message */}
      {success && (
        <div className="success-banner">
          ✅ Exam created successfully! Redirecting...
        </div>
      )}

      {/* Exam Details */}
      <input
        placeholder="Exam Title"
        onChange={e => setExam({ ...exam, title: e.target.value })}
      />

      <input
        placeholder="Subject"
        onChange={e => setExam({ ...exam, subject: e.target.value })}
      />

      <input
        placeholder="Duration (minutes)"
        type="number"
        onChange={e =>
          setExam({ ...exam, duration: parseInt(e.target.value) })
        }
      />

      <button className="add-btn" onClick={addQuestion}>
        + Add Question
      </button>

      {/* Questions */}
      {exam.questions.map((q, i) => (
        <div key={i} className="question-block">
          <h4>Question {i + 1}</h4>

          <input
            placeholder="Enter Question"
            onChange={e =>
              handleChange(i, "question_text", e.target.value)
            }
          />

          <input
            placeholder="Option 1"
            onChange={e => handleChange(i, "option1", e.target.value)}
          />
          <input
            placeholder="Option 2"
            onChange={e => handleChange(i, "option2", e.target.value)}
          />
          <input
            placeholder="Option 3"
            onChange={e => handleChange(i, "option3", e.target.value)}
          />
          <input
            placeholder="Option 4"
            onChange={e => handleChange(i, "option4", e.target.value)}
          />

          <input
            placeholder="Correct Answer"
            onChange={e =>
              handleChange(i, "correct_answer", e.target.value)
            }
          />
        </div>
      ))}

      {/* Submit */}
      <button
        className="submit-btn"
        onClick={submitExam}
        disabled={loading}
      >
        {loading ? "Creating..." : "Submit Exam"}
      </button>
    </div>
  );
}

export default CreateExam;