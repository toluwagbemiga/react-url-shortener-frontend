import React, { useState } from 'react';
import { apiService } from '../services/api';
import { Url } from '../types';

interface UrlFormProps {
  onUrlCreated: (url: Url) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onUrlCreated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = await apiService.createUrl({
        originalUrl,
        expiresAt: expiresAt || undefined,
      });
      onUrlCreated(url);
      setOriginalUrl('');
      setExpiresAt('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Shorten a URL</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Original URL
          </label>
          <input
            type="url"
            id="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-2">
            Expiration Date (Optional)
          </label>
          <input
            type="datetime-local"
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-600 mt-1">Leave empty for permanent links</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  );
};

export default UrlForm;