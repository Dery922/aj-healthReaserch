import React, { useState, useEffect, useRef } from 'react';
import { NavItem, DropdownState } from '../types';
import './Header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownState>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Navigation data
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', path: '#home' },
    {
      id: 'about',
      label: 'About Us',
      children: [
        { id: 'story', label: 'Our Story', path: '#about-story' },
        { id: 'vision', label: 'Vision', path: '#about-vision' },
        { id: 'mission', label: 'Mission', path: '#about-mission' },
        { id: 'values', label: 'Core Values', path: '#about-values' },
        { id: 'team', label: 'Core Team', path: '#about-team' }
      ]
    },
    {
      id: 'services',
      label: 'What We Do',
      children: [
        { id: 'research', label: 'Research', path: '#services-research' },
        { id: 'analytics', label: 'Data Analytics', path: '#services-analytics' },
        { id: 'project', label: 'Project Management', path: '#services-project' },
        { id: 'economics', label: 'Health Economics Evaluation', path: '#services-economics' },
        { id: 'logistics', label: 'Logistics & Supply Chain', path: '#services-logistics' }
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      children: [
        { id: 'reports', label: 'Annual Reports', path: '#resources-reports' },
        { id: 'briefs', label: 'Technical Briefs', path: '#resources-briefs' }
      ]
    },
    {
      id: 'publications',
      label: 'Publications',
      children: [
        { id: 'papers', label: 'Research Papers', path: '#publications-papers' },
        { id: 'conferences', label: 'Conferences', path: '#publications-conferences' }
      ]
    },
    { id: 'partners', label: 'Donors / Partners', path: '#partners' },
    { id: 'contact', label: 'Contact', path: '#contact' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close mobile menu
      if (menuOpen && !target.closest('.nav') && !target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
      
      // Close desktop dropdowns
      if (!target.closest('.dropdown') && !target.closest('.has-dropdown')) {
        setActiveDropdown({});
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close all dropdowns when menu closes
  useEffect(() => {
    if (!menuOpen) {
      setActiveDropdown({});
    }
  }, [menuOpen]);

  // Toggle dropdown
  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setActiveDropdown(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [id]: !prev[id]
    }));
  };

  // Handle navigation click
  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.children) {
      if (window.innerWidth <= 768) {
        // On mobile, toggle dropdown
        toggleDropdown(item.id, e);
      }
    } else if (item.path) {
      // Smooth scroll to section
      e.preventDefault();
      const id = item.path.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
      setActiveDropdown({});
    }
  };

  // Handle mobile submenu click
  const handleMobileSubmenuClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.path) {
      const id = item.path.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
      setActiveDropdown({});
    }
  };

  // Render dropdown items
  const renderDropdown = (items: NavItem[]) => (
    <div className="dropdown-content">
      {items.map(child => (
        <a
          key={child.id}
          href={child.path || '#'}
          className="dropdown-item"
          onClick={(e) => handleMobileSubmenuClick(child, e)}
        >
          {child.label}
        </a>
      ))}
    </div>
  );

  // Render mobile navigation with accordion
  const renderMobileNav = () => (
    <nav className={`nav ${menuOpen ? 'open' : ''}`}>
      {navItems.map(item => (
        <div key={item.id} className="mobile-nav-item">
          {item.children ? (
            <>
              <button
                className={`mobile-dropdown-toggle ${activeDropdown[item.id] ? 'active' : ''}`}
                onClick={(e) => toggleDropdown(item.id, e)}
              >
                {item.label}
                <span className="dropdown-arrow">›</span>
              </button>
              <div className={`mobile-dropdown ${activeDropdown[item.id] ? 'open' : ''}`}>
                {renderDropdown(item.children)}
              </div>
            </>
          ) : (
            <a
              href={item.path || '#'}
              className="nav-link"
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
      
      <button 
        className="mobile-cta-button"
        onClick={() => {
          const contact = document.getElementById('contact');
          if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
          }
        }}
      >
        Get Started
      </button>
    </nav>
  );

  // Render desktop navigation with dropdowns
  const renderDesktopNav = () => (
    <nav className="nav">
      {navItems.map(item => (
        <div 
          key={item.id} 
          className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
          onMouseEnter={() => {
            if (item.children && window.innerWidth > 768) {
              setActiveDropdown(prev => ({ ...prev, [item.id]: true }));
            }
          }}
          onMouseLeave={() => {
            if (item.children && window.innerWidth > 768) {
              setActiveDropdown(prev => ({ ...prev, [item.id]: false }));
            }
          }}
        >
          {item.children ? (
            <>
              <button
                className="nav-link dropdown-toggle"
                onClick={(e) => toggleDropdown(item.id, e)}
              >
                {item.label}
                <span className="dropdown-arrow">⌄</span>
              </button>
              {activeDropdown[item.id] && (
                <div 
                  className="dropdown"
                  ref={el => dropdownRefs.current[item.id] = el}
                >
                  {renderDropdown(item.children)}
                </div>
              )}
            </>
          ) : (
            <a
              href={item.path || '#'}
              className="nav-link"
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
      
      <button 
        className="desktop-cta-button"
        onClick={() => {
          const contact = document.getElementById('contact');
          if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        Get Started
      </button>
    </nav>
  );

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <h1>AJHealth.<span>Research</span></h1>
          <p>Advancing Health Equity Worldwide</p>
        </div>
        
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        {window.innerWidth <= 768 ? renderMobileNav() : renderDesktopNav()}
      </div>
    </header>
  );
};

export default Header;