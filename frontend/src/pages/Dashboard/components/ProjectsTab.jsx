import React, { useState } from 'react';
import { projectService } from '../../../services/featureProject.service';

function ProjectsTab({ projects, onRefresh, triggerAlert }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form Fields
  const [projForm, setProjForm] = useState({
    projectName: '',
    projectDescription: '',
    technologyUsed: '',
    developPeriod: '',
    projectUrl: '',
    githubUrl: '',
    projectImage: '',
    lessonLearn: '',
    challenge: '',
    problem: '',
    contribution: '',
    feature: false
  });

  const resetForm = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setProjForm({
      projectName: '',
      projectDescription: '',
      technologyUsed: '',
      developPeriod: '',
      projectUrl: '',
      githubUrl: '',
      projectImage: '',
      lessonLearn: '',
      challenge: '',
      problem: '',
      contribution: '',
      feature: false
    });
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditMode(true);
      setEditId(project._id);
      setProjForm({
        projectName: project.projectName || '',
        projectDescription: project.projectDescription || '',
        technologyUsed: project.technologyUsed ? project.technologyUsed.join(', ') : '',
        developPeriod: project.developPeriod || '',
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        projectImage: project.projectImage || '',
        lessonLearn: project.lessonLearn || '',
        challenge: project.challenge || '',
        problem: project.problem || '',
        contribution: project.contribution || '',
        feature: !!project.feature
      });
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...projForm,
      technologyUsed: projForm.technologyUsed
        ? projForm.technologyUsed.split(',').map(s => s.trim()).filter(Boolean)
        : []
    };

    try {
      if (editMode) {
        await projectService.updateProject(editId, payload);
        triggerAlert('success', 'Project updated successfully!');
      } else {
        await projectService.createProject(payload);
        triggerAlert('success', 'Project created successfully!');
      }
      resetForm();
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.response?.data?.message || 'Failed to save project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.deleteProject(id);
      triggerAlert('success', 'Project deleted successfully!');
      onRefresh();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to delete project.');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-pane-header">
        <h2>Manage Projects</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Project
        </button>
      </div>

      <div className="dashboard-grid-list">
        {projects.map((proj) => (
          <div key={proj._id} className="dashboard-item-card">
            <div className="item-details">
              <h4>{proj.projectName}</h4>
              <p className="subtitle">
                {proj.developPeriod}{' '}
                {proj.feature && <span className="feat-badge">Featured</span>}
              </p>
              <p className="desc-summary">{proj.projectDescription}</p>
            </div>
            <div className="item-actions">
              <button className="btn btn-edit" onClick={() => handleOpenModal(proj)}>
                Edit
              </button>
              <button className="btn btn-delete" onClick={() => handleDeleteProject(proj._id)}>
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
            
            <h3>{editMode ? 'Edit' : 'Add New'} Project</h3>
            
            <form onSubmit={handleSaveProject} className="modal-form-fields">
              <div className="form-group-row">
                <div className="form-group">
                  <label>Project Name *</label>
                  <input 
                    type="text" 
                    value={projForm.projectName} 
                    onChange={(e) => setProjForm({ ...projForm, projectName: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Development Period *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2 weeks / Apr 2026" 
                    value={projForm.developPeriod} 
                    onChange={(e) => setProjForm({ ...projForm, developPeriod: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Technologies Used * (Comma-separated list)</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, CSS, Node.js, Spring Boot" 
                  value={projForm.technologyUsed} 
                  onChange={(e) => setProjForm({ ...projForm, technologyUsed: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>GitHub Repository URL</label>
                  <input 
                    type="url" 
                    value={projForm.githubUrl} 
                    onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Live Demo URL *</label>
                  <input 
                    type="url" 
                    value={projForm.projectUrl} 
                    onChange={(e) => setProjForm({ ...projForm, projectUrl: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Project Image URL (S3 or Web Link)</label>
                <input 
                  type="url" 
                  value={projForm.projectImage} 
                  onChange={(e) => setProjForm({ ...projForm, projectImage: e.target.value })}
                  placeholder="https://..." 
                />
              </div>

              <div className="form-group">
                <label>Description Summary *</label>
                <textarea 
                  rows="3" 
                  value={projForm.projectDescription} 
                  onChange={(e) => setProjForm({ ...projForm, projectDescription: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Individual Contribution (Your Role) *</label>
                <textarea 
                  rows="2" 
                  value={projForm.contribution} 
                  onChange={(e) => setProjForm({ ...projForm, contribution: e.target.value })}
                  placeholder="Describe your role and contribution..."
                  required 
                />
              </div>

              <div className="form-group">
                <label>Challenges Faced</label>
                <textarea 
                  rows="2" 
                  value={projForm.challenge} 
                  onChange={(e) => setProjForm({ ...projForm, challenge: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Problems Encountered</label>
                <textarea 
                  rows="2" 
                  value={projForm.problem} 
                  onChange={(e) => setProjForm({ ...projForm, problem: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Lessons Learned</label>
                <textarea 
                  rows="2" 
                  value={projForm.lessonLearn} 
                  onChange={(e) => setProjForm({ ...projForm, lessonLearn: e.target.value })}
                />
              </div>

              <div className="form-group-checkbox">
                <input 
                  type="checkbox" 
                  id="feat-chk"
                  checked={projForm.feature} 
                  onChange={(e) => setProjForm({ ...projForm, feature: e.target.checked })} 
                />
                <label htmlFor="feat-chk">Feature this project on homepage preview</label>
              </div>

              <button type="submit" className="btn btn-modal-submit">
                {editMode ? 'Save Changes' : 'Create Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsTab;
