import React from 'react';

interface BackendSelectorProps {
  currentBackend: 'laravel' | 'nestjs';
  onBackendChange: (backend: 'laravel' | 'nestjs') => void;
}

const BackendSelector: React.FC<BackendSelectorProps> = ({ currentBackend, onBackendChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Choose Backend</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => onBackendChange('laravel')}
          className={`px-4 py-2 rounded-md ${
            currentBackend === 'laravel'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Laravel Backend
        </button>
        <button
          onClick={() => onBackendChange('nestjs')}
          className={`px-4 py-2 rounded-md ${
            currentBackend === 'nestjs'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          NestJS Backend
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Current: <strong>{currentBackend === 'laravel' ? 'Laravel' : 'NestJS'}</strong> backend
      </p>
    </div>
  );
};

export default BackendSelector;