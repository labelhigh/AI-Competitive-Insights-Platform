import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      <h2 className="mt-6 text-2xl font-semibold text-text-primary">{message}</h2>
      <p className="mt-2 text-text-secondary">我們的人工智慧正在從網路上收集和處理數據。</p>
    </div>
  );
};

export default Loader;