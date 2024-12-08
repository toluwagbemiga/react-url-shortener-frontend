import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Url } from '../types';

interface UrlStatsProps {
  shortCode: string;
  onClose: () => void;
}

const UrlStats: React.FC<UrlStatsProps> = ({ shortCode, onClose }) => {
  const [url, setUrl] = useState<Url | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const urlData = await apiService.getUrlStats(shortCode);
        setUrl(urlData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch URL stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortCode]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Short URL copied to clipboard!');
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!url) return null;

  const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">URL Statistics</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short URL</label>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 px-3 py-2 rounded flex-1">{url.shortUrl}</code>
              <button
                onClick={() => copyToClipboard(url.shortUrl)}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original URL</label>
            <a
              href={url.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {url.originalUrl}
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Clicks</label>
              <div className="text-3xl font-bold text-blue-600">{url.clicks}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
              <div className="text-lg">{formatDate(url.createdAt)}</div>
            </div>
          </div>
          
          {url.expiresAt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expires</label>
              <div className={`text-lg ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                {formatDate(url.expiresAt)}
                {isExpired && ' (Expired)'}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlStats;