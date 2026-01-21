import React from 'react';
import './Hero.css';

interface StatItem {
  value: string;
  label: string;
}

const Hero: React.FC = () => {
  const stats: StatItem[] = [
    { value: "50+", label: "Organizations Served" },
    { value: "100+", label: "Health Equity Projects" },
    { value: "15+", label: "Countries Reached" }
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Bridging Healthcare Gaps for Equitable Outcomes</h2>
        <p>
          Expert consultancy services to help organizations implement sustainable 
          health equity strategies and create inclusive healthcare systems.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn">Request Consultation</button>
          <button className="secondary-btn">Our Services</button>
        </div>
      </div>
      <div className="hero-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;