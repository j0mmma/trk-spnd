import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';

import Analytics from './components/Analytics';
import Applications from './components/Applications';
import Procurement from './components/Procurement';
import Users from './components/Users';
import Login from './components/Login';

import UserDetails from './components/UserDetails';
import ApplicationDetails from './components/ApplicationDetails';

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

const App = () => (
  <Router>
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/procurement" element={<Procurement />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Login />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
      </Routes>
    </div>
  </Router>
);

export default App;
