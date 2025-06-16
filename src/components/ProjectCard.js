import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolIcon from './ToolIcon';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  // State to track if image failed to load
  const [isImageError, setIsImageError] = useState(false);

  // Handler for image load error
  const handleImageError = () => {
    setIsImageError(true);
  };
  // Simple direct path for public folder images
  const getImagePath = () => {
    if (!project.headerImage || project.headerImage.trim() === '') {
      return null;
    }
    return `${process.env.PUBLIC_URL}${project.headerImage}`;
  };
  
  const imagePath = getImagePath();

  return (
    <div className="project-card">      <div className="project-image-container">
        {!isImageError && imagePath ? (
          <img 
            src={imagePath} 
            alt={`${project.title} header`} 
            className="project-image" 
            onError={handleImageError} // Attach the error handler
          />
        ) : (
          <div className="project-image-placeholder">No Image Available</div>
        )}
      </div>
      <div className="project-content">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>
        <div className="project-tools">
          {project.toolIcons.map((iconName) => (
            <ToolIcon key={iconName} name={iconName} size={24} />
          ))}
        </div>
        <Link to={`/projects/${project.id}`} className="learn-more">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;