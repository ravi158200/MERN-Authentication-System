import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify({ name, email, password });
      
      await axios.post('http://localhost:5001/api/auth/register', body, config);
      navigate('/login');
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
      <h2>Create Your Account</h2>
      <p>Join us today! It's fast and easy.</p>
      {errorMsg && <div className="error-alert">{errorMsg}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p className="auth-footer">Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  );
};

export default Register;
