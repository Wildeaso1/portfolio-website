// Image loading utility for GitHub Pages compatibility

export const getImagePath = (imagePath) => {
  // For images in src folder (webpack processed)
  try {
    return require(`../images/${imagePath}`);
  } catch {
    // Fallback to public folder
    return `${process.env.PUBLIC_URL}/images/${imagePath}`;
  }
};

export const getPublicImagePath = (imagePath) => {
  // For images in public folder
  return `${process.env.PUBLIC_URL}/images/${imagePath}`;
};
