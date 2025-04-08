import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './LabEvaluation.css';

const LabEvaluation = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      // Simulated data - replace with actual API calls
      const mockAssignments = [
        {
          id: 1,
          name: 'Patent',
          number: 1,
          totalStudents: 8,
          submittedCount: 5,
          pendingCount: 3
        },
        // Add more assignments as needed
      ];

      const mockSubmissions = [
        {
          id: 1,
          studentName: 'Patent',
          rollNumber: '1',
          marksObtained: 5,
          submitted: 'Yes',
          status: 'Evaluated'
        },
        {
          id: 2,
          studentName: 'Patent',
          rollNumber: '2',
          marksObtained: 5,
          submitted: 'Yes',
          status: 'Evaluated'
        },
        {
          id: 3,
          studentName: 'Patent',
          rollNumber: '3',
          marksObtained: 5,
          submitted: 'Yes',
          status: 'Evaluated'
        },
        {
          id: 4,
          studentName: 'Patent',
          rollNumber: '4',
          marksObtained: 5,
          submitted: 'Yes',
          status: 'Evaluated'
        },
        {
          id: 5,
          studentName: 'Patent',
          rollNumber: '5',
          marksObtained: 5,
          submitted: 'Yes',
          status: 'Evaluated'
        },
        {
          id: 6,
          studentName: 'Patent',
          rollNumber: '6',
          marksObtained: 0,
          submitted: 'No',
          status: 'Pending'
        },
        {
          id: 7,
          studentName: 'Patent',
          rollNumber: '7',
          marksObtained: 0,
          submitted: 'No',
          status: 'Pending'
        },
        {
          id: 8,
          studentName: 'Patent',
          rollNumber: '8',
          marksObtained: 0,
          submitted: 'No',
          status: 'Pending'
        }
      ];

      setAssignments(mockAssignments);
      setSubmissions(mockSubmissions);
      setSelectedAssignment(mockAssignments[0]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load assignments');
      setLoading(false);
    }
  };

  const handleAssignMarks = async (submissionId, marks) => {
    try {
      // API call to update marks
      const updatedSubmissions = submissions.map(sub =>
        sub.id === submissionId ? { ...sub, marksObtained: marks } : sub
      );
      setSubmissions(updatedSubmissions);
    } catch (err) {
      setError('Failed to update marks');
    }
  };

  if (loading) return <div className="loading">Loading assignments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="lab-evaluation">
      <div className="evaluation-header">
        <h1>Assignment {selectedAssignment?.number}</h1>
        <div className="submission-stats">
          <div className="stat">
            <span>Total Students</span>
            <p>{selectedAssignment?.totalStudents}</p>
          </div>
          <div className="stat">
            <span>Submitted</span>
            <p>{selectedAssignment?.submittedCount}</p>
          </div>
          <div className="stat">
            <span>Pending</span>
            <p>{selectedAssignment?.pendingCount}</p>
          </div>
        </div>
      </div>

      <div className="submissions-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Marks Obtained</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission.id}>
                <td>{submission.studentName}</td>
                <td>{submission.rollNumber}</td>
                <td>{submission.marksObtained}</td>
                <td>
                  <span className={`status ${submission.submitted.toLowerCase()}`}>
                    {submission.submitted}
                  </span>
                </td>
                <td>
                  <span className={`status ${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => {/* Handle view submission */}}
                  >
                    View
                  </button>
                  {submission.submitted === 'Yes' && (
                    <button 
                      className="grade-btn"
                      onClick={() => {/* Open grading modal */}}
                    >
                      Grade
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="submission-chart">
        <div className="chart-container">
          <div 
            className="chart-fill" 
            style={{ 
              width: `${(selectedAssignment?.submittedCount / selectedAssignment?.totalStudents) * 100}%` 
            }}
          >
            {Math.round((selectedAssignment?.submittedCount / selectedAssignment?.totalStudents) * 100)}%
          </div>
        </div>
        <p>Submission Rate</p>
      </div>
    </div>
  );
};

export default LabEvaluation; 