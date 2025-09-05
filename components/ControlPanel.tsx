import React from 'react';
import { GenerateIcon, EditIcon } from './icons';

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
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 h-fit sticky top-8">
      <div>
        <label htmlFor="medical-text" className="block text-md font-semibold mb-2 text-gray-800">
          1. Enter Medical Topic
        </label>
        <textarea
          id="medical-text"
          value={medicalText}
          onChange={(e) => setMedicalText(e.target.value)}
          placeholder="e.g., Key features of Staphylococcus aureus..."
          className="w-full h-48 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcd00] focus:border-[#ffcd00] transition duration-200 resize-y text-gray-800 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          onClick={onGenerate}
          disabled={isLoading || !medicalText.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#d6001c] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#b00016] transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6001c]"
        >
          <GenerateIcon className="h-5 w-5" />
          {isLoading && !hasImage ? 'Generating...' : (hasImage ? 'Regenerate Scene' : 'Generate Scene')}
        </button>
      </div>

      {hasImage && (
        <div className="border-t border-gray-200 pt-6">
          <label htmlFor="edit-text" className="block text-md font-semibold mb-2 text-gray-800">
            2. Edit Your Scene
          </label>
          <p className="text-sm text-gray-500 mb-2">Describe a change to the image.</p>
          <input
            id="edit-text"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="e.g., Add a golden crown to the pharaoh"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcd00] focus:border-[#ffcd00] transition duration-200 text-gray-800 placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={onEdit}
            disabled={isLoading || !editText.trim()}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            <EditIcon className="h-5 w-5" />
            {isLoading ? 'Editing...' : 'Apply Edit'}
          </button>
        </div>
      )}
    </div>
  );
};