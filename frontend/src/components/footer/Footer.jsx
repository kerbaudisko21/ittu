import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <h3>ITTU</h3>
            <span>Find your next adventure</span>
            <ul className="socials">
                <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
            </ul>
            <div className="footer-bottom">
                <p> ITTU copyright &copy;2023</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;