import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { useLanguage } from "../context/LanguageContext";
import "./HomePage.css";
import carouselOne from "../assets/car-1.jpg";
import carouselTwo from "../assets/car-2.jpg";

const HomePage = ({ setPage }) => {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { image: carouselOne, heading: t("heroSlideOne") },
    { image: carouselTwo, heading: t("heroSlideTwo") },
  ];

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(rotation);
  }, [slides.length]);
  const features = [
    {
      icon: "play",
      title: t("featureVideoTitle"),
      desc: t("featureVideoDesc"),
    },
    {
      icon: "download",
      title: t("featureReadingTitle"),
      desc: t("featureReadingDesc"),
    },
  ];

  return (
    <div>
      <section className="hero">
        <div className="hero__slides" aria-hidden="true">
          {slides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt=""
              className={`hero__background-image ${
                index === activeSlide ? "hero__background-image--active" : ""
              }`}
            />
          ))}
        </div>
        <div className="hero__content">
          <h1 className="hero__title">
            {slides[activeSlide].heading}
          </h1>
          <p className="hero__subtitle">{t("heroSubtitle")}</p>
          <div className="hero__actions">
            <button
              className="btn btn--primary"
              onClick={() => setPage("lessons")}
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
        <div className="hero__pagination" aria-label="Hero slides">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`hero__pagination-dot ${
                index === activeSlide ? "hero__pagination-dot--active" : ""
              }`}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title font-serif">{t("howLearn")}</h2>
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
          <p className="text-muted mt-8 mb-24">{t("joinCommunity")}</p>
          <button
            className="btn btn--primary"
            style={{ padding: "12px 28px", fontSize: 15 }}
            onClick={() => setPage("lessons")}
          >
            {t("goLearning")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
