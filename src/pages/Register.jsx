import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext";

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(name, email, password);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.error || t("register.error"));
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>{t("register.title")}</h2>
      {err && <div className="error">{err}</div>}
      <input
        placeholder={t("register.name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder={t("register.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder={t("register.password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn">{t("register.button")}</button>
    </form>
  );
}
