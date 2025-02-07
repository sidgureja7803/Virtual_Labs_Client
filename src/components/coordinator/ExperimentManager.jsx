import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './ExperimentManager.css';

const ExperimentManager = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [experimentData, setExperimentData] = useState({
    title: '',
    objective: '',
    theory: '',
    procedure: '',
    simulation: '',
    assignment: '',
    expectedOutput: '',
    references: ''
  });

  useEffect(() => {
    fetchCourseAndExperiments();
  }, [courseId]);

  const fetchCourseAndExperiments = async () => {
    try {
      const [courseRes, experimentsRes] = await Promise.all([
        axios.get(`${config.apiUrl}/coordinator/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${config.apiUrl}/coordinator/courses/${courseId}/experiments`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setCourse(courseRes.data);
      setExperiments(experimentsRes.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load course data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${config.apiUrl}/coordinator/courses/${courseId}/experiments`,
        experimentData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      setShowAddForm(false);
      setExperimentData({
        title: '',
        objective: '',
        theory: '',
        procedure: '',
        simulation: '',
        assignment: '',
        expectedOutput: '',
        references: ''
      });
      fetchCourseAndExperiments();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add experiment');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="experiment-manager">
      <div className="manager-header">
        <div className="header-info">
          <h1>Manage Experiments</h1>
          <h2>{course.name} ({course.courseCode})</h2>
        </div>
        <button 
          className="add-experiment-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Experiment'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showAddForm && (
        <form onSubmit={handleSubmit} className="experiment-form">
          <div className="form-group">
            <label>Experiment Title</label>
            <input
              type="text"
              value={experimentData.title}
              onChange={(e) => setExperimentData({...experimentData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Objective</label>
            <textarea
              value={experimentData.objective}
              onChange={(e) => setExperimentData({...experimentData, objective: e.target.value})}
              required
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Theory</label>
            <textarea
              value={experimentData.theory}
              onChange={(e) => setExperimentData({...experimentData, theory: e.target.value})}
              required
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Procedure</label>
            <textarea
              value={experimentData.procedure}
              onChange={(e) => setExperimentData({...experimentData, procedure: e.target.value})}
              required
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Simulation Link (MATLAB)</label>
            <input
              type="url"
              value={experimentData.simulation}
              onChange={(e) => setExperimentData({...experimentData, simulation: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Assignment Questions</label>
            <textarea
              value={experimentData.assignment}
              onChange={(e) => setExperimentData({...experimentData, assignment: e.target.value})}
              required
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Expected Output</label>
            <textarea
              value={experimentData.expectedOutput}
              onChange={(e) => setExperimentData({...experimentData, expectedOutput: e.target.value})}
              required
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>References</label>
            <textarea
              value={experimentData.references}
              onChange={(e) => setExperimentData({...experimentData, references: e.target.value})}
              rows={2}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Experiment
            </button>
          </div>
        </form>
      )}

      <div className="experiments-list">
        {experiments.map(experiment => (
          <div key={experiment._id} className="experiment-card">
            <h3>{experiment.title}</h3>
            <div className="experiment-actions">
              <button 
                onClick={() => navigate(`/coordinator/experiments/${experiment._id}/edit`)}
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => navigate(`/coordinator/experiments/${experiment._id}/preview`)}
                className="preview-btn"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentManager; 