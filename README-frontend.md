# 🎨 Portfolio — Frontend

🔗 **Live demo / Démo en ligne :** [portfoliofrontend-kohl.vercel.app](https://portfoliofrontend-kohl.vercel.app/)
🔗 **Backend API:** [Portfolio-Backend](https://github.com/Rayane-Merzougui/Portfolio-Backend)

**🇫🇷 [Français](#-français)** | **🇬🇧 [English](#-english)**

---

## 📸 Screenshots / Captures d'écran

> _Add your screenshots to a `docs/screenshots/` folder in the repo and update the paths below._
> _Ajoute tes captures d'écran dans un dossier `docs/screenshots/` du repo et mets à jour les chemins ci-dessous._

| Home / About | Articles | Login / Register | New Article (mobile) |
|:---:|:---:|:---:|:---:|
| ![About page](docs/screenshots/about.png) | ![Articles page](docs/screenshots/articles.png) | ![Login page](docs/screenshots/login.png) | ![New article mobile](docs/screenshots/new-article-mobile.png) |

---

## 🇫🇷 Français

Interface React de mon portfolio personnel : une application **SPA** (Single Page Application) qui présente mon profil, un blog d'articles techniques, et un espace d'administration protégé pour publier du contenu.

### ✨ Fonctionnalités

- 👤 **Page À propos** — présentation du profil et des compétences
- 📰 **Articles** — liste paginée d'articles avec auteur et avatar
- 🔐 **Authentification** — inscription, connexion, déconnexion (session côté serveur)
- ✍️ **Espace privé** — création d'articles réservée aux utilisateurs connectés (route protégée)
- 🖼️ **Avatar utilisateur** — upload de photo de profil
- 🌍 **Multilingue (FR / EN)** — bascule de langue via `LanguageContext`
- 📱 **Responsive** — navigation adaptée au mobile (menu hamburger)

### 🛠️ Stack technique

| Catégorie          | Technologies                                      |
|---------------------|----------------------------------------------------|
| Framework           | [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/) |
| Routing              | React Router v7                                    |
| Appels HTTP          | Axios (avec intercepteurs)                          |
| Styles               | CSS3 / Sass                                         |
| Qualité de code      | ESLint                                              |
| Déploiement          | [Vercel](https://vercel.com/)                       |

### 📁 Structure du projet

```
src/
├── assets/          # Images et ressources statiques
├── components/       # Composants réutilisables (Navbar, ...)
├── context/           # Contexts React (Auth, Langue)
├── lib/                # Configuration Axios / client API
├── locales/            # Fichiers de traduction (fr.js, en.js)
├── pages/               # Pages de l'application (Home, About, Login, Register, NewArticle)
├── styles/               # Feuilles de style
├── App.jsx                # Déclaration des routes
└── main.jsx                # Point d'entrée
```

### 🔌 Connexion au backend

Le client API (`src/lib/api.js`) détecte automatiquement l'environnement :

- **En développement** : il pointe vers `http://localhost:8000` (ou la variable `VITE_API_URL`)
- **En production** : il pointe vers l'API déployée sur Render, en préfixant les routes par `/api.php`

Les requêtes utilisent les cookies de session (`withCredentials: true`) pour l'authentification.

### 🚀 Installation et lancement en local

**Prérequis :** [Node.js](https://nodejs.org/) 18+, et le [backend](https://github.com/Rayane-Merzougui/Portfolio-Backend) lancé en local sur `http://localhost:8000`.

```bash
# 1. Cloner le dépôt
git clone https://github.com/Rayane-Merzougui/Portfolio-Frontend.git
cd Portfolio-Frontend

# 2. Installer les dépendances
npm install

# 3. (Optionnel) Configurer l'URL de l'API
echo "VITE_API_URL=http://localhost:8000" > .env

# 4. Lancer le serveur de développement
npm run dev
```

L'application est alors accessible sur `http://localhost:5173`.

### Scripts disponibles

| Commande          | Description                              |
|--------------------|--------------------------------------------|
| `npm run dev`       | Lance le serveur de développement Vite     |
| `npm run build`      | Génère la version de production (`dist/`) |
| `npm run preview`     | Prévisualise le build de production       |
| `npm run lint`         | Analyse le code avec ESLint               |

### ☁️ Déploiement

Le projet est déployé automatiquement sur **Vercel** à chaque push sur la branche principale (configuration dans `vercel.json`).

### 👤 Auteur

**Rayane Merzougui** — Portfolio réalisé pour démontrer mes compétences en **HTML5, CSS3, JavaScript, React.js, PHP et MySQL**.

- Backend associé : [Portfolio-Backend](https://github.com/Rayane-Merzougui/Portfolio-Backend)
- Démo : [portfoliofrontend-kohl.vercel.app](https://portfoliofrontend-kohl.vercel.app/)

---

## 🇬🇧 English

React frontend of my personal portfolio: a **SPA** (Single Page Application) that showcases my profile, a technical blog, and a protected admin area to publish content.

### ✨ Features

- 👤 **About page** — profile and skills overview
- 📰 **Articles** — paginated article list with author and avatar
- 🔐 **Authentication** — register, login, logout (server-side sessions)
- ✍️ **Private area** — article creation restricted to logged-in users (protected route)
- 🖼️ **User avatar** — profile picture upload
- 🌍 **Multilingual (FR / EN)** — language switch via `LanguageContext`
- 📱 **Responsive** — mobile-friendly navigation (hamburger menu)

### 🛠️ Tech stack

| Category            | Technologies                                        |
|----------------------|-------------------------------------------------------|
| Framework             | [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/) |
| Routing                | React Router v7                                      |
| HTTP client             | Axios (with interceptors)                             |
| Styling                  | CSS3 / Sass                                           |
| Code quality              | ESLint                                                |
| Deployment                 | [Vercel](https://vercel.com/)                         |

### 📁 Project structure

```
src/
├── assets/          # Static images and resources
├── components/       # Reusable components (Navbar, ...)
├── context/           # React contexts (Auth, Language)
├── lib/                # Axios config / API client
├── locales/            # Translation files (fr.js, en.js)
├── pages/               # App pages (Home, About, Login, Register, NewArticle)
├── styles/               # Stylesheets
├── App.jsx                # Route declarations
└── main.jsx                # Entry point
```

### 🔌 Backend connection

The API client (`src/lib/api.js`) automatically detects the environment:

- **In development**: it points to `http://localhost:8000` (or the `VITE_API_URL` variable)
- **In production**: it points to the API deployed on Render, prefixing routes with `/api.php`

Requests use session cookies (`withCredentials: true`) for authentication.

### 🚀 Local setup

**Requirements:** [Node.js](https://nodejs.org/) 18+, and the [backend](https://github.com/Rayane-Merzougui/Portfolio-Backend) running locally on `http://localhost:8000`.

```bash
# 1. Clone the repo
git clone https://github.com/Rayane-Merzougui/Portfolio-Frontend.git
cd Portfolio-Frontend

# 2. Install dependencies
npm install

# 3. (Optional) Configure the API URL
echo "VITE_API_URL=http://localhost:8000" > .env

# 4. Start the dev server
npm run dev
```

The app is then available at `http://localhost:5173`.

### Available scripts

| Command             | Description                              |
|-----------------------|--------------------------------------------|
| `npm run dev`          | Starts the Vite dev server                 |
| `npm run build`         | Builds the production bundle (`dist/`)    |
| `npm run preview`        | Previews the production build             |
| `npm run lint`            | Lints the code with ESLint                |

### ☁️ Deployment

The project is automatically deployed on **Vercel** on every push to the main branch (see `vercel.json`).

### 👤 Author

**Rayane Merzougui** — Portfolio built to demonstrate my skills in **HTML5, CSS3, JavaScript, React.js, PHP and MySQL**.

- Backend: [Portfolio-Backend](https://github.com/Rayane-Merzougui/Portfolio-Backend)
- Live demo: [portfoliofrontend-kohl.vercel.app](https://portfoliofrontend-kohl.vercel.app/)
