import { Navigate } from 'react-router-dom';
import InstructorLayout from '../components/layouts/InstructorLayout';
import InstructorDashboard from '../components/instructor/InstructorDashboard';
import LabEvaluation from '../components/instructor/LabEvaluation';
import AttendanceTracker from '../components/instructor/AttendanceTracker';
import CourseList from '../components/instructor/CourseList';
import QuizManager from '../components/instructor/QuizManager';
import FeedbackForm from '../components/instructor/FeedbackForm';
import Settings from '../components/instructor/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated || userRole !== 'instructor') {
    return <Navigate to="/login" />;
  }

  return <InstructorLayout>{children}</InstructorLayout>;
};

const instructorRoutes = [
  {
    path: '/instructor',
    element: (
      <ProtectedRoute>
        <InstructorDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/instructor/courses',
    element: (
      <ProtectedRoute>
        <CourseList />
      </ProtectedRoute>
    )
  },
  {
    path: '/instructor/lab-evaluation',
    element: (
      <ProtectedRoute>
        <LabEvaluation />
      </ProtectedRoute>
    )
  },
  {
    path: '/instructor/attendance',
    element: (
      <ProtectedRoute>
        <AttendanceTracker />
      </ProtectedRoute>
    )
  },
  {
    path: '/instructor/quizzes',
    element: (
      <ProtectedRoute>
        <QuizManager />
      </ProtectedRoute>
    )
  },
  {
    path: '/instructor/feedback',
    element: (
      <ProtectedRoute>
        <FeedbackForm />
      </ProtectedRoute>
    )
  },
  {
    path: '/instructor/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    )
  }
];

export default instructorRoutes; 