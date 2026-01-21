import React, { useState } from 'react';
import { ContactFormData, FormErrors, ServiceType } from "@/types";
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    organization: '',
    service: 'general',
    urgency: 'standard',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // In real app, send to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        organization: '',
        service: 'general',
        urgency: 'standard',
        message: ''
      });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="contact-form-section">
      <div className="form-container">
        <div className="form-intro">
          <h2>Start Your Health Equity Journey</h2>
          <p>
            Contact us for a free 30-minute consultation to discuss your 
            organization's needs and challenges.
          </p>
        </div>
        
        {submitted ? (
          <div className="form-success">
            <h3>Thank you for your inquiry!</h3>
            <p>We've received your consultation request and will contact you within 24 hours.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="organization">Organization *</label>
              <input
                type="text"
                id="organization"
                name="organization"
                placeholder="Organization Name"
                value={formData.organization}
                onChange={handleChange}
                className={errors.organization ? 'error' : ''}
              />
              {errors.organization && <span className="error-text">{errors.organization}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="service">Service Interest</label>
                <select 
                  id="service"
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="assessment">Health Equity Assessment</option>
                  <option value="policy">Policy Development</option>
                  <option value="training">Training & Capacity Building</option>
                  <option value="evaluation">Program Evaluation</option>
                  <option value="research">Research & Analytics</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Urgency Level</label>
                <div className="radio-group">
                  {(['standard', 'urgent'] as const).map(level => (
                    <div key={level} className="radio-option">
                      <input
                        type="radio"
                        id={level}
                        name="urgency"
                        value={level}
                        checked={formData.urgency === level}
                        onChange={handleChange}
                      />
                      <label htmlFor={level}>
                        {level === 'standard' ? 'Standard (1-2 weeks)' : 'Urgent (1-3 days)'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your health equity challenges, goals, and timeline..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>
            
            <button type="submit" className="submit-btn">
              Request Free Consultation
            </button>
          </form>
        )}
        
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">📧</div>
            <h4>Email Us</h4>
            <p>contact@healthequityconsult.com</p>
          </div>
          <div className="info-item">
            <div className="info-icon">📞</div>
            <h4>Call Us</h4>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <div className="info-icon">⏰</div>
            <h4>Business Hours</h4>
            <p>Mon-Fri 9am-6pm EST</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;