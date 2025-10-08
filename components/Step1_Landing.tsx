import React, { useState } from 'react';

interface Step1LandingProps {
  onStart: (url: string) => void;
}

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);


const Step1Landing: React.FC<Step1LandingProps> = ({ onStart }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onStart(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary to-brand-primary pb-2">
        AI 驅動的競品分析
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-text-secondary">
        將您的網址轉化為全面、可行的情報報告。自動識別競爭對手、分析其策略，並發現您的下一個致勝關鍵。
      </p>
      <form onSubmit={handleSubmit} className="mt-12 w-full max-w-2xl">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="請在此貼上您公司的網址以開始"
            className="w-full pl-6 pr-36 py-4 text-lg bg-card border-2 border-border-color rounded-full focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-300 placeholder-text-secondary shadow-sm"
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-brand-primary hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            disabled={!url.trim()}
          >
            開始分析
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1Landing;