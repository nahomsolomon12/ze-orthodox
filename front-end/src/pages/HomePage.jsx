import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import '../styles/global.css';

const HomePage = ({ setPage, user }) => (
  <div>
    {/* Hero */}
    <section className="hero">
      <div className="hero__watermark">☦</div>
      <div className="hero__content">
        <div className="badge badge--gold mb-24">
          <Icon name="church" size={14} /> Ethiopian Orthodox Christian Education
        </div>
        <h1 className="hero__title">
          Grow in the<br /><span>Ancient Faith</span>
        </h1>
        <Ornament />
        <p className="hero__subtitle">
          Explore the rich tradition of Ethiopian Orthodoxy through guided video lessons, curated readings, and interactive assessments.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => setPage(user ? "modules" : "auth")}>
            Begin Learning <Icon name="arrow" size={18} />
          </button>
          <button className="btn btn--secondary" onClick={() => setPage("about")}>
            Learn More
          </button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="section">
      <div className="container">
        <h2 className="section__title font-serif">How You'll Learn</h2>
        <div className="flex justify-center mb-32"><Ornament /></div>
        <div className="grid grid--features">
          {[
            { icon: "play", title: "Video Lessons", desc: "Watch engaging lectures from Orthodox scholars and clergy on core topics of the faith." },
            { icon: "book", title: "Sacred Readings", desc: "Study curated texts from Scripture, the Church Fathers, and liturgical tradition." },
            { icon: "check", title: "Assessments", desc: "Test your understanding with quizzes after each module to reinforce your learning." },
            { icon: "trophy", title: "Track Progress", desc: "See your growth over time with completion tracking across all courses." },
          ].map((f, i) => (
            <div key={i} className="card">
              <div className="icon-box icon-box--accent mb-16">
                <Icon name={f.icon} size={22} />
              </div>
              <h3 className="font-serif mb-8">{f.title}</h3>
              <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section--hero-cta">
      <div className="card card--gold max-w-600" style={{ margin: "0 auto", padding: "40px 32px" }}>
        <h2 className="font-serif mb-0" style={{ fontSize: 24 }}>Ready to begin?</h2>
        <Ornament />
        <p className="text-muted mt-8 mb-24">Join a growing community discovering the beauty of Orthodoxy.</p>
        <button className="btn btn--primary" style={{ padding: "12px 28px", fontSize: 15 }} onClick={() => setPage(user ? "modules" : "auth")}>
          {user ? "Go to My Learning" : "Create Free Account"}
        </button>
      </div>
    </section>
  </div>
);

export default HomePage;