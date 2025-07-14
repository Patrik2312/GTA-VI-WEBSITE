import React, { useState, useEffect } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="parallax-container">
      {/* Background Skyline Layer (5% movement) */}
      <div 
        className="parallax-skyline"
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
        }}
      />
      
      {/* Foreground Palm Layer (20% movement) */}
      <div 
        className="parallax-palms"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      />
      
      {/* Content */}
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxLayer;