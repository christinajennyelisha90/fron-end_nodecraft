import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);

      nav("/dashboard");

    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={submit}>
        <h1>NODECHESS</h1>

        <input name="email" onChange={handle} placeholder="Email" />
        <input name="password" type="password" onChange={handle} placeholder="Password" />

        <button>LOGIN</button>

        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}