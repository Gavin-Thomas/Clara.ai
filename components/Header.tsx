import React from 'react';
import { ClaraIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header
      className="border-b"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
        <ClaraIcon
          className="h-9 w-9"
          style={{ color: 'var(--color-primary)' }}
        />
        <div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--color-foreground)' }}
            >
              CLARA-AI
            </h1>
            <p
              className="text-xs"
              style={{ color: 'var(--color-muted)' }}
            >
              Clinical Learning through Augmented Reasoning & Art
            </p>
        </div>
      </div>
    </header>
  );
};