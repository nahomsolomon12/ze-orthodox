import { useState } from "react";
import Icon from "../components/Icon";
import { useLanguage } from "../context/LanguageContext";
import { sendContact } from "../lib/api";
import "./AboutPage.css";
import heroArt from "../assets/Cross.jpg";
import communityArt from "../assets/car-2.jpg";
import featureArt from "../assets/car-1.jpg";
import logo from "../assets/ZEOlogo.png";

const AboutPage = () => {
  const { t } = useLanguage();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [contactErr, setContactErr] = useState("");
  const values = [
    { title: t("valueTraditionTitle"), desc: t("valueTraditionDesc") },
    { title: t("valueAcademicTitle"), desc: t("valueAcademicDesc") },
    { title: t("valueAccessTitle"), desc: t("valueAccessDesc") },
  ];
  const articleBlocks = t("aboutParagraphOne").split(/\n\n+/);
  const [
    articleTitle,
    scripture,
    liturgy,
    missionContext,
    missionResponsibility,
    pagePurpose,
    functionsHeading,
    functionsBlock,
    resourcesHeading,
    resourcesBlock,
    closingPrayer,
  ] = articleBlocks;
  const functionItems =
    functionsBlock
      ?.split("\n")
      .filter(Boolean)
      .map((item) => item.replace(/^\d+\.\s*/, "")) || [];
  const resourceItems = resourcesBlock?.split("\n").filter(Boolean) || [];

  return (
    <div className="about">
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <div className="about-article__kicker">
              <span>{t("aboutTitle")}</span>
              <img src={logo} alt="ZeOrthodox" className="about-hero__logo" />
            </div>
            <h1 className="about-hero__title font-serif">
              <span>{articleTitle}</span>
            </h1>
            <p className="about-hero__lead">{missionContext}</p>
          </div>
          <div className="about-hero__art" aria-hidden="true">
            <span className="about-hero__blob" />
            <img src={heroArt} alt="" />
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__layout">
          <article className="about-story__article">
            <div className="about-story__quotes">
              <blockquote className="about-story__scripture">
                {scripture}
              </blockquote>
              <blockquote className="about-story__liturgy">
                {liturgy}
              </blockquote>
            </div>

            <p className="about-story__paragraph">{missionResponsibility}</p>
            <p className="about-story__paragraph">{pagePurpose}</p>

            <h2 className="about-story__heading font-serif">
              {functionsHeading}
            </h2>
            <ol className="about-story__list about-story__list--numbered">
              {functionItems.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ol>

            <h2 className="about-story__heading font-serif">
              {resourcesHeading}
            </h2>
            <ul className="about-story__list about-story__list--resources">
              {resourceItems.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>

            <blockquote className="about-story__closing">
              {closingPrayer}
            </blockquote>
          </article>

          <aside className="about-story__aside">
            <figure className="about-story__figure">
              <img src={featureArt} alt={articleTitle} />
              <figcaption>{t("approachCaption")}</figcaption>
            </figure>
          </aside>
        </div>
      </section>

      <section className="about-approach">
        <div className="container">
          <div className="text-center">
            <h2 className="font-serif mb-0">{t("approachTitle")}</h2>
          </div>

          <div className="approach-layout mt-32">
            <div className="approach-visual">
              <img src={communityArt} alt={t("approachImageAlt")} />
              <div className="approach-visual__caption">
                <span>01</span>
                <p>{t("approachCaption")}</p>
              </div>
            </div>

            <div className="approach-list">
              {values.map((v, i) => (
                <div className="approach-item" key={i}>
                  <span className="approach-item__num">{`0${i + 1}`}</span>
                  <div className="approach-item__body">
                    <h3 className="font-serif">{v.title}</h3>
                    <p className="text-muted">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <div className="container about-contact__inner">
          <div className="about-contact__panel">
            <span className="about-contact__mark" aria-hidden="true">
              &#10077;
            </span>
            <h2 className="font-serif">{t("contactTitle")}</h2>
            <p className="about-contact__intro">{t("contactIntro")}</p>
          </div>

          <div className="about-contact__form-wrap">
            {sent ? (
              <div className="alert alert--success">
                <Icon name="check" size={20} /> {t("contactSuccess")}
              </div>
            ) : (
              <div className="form-group">
                <div>
                  <label className="form-label">{t("contactName")}</label>
                  <input
                    className="form-input"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">{t("contactEmail")}</label>
                  <input
                    className="form-input"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">{t("contactMessage")}</label>
                  <textarea
                    className="form-input"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                {contactErr && (
                  <div className="alert alert--error">{contactErr}</div>
                )}
                <button
                  className="btn btn--primary"
                  style={{
                    padding: "12px 28px",
                    fontSize: 15,
                    alignSelf: "flex-start",
                  }}
                  disabled={sending}
                  onClick={async () => {
                    setContactErr("");
                    if (
                      !contactForm.name ||
                      !contactForm.email ||
                      !contactForm.message
                    ) {
                      return setContactErr(t("contactRequired"));
                    }
                    setSending(true);
                    try {
                      await sendContact(
                        contactForm.name,
                        contactForm.email,
                        contactForm.message,
                      );
                      setSent(true);
                    } catch (err) {
                      setContactErr(err.message);
                    } finally {
                      setSending(false);
                    }
                  }}
                >
                  {sending ? t("sending") : t("sendMessage")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
