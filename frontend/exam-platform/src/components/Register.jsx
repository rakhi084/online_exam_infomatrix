import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        name,
        email,
        password,
        is_teacher: isTeacher
      });

      setSuccessMsg("Registration successful! Redirecting to login...");

      // ✅ Redirect after delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setErrorMsg("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Register</h2>

        {/* ✅ Success */}
        {successMsg && <div className="register-success">{successMsg}</div>}

        {/* ❌ Error */}
        {errorMsg && <div className="register-error">{errorMsg}</div>}

        <input
          className="register-input"
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="register-input"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selection */}
        <div className="register-role">
          <label>
            <input
              type="checkbox"
              onChange={(e) => setIsTeacher(e.target.checked)}
            />
            Register as Teacher
          </label>
        </div>

        <button
          className="register-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Register;