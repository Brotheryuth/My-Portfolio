import React, { useState, useEffect } from 'react';
import { userService } from '../../../services/user.service';

function ProfileTab({ profile, onRefresh, triggerAlert }) {
  const [profileForm, setProfileForm] = useState({
    userName: '',
    email: '',
    aboutMe: '',
    avatarUrl: '',
    bio: ''
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        userName: profile.userName || '',
        email: profile.email || '',
        aboutMe: profile.aboutMe || '',
        avatarUrl: profile.avatarUrl || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await userService.updateProfile(profile._id, profileForm);
      triggerAlert('success', 'Profile info updated successfully!');
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to update profile info.');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-pane-header">
        <h2>Profile Settings</h2>
      </div>

      <form className="dashboard-profile-form" onSubmit={handleSaveProfile}>
        <div className="form-group-row">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={profileForm.userName} 
              onChange={(e) => setProfileForm({ ...profileForm, userName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={profileForm.email} 
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Avatar / Profile Image URL</label>
          <input 
            type="url" 
            value={profileForm.avatarUrl} 
            onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Homepage Description</label>
          <textarea 
            rows="3" 
            value={profileForm.bio} 
            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            placeholder="A short introduction shown on your homepage..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>Bio (About Me Description)</label>
          <textarea 
            rows="6" 
            value={profileForm.aboutMe} 
            onChange={(e) => setProfileForm({ ...profileForm, aboutMe: e.target.value })}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-save-profile">
          Save Profile Settings
        </button>
      </form>
    </div>
  );
}

export default ProfileTab;
