import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { useLanguage } from "../context/LanguageContext";
import { lessonCategories } from "../data/lessonCategories";

const LessonsCategoryPage = ({ category }) => {
  const { t } = useLanguage();
  const { titleKey, languageKey, icon } = lessonCategories[category];

  return (
    <div className="container--narrow" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="text-center mb-24">
        <div className="icon-box icon-box--accent" style={{ margin: "0 auto 16px" }}>
          <Icon name={icon} size={26} />
        </div>
        <h1 className="font-serif mb-0" style={{ fontSize: 28 }}>{t(titleKey)}</h1>
        <p className="text-muted mt-8" style={{ fontSize: 14 }}>{t(languageKey)}</p>
        <div className="flex justify-center mt-16">
          <Ornament />
        </div>
      </div>

      <div className="card text-center" style={{ padding: "40px 24px" }}>
        <p className="text-muted mb-0">{t("lessonComingSoon")}</p>
      </div>
    </div>
  );
};

export default LessonsCategoryPage;
