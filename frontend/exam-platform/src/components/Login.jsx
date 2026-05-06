import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      // ✅ store user
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ show success
      setSuccessMsg("Login successful! Redirecting...");

      // ✅ redirect after short delay
      setTimeout(() => {
        if (res.data.is_teacher) {
          navigate("/dashboard");
        } else {
          navigate("/student-dashboard");
        }
      }, 1500);

    } catch (err) {
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {/* ✅ Success */}
        {successMsg && <div className="login-success">{successMsg}</div>}

        {/* ❌ Error */}
        {errorMsg && <div className="login-error">{errorMsg}</div>}

        <input
          className="login-input"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;