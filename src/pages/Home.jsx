import { useEffect, useState } from "react";
import api from "../lib/api.js";

export default function Home() {
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
    if (!avatarUrl || avatarUrl === "") {
      return "https://via.placeholder.com/24";
    }

    // Si c'est déjà une URL complète (base64)
    if (avatarUrl.startsWith("data:image/")) {
      return avatarUrl;
    }

    // Si c'est une URL relative
    if (avatarUrl.startsWith("/")) {
      // En production, utilisez l'URL du backend Render
      if (import.meta.env.PROD) {
        return `https://portfolio-backend-byfd.onrender.com${avatarUrl}`;
      }

      // En développement
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      return `${baseURL}${avatarUrl}`;
    }

    // Si c'est déjà une URL complète
    return avatarUrl;
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Articles</h1>
        <div className="loading-state">Chargement des articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Articles</h1>
        <div className="error-message">{error}</div>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Articles</h1>

      {items.length === 0 ? (
        <div className="no-articles">
          <p>Aucun article disponible pour le moment.</p>
        </div>
      ) : (
        <ul className="articles">
          {items.map((a) => (
            <li key={a.id || a._id} className="article">
              <div className="meta">
                <img
                  className="mini-avatar"
                  src={getAvatarUrl(a.avatar_url)}
                  alt={`Avatar de ${a.author_name || "Anonyme"}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/24";
                  }}
                />
                <span className="author">{a.author_name || "Anonyme"}</span>
                <span className="date">
                  {a.created_at
                    ? new Date(a.created_at).toLocaleDateString("fr-FR")
                    : "Date inconnue"}
                </span>
              </div>
              <h3>{a.title || "Sans titre"}</h3>
              <p>{a.body || "Aucun contenu"}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination TOUJOURS affichée, même sans articles */}
      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Précédent
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
