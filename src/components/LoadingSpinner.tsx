import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center 
      justify-center bg-black/50
      rounded-md
      ">
      <div className="flex items-center justify-center">
        <div className="loader"></div>
        <p className="text-white ml-2">加载中...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
