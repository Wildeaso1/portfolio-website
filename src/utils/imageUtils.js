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

export const getProjectImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/images/') ? imagePath.substring(8) : imagePath;
  return `${process.env.PUBLIC_URL}/images/${cleanPath}`;
};
