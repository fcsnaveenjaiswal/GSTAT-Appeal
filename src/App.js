import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AppealForm from './pages/AppealForm';
import AppealStatus from './pages/AppealStatus';
import UserDashboard from './pages/UserDashboard';
import FAQ from './pages/FAQ';
import AdminDashboard from './pages/AdminDashboard';
import JokeGenerator from './pages/JokeGenerator';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/appeal" element={<AppealForm />} />
              <Route path="/appeal-status" element={<AppealStatus />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/jokes" element={<JokeGenerator />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
