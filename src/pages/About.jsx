import React from "react";

export default function About() {
  return (
    <div className="container about-page">
      <h1>Bienvenue sur mon portfolio de développeur web</h1>

      <p className="intro">
        Bonjour et bienvenue sur mon portfolio numérique !
        <br />
        Je suis <strong>Rayane Merzougui</strong>, développeur web passionné par
        la création d'applications web complètes et performantes. Ce site que
        vous visitez actuellement représente le fruit de mon travail et met en
        avant mes compétences techniques.
      </p>

      <section>
        <h2>1/- À propos de ce projet</h2>
        <p>
          Ce portfolio est une application web complète que j'ai développée de A
          à Z, en mettant en pratique l'ensemble de mes compétences :
        </p>
      </section>

      <section>
        <h2>2/- Architecture technique</h2>
        <ul>
          <li>
            <strong>Frontend :</strong> Développé avec React.js et Vite pour une
            expérience utilisateur moderne et réactive.
          </li>
          <li>
            <strong>Backend :</strong> API RESTful construite en PHP pur, sans
            framework, pour un contrôle total.
          </li>
          <li>
            <strong>Base de données :</strong> SQLite pour une gestion des
            données momentanée.
          </li>
          <li>
            <strong>Authentification :</strong> Système complet d'inscription et
            de connexion avec gestion de sessions.
          </li>
          <li>
            <strong>Fonctionnalités :</strong> Publication d'articles, gestion
            de profil avec photo, interface administrateur.
          </li>
        </ul>
      </section>

      <section>
        <h2>3/- Mes compétences techniques</h2>
        <ul>
          <li>
            <strong>HTML5 :</strong> Sémantique, accessibilité et structure
            optimisée.
          </li>
          <li>
            <strong>CSS3 :</strong> Responsive design, animations, et frameworks
            modernes.
          </li>
          <li>
            <strong>JavaScript (ES6+) :</strong> Programmation fonctionnelle,
            asynchrone et manipulation du DOM.
          </li>
          <li>
            <strong>React.js :</strong> Composants réutilisables, gestion d'état
            (Hooks, Context), routing.
          </li>
          <li>
            <strong>PHP :</strong> Développement backend orienté objet,
            sécurité, API REST.
          </li>
          <li>
            <strong>MySQL :</strong> Modélisation de bases de données, requêtes
            complexes, optimisation.
          </li>
        </ul>
      </section>

      <section>
        <h2>4/- Méthodologie</h2>
        <ul>
          <li>Développement full-stack (frontend + backend)</li>
          <li>Conception d'architectures logicielles modulaires</li>
          <li>Intégration de systèmes d'authentification sécurisés</li>
          <li>Création d'interfaces utilisateur intuitives et responsives</li>
          <li>Optimisation des performances et du référencement</li>
        </ul>
      </section>

      <section>
        <h2>5/- Philosophie de développement</h2>
        <p>
          Je crois en un code propre, bien documenté et maintenable. Chaque
          projet est pour moi l'occasion d'appliquer les meilleures pratiques de
          développement, de la conception à la mise en production.
        </p>
        <p>
          Ce portfolio n'est pas seulement une vitrine de mes compétences, mais
          aussi une plateforme vivante qui évoluera avec mes nouveaux projets et
          apprentissages.
        </p>
        <p className="thanks">Merci d'avoir visité mon site !</p>
      </section>
    </div>
  );
}
