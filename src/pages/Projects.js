import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData, uniqueTags } from '../data/projects';
import './Projects.css';

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Use useEffect to update filtered projects when tag changes
  useEffect(() => {
    if (selectedTag === 'all') {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter(project => 
        project.tags && 
        Array.isArray(project.tags) && 
        project.tags.includes(selectedTag)
      );
      setFilteredProjects(filtered);
    }
    
    // Debug logging
    console.log('Selected tag:', selectedTag);
  }, [selectedTag]);

  const handleFilter = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <section className="projects">
      <h1 style={{color: 'white'}}>My Projects</h1>
      <div className="tags">
        <button
          key="all"
          className={`tag-btn ${selectedTag === 'all' ? 'active' : ''}`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => handleFilter(tag)}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;