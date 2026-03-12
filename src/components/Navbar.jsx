import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useRef, useState } from "react";

export default function Navbar() {
  const { user, logout, uploadAvatar } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const fileRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onPick = () => fileRef.current?.click();
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          {t("nav.brand")}
        </Link>
      </div>

      <button
        className="hamburger-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "var(--text)",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      <div className={`nav-right ${isMenuOpen ? "mobile-open" : ""}`}>
        <Link to="/articles" onClick={() => setIsMenuOpen(false)}>
          {t("nav.articles")}
        </Link>

        {/* Language toggle button */}
        <button
          onClick={() => {
            toggleLanguage();
            // Optionally close mobile menu
            setIsMenuOpen(false);
          }}
          className="link language-toggle"
          style={{ fontWeight: "bold", minWidth: "40px" }}
        >
          {t("language.toggle")}
        </button>

        {!user ? (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              className="btn"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.register")}
            </Link>
          </>
        ) : (
          <div className="user-box">
            <span className="name">{user.name}</span>
            <img
              className="avatar"
              src={
                user.avatar_url
                  ? `http://localhost:8000${user.avatar_url}`
                  : "https://via.placeholder.com/40"
              }
              alt="avatar"
              onClick={onPick}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onChange}
            />
            <Link
              to="/new"
              className="btn"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.newArticle")}
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="link"
            >
              {t("nav.logout")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
