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

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__socials">
        {socialLinks.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label={name}
          >
            <Icon name={name} size={18} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
