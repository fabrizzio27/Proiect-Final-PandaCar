import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import AdminDashbord from './Components/AdminDashbord/AdminDashbord';
import HomePage from './Components/HomePage/HomePage'; 
import CarsPage from './Components/CarsPage/CarsPage'; 
import Favorites from './Components/Favorites/Favorites'; 
import Account from './Components/Account/Account'; 
import Contact from './Components/Contact/Contact'; 
import Cart from './Components/Cart/Cart'; 
import Recommendations from './Components/Recommendations/Recommendations'; 
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function AppContent() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/signup' element={<SignupForm />} />
      <Route 
        path='/admin' 
        element={
          isAuthenticated && user?.is_admin ? 
            <AdminDashbord /> : 
            <Navigate to="/" replace />
        } 
      />
      <Route 
        path='/home' 
        element={
          isAuthenticated ? 
            <HomePage /> : 
            <Navigate to="/" replace />
        } 
      />
      <Route 
        path='/cars' 
        element={
          isAuthenticated ? 
            <CarsPage /> : 
            <Navigate to="/" replace />
        } 
      />
      <Route 
        path='/favorites' 
        element={
          isAuthenticated ? 
            <Favorites /> : 
            <Navigate to="/" replace />
        } 
      />
      <Route 
        path='/account' 
        element={
          isAuthenticated ? 
            <Account /> : 
            <Navigate to="/" replace />
        } 
      />
      <Route path='/contact' element={<Contact />} />
      <Route 
        path='/cart' 
        element={
          isAuthenticated ? 
            <Cart /> : 
            <Navigate to="/" replace />
        } 
      />
      <Route 
        path='/recommendations' 
        element={
          isAuthenticated ? 
            <Recommendations /> : 
            <Navigate to="/" replace />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
