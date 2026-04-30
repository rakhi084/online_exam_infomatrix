// Register.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/register/", {
      name,
      email,
      password,
    });

    alert(res.data.message);
    //going to login page
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Register</h2>

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

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;