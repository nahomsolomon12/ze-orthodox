import { useState } from "react";
import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { useLanguage } from "../context/LanguageContext";
import { sendContact } from "../lib/api";
import "../styles/global.css";

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
    <div className="container--narrow" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <section className="mb-32" style={{ marginBottom: 56 }}>
        <h1 className="font-serif mb-0" style={{ fontSize: 32 }}>{t("aboutTitle")}</h1>
        <Ornament />
        <p className="text-muted max-w-700 mt-16" style={{ fontSize: 16, lineHeight: 1.8 }}>
          {t("aboutParagraphOne")}
        </p>
        <p className="text-muted max-w-700 mt-16" style={{ fontSize: 16, lineHeight: 1.8 }}>
          {t("aboutParagraphTwo")}
        </p>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 className="font-serif mb-0" style={{ fontSize: 22 }}>{t("approachTitle")}</h2>
        <Ornament />
        <div className="grid grid--values mt-24">
          {values.map((v, i) => (
            <div key={i} className="card card--gold" style={{ padding: 24, borderRadius: 12 }}>
              <div className="text-gold mb-8"><Icon name={v.icon} size={22} /></div>
              <h3 className="font-serif mb-8" style={{ fontSize: 15 }}>{v.title}</h3>
              <p className="text-muted mb-0" style={{ fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif mb-0" style={{ fontSize: 22 }}>{t("contactTitle")}</h2>
        <Ornament />
        <p className="text-muted mt-8 mb-24" style={{ fontSize: 15 }}>{t("contactIntro")}</p>

        {sent ? (
          <div className="alert alert--success">
            <Icon name="check" size={20} /> {t("contactSuccess")}
          </div>
        ) : (
          <div className="form-group max-w-500">
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
      </section>
    </div>
  );
};

export default AboutPage;
