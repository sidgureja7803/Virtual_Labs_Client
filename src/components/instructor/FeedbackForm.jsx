import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [courses, setCourses] = useState([
    { id: 1, code: 'CG101', name: 'Computer Graphics' },
    { id: 2, code: 'CS201', name: 'Cyber Security' }
  ]);

  useEffect(() => {
    fetchFeedbacks();
  }, [selectedCourse]);

  const fetchFeedbacks = async () => {
    try {
      // Simulated data - replace with actual API calls
      const mockFeedbacks = [
        {
          id: 1,
          studentName: 'John Doe',
          course: 'CG101',
          experimentName: 'Line Drawing Algorithms',
          rating: 4,
          comment: 'The experiment was well structured and helped me understand the concepts clearly.',
          date: '2024-04-10',
          status: 'unread'
        },
        {
          id: 2,
          studentName: 'Jane Smith',
          course: 'CS201',
          experimentName: 'Network Security Lab',
          rating: 5,
          comment: 'Excellent hands-on experience with network security tools.',
          date: '2024-04-09',
          status: 'read'
        }
      ];

      setFeedbacks(
        selectedCourse === 'all'
          ? mockFeedbacks
          : mockFeedbacks.filter(f => f.course === selectedCourse)
      );
      setLoading(false);
    } catch (err) {
      setError('Failed to load feedbacks');
      setLoading(false);
    }
  };

  const markAsRead = async (feedbackId) => {
    try {
      // Simulated API call - replace with actual implementation
      setFeedbacks(feedbacks.map(f => 
        f.id === feedbackId ? { ...f, status: 'read' } : f
      ));
    } catch (err) {
      console.error('Failed to mark feedback as read:', err);
    }
  };

  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) return <div className="loading">Loading feedbacks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="feedback-manager">
      <div className="feedback-header">
        <div>
          <h1>Student Feedback</h1>
          <p>Review and manage student feedback for your lab experiments</p>
        </div>
        <select 
          value={selectedCourse} 
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-filter"
        >
          <option value="all">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.code}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
      </div>

      <div className="feedback-list">
        {feedbacks.map(feedback => (
          <div 
            key={feedback.id} 
            className={`feedback-card ${feedback.status}`}
          >
            <div className="feedback-top">
              <div className="student-info">
                <h3>{feedback.studentName}</h3>
                <p className="course-code">{feedback.course}</p>
              </div>
              <div className="feedback-date">
                {new Date(feedback.date).toLocaleDateString()}
              </div>
            </div>

            <div className="experiment-info">
              <h4>{feedback.experimentName}</h4>
              <div className="rating">
                <span className="stars">{getRatingStars(feedback.rating)}</span>
                <span className="rating-number">{feedback.rating}/5</span>
              </div>
            </div>

            <p className="feedback-comment">{feedback.comment}</p>

            {feedback.status === 'unread' && (
              <button 
                className="mark-read-btn"
                onClick={() => markAsRead(feedback.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="no-feedback">
            <p>No feedback available for the selected course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm; 