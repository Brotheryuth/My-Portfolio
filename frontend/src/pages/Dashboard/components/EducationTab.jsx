import React, { useState } from 'react';
import { educationService } from '../../../services/education.service';

function EducationTab({ education, onRefresh, triggerAlert }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form Fields
  const [eduForm, setEduForm] = useState({
    institution: '',
    level: 'University',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const resetForm = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setEduForm({
      institution: '',
      level: 'University',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setEditMode(true);
      setEditId(edu._id);
      setEduForm({
        institution: edu.institution || '',
        level: edu.level || 'University',
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        description: edu.description || ''
      });
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await educationService.updateEducation(editId, eduForm);
        triggerAlert('success', 'Education record updated successfully!');
      } else {
        await educationService.createEducation(eduForm);
        triggerAlert('success', 'Education record created successfully!');
      }
      resetForm();
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.response?.data?.message || 'Failed to save education record.');
    }
  };

  const handleDeleteEdu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education record?')) return;
    try {
      await educationService.deleteEducation(id);
      triggerAlert('success', 'Education record deleted successfully!');
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to delete education.');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-pane-header">
        <h2>Manage Education</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Education
        </button>
      </div>

      <div className="dashboard-grid-list">
        {education.map((edu) => (
          <div key={edu._id} className="dashboard-item-card">
            <div className="item-details">
              <h4>{edu.institution}</h4>
              <p className="subtitle">{edu.startDate} - {edu.endDate} | {edu.level}</p>
              <p className="desc-summary">
                {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
              </p>
            </div>
            <div className="item-actions">
              <button className="btn btn-edit" onClick={() => handleOpenModal(edu)}>
                Edit
              </button>
              <button className="btn btn-delete" onClick={() => handleDeleteEdu(edu._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="dashboard-modal-overlay" onClick={resetForm}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-dash-modal" onClick={resetForm}>&times;</button>
            
            <h3>{editMode ? 'Edit' : 'Add New'} Education</h3>
            
            <form onSubmit={handleSaveEdu} className="modal-form-fields">
              <div className="form-group-row">
                <div className="form-group">
                  <label>Institution Name *</label>
                  <input 
                    type="text" 
                    value={eduForm.institution} 
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Education Level *</label>
                  <select 
                    value={eduForm.level} 
                    onChange={(e) => setEduForm({ ...eduForm, level: e.target.value })}
                    required
                  >
                    <option value="University">University</option>
                    <option value="High School">High School</option>
                    <option value="Secondary School">Secondary School</option>
                    <option value="Primary School">Primary School</option>
                    <option value="Other">Course / Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Degree (e.g. Bachelor of Engineering)</label>
                  <input 
                    type="text" 
                    value={eduForm.degree} 
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Field of Study (e.g. Software Engineering)</label>
                  <input 
                    type="text" 
                    value={eduForm.fieldOfStudy} 
                    onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Start Date * (Year / Period)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2025" 
                    value={eduForm.startDate} 
                    onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>End Date * (Year / Period)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Present" 
                    value={eduForm.endDate} 
                    onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  value={eduForm.description} 
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-modal-submit">
                {editMode ? 'Save Changes' : 'Create Record'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationTab;
