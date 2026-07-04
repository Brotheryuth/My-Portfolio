import React, { useState } from 'react';
import { skillService } from '../../../services/userSkill.service';

function SkillsTab({ skills, onRefresh, triggerAlert }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form Fields
  const [skillForm, setSkillForm] = useState({
    name: '',
    skillLevel: 80,
    category: 'Frontend'
  });

  const resetForm = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setSkillForm({ name: '', skillLevel: 80, category: 'Frontend' });
  };

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditMode(true);
      setEditId(skill._id);
      setSkillForm({
        name: skill.name || '',
        skillLevel: skill.skillLevel || 80,
        category: skill.category || 'Frontend'
      });
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await skillService.updateSkill(editId, skillForm);
        triggerAlert('success', 'Skill updated successfully!');
      } else {
        await skillService.addSkill(skillForm);
        triggerAlert('success', 'Skill created successfully!');
      }
      resetForm();
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.response?.data?.message || 'Failed to save skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await skillService.deleteSkill(id);
      triggerAlert('success', 'Skill deleted successfully!');
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to delete skill.');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-pane-header">
        <h2>Manage Skills</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Skill
        </button>
      </div>

      <div className="dashboard-grid-list">
        {skills.map((skill) => (
          <div key={skill._id} className="dashboard-item-card">
            <div className="item-details">
              <h4>{skill.name}</h4>
              <p className="subtitle">Category: {skill.category} | Level: {skill.skillLevel}%</p>
            </div>
            <div className="item-actions">
              <button className="btn btn-edit" onClick={() => handleOpenModal(skill)}>
                Edit
              </button>
              <button className="btn btn-delete" onClick={() => handleDeleteSkill(skill._id)}>
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
            
            <h3>{editMode ? 'Edit' : 'Add New'} Skill</h3>
            
            <form onSubmit={handleSaveSkill} className="modal-form-fields">
              <div className="form-group">
                <label>Skill Name *</label>
                <input 
                  type="text" 
                  value={skillForm.name} 
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={skillForm.category} 
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    required
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                    <option value="Languages">Languages</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Skill Level (Percent: {skillForm.skillLevel}%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={skillForm.skillLevel} 
                    onChange={(e) => setSkillForm({ ...skillForm, skillLevel: parseInt(e.target.value) })}
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-modal-submit">
                {editMode ? 'Save Changes' : 'Create Skill'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsTab;
