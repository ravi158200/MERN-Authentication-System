import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify({ email, password });
      
      const res = await axios.post('http://localhost:5001/api/auth/login', body, config);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/profile');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrorMsg(err.response.data.errors.map(err => err.msg).join(', '));
      } else if (err.response && err.response.data.msg) {
        setErrorMsg(err.response.data.msg);
      } else {
        setErrorMsg('Server error');
      }
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <p>Sign in to your account</p>
      {errorMsg && <div className="error-alert">{errorMsg}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="auth-footer">Don't have an account? <Link to="/register">Sign Up</Link></p>
    </div>
  );
};

export default Login;
