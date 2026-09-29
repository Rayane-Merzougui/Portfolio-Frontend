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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching articles, page:", page);

        const response = await api.get("/articles", {
          params: {
            page,
            per_page: perPage,
          },
        });

        console.log("API response:", response);
        console.log("Response data:", response.data);

        // Vérifier la structure de la réponse
        const itemsData = response.data?.items || response.data || [];
        let totalPagesData = 1; // Par défaut 1 page

        // Essayer différentes clés pour le nombre total de pages
        if (response.data?.totalPages !== undefined) {
          totalPagesData = response.data.totalPages;
        } else if (response.data?.total_pages !== undefined) {
          totalPagesData = response.data.total_pages;
        } else if (response.data?.pagination?.totalPages !== undefined) {
          totalPagesData = response.data.pagination.totalPages;
        }

        console.log("Items to display:", itemsData);
        console.log("Total pages from response:", totalPagesData);

        setItems(Array.isArray(itemsData) ? itemsData : []);
        setTotalPages(Math.max(1, parseInt(totalPagesData) || 1));

        // Debug: vérifier l'état
        console.log(
          "State after update - items:",
          itemsData.length,
          "totalPages:",
          totalPagesData
        );
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(
          err.response?.data?.error || "Erreur de chargement des articles"
        );
        setItems([]);
        setTotalPages(1); // Toujours au moins 1 page
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  const getAvatarUrl = (avatarUrl) => {
    if (!avatarUrl) return "https://via.placeholder.com/24";
    if (!avatarUrl || avatarUrl === "") {
      return "https://via.placeholder.com/24";
    }
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
