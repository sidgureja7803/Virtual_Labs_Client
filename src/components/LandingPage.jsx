import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './LandingPage.css';

// Import images
import AdminBlock from '../assets/Admin-Block.png';
import CSEDImage from '../assets/CSED.jpg';
import VirtualLabsLogo from '../assets/Virtual-labs.png';
import LibraryImage from '../assets/Library2.png';
import LabImage from '../assets/LAB.jpg';
import ECEDImage from '../assets/eced.jpg';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const departmentsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from(heroRef.current.querySelector('.hero-content h1'), {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });

      gsap.from(heroRef.current.querySelector('.hero-content p'), {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power4.out',
      });

      // About section animations
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(aboutRef.current.querySelector('.about-image'), {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          });
          gsap.from(aboutRef.current.querySelector('.about-content'), {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          });
        },
      });

      // Departments section animations
      const cards = departmentsRef.current.querySelectorAll('.department-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power4.out',
        });
      });

      // Contact section animations
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(contactRef.current.querySelector('.contact-image'), {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          });
          gsap.from(contactRef.current.querySelector('.contact-form-container'), {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          });
        },
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="landing-page" ref={contentRef}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src={VirtualLabsLogo} alt="Virtual Labs Logo" />
          </div>
          <div className="nav-links">
            <Link to="/about">About</Link>
            <Link to="/labs">Labs</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <img src={AdminBlock} alt="Admin Block" />
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Thapar Virtual Labs</h1>
            <p>Your Gateway to Digital Learning Excellence</p>
            <Link to="/explore" className="cta-button">Start Learning</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={aboutRef}>
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src={LibraryImage} alt="Thapar Library" />
            </div>
            <div className="about-content">
              <h2>World-Class Education</h2>
              <p>
                Experience cutting-edge virtual laboratories designed to enhance your learning journey
                at one of India's premier engineering institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section" ref={departmentsRef}>
        <div className="container">
          <h2>Our Departments</h2>
          <div className="departments-grid">
            <div className="department-card">
              <img src={CSEDImage} alt="CSED Department" />
              <h3>Computer Science</h3>
            </div>
            <div className="department-card">
              <img src={ECEDImage} alt="ECED Department" />
              <h3>Electronics & Communication</h3>
            </div>
            <div className="department-card">
              <img src={LabImage} alt="Laboratory" />
              <h3>Research Labs</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" ref={contactRef}>
        <div className="contact-container">
          <div className="contact-image">
            <img src={CSEDImage} alt="CSED Department" />
          </div>
          <div className="contact-form-container">
            <h2>Get in Touch</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 