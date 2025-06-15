import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import ToolIcon from '../components/ToolIcon';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-csharp';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({}); // Track errors for each image

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  if (!project) {
    return <h2>Project Not Found</h2>;
  }

  const hasImages = project.images && project.images.length > 0;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % project.images.length
      );
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + project.images.length) % project.images.length
      );
    }
  };

  // Handler for image load error
  const handleImageError = (index) => {
    setImageErrors(prevErrors => ({ ...prevErrors, [index]: true }));
  };

  return (
    <section className="project-detail">
      <div className="detail-container">
        <h1>{project.title}</h1>
        <div className="image-carousel">
          {hasImages ? (
            <>
              <button onClick={prevImage} className="carousel-button left">&lt;</button>
              {!imageErrors[currentImageIndex] ? (
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                  className="detail-image" 
                  onError={() => handleImageError(currentImageIndex)} // Attach the error handler
                />
              ) : (
                <div className="no-image-placeholder">No Image Available</div>
              )}
              <button onClick={nextImage} className="carousel-button right">&gt;</button>
            </>
          ) : (
            <div className="no-image-placeholder">No Image Available</div>
          )}
        </div>
        <p>{project.description}</p>

        <h3>Tools/Programs Used:</h3>
        <div className="project-tools">
          {Array.isArray(project.toolIcons) 
            ? project.toolIcons.map(iconName => (
                <ToolIcon key={iconName} name={iconName} size={24} />
              ))
            : project.tools.map(tool => (
                <span key={tool}>{tool}</span>
              ))
          }
        </div>

        {project.codeSnippet && (
          <>
            <h3>Code Snippet:</h3>
            <pre>
              <code className={`language-${project.codeLanguage}`}>
                {project.codeSnippet}
              </code>
            </pre>
          </>
        )}

        {project.subpages && project.subpages.length > 0 && (
          <>
            <h3>Features:</h3>
            <ul>
              {project.subpages.map(subpage => (
                <li key={subpage.id}>
                  <Link to={`/projects/${project.id}/features/${subpage.id}`}>{subpage.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;