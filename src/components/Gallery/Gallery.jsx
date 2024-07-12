// src/components/Gallery/Gallery.jsx
import { useState, useEffect } from "react";
import css from "./Gallery.module.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images = import.meta.glob("../../img/*.{png,jpg,jpeg,svg}");

    const loadImages = async () => {
      const imagePromises = Object.keys(images).map(async (path) => {
        const image = await images[path]();
        return image.default;
      });

      const imageArray = await Promise.all(imagePromises);
      console.log("Завантажені зображення:", imageArray);
      setImages(imageArray);
    };

    loadImages();
  }, []);

  return (
    <div className={css.gallery}>
      <h1 className={css.title}>Пошкоджена техніка клієнтів</h1>
      {images.length > 0 ? (
        images.map((src, index) => (
          <div key={index} className={css.imageContainer}>
            <img src={src} alt={`Image ${index + 1}`} className={css.image} />
          </div>
        ))
      ) : (
        <p>Зображення не знайдено.</p>
      )}
    </div>
  );
};

export default Gallery;
