import type React from 'react';
import backgroundImage from '/bg_sea.jpg';

const BackgroundProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* Background image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      />
      {/* Overlay to weaken the color */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: -1,
        }}
      />

      {children}
    </>
  );
};

export default BackgroundProvider;
