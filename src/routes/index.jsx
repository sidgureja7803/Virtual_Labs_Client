import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import DepartmentsPage from '../pages/DepartmentsPage';
import ContactPage from '../pages/ContactPage';
import TeamPage from '../pages/TeamPage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

// Import route configurations
import instructorRoutes from './instructorRoutes';
import coordinatorRoutes from './coordinatorRoutes';
import studentRoutes from './studentRoutes';

const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/departments',
    element: <DepartmentsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/team',
    element: <TeamPage />,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  
  // Role-specific routes
  ...instructorRoutes,
  ...coordinatorRoutes,
  ...studentRoutes,
  
  // 404 route
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);

export default router; 