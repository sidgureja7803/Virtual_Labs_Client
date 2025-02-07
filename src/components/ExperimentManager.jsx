import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ExperimentManager.css';
import config from '../config'
const ExperimentManager = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [experiments, setExperiments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    procedure: '',
    simulation: ''
  });

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/subjects/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCourse(response.data);
      setExperiments(response.data.experiments || []);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/subjects/${courseId}/experiments`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setExperiments([...experiments, response.data]);
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        procedure: '',
        simulation: ''
      });
    } catch (error) {
      console.error('Error adding experiment:', error);
    }
  };

  const handleDelete = async (experimentId) => {
    if (window.confirm('Are you sure you want to delete this experiment?')) {
      try {
        await axios.delete(`${config.apiUrl}/subjects/${courseId}/experiments/${experimentId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setExperiments(experiments.filter(exp => exp._id !== experimentId));
      } catch (error) {
        console.error('Error deleting experiment:', error);
      }
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="experiment-manager">
      <div className="experiment-header">
        <div>
          <h1>{course.name} - Experiments</h1>
          <p className="course-info">
            {course.department} | {course.branch} | {course.courseCode}
          </p>
        </div>
        <button 
          className="add-experiment-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Experiment'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="experiment-form">
          <div className="form-group">
            <label>Experiment Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="Enter experiment title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              placeholder="Enter experiment description"
            />
          </div>

          <div className="form-group">
            <label>Procedure</label>
            <textarea
              value={formData.procedure}
              onChange={(e) => setFormData({...formData, procedure: e.target.value})}
              required
              placeholder="Enter step-by-step procedure"
            />
          </div>

          <div className="form-group">
            <label>Simulation Link/Code</label>
            <textarea
              value={formData.simulation}
              onChange={(e) => setFormData({...formData, simulation: e.target.value})}
              placeholder="Enter simulation details or embed code"
            />
          </div>

          <button type="submit" className="submit-button">Add Experiment</button>
        </form>
      )}

      <div className="experiments-list">
        {experiments.map((experiment, index) => (
          <div key={experiment._id || index} className="experiment-card">
            <div className="experiment-number">Experiment {index + 1}</div>
            <h3>{experiment.title}</h3>
            <div className="experiment-content">
              <div className="content-section">
                <h4>Description</h4>
                <p>{experiment.description}</p>
              </div>
              <div className="content-section">
                <h4>Procedure</h4>
                <p>{experiment.procedure}</p>
              </div>
              {experiment.simulation && (
                <div className="content-section">
                  <h4>Simulation</h4>
                  <div className="simulation-container">
                    {experiment.simulation}
                  </div>
                </div>
              )}
            </div>
            <div className="experiment-actions">
              <button 
                onClick={() => handleDelete(experiment._id)}
                className="delete-btn"
              >
                Delete Experiment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentManager; 