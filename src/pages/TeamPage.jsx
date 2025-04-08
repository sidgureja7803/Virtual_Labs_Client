import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './TeamPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import team member images
// You'll need to add these images to your assets folder
import mentor1 from '../assets/team/mentor1.jpg'; 
import mentor2 from '../assets/team/mentor2.jpg';
import mentor3 from '../assets/team/mentor3.jpg';
import developer1 from '../assets/team/developer1.jpg';
import developer2 from '../assets/team/developer2.jpg';
import developer3 from '../assets/team/developer3.jpg';

const TeamPage = () => {
  const developers = [
    {
      id: 1,
      name: "Pariansh Mahajan",
      role: "Full Stack Developer",
      image: developer1,
      linkedin: "https://linkedin.com/in/pariansh-mahajan",
      email: "pmahajan@thapar.edu"
    },
    {
      id: 2,
      name: "Hushraj Singh",
      role: "DevOps Engineer",
      image: developer2,
      linkedin: "https://linkedin.com/in/hushraj-singh",
      email: "hsingh@thapar.edu"
    },
    {
      id: 3,
      name: "Jasdeep Singh",
      role: "UI/UX Developer",
      image: developer3,
      linkedin: "https://linkedin.com/in/jasdeep-singh",
      email: "jsingh@thapar.edu"
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Inderveer Chana",
      role: "Professor CSED, TIET",
      image: mentor1,
      email: "ichana@thapar.edu"
    },
    {
      id: 2,
      name: "Dr. Anju Bala",
      role: "Associate Professor, CSED",
      image: mentor2,
      email: "abala@thapar.edu"
    },
    {
      id: 3,
      name: "Dr. Sachin Kansal",
      role: "Assistant Professor, CSED",
      image: mentor3,
      email: "skansal@thapar.edu"
    }
  ];

  return (
    <div className="team-page">
      <Navbar />
      
      <div className="team-hero" style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/team-background.jpg')" 
      }}>
        <div className="team-hero-content">
          <h1>Our Team</h1>
          <div className="subtitle">Innovating Intelligence</div>
        </div>
      </div>
      
      <div className="team-description">
        <p>
          Our team of skilled developers and experienced mentors works
          collaboratively to drive innovation in Data Science and AI. Developers
          bring technical expertise and creativity, while mentors guide with
          knowledge and direction, ensuring impactful solutions that bridge
          research and real-world applications. Together, we are committed to
          shaping a smarter and more connected future.
        </p>
      </div>
      
      <section className="developers-section">
        <div className="section-background">Developers</div>
        <h2 className="section-title">Developers</h2>
        
        <div className="team-members">
          {developers.map(member => (
            <div key={member.id} className="team-member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="member-socials">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={`mailto:${member.email}`}>
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mentors-section">
        <div className="section-background">Mentors</div>
        <h2 className="section-title">Mentors</h2>
        
        <div className="team-members">
          {mentors.map(member => (
            <div key={member.id} className="team-member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="member-socials">
                  <a href={`mailto:${member.email}`}>
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TeamPage; 