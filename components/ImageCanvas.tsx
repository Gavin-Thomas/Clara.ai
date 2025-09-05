import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { KeyIcon } from './icons';

interface ImageCanvasProps {
  imageData: string | null;
  explanation: string | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
    "Consulting clinical textbooks...",
    "Sketching mnemonic symbols...",
    "Composing the visual narrative...",
    "Reviewing high-yield facts...",
    "Finalizing the artwork..."
];

const ExplanationRenderer: React.FC<{ text: string }> = ({ text }) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return null;

    const title = lines.shift(); 
    const points = lines.map(line => line.replace(/^\* /, ''));

    return (
        <div className="w-full max-w-4xl bg-yellow-50 border border-yellow-200 text-yellow-900 p-4 rounded-lg">
            <div className="flex items-start gap-3">
                <KeyIcon className="h-6 w-6 text-[#ffcd00] flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
                    <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-800">
                        {points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


export const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageData, explanation, isLoading, error }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative min-h-[400px] lg:min-h-[600px]">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-xl transition-opacity duration-300">
          <Loader />
          <p className="mt-4 text-lg font-semibold text-gray-800">Generating MCCQE Mnemonic...</p>
          <p className="mt-1 text-sm text-gray-500 text-center transition-opacity duration-500 ease-in-out">{loadingMessages[currentMessageIndex]}</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="text-center text-red-600">
          <h3 className="text-xl font-bold mb-2">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && imageData && (
        <div className="w-full h-full flex flex-col items-center gap-6">
          <div className="flex-1 w-full max-w-4xl flex items-center justify-center">
             <img src={imageData} alt="Generated medical mnemonic for MCCQE" className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />
          </div>
          {explanation && (
            <ExplanationRenderer text={explanation} />
          )}
        </div>
      )}

      {!isLoading && !error && !imageData && (
        <div className="text-center text-gray-500 p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Welcome to CLARA-AI</h2>
          <p className="max-w-md mx-auto">Enter a medical topic on the left and click "Generate Scene" to create a visual mnemonic for the MCCQE.</p>
        </div>
      )}
    </div>
  );
};