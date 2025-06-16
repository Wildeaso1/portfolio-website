import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolIcon from '../components/ToolIcon';
import "./About.css";

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <button
        className="collapsible-button"
        onClick={toggleCollapsible}
        aria-expanded={isOpen}
        aria-controls={`${title}-content`}
      >
        <h2>{title}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="collapsible-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    // Log the current image URL for debugging
    console.log("Current image URL:", images[currentImageIndex]);
  }, [currentImageIndex, images]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleImageError = (index) => {
    setImageErrors(prevErrors => ({ ...prevErrors, [index]: true }));
  };

  return (
    <div className="image-carousel">
      {images.length > 1 && (
        <button onClick={prevImage} className="carousel-button left">&lt;</button>
      )}
      {!imageErrors[currentImageIndex] ? (
        <img 
          src={images[currentImageIndex]} 
          alt={`About Me - Image ${currentImageIndex + 1}`} 
          className="about-image"
          onError={(e) => {
            console.error("Image failed to load:", e);
            handleImageError(currentImageIndex);
          }}
        />
      ) : (
        <div className="no-image-placeholder">No Image Available (Error loading: {images[currentImageIndex]})</div>
      )}
      {images.length > 1 && (
        <button onClick={nextImage} className="carousel-button right">&gt;</button>
      )}
    </div>
  );
};

const About = () => {
  const PortfolioList = [
    { name: "Unity 3d", key: "Unity", class: '3D' },
    { name: "Blender", key: "Blender", class: '3D' },
    { name: "Photoshop", key: "Photoshop", class: '2D' },
    { name: "Illustrator", key: "Illustrator", class: "2D" }
  ];
  // Update the image path to use the correct GitHub Pages path
  const aboutImages = [
    `${process.env.PUBLIC_URL}/images/Logo.jpg`,
  ];

  useEffect(() => {
    // Log the public URL for debugging
    console.log("Public URL:", process.env.PUBLIC_URL);
  }, []);

  return (
    <section className="about">
      <div className="about-container">
        <h1>About Me</h1>
        <p>
          Hello! I'm William Soijer, a Game Developer/Technical artist with a
          passion for creating engaging and immersive experiences. With
          extensive knowledge in a multitude of programs, I've worked on various
          projects ranging from indie games to large-scale productions. I enjoy
          every aspect of game development, from conceptualization to the final
          polish.
        </p>

        <ImageCarousel images={aboutImages} />

        <div className="skills-section">
          <Collapsible title="3D Skills">
            <ul className="skills-list">
              {PortfolioList.map((item) => {
                if (item.class === '3D') {
                  return (
                    <li key={item.key}>
                      <ToolIcon name={item.key} size={24} /> {item.name}
                    </li>
                  )
                }
                return null;
              })}
            </ul>
          </Collapsible>

          <Collapsible title="2D Skills">
            <ul className="skills-list">
              {PortfolioList.map((item) => {
                if (item.class === '2D') {
                  return (
                    <li key={item.key}>
                      <ToolIcon name={item.key} size={24} /> {item.name}
                    </li>
                  )
                }
                return null;
              })}
              <li>Sprite Animation</li>
              <li>Tilemap Design</li>
              <li>Character Design</li>
              <li>UI/UX Design</li>
              <li>Texture Painting</li>
              <li>Vector Graphics</li>
            </ul>
          </Collapsible>

          <Collapsible title="Things I Want to Learn">
            <ul className="skills-list">
              <li>Advanced Unreal Engine Techniques</li>
              <li>Virtual Reality (VR) Development</li>
              <li>Augmented Reality (AR) Integration</li>
              <li>Machine Learning for Game Development</li>
              <li>Procedural Content Generation</li>
              <li>Networking for Multiplayer Games</li>
              <li>Optimization Techniques</li>
              <li>Game Design Theory</li>
            </ul>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default About;