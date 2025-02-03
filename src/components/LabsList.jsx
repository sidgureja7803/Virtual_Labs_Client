import React from 'react';
import { Link } from 'react-router-dom';

const LabsList = () => {
  const labs = [
    { 
      id: 1, 
      name: 'Computer Science & Engineering', 
      code: 'CSE',
      description: 'Data Structures, Algorithms, Operating Systems, and more',
      icon: '💻' 
    },
    { 
      id: 2, 
      name: 'Computer Engineering', 
      code: 'COE',
      description: 'Computer Architecture, Digital Systems, Embedded Systems',
      icon: '🖥️' 
    },
    { 
      id: 3, 
      name: 'Electronics & Communication', 
      code: 'ECE',
      description: 'Circuit Theory, Digital Electronics, Communication Systems',
      icon: '📡' 
    },
    { id: 4, name: 'Electronics & Computer Engineering (ECE)', icon: '🔌' },
    { id: 5, name: 'Chemical Engineering', icon: '⚗️' },
    { id: 6, name: 'Civil Engineering', icon: '🏗️' },
    { id: 7, name: 'Mechanical Engineering', icon: '⚙️' },
  ];

  return (
    <section className="labs-section">
      <div className="section-header">
        <h2>Virtual Laboratory Departments</h2>
        <p>Access state-of-the-art virtual labs across various engineering disciplines</p>
      </div>
      <div className="labs-grid">
        {labs.map((lab) => (
          <Link to={`/labs/${lab.id}`} key={lab.id} className="lab-card">
            <div className="lab-card-content">
              <span className="lab-icon">{lab.icon}</span>
              <h3>{lab.name}</h3>
              <p className="lab-code">{lab.code}</p>
              <p className="lab-description">{lab.description}</p>
              <span className="explore-link">Explore Lab →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LabsList; 