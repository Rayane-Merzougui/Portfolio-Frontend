import { useEffect, useState } from "react";
import api from "../lib/api.js";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const perPage = 10;

  // ... (keep fetch logic same)

  const getAvatarUrl = (avatarUrl) => {
    // ... (same as before)
  };

  if (loading) {
    return (
      <div className="container">
        <h1>{t("home.title")}</h1>
        <div className="loading-state">{t("home.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>{t("home.title")}</h1>
        <div className="error-message">{t("home.error")}</div>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          {t("home.retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{t("home.title")}</h1>

      {items.length === 0 ? (
        <div className="no-articles">
          <p>{t("home.noArticles")}</p>
        </div>
      ) : (
        <ul className="articles">
          {items.map((a) => (
            <li key={a.id || a._id} className="article">
              <div className="meta">
                <img
                  className="mini-avatar"
                  src={getAvatarUrl(a.avatar_url)}
                  alt={`Avatar de ${
                    a.author_name || t("article.author.anonymous")
                  }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/24";
                  }}
                />
                <span className="author">
                  {a.author_name || t("article.author.anonymous")}
                </span>
                <span className="date">
                  {a.created_at
                    ? new Date(a.created_at).toLocaleDateString(
                        t("locale") === "fr" ? "fr-FR" : "en-US"
                      )
                    : t("article.date.unknown")}
                </span>
              </div>
              <h3>{a.title || t("article.noTitle")}</h3>
              <p>{a.body || t("article.noContent")}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          {t("home.pagination.previous")}
        </button>
        <span>
          {t("home.pagination.page", { current: page, total: totalPages })}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          {t("home.pagination.next")}
        </button>
      </div>
    </div>
  );
}
