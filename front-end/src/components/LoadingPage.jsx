import { useLanguage } from "../context/LanguageContext";
import "./LoadingPage.css";

const LoadingPage = () => {
  const { t } = useLanguage();

  return (
    <main className="loading-page" role="status" aria-live="polite">
      <div className="loading-page__content">
        <div className="loading-page__spinner" aria-hidden="true" />
        <p className="loading-page__label">{t("translationLoading")}</p>
      </div>
    </main>
  );
};

export default LoadingPage;
