import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import LabsList from './components/LabsList';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ExperimentView from './components/ExperimentView';
import './App.css';
import { useState } from 'react';

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route 
            path="/student-dashboard" 
            element={
              userRole === 'student' ? 
              <StudentDashboard /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/teacher-dashboard" 
            element={
              userRole === 'teacher' ? 
              <TeacherDashboard /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/course/:courseId/experiment/:experimentId" 
            element={<ExperimentView />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
