import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation
} from 'react-router-dom';
import './App.css';

import Analytics from './components/Analytics';
import Applications from './components/Applications';
import Procurement from './components/Procurement';
import Users from './components/Users';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import ApplicationDetails from './components/ApplicationDetails';
import Auth from './components/Auth';

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo" />
    <nav>
      <NavLink to="/analytics">Dashboard</NavLink>
      <NavLink to="/applications">Applications</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/procurement">Procurement</NavLink>
    </nav>
    <div className="profile">
      <span>Maksym P.</span>
    </div>
  </div>
);

const Layout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="container">
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/procurement" element={<Procurement />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
