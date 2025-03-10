import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadingDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate a 3-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
       <p>Some text</p>
      </div>
      {isLoading ? <LoadingSpinner /> : <div>数据加载完成!</div>}
    </div>
  );
};

export default LoadingDemo;
