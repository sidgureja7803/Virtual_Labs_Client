import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/common/Header';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// Coordinator Components
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import ManageInstructors from './components/coordinator/ManageInstructors';
import CourseManagement from './components/coordinator/CourseManagement';
import ExperimentManager from './components/coordinator/ExperimentManager';

// Instructor Components
import InstructorDashboard from './components/instructor/InstructorDashboard';
import ClassroomManager from './components/instructor/ClassroomManager';
import AttendanceTracker from './components/instructor/AttendanceTracker';
import LabEvaluation from './components/instructor/LabEvaluation';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import CourseExplorer from './components/student/CourseExplorer';
import ClassroomView from './components/student/ClassroomView';
import ExperimentRunner from './components/student/ExperimentRunner';

import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Header userRole={userRole} />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/signup" element={<Signup setUserRole={setUserRole} />} />

          {/* Coordinator Routes */}
          <Route 
            path="/coordinator/*" 
            element={
              <ProtectedRoute allowedRoles={['coordinator']}>
                <Routes>
                  <Route path="/" element={<CoordinatorDashboard />} />
                  <Route path="/manage-instructors" element={<ManageInstructors />} />
                  <Route path="/courses" element={<CourseManagement />} />
                  <Route path="/experiments/:courseId" element={<ExperimentManager />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Instructor Routes */}
          <Route 
            path="/instructor/*" 
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <Routes>
                  <Route path="/" element={<InstructorDashboard />} />
                  <Route path="/classrooms" element={<ClassroomManager />} />
                  <Route path="/attendance/:classroomId" element={<AttendanceTracker />} />
                  <Route path="/evaluation/:classroomId" element={<LabEvaluation />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route 
            path="/student/*" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Routes>
                  <Route path="/" element={<StudentDashboard />} />
                  <Route path="/courses" element={<CourseExplorer />} />
                  <Route path="/classroom/:classroomId" element={<ClassroomView />} />
                  <Route path="/experiment/:experimentId" element={<ExperimentRunner />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
