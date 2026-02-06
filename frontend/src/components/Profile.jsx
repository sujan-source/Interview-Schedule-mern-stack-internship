import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ token, user }) => {
    const [bio, setBio] = useState(user.profile?.bio || '');
    const [contact, setContact] = useState(user.profile?.contactNo || '');
    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('contactNo', contact);
        if (resume) formData.append('resume', resume);

        try {
            await axios.put('http://localhost:5000/api/auth/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <form onSubmit={handleUpdate} className="profile-form">
                <div className="form-group">
                    <label>Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Resume (PDF)</label>
                    <input type="file" onChange={(e) => setResume(e.target.files[0])} accept=".pdf,.doc,.docx" />
                </div>
                <button type="submit" className="btn-primary">Save Profile</button>
            </form>
            {message && <p className="status-message">{message}</p>}
        </div>
    );
};

export default Profile;
