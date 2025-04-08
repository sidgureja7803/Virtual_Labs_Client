import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './AttendanceTracker.css';

const AttendanceTracker = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    total: 0
  });

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      // Simulated data - replace with actual API calls
      const mockStudents = [
        {
          id: 1,
          name: 'Patent',
          rollNumber: '1',
          attendance: {
            present: 12,
            total: 15
          },
          isPresent: true
        },
        {
          id: 2,
          name: 'Patent',
          rollNumber: '2',
          attendance: {
            present: 13,
            total: 15
          },
          isPresent: true
        },
        {
          id: 3,
          name: 'Patent',
          rollNumber: '3',
          attendance: {
            present: 14,
            total: 15
          },
          isPresent: true
        },
        {
          id: 4,
          name: 'Patent',
          rollNumber: '4',
          attendance: {
            present: 15,
            total: 15
          },
          isPresent: true
        },
        {
          id: 5,
          name: 'Patent',
          rollNumber: '5',
          attendance: {
            present: 11,
            total: 15
          },
          isPresent: true
        },
        {
          id: 6,
          name: 'Patent',
          rollNumber: '6',
          attendance: {
            present: 10,
            total: 15
          },
          isPresent: false
        },
        {
          id: 7,
          name: 'Patent',
          rollNumber: '7',
          attendance: {
            present: 9,
            total: 15
          },
          isPresent: false
        },
        {
          id: 8,
          name: 'Patent',
          rollNumber: '8',
          attendance: {
            present: 8,
            total: 15
          },
          isPresent: false
        }
      ];

      setStudents(mockStudents);
      updateAttendanceStats(mockStudents);
      setLoading(false);
    } catch (err) {
      setError('Failed to load attendance data');
      setLoading(false);
    }
  };

  const updateAttendanceStats = (studentList) => {
    const present = studentList.filter(student => student.isPresent).length;
    setAttendanceStats({
      present,
      absent: studentList.length - present,
      total: studentList.length
    });
  };

  const toggleAttendance = (studentId) => {
    const updatedStudents = students.map(student =>
      student.id === studentId
        ? { ...student, isPresent: !student.isPresent }
        : student
    );
    setStudents(updatedStudents);
    updateAttendanceStats(updatedStudents);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Fetch attendance data for the selected date
  };

  if (loading) return <div className="loading">Loading attendance data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="attendance-tracker">
      <div className="tracker-header">
        <h1>Attendance Tracker</h1>
        <div className="date-selector">
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
        </div>
      </div>

      <div className="attendance-stats">
        <div className="stat-card">
          <div className="stat-icon present">👥</div>
          <div className="stat-info">
            <h3>Present</h3>
            <p>{attendanceStats.present}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon absent">🚫</div>
          <div className="stat-info">
            <h3>Absent</h3>
            <p>{attendanceStats.absent}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p>{attendanceStats.total}</p>
          </div>
        </div>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Attendance Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <div className="attendance-rate">
                    <div className="rate-bar">
                      <div 
                        className="rate-fill"
                        style={{ 
                          width: `${(student.attendance.present / student.attendance.total) * 100}%` 
                        }}
                      />
                    </div>
                    <span>
                      {Math.round((student.attendance.present / student.attendance.total) * 100)}%
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`status ${student.isPresent ? 'present' : 'absent'}`}>
                    {student.isPresent ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td>
                  <button
                    className={`toggle-btn ${student.isPresent ? 'present' : 'absent'}`}
                    onClick={() => toggleAttendance(student.id)}
                  >
                    {student.isPresent ? 'Mark Absent' : 'Mark Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="attendance-actions">
        <button className="save-btn">Save Attendance</button>
      </div>
    </div>
  );
};

export default AttendanceTracker; 