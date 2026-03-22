import { useState } from "react";
import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { sendContact } from "../lib/api";
import '../styles/global.css';

const AboutPage = () => {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [contactErr, setContactErr] = useState("");

  return (
    <div className="container--narrow" style={{ paddingTop: 48, paddingBottom: 48 }}>
      {/* About */}
      <section className="mb-32" style={{ marginBottom: 56 }}>
        <h1 className="font-serif mb-0" style={{ fontSize: 32 }}>About Theosis</h1>
        <Ornament />
        <p className="text-muted max-w-700 mt-16" style={{ fontSize: 16, lineHeight: 1.8 }}>
          Theosis is an online learning platform dedicated to making Eastern Orthodox Christian education accessible to all. Whether you're inquiring about the faith, a catechumen, or a lifelong Orthodox Christian seeking deeper understanding, our structured courses guide you through the rich theology, liturgical life, and spiritual practices of the Church.
        </p>
        <p className="text-muted max-w-700 mt-16" style={{ fontSize: 16, lineHeight: 1.8 }}>
          Our curriculum is developed in consultation with Orthodox clergy and theologians, drawing from Scripture, the Church Fathers, conciliar teachings, and the living tradition of the Church.
        </p>
      </section>

      {/* Values */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="font-serif mb-0" style={{ fontSize: 22 }}>Our Approach</h2>
        <Ornament />
        <div className="grid grid--values mt-24">
          {[
            { icon: "church", title: "Rooted in Tradition", desc: "All content aligns with the teaching of the Orthodox Church." },
            { icon: "book", title: "Academically Sound", desc: "Developed with scholars who bring depth and clarity." },
            { icon: "star", title: "Accessible to All", desc: "Free resources for anyone seeking to learn, at any level." },
          ].map((v, i) => (
            <div key={i} className="card card--gold" style={{ padding: 24, borderRadius: 12 }}>
              <div className="text-gold mb-8"><Icon name={v.icon} size={22} /></div>
              <h3 className="font-serif mb-8" style={{ fontSize: 15 }}>{v.title}</h3>
              <p className="text-muted mb-0" style={{ fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="font-serif mb-0" style={{ fontSize: 22 }}>Contact Us</h2>
        <Ornament />
        <p className="text-muted mt-8 mb-24" style={{ fontSize: 15 }}>Have a question or suggestion? We'd love to hear from you.</p>

        {sent ? (
          <div className="alert alert--success">
            <Icon name="check" size={20} /> Thank you! Your message has been sent. We'll get back to you soon.
          </div>
        ) : (
          <div className="form-group max-w-500">
            <div>
              <label className="form-label">Name</label>
              <input className="form-input" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Message</label>
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
                  return setContactErr("Please fill in all fields.");
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
              {sending ? "Sending…" : "Send Message"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutPage;