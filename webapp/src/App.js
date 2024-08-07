import './App.css';
import Login from './Features/auth/LoginSignup/login';
import Register from './Features/auth/LoginSignup/register';
import Home from './Features/home';
import About from './Features/about'; // Import About component
import Inventory from './Features/Inventory/inventory'; // Import Inventory component
import Contact from './Features/contact'; // Import Contact component
import FAQ from './Features/faq'; // Import FAQ component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthDetails from './Features/auth/authdetails';
import Profile from './Features/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} /> {/* About Us page */}
          <Route path="/inventory" element={<Inventory />} /> {/* Inventory page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact Us page */}
          <Route path="/faq" element={<FAQ />} /> {/* FAQ page */}
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
