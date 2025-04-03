import React from 'react';

const HodDashboard = () => {
  return (
    <div className="hod-dashboard">
      <h1>Head of Department Dashboard</h1>
      <p>Welcome to the Head of Department dashboard. This section is under development.</p>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Manage Department</h3>
          <p>Oversee department operations and staff</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Course Approval</h3>
          <p>Review and approve courses for the department</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Department Analytics</h3>
          <p>View performance metrics and statistics</p>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard; 