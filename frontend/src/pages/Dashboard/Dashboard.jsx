import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { projectService } from '../../services/featureProject.service';
import { skillService } from '../../services/userSkill.service';
import { educationService } from '../../services/education.service';
import { userService } from '../../services/user.service';
import { messageService } from '../../services/message.service';

// Import Modular Tabs
import ProjectsTab from './components/ProjectsTab';
import SkillsTab from './components/SkillsTab';
import EducationTab from './components/EducationTab';
import ProfileTab from './components/ProfileTab';
import MessagesTab from './components/MessagesTab';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // Loading & Global Notice States
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Check auth and load initial dashboard data
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    setActionError('');
    try {
      const [projData, skillData, eduData, profileData, msgData] = await Promise.all([
        projectService.getAllProject(),
        skillService.getAll(),
        educationService.getAll(),
        userService.getProfile(),
        messageService.getAllMessage()
      ]);
      setProjects(projData || []);
      setSkills(skillData || []);
      setEducation(eduData || []);
      setProfile(profileData);
      setMessages(msgData || []);
    } catch (err) {
      console.error(err);
      setActionError('Failed to load portfolio data from backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  const triggerAlert = (type, message) => {
    if (type === 'success') {
      setActionSuccess(message);
      setTimeout(() => setActionSuccess(''), 4000);
    } else {
      setActionError(message);
      setTimeout(() => setActionError(''), 4000);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Alert Notices */}
      {actionError && <div className="dash-alert error-alert">{actionError}</div>}
      {actionSuccess && <div className="dash-alert success-alert">{actionSuccess}</div>}

      <div className="dashboard-layout">
        
        {/* Navigation Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>PORTFOLIO ADMIN</h3>
            <p>Welcome, {profile?.userName || 'Admin'}</p>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`nav-item-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => { setActiveTab('projects'); setActionError(''); }}
            >
              Projects
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => { setActiveTab('skills'); setActionError(''); }}
            >
              Skills
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => { setActiveTab('education'); setActionError(''); }}
            >
              Education
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setActionError(''); }}
            >
              Profile Settings
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => { setActiveTab('messages'); setActionError(''); }}
            >
              Inbox Messages ({messages.length})
            </button>
            <button className="nav-item-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </aside>

        {/* Content Pane */}
        <main className="dashboard-content">
          {activeTab === 'projects' && (
            <ProjectsTab projects={projects} onRefresh={loadAllData} triggerAlert={triggerAlert} />
          )}

          {activeTab === 'skills' && (
            <SkillsTab skills={skills} onRefresh={loadAllData} triggerAlert={triggerAlert} />
          )}

          {activeTab === 'education' && (
            <EducationTab education={education} onRefresh={loadAllData} triggerAlert={triggerAlert} />
          )}

          {activeTab === 'profile' && (
            <ProfileTab profile={profile} onRefresh={loadAllData} triggerAlert={triggerAlert} />
          )}

          {activeTab === 'messages' && (
            <MessagesTab messages={messages} />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;