import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/projects';
import { generateIndividualProjectFile, generateProjectsIndexFile } from '../utils/projectFileGenerator';
import toolIcons from '../config/ToolIcons';
import availableTags from '../data/tags';
import Login from '../components/Login';
import './Admin.css';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Available options for dropdowns
  const availableTools = Object.keys(toolIcons);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthentication();
    setProjects(projectsData);
  }, []);

  const checkAuthentication = () => {
    try {
      const authData = localStorage.getItem('adminAuth');
      if (authData) {
        const parsedAuth = JSON.parse(authData);
        const now = Date.now();
        
        // Check if authentication is still valid (not expired)
        if (parsedAuth.isAuthenticated && parsedAuth.expiry > now) {
          setIsAuthenticated(true);
        } else {
          // Remove expired authentication
          localStorage.removeItem('adminAuth');
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      localStorage.removeItem('adminAuth');
      setIsAuthenticated(false);
    }
    setIsCheckingAuth(false);
  };

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setShowForm(false);
    setCurrentProject(null);
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="admin">
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'white' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const emptyProject = {
    id: '',
    title: '',
    description: '',
    headerImage: '',
    images: [''],
    tags: [],
    tools: [],
    toolIcons: [],
    subpages: []
  };

  const emptySubpage = {
    id: '',
    title: '',
    description: '',
    images: [''],
    codeSnippets: []
  };

  const emptyCodeSnippet = {
    title: '',
    description: '',
    language: 'javascript',
    snippet: ''
  };

  const handleAddProject = () => {
    const newProject = { ...emptyProject, id: Date.now() };
    setCurrentProject(newProject);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject({ ...project });
    setIsEditing(true);
    setShowForm(true);
  };
  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      generateProjectFile(updatedProjects);
    }
  };
  const handleSaveProject = () => {
    let updatedProjects;
    
    if (isEditing) {
      // When editing, copy the individual project JSON
      copyIndividualProject(currentProject);
      updatedProjects = projects.map(p => 
        p.id === currentProject.id ? currentProject : p
      );
    } else {
      // When adding, update the projects array and copy the full projects.js
      updatedProjects = [...projects, currentProject];
      setProjects(updatedProjects);
      generateProjectFile(updatedProjects);
    }
    
    setProjects(updatedProjects);
    setShowForm(false);
    setCurrentProject(null);
  };const copyToClipboard = async (text, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(successMessage);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy to clipboard. Check console for details.');
    }
  };

  const generateProjectFile = (projectsArray) => {
    // Generate the main projects.js file
    const indexContent = generateProjectsIndexFile(projectsArray);
    copyToClipboard(indexContent, 'Projects.js content copied to clipboard!');
  };

  const copyIndividualProject = (project) => {
    const projectContent = generateIndividualProjectFile(project);
    copyToClipboard(projectContent, `${project.title} project file copied to clipboard!`);
  };

  const handleInputChange = (field, value) => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleArrayChange = (field, index, value) => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
    
    // Auto-sync toolIcons with tools
    if (field === 'tools') {
      setCurrentProject(prev => ({
        ...prev,
        toolIcons: prev.tools.map((item, i) => i === index ? value : item)
      }));
    }
  };
  const addArrayItem = (field, item = '') => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
    
    // Auto-sync toolIcons with tools
    if (field === 'tools') {
      setCurrentProject(prev => ({
        ...prev,
        toolIcons: [...prev.toolIcons, item]
      }));
    }
  };
  const removeArrayItem = (field, index) => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
    
    // Auto-sync toolIcons with tools
    if (field === 'tools') {
      setCurrentProject(prev => ({
        ...prev,
        toolIcons: prev.toolIcons.filter((_, i) => i !== index)
      }));
    }
  };
  const handleTagAdd = (tag) => {
    if (tag && !currentProject.tags.includes(tag)) {
      setCurrentProject(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleToolAdd = (tool) => {
    if (tool && !currentProject.tools.includes(tool)) {
      setCurrentProject(prev => ({
        ...prev,
        tools: [...prev.tools, tool],
        toolIcons: [...prev.toolIcons, tool] // Auto-sync toolIcons
      }));
    }
  };

  const handleSubpageChange = (subpageIndex, field, value) => {
    setCurrentProject(prev => ({
      ...prev,
      subpages: prev.subpages.map((subpage, i) => 
        i === subpageIndex ? { ...subpage, [field]: value } : subpage
      )
    }));
  };

  const addSubpage = () => {
    setCurrentProject(prev => ({
      ...prev,
      subpages: [...prev.subpages, { ...emptySubpage, id: Date.now() }]
    }));
  };

  const removeSubpage = (index) => {
    setCurrentProject(prev => ({
      ...prev,
      subpages: prev.subpages.filter((_, i) => i !== index)
    }));
  };

  const addCodeSnippet = (subpageIndex) => {
    setCurrentProject(prev => ({
      ...prev,
      subpages: prev.subpages.map((subpage, i) => 
        i === subpageIndex 
          ? { ...subpage, codeSnippets: [...subpage.codeSnippets, emptyCodeSnippet] }
          : subpage
      )
    }));
  };

  const updateCodeSnippet = (subpageIndex, snippetIndex, field, value) => {
    setCurrentProject(prev => ({
      ...prev,
      subpages: prev.subpages.map((subpage, i) => 
        i === subpageIndex 
          ? {
              ...subpage,
              codeSnippets: subpage.codeSnippets.map((snippet, j) =>
                j === snippetIndex ? { ...snippet, [field]: value } : snippet
              )
            }
          : subpage
      )
    }));
  };

  const removeCodeSnippet = (subpageIndex, snippetIndex) => {
    setCurrentProject(prev => ({
      ...prev,
      subpages: prev.subpages.map((subpage, i) => 
        i === subpageIndex 
          ? {
              ...subpage,
              codeSnippets: subpage.codeSnippets.filter((_, j) => j !== snippetIndex)
            }
          : subpage
      )
    }));
  };
  return (
    <div className="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Project Admin</h1>
        <button className="admin-btn danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
        <div className="admin-actions">
        <button className="admin-btn" onClick={handleAddProject}>
          Add New Project
        </button>
        <button className="admin-btn secondary" onClick={() => setShowForm(false)}>
          View All Projects
        </button>        <button className="admin-btn secondary" onClick={() => generateProjectFile(projects)}>
          Copy Projects.js to Clipboard
        </button>
      </div>

      {!showForm ? (
        <div className="projects-list">
          <h2>Existing Projects</h2>
          {projects.map(project => (
            <div key={project.id} className="project-item">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description.substring(0, 100)}...</p>
                <p>Tags: {project.tags.join(', ')}</p>
              </div>
              <div className="project-actions">
                <button 
                  className="admin-btn" 
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </button>
                <button 
                  className="admin-btn danger" 
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="form-container">
          <h2>{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
          
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={currentProject?.title || ''} 
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={currentProject?.description || ''} 
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Header Image URL</label>
            <input 
              type="text" 
              value={currentProject?.headerImage || ''} 
              onChange={(e) => handleInputChange('headerImage', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Images</label>
            {currentProject?.images?.map((image, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                <input 
                  type="text" 
                  value={image} 
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  placeholder="Image URL"
                />
                <button 
                  type="button" 
                  className="admin-btn danger"
                  onClick={() => removeArrayItem('images', index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className="admin-btn secondary"
              onClick={() => addArrayItem('images')}
            >
              Add Image
            </button>
          </div>          <div className="form-group">
            <label>Tags</label>
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  handleTagAdd(e.target.value);
                  e.target.value = ''; // Reset dropdown
                }
              }}
            >
              <option value="">Select a tag to add...</option>
              {availableTags
                .filter(tag => !currentProject?.tags?.includes(tag))
                .map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))
              }
            </select>
            <div className="tags-input">
              {currentProject?.tags?.map((tag, index) => (
                <span key={index} className="tag-chip">
                  {tag}
                  <button onClick={() => removeArrayItem('tags', index)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Tools</label>
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  handleToolAdd(e.target.value);
                  e.target.value = ''; // Reset dropdown
                }
              }}
            >
              <option value="">Select a tool to add...</option>
              {availableTools
                .filter(tool => !currentProject?.tools?.includes(tool))
                .map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))
              }
            </select>
            <div className="tags-input">
              {currentProject?.tools?.map((tool, index) => (
                <span key={index} className="tag-chip">
                  {tool}
                  <button onClick={() => removeArrayItem('tools', index)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Subpages Section */}
          <div className="subpages-section">
            <h3>Subpages</h3>
            {currentProject?.subpages?.map((subpage, subpageIndex) => (
              <div key={subpageIndex} className="subpage-item">
                <div className="form-group">
                  <label>Subpage Title</label>
                  <input 
                    type="text" 
                    value={subpage.title} 
                    onChange={(e) => handleSubpageChange(subpageIndex, 'title', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Subpage Description</label>
                  <textarea 
                    value={subpage.description} 
                    onChange={(e) => handleSubpageChange(subpageIndex, 'description', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Code Snippets</label>
                  {subpage.codeSnippets?.map((snippet, snippetIndex) => (
                    <div key={snippetIndex} className="code-snippet">
                      <input 
                        type="text" 
                        placeholder="Snippet Title"
                        value={snippet.title}
                        onChange={(e) => updateCodeSnippet(subpageIndex, snippetIndex, 'title', e.target.value)}
                      />
                      <select 
                        value={snippet.language}
                        onChange={(e) => updateCodeSnippet(subpageIndex, snippetIndex, 'language', e.target.value)}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="csharp">C#</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                      </select>
                      <textarea 
                        placeholder="Code snippet..."
                        value={snippet.snippet}
                        onChange={(e) => updateCodeSnippet(subpageIndex, snippetIndex, 'snippet', e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="admin-btn danger"
                        onClick={() => removeCodeSnippet(subpageIndex, snippetIndex)}
                      >
                        Remove Snippet
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="admin-btn secondary"
                    onClick={() => addCodeSnippet(subpageIndex)}
                  >
                    Add Code Snippet
                  </button>
                </div>

                <div className="subpage-actions">
                  <button 
                    type="button" 
                    className="admin-btn danger"
                    onClick={() => removeSubpage(subpageIndex)}
                  >
                    Remove Subpage
                  </button>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              className="admin-btn secondary"
              onClick={addSubpage}
            >
              Add Subpage
            </button>
          </div>          <div className="admin-actions">
            <button className="admin-btn" onClick={handleSaveProject}>
              {isEditing ? 'Update & Copy Project JSON' : 'Save & Copy Projects.js'}
            </button>
            <button 
              className="admin-btn secondary" 
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
