import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { KeyIcon, ImageIcon, ErrorIcon } from './icons';

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
    <div
      className="w-full max-w-4xl p-4"
      style={{
        backgroundColor: 'rgba(0, 82, 204, 0.05)', // Light blue tint
        border: '1px solid rgba(0, 82, 204, 0.1)',
        borderRadius: 'var(--border-radius)',
      }}
    >
      <div className="flex items-start gap-3">
        <KeyIcon className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
        <div>
          <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-foreground)' }}>{title}</h3>
          <ul className="list-disc list-inside text-sm space-y-1.5" style={{ color: 'var(--color-muted)' }}>
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-300" style={{ backgroundColor: 'var(--color-card)' }}>
          <Loader />
          <p className="mt-4 text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>Generating Scene...</p>
          <p className="mt-1 text-sm text-center" style={{ color: 'var(--color-muted)' }}>{loadingMessages[currentMessageIndex]}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <ErrorIcon className="h-12 w-12 mb-4 text-red-500" />
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>An Error Occurred</h3>
          <p className="text-red-500 max-w-md">{error}</p>
        </div>
      );
    }

    if (imageData) {
      return (
        <div className="w-full h-full flex flex-col items-center gap-6">
          <div className="flex-1 w-full max-w-4xl flex items-center justify-center">
            <img
              src={imageData}
              alt="Generated medical mnemonic"
              className="max-w-full max-h-full object-contain"
              style={{ borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)' }}
            />
          </div>
          {explanation && <ExplanationRenderer text={explanation} />}
        </div>
      );
    }

    return (
      <div className="text-center flex flex-col items-center justify-center" style={{ color: 'var(--color-muted)' }}>
        <ImageIcon className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>Image Canvas</h2>
        <p className="max-w-md mx-auto">Your generated visual mnemonics will appear here.</p>
      </div>
    );
  };

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative"
      style={{
        backgroundColor: 'var(--color-card)',
        borderRadius: 'var(--border-radius)',
        border: `1px solid var(--color-border)`,
        boxShadow: 'var(--shadow-md)',
        minHeight: '400px',
        lg: { minHeight: '600px' }
      }}
    >
      {renderContent()}
    </div>
  );
};