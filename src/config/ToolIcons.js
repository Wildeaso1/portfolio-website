import { 
  SiUnity, 
  SiBlender, 
  SiUnrealengine, 
  SiCsharp, 
  SiAdobephotoshop, 
  SiAdobeillustrator,  
  SiBlueprint,
  SiJavascript,
  SiGithub,
  SiGitlab

 } from 'react-icons/si';
// Import additional icons as needed

// Import custom images if needed (ensure these paths are correct)
// import CSharpLogo from '../assets/logos/CSLogo.svg'; // Example for C#
// import BlueprintsLogo from '../assets/logos/blueprints.png'; // Example for Blueprints

const toolIcons = {
  Unity: {
    type: 'icon',
    component: SiUnity,
    color: 'White' // Unity's official color or desired color
  },
  Blender: {
    type: 'icon',
    component: SiBlender,
    color: '#F5792A', // Blender's official color or desired color
  },
  'Unreal Engine': {
    type: 'icon',
    component: SiUnrealengine,
    color: '#0B1120', // Unreal Engine's official color or desired color
  },
  'C#': {
    type: 'icon',
    component: SiCsharp,
    color: '9b4993'
  },
  Blueprints: {
    type: 'icon',
    component: SiBlueprint ,
    color: '337dff',
  },
  Photoshop: {
    type: 'icon',
    component: SiAdobephotoshop,
    color: '#31A8FF', // Photoshop's official color or desired color
  },
  Illustrator: {
    type: 'icon',
    component: SiAdobeillustrator,
    color: '#f8a829'
  },
  Javascript:{
    type: 'icon',
    component: SiJavascript,
    color: 'yellow'
  },
  Github:{
    type: 'icon',
    component: SiGithub,
    color: 'White'
  },
  Gitlab:{
    type: 'icon',
    component: SiGitlab,
    color: '#FC6D26'
  },
  // Add more tool mappings as needed
};

export default toolIcons;