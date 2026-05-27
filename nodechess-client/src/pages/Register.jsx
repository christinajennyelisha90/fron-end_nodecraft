import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {

  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password Not Match");
      return;
    }

    try {
      const res = await registerUser(form);

      alert(res.message);
      nav("/");

    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={submit}>
        <h1>NODECHESS</h1>

        <input name="username" onChange={handle} placeholder="Username" />
        <input name="email" onChange={handle} placeholder="Email" />
        <input name="password" type="password" onChange={handle} placeholder="Password" />
        <input name="confirmPassword" type="password" onChange={handle} placeholder="Confirm Password" />

        <button>REGISTER</button>

        <Link to="/">Login</Link>
      </form>
    </div>
  );
}