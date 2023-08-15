import React, { useState } from 'react';
import { Watch } from 'react-loader-spinner';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Watch
      height="80"
      width="80"
      radius="48"
      color="#3f51b5"
      ariaLabel="watch-loading"
      wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        visibility: isLoading ? 'visible' : 'hidden',
      }}
    />
  );
}

