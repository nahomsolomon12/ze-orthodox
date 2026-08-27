import Icon from "./Icon";
import "./Footer.css";

const socialLinks = [
  { name: "facebook", href: "https://www.facebook.com/KesisSolomonMulugeta" },
  {
    name: "instagram",
    href: "https://www.instagram.com/kesisolomon",
  },
  { name: "youtube", href: "https://www.youtube.com/@kesisolomonmulugeta" },
];

const Footer = ({ setPage }) => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__brand">ZeOrthodox</p>
          <p className="footer__copyright">© {new Date().getFullYear()} ZeOrthodox. Ethiopian Orthodox Christian education.</p>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <button type="button" onClick={() => setPage("home")}>Home</button>
          <button type="button" onClick={() => setPage("lessons")}>Lessons</button>
          <button type="button" onClick={() => setPage("about")}>About & Contact</button>
        </nav>
        <div className="footer__socials" aria-label="Social media">
          {socialLinks.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label={`ZeOrthodox on ${name}`}>
              <Icon name={name} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
