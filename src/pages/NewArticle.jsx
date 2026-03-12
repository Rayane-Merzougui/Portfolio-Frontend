import { useState } from "react";
import api from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useAuth();
  const { t } = useLanguage();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    console.log("User auth state:", user);

    if (!user) {
      setMsg(t("newArticle.notLoggedIn"));
      return;
    }

    try {
      console.log("Sending article creation request...");
      const response = await api.post("/articles", { title, body });
      console.log("Article creation response:", response);

      setTitle("");
      setBody("");
      setMsg(t("newArticle.success"));
    } catch (e) {
      console.error("Article creation error:", e);
      setMsg(e.response?.data?.error || t("newArticle.error"));
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>{t("newArticle.title")}</h2>
      {user && (
        <div style={{ color: "green" }}>
          {t("newArticle.loggedInAs", { name: user.name })}
        </div>
      )}
      {!user && (
        <div style={{ color: "red" }}>{t("newArticle.notLoggedInStatus")}</div>
      )}
      {msg && <div className="info">{msg}</div>}
      <input
        placeholder={t("newArticle.titlePlaceholder")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder={t("newArticle.bodyPlaceholder")}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
      />
      <button className="btn">{t("newArticle.button")}</button>
    </form>
  );
}
