import React, { useState } from 'react';
import { GenerateIcon, EditIcon } from './icons';

// A more stylish button component
const ActionButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
}> = ({ onClick, disabled, children, className = '', primary = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderRadius: 'var(--border-radius)',
    fontWeight: '600',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    outline: 'none',
    border: 'none',
  };

  const primaryStyle: React.CSSProperties = {
    backgroundColor: isHovered && !disabled ? 'var(--color-primary-hover)' : 'var(--color-primary)',
    color: 'white',
  };

  const secondaryStyle: React.CSSProperties = {
    backgroundColor: isHovered && !disabled ? '#e9ecef' : 'transparent',
    color: 'var(--color-primary)',
    border: `1px solid var(--color-primary)`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...(primary ? primaryStyle : secondaryStyle) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      {children}
    </button>
  );
};

interface ControlPanelProps {
  medicalText: string;
  setMedicalText: (text: string) => void;
  editText: string;
  setEditText: (text: string) => void;
  onGenerate: () => void;
  onEdit: () => void;
  isLoading: boolean;
  hasImage: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  medicalText,
  setMedicalText,
  editText,
  setEditText,
  onGenerate,
  onEdit,
  isLoading,
  hasImage,
}) => {
  const commonInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'var(--color-input)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    color: 'var(--color-foreground)',
  };

  return (
    <div
      className="flex flex-col gap-6 h-fit sticky top-8 p-6"
      style={{
        backgroundColor: 'var(--color-card)',
        borderRadius: 'var(--border-radius)',
        border: `1px solid var(--color-border)`,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div>
        <label htmlFor="medical-text" className="block text-md font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
          1. Describe a Scene
        </label>
        <textarea
          id="medical-text"
          value={medicalText}
          onChange={(e) => setMedicalText(e.target.value)}
          placeholder="e.g., A mnemonic for remembering the Krebs cycle..."
          className="resize-y"
          style={{ ...commonInputStyle, height: '10rem' }}
          disabled={isLoading}
        />
        <ActionButton
          onClick={onGenerate}
          disabled={isLoading || !medicalText.trim()}
          primary
          className="mt-4"
        >
          <GenerateIcon className="h-5 w-5" />
          {isLoading && !hasImage ? 'Generating...' : (hasImage ? 'Regenerate' : 'Generate')}
        </ActionButton>
      </div>

      {hasImage && (
        <div className="border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <label htmlFor="edit-text" className="block text-md font-semibold mb-1" style={{ color: 'var(--color-foreground)' }}>
            2. Edit Your Scene
          </label>
          <p className="text-sm mb-2" style={{ color: 'var(--color-muted)' }}>Describe a change to the image.</p>
          <input
            id="edit-text"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="e.g., Add a sun in the sky"
            style={commonInputStyle}
            disabled={isLoading}
          />
          <ActionButton
            onClick={onEdit}
            disabled={isLoading || !editText.trim()}
            className="mt-4"
          >
            <EditIcon className="h-5 w-5" />
            {isLoading ? 'Applying...' : 'Apply Edit'}
          </ActionButton>
        </div>
      )}
    </div>
  );
};