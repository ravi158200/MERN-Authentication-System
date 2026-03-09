import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token':  token
          }
        };
        const res = await axios.get('http://localhost:5001/api/auth/profile', config);
        setProfile(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErrorMsg('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-card">
      <h2>User Profile</h2>
      {errorMsg && <p className="error-alert">{errorMsg}</p>}
      {profile ? (
        <div className="profile-details">
          <div className="avatar">{profile.name.charAt(0).toUpperCase()}</div>
          <h3>{profile.name}</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Joined:</strong> {new Date(profile.date).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
