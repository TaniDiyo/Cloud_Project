import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log(data);

      localStorage.setItem("token", data.token);

      alert("Login successful!");

      // ✅ REDIRECT TO HOME
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Error in login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Login</button>
        </form>

        <p onClick={() => navigate("/signup")}>
          Don't have an account? Signup
        </p>
      </div>
    </div>
  );
}

export default Login;
