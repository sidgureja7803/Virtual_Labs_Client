import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HODDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    branch: '',
    courseCode: '',
    name: '',
    description: ''
  });

  useEffect(() => {
    // Fetch departments data
    const fetchDepartments = async () => {
      const response = await axios.get('/api/departments');
      setDepartments(response.data);
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subjects', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Reset form and show success message
      setFormData({
        department: '',
        branch: '',
        courseCode: '',
        name: '',
        description: ''
      });
      alert('Subject added successfully!');
    } catch (error) {
      console.error('Failed to add subject:', error);
    }
  };

  return (
    <div className="hod-dashboard">
      <h2>Add New Subject</h2>
      <form onSubmit={handleSubmit} className="subject-form">
        <div className="form-group">
          <label>Department</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            required
          >
            <option value="">Select Department</option>
            <option value="CSED">CSED</option>
            <option value="ECED">ECED</option>
            {/* Add other departments */}
          </select>
        </div>

        <div className="form-group">
          <label>Branch</label>
          <select
            value={formData.branch}
            onChange={(e) => setFormData({...formData, branch: e.target.value})}
            required
          >
            <option value="">Select Branch</option>
            {formData.department === 'CSED' && (
              <>
                <option value="CSE">CSE</option>
                <option value="COE">COE</option>
                <option value="COBS">COBS</option>
              </>
            )}
            {formData.department === 'ECED' && (
              <>
                <option value="ECE">ECE</option>
                <option value="ENC">ENC</option>
              </>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Course Code</label>
          <input
            type="text"
            value={formData.courseCode}
            onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button type="submit" className="submit-button">Add Subject</button>
      </form>
    </div>
  );
};

export default HODDashboard; 