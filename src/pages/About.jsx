import React from "react";
import facebookIcon from "../assets/icon/Facebook.png";
import githubIcon from "../assets/icon/Github.png";
import linkedinIcon from "../assets/icon/linkedin.png";
import instagramIcon from "../assets/icon/Instagram.png";
import emailIcon from "../assets/icon/Email.png";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="container about-page">
      <h1>{t("about.welcome")}</h1>

      <p
        className="intro"
        dangerouslySetInnerHTML={{ __html: t("about.intro") }}
      />

      <section>
        <h2>{t("about.projectTitle")}</h2>
        <p>{t("about.projectDesc")}</p>
      </section>

      <section>
        <h2>{t("about.techTitle")}</h2>
        <ul>
          <li dangerouslySetInnerHTML={{ __html: t("about.tech.frontend") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.tech.backend") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.tech.database") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.tech.auth") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.tech.features") }} />
        </ul>
      </section>

      <section>
        <h2>{t("about.skillsTitle")}</h2>
        <ul>
          <li dangerouslySetInnerHTML={{ __html: t("about.skills.html") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.skills.css") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.skills.js") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.skills.react") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.skills.php") }} />
          <li dangerouslySetInnerHTML={{ __html: t("about.skills.mysql") }} />
        </ul>
      </section>

      <section>
        <h2>{t("about.methodologyTitle")}</h2>
        <ul>
          <li>{t("about.methodology.fullstack")}</li>
          <li>{t("about.methodology.architecture")}</li>
          <li>{t("about.methodology.auth")}</li>
          <li>{t("about.methodology.ui")}</li>
          <li>{t("about.methodology.performance")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("about.philosophyTitle")}</h2>
        <p>{t("about.philosophy.desc1")}</p>
        <p>{t("about.philosophy.desc2")}</p>
        <p className="thanks">{t("about.philosophy.thanks")}</p>
      </section>

      <section>
        <h2>{t("about.contactTitle")}</h2>
        <div className="contact-icons">
          <a
            href="https://www.facebook.com/rayane.chahine.33?locale=fr_FR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a
            href="https://github.com/Rayane-Merzougui"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/rayane-merzougui-a54028343/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a
            href="https://www.instagram.com/rayane.merzougui97/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a
            href="mailto:rayane.merzougui.work@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={emailIcon} alt="Email" />
          </a>
        </div>
      </section>
    </div>
  );
}
