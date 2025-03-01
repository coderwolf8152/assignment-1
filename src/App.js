import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import AuctionItem from './components/AuctionItem';
import PostAuction from './components/PostAuction';
import Landing from './components/Landing';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // ✅ State for MongoDB users

  // ✅ Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Fetch users from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <header>
          <div className="logo">AuctionX</div>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/signin" className="nav-link">Signin</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/post-auction" className="nav-link">Post Auction</Link>
            {isAuthenticated && (
              <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auction/:id" element={<AuctionItem />} />
            <Route path="/post-auction" element={<PostAuction />} />
          </Routes>
        </main>

        {/* ✅ Dashboard Preview Section */}
        <section className="dashboard-preview">
          <h2>Featured Auctions</h2>
          <div className="auction-list">
            <div className="auction-item">
              <img src="watch.jpg" alt="Auction Item 1" className="auction-image" />
              <p>Luxury Watch - Current Bid: $5,000</p>
            </div>
            <div className="auction-item">
              <img src="car.jpg" alt="Auction Item 2" className="auction-image" />
              <p>Classic Car - Current Bid: $50,000</p>
            </div>
            <div className="auction-item">
              <img src="neck.jpg" alt="Auction Item 3" className="auction-image" />
              <p>Diamond Necklace - Current Bid: $12,000</p>
            </div>
          </div>
        </section>

        {/* ✅ Users List from MongoDB */}
        <section className="user-list">
          <h2>Registered Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </section>

        <footer>
          <p>&copy; 2025 AuctionX. Premium Auction Experience.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
