import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import './HomePage.css';

interface TrustIndicator {
  icon: string;
  text: string;
}

const HomePage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const homeRef = useRef<HTMLDivElement>(null);

  const trustIndicators: TrustIndicator[] = [
    { icon: "🏥", text: "Hospitals & Health Systems" },
    { icon: "🏛️", text: "Government Agencies" },
    { icon: "🌍", text: "NGOs & Global Health" },
    { icon: "🔬", text: "Research Institutions" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page" id="home" ref={homeRef}>
      <Header />
      <Hero />
      
      <section className="trust-indicators">
        <h2 className="trust-title">Trusted by Leading Healthcare Organizations</h2>
        <div className="trust-logos">
          {trustIndicators.map((item, index) => (
            <div key={index} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div className="trust-text">{item.text}</div>
            </div>
          ))}
        </div>
      </section>
      
      <Services />
      
      <section className="mission-section" id="about">
        <div className="mission-container">
          <div className="mission-content">
            <h2>Our Mission: Transformative Health Equity Solutions</h2>
            <p>
              We partner with healthcare organizations to identify and eliminate 
              disparities in health outcomes. Our evidence-based approach combines 
              data analytics, community engagement, and policy expertise to create 
              sustainable change.
            </p>
            <p>
              From rural clinics to urban hospital systems, we tailor solutions 
              that address the unique challenges of diverse populations and 
              healthcare settings.
            </p>
          </div>
          <div className="mission-image">
            <span>⚕️</span>
          </div>
        </div>
      </section>
      
      <ContactForm />
      <Footer />
      
      {showScrollTop && (
        <button 
          className="scroll-top" 
          onClick={scrollToTop} 
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default HomePage;