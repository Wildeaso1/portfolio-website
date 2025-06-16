// Image loading utility for GitHub Pages compatibility
// Only use these if you need to load images from src folder

export const getImagePath = (imagePath) => {
  // For images in src folder (webpack processed)
  try {
    return require(`../images/${imagePath}`);
  } catch {
    // Fallback to public folder
    return `${process.env.PUBLIC_URL}/images/${imagePath}`;
  }
};

// For public folder images, just use: `${process.env.PUBLIC_URL}/images/filename.jpg`
export const getPublicImagePath = (imagePath) => {
  return `${process.env.PUBLIC_URL}/images/${imagePath}`;
};
