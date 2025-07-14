import React, { useState, useEffect } from 'react';

interface BackgroundSlideshowProps {
  children: React.ReactNode;
}

const BackgroundSlideshow: React.FC<BackgroundSlideshowProps> = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of background images
  const backgroundImages = [
    '/posters_background/poster1.jpg',
    '/posters_background/poster2.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Generate pixel sparks
  const generateSparks = () => {
    const sparks = [];
    for (let i = 0; i < 15; i++) {
      const leftPosition = Math.random() * 100;
      const animationDelay = Math.random() * 8;
      const horizontalDrift = (Math.random() - 0.5) * 0.2; // +/- 0.1 range
      
      sparks.push(
        <div
          key={i}
          className="pixel-spark"
          style={{
            left: `${leftPosition}%`,
            animationDelay: `${animationDelay}s`,
            '--drift-x': `${horizontalDrift}vw`
          } as React.CSSProperties}
        />
      );
    }
    return sparks;
  };

  return (
    <div className="slideshow-container">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`slideshow-image ${
            index === currentImageIndex ? 'active' : ''
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="slideshow-overlay" />
      
      {/* Pixel Spark Particles */}
      <div className="pixel-sparks">
        {generateSparks()}
      </div>
      
      {/* CRT Scan-lines */}
      <div className="crt-scanlines" />
      
      {/* Content */}
      <div className="slideshow-content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundSlideshow;