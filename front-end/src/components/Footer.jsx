import Icon from "./Icon";
import { useLanguage } from "../context/LanguageContext";
import "../styles/global.css";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__text">
        <Icon name="cross" size={14} />
        <span className="footer__brand">ZeOrthodox</span> ·{" "}
        {t("footerPlatform")}
      </div>
    </footer>
  );
};

export default Footer;
