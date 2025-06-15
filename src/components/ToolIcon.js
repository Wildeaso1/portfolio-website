import React from 'react';
import PropTypes from 'prop-types';
import toolIcons from '../config/ToolIcons';
import { FaQuestion } from 'react-icons/fa'; // Default icon for unknown tools
import './ToolIcon.css'; // Ensure you have corresponding CSS

const ToolIcon = ({ name, size }) => {
  const tool = toolIcons[name];

  if (!tool) {
    console.warn(`Tool "${name}" not found in toolIcons configuration.`);
    // Render a default icon if tool not found
    return (
      <div className="tool-icon" title={name}>
        <FaQuestion size={size} color="#000000" />
      </div>
    );
  }

  if (tool.type === 'icon') {
    const IconComponent = tool.component;
    return (
      <div className="tool-icon" title={name}>
        <IconComponent size={size} color={tool.color} />
      </div>
    );
  }

  if (tool.type === 'image') {
    return (
      <div className="tool-icon" title={name}>
        <img src={tool.src} alt={tool.alt} width={size} height={size} />
      </div>
    );
  }

  return null; // Fallback
};

ToolIcon.propTypes = {
  name: PropTypes.string.isRequired, // e.g., "Unity", "C#", "Blender"
  size: PropTypes.number, // e.g., 40
};

ToolIcon.defaultProps = {
  size: 40,
};

export default ToolIcon;