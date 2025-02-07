import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './ExperimentPreview.css';

const ExperimentPreview = () => {
  const { experimentId } = useParams();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/coordinator/experiments/${experimentId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setExperiment(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load experiment');
        setLoading(false);
      }
    };

    fetchExperiment();
  }, [experimentId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!experiment) return <div className="error">Experiment not found</div>;

  return (
    <div className="experiment-preview">
      <div className="preview-header">
        <h1>{experiment.title}</h1>
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          Back to Experiments
        </button>
      </div>

      <div className="preview-content">
        <section className="preview-section">
          <h2>Objective</h2>
          <p>{experiment.objective}</p>
        </section>

        <section className="preview-section">
          <h2>Theory</h2>
          <div dangerouslySetInnerHTML={{ __html: experiment.theory }} />
        </section>

        <section className="preview-section">
          <h2>Procedure</h2>
          <div dangerouslySetInnerHTML={{ __html: experiment.procedure }} />
        </section>

        <section className="preview-section">
          <h2>Simulation</h2>
          <div className="simulation-preview">
            <iframe
              src={experiment.simulation}
              title="MATLAB Simulation"
              className="simulation-frame"
            />
          </div>
        </section>

        <section className="preview-section">
          <h2>Assignment Questions</h2>
          <div dangerouslySetInnerHTML={{ __html: experiment.assignment }} />
        </section>

        <section className="preview-section">
          <h2>Expected Output</h2>
          <div dangerouslySetInnerHTML={{ __html: experiment.expectedOutput }} />
        </section>

        <section className="preview-section">
          <h2>References</h2>
          <div dangerouslySetInnerHTML={{ __html: experiment.references }} />
        </section>
      </div>
    </div>
  );
};

export default ExperimentPreview; 