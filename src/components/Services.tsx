import React from 'react';
import { Service } from '../types';
import './Services.css';

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Health Equity Assessment",
      description: "Comprehensive analysis of your organization's health equity gaps and opportunities.",
      icon: "📊"
    },
    {
      id: 2,
      title: "Policy Development",
      description: "Creating inclusive health policies that address systemic barriers and disparities.",
      icon: "📋"
    },
    {
      id: 3,
      title: "Training & Capacity Building",
      description: "Equipping your team with tools and knowledge to advance health equity.",
      icon: "👥"
    },
    {
      id: 4,
      title: "Program Evaluation",
      description: "Measuring impact and effectiveness of your health equity initiatives.",
      icon: "⭐"
    },
    {
      id: 5,
      title: "Research & Analytics",
      description: "Data-driven insights to inform your health equity strategy.",
      icon: "🔬"
    },
    {
      id: 6,
      title: "Community Engagement",
      description: "Building partnerships with communities for sustainable solutions.",
      icon: "🤝"
    }
  ];

  return (
    <section id="services" className="services">
      <h2>Our Consultancy Services</h2>
      <p className="services-subtitle">
        Specialized solutions to advance health equity in your organization
      </p>
      
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href="#contact" className="service-link">Learn More →</a>
          </div>
        ))}
      </div>
      
      <div className="services-cta">
        <button className="cta-button">View All Services</button>
      </div>
    </section>
  );
};

export default Services;