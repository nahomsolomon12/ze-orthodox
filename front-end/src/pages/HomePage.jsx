import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { useLanguage } from "../context/LanguageContext";
import "../styles/global.css";
import backgroundImage from "../assets/golden_cross.jpg";

const HomePage = ({ setPage, user }) => {
  const { t } = useLanguage();
  const features = [
    {
      icon: "play",
      title: t("featureVideoTitle"),
      desc: t("featureVideoDesc"),
    },
    {
      icon: "book",
      title: t("featureReadingTitle"),
      desc: t("featureReadingDesc"),
    },
    {
      icon: "check",
      title: t("featureAssessTitle"),
      desc: t("featureAssessDesc"),
    },
    {
      icon: "trophy",
      title: t("featureProgressTitle"),
      desc: t("featureProgressDesc"),
    },
  ];

  return (
    <div>
      <section className="hero">
        <img
          src={backgroundImage}
          alt=""
          className="hero__background-image"
          aria-hidden="true"
        />
        <div className="hero__content">
          <h1 className="hero__title">
            {t("heroTitleTop")}
            <br />
            <span>{t("heroTitleAccent")}</span>
          </h1>
          <Ornament />
          <p className="hero__subtitle">{t("heroSubtitle")}</p>
          <div className="hero__actions">
            <button
              className="btn btn--primary"
              onClick={() => setPage(user ? "modules" : "auth")}
            >
              {t("beginLearning")} <Icon name="arrow" size={18} />
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => setPage("about")}
            >
              {t("learnMore")}
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title font-serif">{t("howLearn")}</h2>
          <div className="flex justify-center mb-32">
            <Ornament />
          </div>
          <div className="grid grid--features">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div className="icon-box icon-box--accent mb-16">
                  <Icon name={f.icon} size={22} />
                </div>
                <h3 className="font-serif mb-8">{f.title}</h3>
                <p
                  className="text-muted"
                  style={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--hero-cta">
        <div
          className="card card--gold max-w-600"
          style={{ margin: "0 auto", padding: "40px 32px" }}
        >
          <h2 className="font-serif mb-0" style={{ fontSize: 24 }}>
            {t("readyBegin")}
          </h2>
          <Ornament />
          <p className="text-muted mt-8 mb-24">{t("joinCommunity")}</p>
          <button
            className="btn btn--primary"
            style={{ padding: "12px 28px", fontSize: 15 }}
            onClick={() => setPage(user ? "modules" : "auth")}
          >
            {user ? t("goLearning") : t("createFreeAccount")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
