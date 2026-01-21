
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HealthEquityConsult</h3>
          <p>Advancing health equity through evidence-based consultancy, research, and strategic partnerships.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="#about">About Us</a>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: AJHealth.Research@gmail.com</p>
          <p>Phone: +233 244 297950; +233 244 988 266</p>
          <p>City : Accra, Dansoma</p>
          <p>Location: #23 Asafoastse Baakonko street, Camara</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Health Equity Consultancy Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;