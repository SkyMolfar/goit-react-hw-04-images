import React, { useState, useEffect } from 'react';
import { Watch } from 'react-loader-spinner';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); 
  
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        visibility: isLoading ? 'visible' : 'hidden',
      }}
    >
      <Watch
        height={80}
        width={80}
        radius={48}
        color="#3f51b5"
        ariaLabel="watch-loading"
      />
    </div>
  );
}
