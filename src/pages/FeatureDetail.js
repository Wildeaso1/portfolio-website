import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import './FeatureDetail.css';

const FeatureDetail = () => {
  const { projectId, featureId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({}); // Track errors for each image
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true); // Open by default
  const project = projectsData.find(p => p.id === parseInt(projectId));

  Prism.languages.javascript = Prism.languages.extend('javascript', {
    'Variables': /\b[a-zA-Z_]\w*\b(?!\s*\()/
  });

  useEffect(() => {
    Prism.highlightAll();
  }, [currentSnippetIndex]); // Re-highlight when snippet changes

  if (!project) {
    return <h2>Project Not Found</h2>;
  }

  const feature = project.subpages.find(f => f.id === parseInt(featureId));

  if (!feature) {
    return <h2>Feature Not Found</h2>;
  }

  const hasImages = feature.images && feature.images.length > 0;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % feature.images.length
      );
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + feature.images.length) % feature.images.length
      );
    }
  };

  const handleSnippetChange = (index) => {
    setCurrentSnippetIndex(index);
    setIsDescriptionOpen(true); // Open description when changing snippet
  };

  // Handler for image load error
  const handleImageError = (index) => {
    setImageErrors(prevErrors => ({ ...prevErrors, [index]: true }));
  };

  // Handler for toggling description
  const toggleDescription = () => {
    setIsDescriptionOpen(prevState => !prevState);
  };

  const currentSnippet = feature.codeSnippets[currentSnippetIndex];

  return (
    <section className="feature-detail">
      <div className="feature-container">
        <h1>{feature.title}</h1>
        
        {/* Image Carousel */}
        <div className="image-carousel">
          {hasImages ? (
            <>
              <button onClick={prevImage} className="carousel-button left">&lt;</button>
              {!imageErrors[currentImageIndex] ? (
                <img 
                  src={feature.images[currentImageIndex]} 
                  alt={`${feature.title} - Image ${currentImageIndex + 1}`} 
                  className="feature-image" 
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

        <p>{feature.description}</p>

        {/* Code Snippets Section */}
        {feature.codeSnippets && feature.codeSnippets.length > 0 && (
          <div className="code-snippets">
            {/* Tabs for switching snippets */}
            {feature.codeSnippets.length > 1 && (
              <div className="snippet-tabs">
                {feature.codeSnippets.map((snippet, index) => (
                  <button
                    key={index}
                    className={`tab-button ${index === currentSnippetIndex ? 'active' : ''}`}
                    onClick={() => handleSnippetChange(index)}
                  >
                    {snippet.title || `Snippet ${index + 1}`}
                  </button>
                ))}
              </div>
            )}

            {/* Display the current snippet */}
            <div className="snippet-content">
              {/* Description Section */}
              {currentSnippet.description && (
                <div className="snippet-description">
                  <button className="toggle-description-button" onClick={toggleDescription}>
                    {isDescriptionOpen ? 'Hide Description' : 'Show Description'}
                  </button>
                  {isDescriptionOpen && (
                    <p className="description-text">{currentSnippet.description}</p>
                  )}
                </div>
              )}

              {/* Code Snippet */}
              <h3>{currentSnippet.title || 'Code Snippet'}</h3>
              <pre>
                <code className={`language-${currentSnippet.language}`}>
                  {currentSnippet.snippet}
                </code>
              </pre>
            </div>
          </div>
        )}

        <Link to={`/projects/${project.id}`} className="back-link">
          &larr; Back to {project.title}
        </Link>
      </div>
    </section>
  );
};

export default FeatureDetail;