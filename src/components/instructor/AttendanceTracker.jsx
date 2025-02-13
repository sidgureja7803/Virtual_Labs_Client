import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './AttendanceTracker.css';

const AttendanceTracker = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const [studentsRes, attendanceRes] = await Promise.all([
          axios.get(`${config.apiUrl}/instructor/courses/${courseId}/students`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get(`${config.apiUrl}/instructor/courses/${courseId}/attendance/${date}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setStudents(studentsRes.data);
        const attendanceMap = {};
        attendanceRes.data.forEach(record => {
          attendanceMap[record.studentId] = record.status;
        });
        setAttendance(attendanceMap);
        setLoading(false);
      } catch (error) {
        setError('Failed to load attendance data');
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId, date]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        `${config.apiUrl}/instructor/courses/${courseId}/attendance`,
        {
          date,
          attendance: Object.entries(attendance).map(([studentId, status]) => ({
            studentId,
            status
          }))
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      navigate(`/instructor/classrooms/${courseId}`);
    } catch (error) {
      setError('Failed to save attendance');
      setIsSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading attendance...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="attendance-tracker">
      <div className="tracker-header">
        <h1>Attendance Tracker</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-picker"
        />
      </div>

      <div className="attendance-list">
        <div className="list-header">
          <span>Roll Number</span>
          <span>Student Name</span>
          <span>Status</span>
        </div>

        {students.map(student => (
          <div key={student._id} className="student-row">
            <span className="roll-number">{student.rollNumber}</span>
            <span className="student-name">{student.name}</span>
            <div className="attendance-buttons">
              <button
                className={`status-btn ${attendance[student._id] === 'present' ? 'active' : ''}`}
                onClick={() => handleAttendanceChange(student._id, 'present')}
              >
                Present
              </button>
              <button
                className={`status-btn ${attendance[student._id] === 'absent' ? 'active' : ''}`}
                onClick={() => handleAttendanceChange(student._id, 'absent')}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="tracker-actions">
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
          {isSaving ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceTracker; 