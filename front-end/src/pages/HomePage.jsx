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
          <h1
            key={activeSlide}
            className="hero__title hero__title--transitioning"
          >
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
          <div className="section__intro">
            <span className="home-section__eyebrow">{t("howLearn")}</span>
            <h2 className="section__title font-serif">{t("libraryTitle")}</h2>
            <p className="section__subtitle">{t("libraryIntro")}</p>
          </div>

          <div className="home-library">
            <article className="home-featured">
              <div className="home-featured__media">
                <img src={carouselTwo} alt="" />
                <span>{t("featuredLessonLabel")}</span>
              </div>
              <div className="home-featured__content">
                <p className="home-content__meta">{t("featuredLessonMeta")}</p>
                <h3 className="font-serif">{t("featuredLessonTitle")}</h3>
                <p>{t("featureVideoDesc")}</p>
                <button
                  className="btn btn--primary"
                  onClick={() => setPage("lessons-video")}
                >
                  {t("exploreVideos")} <Icon name="arrow" size={17} />
                </button>
              </div>
            </article>

            <article className="home-resource">
              <div className="home-resource__topline">
                <div className="icon-box icon-box--accent">
                  <Icon name="download" size={22} />
                </div>
                <span className="home-content__meta">
                  {t("studyMaterialsLabel")}
                </span>
              </div>
              <h3 className="font-serif">{t("featureReadingTitle")}</h3>
              <p>{t("featureReadingDesc")}</p>
              <button
                className="btn btn--ghost"
                onClick={() => setPage("lessons")}
              >
                {t("viewLessons")} <Icon name="arrow" size={16} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="home-community">
        <div className="container home-community__inner">
          <div>
            <span className="home-section__eyebrow">
              {t("communityEyebrow")}
            </span>
            <h2 className="font-serif">{t("readyBegin")}</h2>
            <p>{t("joinCommunity")}</p>
          </div>
          <button
            className="btn btn--primary"
            onClick={() => setPage("lessons")}
          >
            {t("goLearning")} <Icon name="arrow" size={17} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
