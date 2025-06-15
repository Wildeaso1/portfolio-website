import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './ImageGallery.css'; // Optional for custom styles

const ImageGalleryComponent = ({ images }) => {
  const galleryImages = images.map((img) => ({
    original: img,
    thumbnail: img, // Use the same image or provide separate thumbnails
  }));

  return <ReactImageGallery items={galleryImages} />;
};

export default ImageGalleryComponent;