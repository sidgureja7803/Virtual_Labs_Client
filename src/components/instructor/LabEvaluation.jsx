import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './LabEvaluation.css';7


const LabEvaluation = () => {
  const { courseId, experimentId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const [submissionsRes, evaluationsRes] = await Promise.all([
          axios.get(`${config.apiUrl}/instructor/experiments/${experimentId}/submissions`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get(`${config.apiUrl}/instructor/experiments/${experimentId}/evaluations`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setSubmissions(submissionsRes.data);
        const evaluationsMap = {};
        evaluationsRes.data.forEach(evaluation => {
          evaluationsMap[evaluation.submissionId] = {
            marks: evaluation.marks,
            feedback: evaluation.feedback
          };
        });
        setEvaluations(evaluationsMap);
        setLoading(false);
      } catch (error) {
        setError('Failed to load submissions');
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [experimentId]);

  const handleEvaluationChange = (submissionId, field, value) => {
    setEvaluations(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        `${config.apiUrl}/instructor/experiments/${experimentId}/evaluate`,
        {
          evaluations: Object.entries(evaluations).map(([submissionId, data]) => ({
            submissionId,
            ...data
          }))
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      navigate(`/instructor/classrooms/${courseId}`);
    } catch (error) {
      setError('Failed to save evaluations');
      setIsSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading submissions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="lab-evaluation">
      <div className="evaluation-header">
        <h1>Lab Evaluation</h1>
      </div>

      <div className="submissions-list">
        {submissions.map(submission => (
          <div key={submission._id} className="submission-card">
            <div className="student-info">
              <h3>{submission.student.name}</h3>
              <p className="roll-number">{submission.student.rollNumber}</p>
            </div>

            <div className="submission-content">
              <section>
                <h4>Observations</h4>
                <p>{submission.observations}</p>
              </section>

              <section>
                <h4>Results</h4>
                <p>{submission.results}</p>
              </section>

              <section>
                <h4>Conclusion</h4>
                <p>{submission.conclusion}</p>
              </section>
            </div>

            <div className="evaluation-form">
              <div className="form-group">
                <label>Marks (out of 10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={evaluations[submission._id]?.marks || ''}
                  onChange={(e) => handleEvaluationChange(
                    submission._id,
                    'marks',
                    Math.min(10, Math.max(0, parseInt(e.target.value) || 0))
                  )}
                />
              </div>

              <div className="form-group">
                <label>Feedback</label>
                <textarea
                  value={evaluations[submission._id]?.feedback || ''}
                  onChange={(e) => handleEvaluationChange(
                    submission._id,
                    'feedback',
                    e.target.value
                  )}
                  placeholder="Provide feedback..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="evaluation-actions">
        <button 
          onClick={() => navigate(-1)} 
          className="cancel-btn"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="save-btn"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Evaluations'}
        </button>
      </div>
    </div>
  );
};

export default LabEvaluation; 