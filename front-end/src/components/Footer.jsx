import Icon from "./Icon";
import '../styles/global.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__text">
      <Icon name="cross" size={14} />
      <span className="footer__brand">Theosis</span> · Eastern Orthodox Learning Platform
    </div>
  </footer>
);

export default Footer;