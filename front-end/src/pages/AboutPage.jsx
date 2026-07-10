import { useState } from "react";
import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { useLanguage } from "../context/LanguageContext";
import { sendContact } from "../lib/api";
import "./AboutPage.css";
import heroArt from "../assets/Cross.jpg";

const AboutPage = () => {
  const { t } = useLanguage();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [contactErr, setContactErr] = useState("");
  const values = [
    { icon: "church", title: t("valueTraditionTitle"), desc: t("valueTraditionDesc") },
    { icon: "book", title: t("valueAcademicTitle"), desc: t("valueAcademicDesc") },
    { icon: "star", title: t("valueAccessTitle"), desc: t("valueAccessDesc") },
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <h1 className="about-hero__title font-serif">{t("aboutTitle")}</h1>
            <Ornament />
            <p className="about-hero__lead">{t("aboutParagraphOne")}</p>
            <p className="text-muted about-hero__second">{t("aboutParagraphTwo")}</p>
          </div>
          <div className="about-hero__art" aria-hidden="true">
            <span className="about-hero__blob" />
            <img src={heroArt} alt="" />
          </div>
        </div>
      </section>

      <section className="about-approach">
        <div className="container">
          <div className="text-center">
            <h2 className="font-serif mb-0">{t("approachTitle")}</h2>
            <Ornament />
          </div>

          <div className="approach-list mt-32">
            {values.map((v, i) => (
              <div className="approach-item" key={i}>
                <div className="approach-item__marker">
                  <span className="approach-item__num">{`0${i + 1}`}</span>
                  <div className="approach-item__badge">
                    <Icon name={v.icon} size={24} />
                  </div>
                </div>
                <div className="approach-item__body">
                  <h3 className="font-serif">{v.title}</h3>
                  <p className="text-muted">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact">
        <div className="container about-contact__inner">
          <div className="about-contact__panel">
            <span className="about-contact__mark" aria-hidden="true">&#10077;</span>
            <h2 className="font-serif">{t("contactTitle")}</h2>
            <Ornament />
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
                  <input className="form-input" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">{t("contactEmail")}</label>
                  <input className="form-input" type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">{t("contactMessage")}</label>
                  <textarea className="form-input" value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} rows={4} />
                </div>
                {contactErr && <div className="alert alert--error">{contactErr}</div>}
                <button
                  className="btn btn--primary"
                  style={{ padding: "12px 28px", fontSize: 15, alignSelf: "flex-start" }}
                  disabled={sending}
                  onClick={async () => {
                    setContactErr("");
                    if (!contactForm.name || !contactForm.email || !contactForm.message) {
                      return setContactErr(t("contactRequired"));
                    }
                    setSending(true);
                    try {
                      await sendContact(contactForm.name, contactForm.email, contactForm.message);
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
