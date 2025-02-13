import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './ExperimentRunner.css';

const ExperimentRunner = () => {
  const { experimentId } = useParams();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState(null);
  const [submission, setSubmission] = useState({
    observations: '',
    results: '',
    conclusion: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        const [experimentRes, submissionRes] = await Promise.all([
          axios.get(`${config.apiUrl}/student/experiments/${experimentId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get(`${config.apiUrl}/student/experiments/${experimentId}/submission`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setExperiment(experimentRes.data);
        if (submissionRes.data) {
          setSubmission(submissionRes.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load experiment');
        setLoading(false);
      }
    };

    fetchExperiment();
  }, [experimentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.post(
        `${config.apiUrl}/student/experiments/${experimentId}/submit`,
        submission,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      navigate(-1);
    } catch (err) {
      setError('Failed to submit experiment');
      setIsSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading experiment...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!experiment) return <div className="error">Experiment not found</div>;

  return (
    <div className="experiment-runner">
      <div className="experiment-header">
        <h1>{experiment.title}</h1>
        <button onClick={() => navigate(-1)} className="back-btn">
          Back to Classroom
        </button>
      </div>

      <div className="experiment-content">
        <section className="theory-section">
          <h2>Theory</h2>
          <div dangerouslySetInnerHTML={{ __html: experiment.theory }} />
        </section>

        <section className="procedure-section">
          <h2>Procedure</h2>
          <ol>
            {experiment.procedure.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="simulation-section">
          <h2>Simulation</h2>
          <div className="simulation-container">
            <iframe
              src={experiment.simulationUrl}
              title="MATLAB Simulation"
              className="simulation-frame"
            />
          </div>
        </section>

        <form onSubmit={handleSubmit} className="submission-form">
          <h2>Lab Report</h2>
          
          <div className="form-group">
            <label>Observations</label>
            <textarea
              value={submission.observations}
              onChange={(e) => setSubmission({...submission, observations: e.target.value})}
              required
              rows={4}
              placeholder="Record your observations here..."
            />
          </div>

          <div className="form-group">
            <label>Results</label>
            <textarea
              value={submission.results}
              onChange={(e) => setSubmission({...submission, results: e.target.value})}
              required
              rows={4}
              placeholder="Document your results..."
            />
          </div>

          <div className="form-group">
            <label>Conclusion</label>
            <textarea
              value={submission.conclusion}
              onChange={(e) => setSubmission({...submission, conclusion: e.target.value})}
              required
              rows={4}
              placeholder="Write your conclusion..."
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSaving}
            >
              {isSaving ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperimentRunner; 