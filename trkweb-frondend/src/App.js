import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useParams,
  useNavigate
} from 'react-router-dom';
import './App.css';

// -------------------- Data --------------------

const apps = [
  {
    id: 'calendly',
    name: 'Calendly',
    status: 'Approved',
    owner: 'Andrew Alex',
    departments: 'Marketing and Sales +7',
    paidSeats: 10,
    users: 2,
    lastUsed: '3 days ago',
    renewal: '2 Apr - 6 days left',
    icon: 'https://logo.clearbit.com/calendly.com'
  },
  {
    id: 'amazon-drive',
    name: 'Amazon Drive',
    status: 'Approved',
    owner: 'Dmytro Bieliaiev',
    departments: 'Development +1',
    paidSeats: '-',
    users: '-',
    lastUsed: '-',
    renewal: '15 Apr - 19 days left',
    icon: 'https://logo.clearbit.com/amazon.com'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    status: 'Approved',
    owner: 'Yurii Momot',
    departments: 'Company Head +18',
    paidSeats: 52,
    users: 43,
    lastUsed: '2 days ago',
    renewal: '16 Apr - 20 days left',
    icon: 'https://logo.clearbit.com/hubspot.com'
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    status: 'Needs review',
    owner: 'Ivan Baranenko',
    departments: 'Company Head +5',
    paidSeats: 7,
    users: 2,
    lastUsed: '-',
    renewal: '16 Apr - 20 days left',
    icon: 'https://logo.clearbit.com/pipedrive.com'
  }
];

const users = [
  {
    id: 'miguel',
    name: 'Miguel Arellano',
    email: 'miguel.arellano@partner...',
    status: 'Active',
    jobTitle: '',
    department: 'SDR',
    accountType: 'Employee',
    apps: ['G', 'Jira', '+20'],
    lastActive: '4 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 'kateryna',
    name: 'Kateryna Bibik',
    email: 'kateryna.bibik@partner...',
    status: 'Active',
    jobTitle: '',
    department: 'Marketing Department',
    accountType: 'Employee',
    apps: ['Pink', 'Jira', '+19'],
    lastActive: '4 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'diana',
    name: 'Diana Kopolovets',
    email: 'diana.kopolovets@spen...',
    status: 'Active',
    jobTitle: '',
    department: 'Legal Department',
    accountType: 'Employee',
    apps: ['Figma', 'G', '+6'],
    lastActive: '4 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  }
];

// -------------------- Sidebar --------------------

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo" />
    <nav>
      <NavLink to="/insights">Insights</NavLink>
      <NavLink to="/wallet">Wallet</NavLink>
      <NavLink to="/procurement">Procurement</NavLink>
      <NavLink to="/applications" className="active">Applications</NavLink>
      <NavLink to="/employees">Employees</NavLink>
      <NavLink to="/integrations">Integrations</NavLink>
      <NavLink to="/discounts">Discounts</NavLink>
    </nav>
    <div className="profile">
      <img src="https://via.placeholder.com/32" alt="Profile" />
      <span>Spendbase<br />Maksym P.</span>
    </div>
  </div>
);

// -------------------- Application Views --------------------

const ApplicationCard = ({ app }) => {
  const navigate = useNavigate();
  return (
    <div className="app-card" onClick={() => navigate(`/applications/${app.id}`)}>
      <div className="left">
        <input type="checkbox" />
        <img src={app.icon} alt={`${app.name} icon`} className="icon" />
        <span>{app.name}</span>
      </div>
      <div className="status">
        <span className={`status-label ${app.status.toLowerCase().replace(/\s/g, '-')}`}>
          {app.status}
        </span>
      </div>
      <div className="owner">{app.owner}</div>
      <div className="departments">{app.departments}</div>
      <div className="seats">{app.paidSeats}</div>
      <div className="users">{app.users}</div>
      <div className="last-used">{app.lastUsed}</div>
      <div className="renewal">{app.renewal}</div>
    </div>
  );
};

const Applications = () => {
  return (
    <div className="main">
      <div className="header">
        <h1>Applications</h1>
        <div className="filters">
          <button className="active">All</button>
          <button>Free</button>
          <button>Paid</button>
          <button className="add-filter">+ Add Filter</button>
        </div>
        <div className="archive">Archive (265)</div>
      </div>
      <div className="apps-list">
        {apps.map(app => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const app = apps.find(a => a.id === id);
  if (!app) return <div className="main"><p>Application not found.</p></div>;

  return (
    <div className="main app-details">
      <h2>{app.name}</h2>
      <img src={app.icon} alt="icon" className="icon-large" />
      <p><strong>Status:</strong> {app.status}</p>
      <p><strong>Owner:</strong> {app.owner}</p>
      <p><strong>Departments:</strong> {app.departments}</p>
      <p><strong>Paid Seats:</strong> {app.paidSeats}</p>
      <p><strong>Users:</strong> {app.users}</p>
      <p><strong>Last Used:</strong> {app.lastUsed}</p>
      <p><strong>Renewal:</strong> {app.renewal}</p>
    </div>
  );
};

// -------------------- Employees View --------------------

const Employees = () => {
  return (
    <div className="main">
      <div className="header">
        <h1>Employees</h1>
        <div className="filters">
          <button className="add-filter">+ Add Filter</button>
        </div>
        <div className="archive">Archive (1)</div>
      </div>
      <div className="apps-list">
        {users.map(user => (
          <div className="app-card employee-card" key={user.id}>
            <div className="left">
              <input type="checkbox" />
              <img src={user.avatar} alt={user.name} className="icon" />
              <div>
                <div>{user.name}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.email}</div>
              </div>
            </div>
            <div className="status">
              <span className="status-label approved">{user.status}</span>
            </div>
            <div>{user.jobTitle || '+'}</div>
            <div>{user.department || '+'}</div>
            <div>{user.accountType}</div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {user.apps.map((app, idx) => (
                <span key={idx} style={{ fontSize: '13px', background: '#f3f4f6', padding: '2px 6px', borderRadius: '6px' }}>
                  {app}
                </span>
              ))}
            </div>
            <div>{user.lastActive}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------- App Root --------------------

const App = () => (
  <Router>
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  </Router>
);

export default App;
