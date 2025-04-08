import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './QuizManager.css';

const QuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      // Simulated data - replace with actual API calls
      const mockQuizzes = [
        {
          id: 1,
          title: 'Computer Graphics Mid-Term',
          course: 'CG101',
          dueDate: '2024-04-15',
          totalQuestions: 15,
          duration: 60,
          status: 'active'
        },
        {
          id: 2,
          title: 'Cyber Security Lab Test',
          course: 'CS201',
          dueDate: '2024-04-20',
          totalQuestions: 20,
          duration: 45,
          status: 'draft'
        }
      ];

      setQuizzes(mockQuizzes);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quizzes');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'draft': return 'orange';
      case 'ended': return 'red';
      default: return 'gray';
    }
  };

  if (loading) return <div className="loading">Loading quizzes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="quiz-manager">
      <div className="quiz-header">
        <div>
          <h1>Quiz Manager</h1>
          <p>Create and manage your lab quizzes</p>
        </div>
        <button 
          className="create-quiz-btn"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Quiz
        </button>
      </div>

      <div className="quiz-list">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-info">
              <div className="quiz-title-row">
                <h2>{quiz.title}</h2>
                <span 
                  className={`status-badge ${getStatusColor(quiz.status)}`}
                >
                  {quiz.status}
                </span>
              </div>
              <p className="course-code">{quiz.course}</p>
            </div>

            <div className="quiz-details">
              <div className="detail">
                <span>Due Date</span>
                <p>{new Date(quiz.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="detail">
                <span>Questions</span>
                <p>{quiz.totalQuestions}</p>
              </div>
              <div className="detail">
                <span>Duration</span>
                <p>{quiz.duration} min</p>
              </div>
            </div>

            <div className="quiz-actions">
              <Link 
                to={`/instructor/quizzes/${quiz.id}/edit`}
                className="action-btn primary"
              >
                Edit Quiz
              </Link>
              <Link 
                to={`/instructor/quizzes/${quiz.id}/results`}
                className="action-btn secondary"
              >
                View Results
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Quiz</h2>
            {/* Add quiz creation form here */}
            <button onClick={() => setShowCreateModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManager; 